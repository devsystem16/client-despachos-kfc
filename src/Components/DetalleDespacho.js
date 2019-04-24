import React, { Component } from "react";
 

class DetalleDespacho extends Component {
 
     state = {  };
 
  render() {
    const {
        // Cod_Detalle_Factura,
        Cod_Plu,
        Descripcion,
        Cantidad,
        Precio  
      } = this.props.info;
    
    return (
        <tr>
        {/* <td>{Cod_Detalle_Factura}</td> */}
        <td>{Cod_Plu}</td>
        <td>{Descripcion}</td>
        <td>{Cantidad}</td>
        <td>{Precio}</td>

      </tr>
    );
  }
}

export default DetalleDespacho;
