import React, { Component } from "react";
// import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { fechaActual, fechaPeriodo } = this.props.infoPeriodo;

    return (
      <header className="col-12 col-md-12">
        <h4 className="text-center title-1"> Despachos</h4>
        <div className="text-center title-1">
          Periodo {fechaPeriodo}, Fecha actual {fechaActual}{" "}
        </div>
      </header>
    );
  }
}

export default Header;
