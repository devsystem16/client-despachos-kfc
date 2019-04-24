import React, { Component } from "react";

import "../Css/CssTable.css";

import Despacho from "./Despacho";

// import $ from 'jquery';
// import DataTable from 'datatables.net';


class Listado extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.title = React.createRef()

  }


componentDidMount(){
//  var table = $("#TableDespacho");
//  alert(table);
// $('#TableDespacho').DataTable();

 

}

  ObtenerDatoDespacho = parametro => {
    // alert('Desde litado ' + parametro)
    this.props.ObtenerDatoListado(parametro);
  };

  mostrarDespachos = () => {
    const despachos = this.props.despachos;

    if (despachos.length === 0) return null;

    return (
      <React.Fragment>
        {Object.keys(despachos).map(despacho => (
          <Despacho
            ObtenerDatoDespacho={this.ObtenerDatoDespacho}
            key={despacho}
            info={this.props.despachos[despacho]}
          />
        ))}
      </React.Fragment>
    );
  };

  render() {
    return (
      <table cellPadding="2" ref = { this.title } id="TableDespacho" className="table table-hover tabla-despacho">
        <thead>
          <th scope="col">Factura</th>
          <th scope="col"> Cliente </th>
          <th scope="col">C. App</th>
          <th scope="col">Estado</th>
          <th scope="col">Zip Code</th>
          <th scope="col">C. Motorolo</th>
          <th scope="col">T. Espera</th>
          <th scope="col" >-</th>
        </thead>
        <tbody>{this.mostrarDespachos()}</tbody>
      </table>
    );
  }
}

export default Listado;
