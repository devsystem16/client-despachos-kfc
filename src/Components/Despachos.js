import React, { Component } from "react";

import AsignacionDespacho from "./ActivarMotorizado";
import Listado from "./Listado";
import DetallesDespacho from "./DetallesDespacho";

class Despachos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ObtenerDatoListado = (parametro) =>{
     this.props.ObtenerDatoDespachos(parametro)
    // alert('Desde Despachos ' + parametro)
  }

  render() {
    return (
   
        <div className="odt">
        <div  className="title-table">  {this.props.title} </div>
          <Listado ObtenerDatoListado={this.ObtenerDatoListado} despachos={this.props.despachos} />
        </div>
      

   
    );
  }
}

export default Despachos;
