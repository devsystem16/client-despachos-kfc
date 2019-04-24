import React, { Component } from "react";
import axios from "axios";


class DetallesDespachoTest extends Component {
  constructor(props) {
    super(props);
    this.state = { detalllesDespacho: [], codigo_orden: "" };
    console.log("Entro a constructor DetallesDespachoTest")
  }


 componentDidMount() {
    this.haciaPadre()
 }

  haciaPadre = props => {
 

      console.log("Mi funcion");

      axios
      .get(`http://172.17.0.67:3000/despacho/K020F000412915`)
      .then(response => {
        console.log(response.data);
        console.log("fin data response");
        this.setState({
          detalllesDespacho: response.data
        });
      });
 
    //this.props.funcionDesdeDespachos("Hola desde detaleDespacho.");
  };


  obtenerDetalleDespacho = props => {
    if (!props.despacho) return null;
    const  Cod_Factura  = this.props.despacho;
 console.log("Entro a funcion obtenerDetalleDespacho del componente DetallesDespachoTest")
    axios
      .get(`http://172.17.0.67:3000/despacho/${Cod_Factura}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          detalllesDespacho: response.data
        });
      });
  };


  render() {
    return (
      <div>
        <h4 className="text-center" onClick={this.haciaPadre}>
          Detalles de la orden test
          {this.haciaPadre}
        </h4>
      </div>
    );
  }
}

export default DetallesDespachoTest;

// import React, { Component } from "react";
// import axios from "axios";
// import ListadoDetalleDespacho from "./ListadoDetalleDespacho";

// class DetallesDespacho extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { detalllesDespacho: [], codigo_orden: "" };
//   }

// haciaPadre = () => {
// this.props.funcionDesdeDespachos('Hola desde detaleDespacho.')
// }

//   obtenerDetalleDespacho = props => {
//     if (!props.despacho) return null;
//     const { Cod_Factura } = this.props.despacho;

//     axios
//       .get(`http://172.17.0.67:3000/despacho/${Cod_Factura}`)
//       .then(response => {
//         console.log(response.data);
//         this.setState({
//           detalllesDespacho: response.data
//         });
//       });
//   };

//   render() {
//     return (
//       <div>
//         <h4 className="text-center" onClick={this.haciaPadre} >
//           Detalles de la orden
//         </h4>

//         <ListadoDetalleDespacho detallesDespacho={this.state.detalllesDespacho}/>

//         {this.obtenerDetalleDespacho(this.props)}
//       </div>
//     );
//   }
// }

// export default DetallesDespacho;
