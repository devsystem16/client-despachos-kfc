import React, { Component } from "react";
import Motorizado from "./Motorizado";

class Motorizados extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  mostrarMotorizados = () => {
    const motorizados = this.props.motorizados;

    if (motorizados.length === 0) {
      return (
        <React.Fragment>
          <tr>
            <td colSpan="4"> Ningún motorizado asignado</td>
          </tr>
        </React.Fragment>
      );
    } else
      return (
        <React.Fragment>
          {Object.keys(motorizados).map(motorizado => (
            <Motorizado
              motorizados={this.props.motorizados}
              key={motorizado}
              info={this.props.motorizados[motorizado]}
              asignarMotorizado={this.props.asignarMotorizado}
            />
          ))}
        </React.Fragment>
      );
  };

  render() {
    return (
      <table cellPadding="2" className="table table-hover tabla-despacho">
        <thead>
          <tr>
            <td>Código</td>
            <td>Motorizado</td>
            <td>CM</td>
            <td>Celular</td>
            <td> </td>
          </tr>
          {/* <tr scope="col">Código</tr>
          <th scope="col"> Motorizado </th>
          <th scope="col">CM</th>
          <th scope="col">Celular</th> */}
        </thead>
        <tbody>{this.mostrarMotorizados()}</tbody>
      </table>
    );
  }
}

export default Motorizados;
