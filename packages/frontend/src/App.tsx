import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import client from "./client";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Provider } from "./models";

export default function App() {
  return (
    <Provider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/" exact>
                nothing
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/profile/:id">
                <Profile />
              </Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
}
