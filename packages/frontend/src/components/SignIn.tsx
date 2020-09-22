import Button from "./shared/Button";
import Link from "./shared/Link";
import { useHistory } from "react-router";
import { useMst } from "../models";
import { graphql, useMutation } from "react-relay/hooks";
import { SignInMutation } from "./__generated__/SignInMutation.graphql";

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    commit({
      variables: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <div className="font-semibold mb-1">Email</div>
            <input
              className="bg-transparent focus:bg-white transition duration-150 border border-green-700 rounded-sm focus:outline-none px-5 py-2 text-lg w-full"
              placeholder="Email address..."
              name="email"
            />
          </label>
          <label className="block">
            <div className="font-semibold mb-1">Password</div>
            <input
              className="bg-transparent focus:bg-white transition duration-150 border border-green-700 rounded-sm focus:outline-none px-5 py-2 text-lg w-full"
              placeholder="Email address..."
              type="password"
              name="password"
            />
          </label>
          <div className="flex justify-between items-center">
            <Link to="/signup">Need an account? Sign up</Link>
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
