import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";

ReactDOM.render(
  <Layout>
    <Login />
  </Layout>,
  document.getElementById("root")!
);
