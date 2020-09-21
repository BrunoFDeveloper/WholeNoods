import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: "http://wholenoods.localhost/api/graphql",
  credentials: "include",
});

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
