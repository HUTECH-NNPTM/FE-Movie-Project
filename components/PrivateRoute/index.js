import React from "react";
import { Redirect, Route } from "react-router-dom";
import Container from "../Container";
import Header from "../Header";

function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(localtion) =>
        token != null ? (
          <Container>
            <Component {...localtion}></Component>
          </Container>
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    ></Route>
  );
}

export default PrivateRoute;
