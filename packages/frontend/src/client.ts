import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { rootStore } from "./models";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: rootStore.user.jwt ? `Bearer ${rootStore.user.jwt}` : "",
    },
  };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
