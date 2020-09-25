import Link from './ui/Link';
import { useNavigate } from 'react-router';
import { useMst } from '../models';
import { graphql, useMutation } from 'react-relay/hooks';
import { SignInMutation } from './__generated__/SignInMutation.graphql';
import Heading from './ui/Heading';
import Form, { Values } from './forms/Form';
import Input from './forms/Input';
import SubmitButton from './forms/SubmitButton';

export default function SignIn() {
	const store = useMst();
	const navigate = useNavigate();
	const [commit, isInFlight] = useMutation<SignInMutation>(graphql`
		mutation SignInMutation($input: SignInInput!) {
			signIn(input: $input) {
				ok
				requiresTOTP
			}
		}
	`);

	async function handleSubmit(values: Values) {
		commit({
			variables: {
				input: {
					email: values.email,
					password: values.password,
				},
			},
			onCompleted() {
				store.user.setIsSignedIn(true);
				navigate('/');
			},
		});
	}

	return (
		<div className="py-12">
			<div className="w-96 mx-auto">
				<Heading>Sign in.</Heading>
				<Form
					disabled={isInFlight}
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<Input
						label="Email"
						placeholder="Email address..."
						name="email"
						autoFocus
					/>
					<Input
						label="Password"
						placeholder="Password..."
						type="password"
						name="password"
					/>
					<div className="flex justify-between items-center">
						<Link to="/signup">Need an account? Sign up</Link>
						<SubmitButton>Sign In</SubmitButton>
					</div>
				</Form>
			</div>
		</div>
	);
}
