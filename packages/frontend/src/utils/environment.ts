import {
  RelayNetworkLayer,
  errorMiddleware,
  loggerMiddleware,
  uploadMiddleware,
  urlMiddleware,
  cacheMiddleware,
} from "react-relay-network-modern";
import { Environment, RecordSource, Store } from "relay-runtime";

const isDev = process.env.NODE_ENV !== "production";

export function createEnvironment() {
  const network = new RelayNetworkLayer([
    cacheMiddleware({
      // max 100 requests
      size: 100,
      // 15 minutes
      ttl: 900000,
    }),
    urlMiddleware({
      url: "/api/graphql",
      credentials: "include",
    }),
    isDev ? loggerMiddleware() : null,
    isDev ? errorMiddleware() : null,
    uploadMiddleware(),
  ]);

  const source = new RecordSource();
  const store = new Store(source, {
    // TODO: Tweak number:
    gcReleaseBufferSize: 0,
  });
  const environment = new Environment({ network, store });

  return environment;
}
