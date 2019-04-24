import React, { Component } from "react";
import Page from "./Page";

class ImpresionFactura extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: this.props.datos
    };
  }
  render() {
    return <Page datos ={this.state.datos}/>;
  }
}

export default ImpresionFactura;
