import React from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <React.Suspense fallback="TODO: Real fallback UI">
        {children}
      </React.Suspense>
    </div>
  );
}
