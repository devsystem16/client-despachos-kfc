import React, { Component } from "react";
import axios from "axios";
import ListadoDetalleDespacho from "./ListadoDetalleDespacho";
import {
  API_GET_DISPATCHING
} from "../Constants";


class DetallesDespacho extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detalllesDespacho: [],
      codigo_orden: "",
      _state_CodigoFactura: this.props.despacho
    };
  }

  componentDidMount() {
    this.obtenerDetalleDespacho(this.props);
    this.setState({
      detalllesDespacho: this.props.detallesDespaho
    });
  }

  // Function
  obtenerDetalleDespacho = props => {
    if (!props.despacho) return null;
    const Cod_Factura = this.props.despacho;
    axios
      .get(`${API_GET_DISPATCHING}${Cod_Factura}`)
      .then(response => {
        this.setState({
          detalllesDespacho: response.data
        });
      });
  };
  // End Function
  render() {
    return (
      <ListadoDetalleDespacho detallesDespacho={this.props.detallesDespaho} />
    );
  }
}

export default DetallesDespacho;
