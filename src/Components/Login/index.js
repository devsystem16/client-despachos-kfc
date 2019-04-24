import React, { Component } from "react";
import Page from "./Page";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalLogin: this.props.modalLogin
    };
  }

  render() {
    return (
      <Page
        modalLogin={this.props.modalLogin}
        closeModalLogin={this.props.closeModalLogin}
        login ={this.props.login}
      />
    );
  }
}

export default Login;
