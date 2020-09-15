import React from "react";
import { gql, useMutation } from "@apollo/client";
import Button from "./shared/Button";
import Link from "./shared/Link";
import { useHistory } from "react-router";
import { useMst } from "../models";

export default function SignIn() {
  const store = useMst();
  const history = useHistory();
  const [mutate] = useMutation(gql`
    mutation SignInMutation($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        requiresTOTP
      }
    }
  `);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { data } = await mutate({
      variables: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    });

    store.user.setJWT(data.signin.jwt);

    history.push("/");
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
