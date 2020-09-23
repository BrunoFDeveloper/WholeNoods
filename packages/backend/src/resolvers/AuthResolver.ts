import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from 'type-graphql';
import { AuthType, User } from '../entities/User';
import { Context } from '../types';
import Result from './types/Result';

@ObjectType()
class SignInResult extends Result {
	@Field() requiresTOTP: boolean;

	constructor(requiresTOTP: boolean) {
		super();
		this.requiresTOTP = requiresTOTP;
	}
}

@InputType()
class SignInInput {
	@Field() email!: string;
	@Field() password!: string;
}

@InputType()
class SignUpInput {
	@Field() name!: string;
	@Field() email!: string;
	@Field() password!: string;
}

@Resolver()
export class AuthResolver {
	@Query(() => User, { nullable: true })
	viewer(@Ctx() { user }: Context) {
		return user;
	}

	@Mutation(() => Result)
	async signUp(@Arg('input') input: SignUpInput) {
		const user = User.create({
			email: input.email,
			name: input.name,
		});

		await user.setPassword(input.password);
		await user.save();

		user.signIn();

		return new Result();
	}

	@Mutation(() => SignInResult)
	async signIn(@Arg('input') input: SignInInput) {
		await new Promise((resolve) => setTimeout(resolve, 5000));

		const user = await User.findOneOrFail({
			where: {
				email: input.email,
			},
		});

		const passwordValid = await user.verifyPassword(input.password);

		if (!passwordValid) {
			throw new Error('Invalid password.');
		}

		if (user.totpSecret) {
			await user.signIn(AuthType.TOTP);

			return new SignInResult(true);
		}

		await user.signIn();

		return new SignInResult(false);
	}
}
