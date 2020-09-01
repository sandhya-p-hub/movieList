import React, { Component } from "react";
import auth from "./services/authService";

class Logout extends Component {
  state = {};

  componentDidMount() {
    auth.logout();
    localStorage.removeItem(auth.tokenKey);
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
