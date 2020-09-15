import React from "react";
import { useMutation, gql } from "@apollo/client";
import Button from "./shared/Button";
import Link from "./shared/Link";
import { useHistory } from "react-router";
import { useMst } from "../models";

export default function SignUp() {
  const history = useHistory();
  const store = useMst();

  const [commit] = useMutation(gql`
    mutation SignUpMutation(
      $name: String!
      $email: String!
      $password: String!
    ) {
      signUp(name: $name, email: $email, password: $password) {
        ok
      }
    }
  `);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { data } = await commit({
      variables: {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      },
    });

    store.user.setJWT(data.signup.jwt);

    history.push("/");
  }

  return (
    <div className="bg-gray-200 py-12">
      <div className="w-96 mx-auto">
        <h1 className="font-serif font-semibold text-4xl mb-6">Sign up.</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <div className="font-semibold mb-1">Name</div>
            <input
              className="bg-transparent focus:bg-white transition duration-150 border border-green-700 rounded-sm focus:outline-none px-5 py-2 text-lg w-full"
              placeholder="Name..."
              name="name"
            />
          </label>
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
              placeholder="Password..."
              type="password"
              name="password"
            />
          </label>
          <div className="flex justify-between items-center">
            <Link to="/signin">Have an account? Sign in</Link>
            <Button>Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
