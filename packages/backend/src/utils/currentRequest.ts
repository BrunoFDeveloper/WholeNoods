import { AsyncLocalStorage } from "async_hooks";
import { Context } from "../types";

const currentRequest = new AsyncLocalStorage<Context>();

export function getCurrentRequest<T = Context>(): T {
  const ctx = currentRequest.getStore();
  if (!ctx) {
    throw new Error(
      "No current request was found, are you calling this method from outer space?"
    );
  }
  // @ts-ignore We trust our consumers:
  return ctx;
}

export function run(ctx: Context, callback: () => Promise<void>) {
  return (currentRequest.run(ctx, callback) as unknown) as Promise<void>;
}
