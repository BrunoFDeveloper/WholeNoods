import { Suspense } from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <Suspense fallback="TODO: Real fallback UI">
        {children}
      </Suspense>
    </div>
  );
}
