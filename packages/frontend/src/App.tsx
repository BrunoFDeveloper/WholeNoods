import React from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ComposePost from "./components/ComposePost";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Provider } from "./models";
import environment from "./utils/environment";

export default function App() {
  return (
    <Provider>
      <RelayEnvironmentProvider environment={environment}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/profiles/:id">
                <Profile />
              </Route>
              <Route path="/posts/create">
                <ComposePost />
              </Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      </RelayEnvironmentProvider>
    </Provider>
  );
}
