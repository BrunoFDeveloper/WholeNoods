import Button from "./shared/Button";
import Link from "./shared/Link";
import { useHistory } from "react-router";
import { useMst } from "../models";
import { graphql, useMutation } from "react-relay/hooks";
import { SignInMutation } from "./__generated__/SignInMutation.graphql";
import Form, { Values } from "./forms/Form";
import Input from "./forms/Input";

export default function SignIn() {
  const store = useMst();
  const history = useHistory();
  const [commit] = useMutation<SignInMutation>(graphql`
    mutation SignInMutation($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        requiresTOTP
      }
    }
  `);

  async function handleSubmit(values: Values) {
    commit({
      variables: {
        email: values.email,
        password: values.password,
      },
      onCompleted() {
        store.user.setIsSignedIn(true);
        history.push("/");
      },
    });
  }

  return (
    <div className="bg-gray-200 py-12">
      <div className="w-96 mx-auto">
        <h1 className="font-serif font-semibold text-4xl mb-6">Sign in.</h1>
        <Form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" placeholder="Email address..." name="email" />
          <Input
            label="Password"
            placeholder="Password..."
            type="password"
            name="password"
          />
          <div className="flex justify-between items-center">
            <Link to="/signup">Need an account? Sign up</Link>
            <Button type="submit">Sign In</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
