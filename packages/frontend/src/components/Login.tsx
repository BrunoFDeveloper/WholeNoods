import React from "react";

export default function Login() {
  return (
    <div className="bg-gray-200 py-12">
      <div className="w-96 mx-auto">
        <h1 className="font-serif font-semibold text-4xl mb-6">Sign in.</h1>
        <div className="space-y-4">
          <label className="block">
            <div className="font-semibold mb-1">Email</div>
            <input
              className="bg-transparent focus:bg-white transition duration-150 border border-green-700 rounded-sm focus:outline-none px-5 py-2 text-lg w-full"
              placeholder="Email address..."
            />
          </label>
          <label className="block">
            <div className="font-semibold mb-1">Password</div>
            <input
              className="bg-transparent focus:bg-white transition duration-150 border border-green-700 rounded-sm focus:outline-none px-5 py-2 text-lg w-full"
              placeholder="Email address..."
              type="password"
            />
          </label>
          <div className="flex justify-end">
            <button className="text-green-700 bg-transparent hover:bg-white transition duration-150 border border-green-700 rounded-sm focus:outline-none px-5 py-2 text-lg font-semibold">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
