import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({
  uri: "http://wholenoods.localhost/api/graphql",
  credentials: "include",
});

export default new ApolloClient({
  // @ts-ignore: These types are compatible I swear!
  link,
  cache: new InMemoryCache(),
});
