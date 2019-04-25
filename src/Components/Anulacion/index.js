import React, { Component } from "react";
import Page from "./Page";

class Anulacion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Page
        opcionesAnulacion={this.props.opcionesAnulacion}
        modalAnulacion={this.props.modalAnulacion}
        fn_CloseModalAnulacion={this.props.fn_CloseModalAnulacion}
        fn_anularDespacho={this.props.fn_anularDespacho}
      />
    );
  }
}

export default Anulacion;
