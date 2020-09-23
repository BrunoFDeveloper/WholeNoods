import Link from './shared/Link';
import { useNavigate } from 'react-router';
import { useMst } from '../models';
import { graphql, useMutation } from 'react-relay/hooks';
import { SignUpMutation } from './__generated__/SignUpMutation.graphql';
import Form, { Values } from './forms/Form';
import Input from './forms/Input';
import SubmitButton from './forms/SubmitButton';

export default function SignUp() {
	const navigate = useNavigate();
	const store = useMst();

	const [commit, isInFlight] = useMutation<SignUpMutation>(graphql`
		mutation SignUpMutation($input: SignUpInput!) {
			signUp(input: $input) {
				ok
			}
		}
	`);

	async function handleSubmit(values: Values) {
		commit({
			variables: {
				name: values.name,
				email: values.email,
				password: values.password,
			},
			onCompleted() {
				store.user.setIsSignedIn(true);
				navigate('/');
			},
		});
	}

	return (
		<div className="bg-gray-200 py-12">
			<div className="w-96 mx-auto">
				<h1 className="font-serif font-semibold text-4xl mb-6">Sign up.</h1>
				<Form
					onSubmit={handleSubmit}
					disabled={isInFlight}
					className="space-y-4"
				>
					<Input label="Name" name="name" placeholder="Name..." autoFocus />
					<Input label="Email" name="email" placeholder="Email..." />
					<Input label="Password" name="password" placeholder="Password..." />
					<div className="flex justify-between items-center">
						<Link to="/signin">Have an account? Sign in</Link>
						<SubmitButton>Sign Up</SubmitButton>
					</div>
				</Form>
			</div>
		</div>
	);
}
