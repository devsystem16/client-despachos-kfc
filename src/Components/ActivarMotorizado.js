import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import iziToast from "izitoast";
 

class ActivarMotorizado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo_motorizado: "",
      errorInput: false
    };
  }
  handleChange = codigo_motorizado => event => {
 
    // if (isNaN(parseInt(event.target.value))) {
    //   this.setState({
    //     errorInput: true
    //   });
    // } else {
    //   this.setState({
    //     errorInput: false
    //   });
    // }
 
    this.setState({ [codigo_motorizado]: event.target.value });
  };

  asignarMotorizado = () => {
    var existeMotorolo = this.props.motorizados.find(motorizado => {
      return motorizado.Cod_Tarjeta === this.state.codigo_motorizado;
    });
    if (existeMotorolo !== undefined) {
      iziToast.error({
        title: "Error: ",
        message: "Ya se encuentra en el listado",
        timeout: 1500,
        resetOnHover: true,
        icon: "material-icons",
        transitionIn: "flipInX",
        transitionOut: "flipOutX",
        position: "topRight"
      });
      return;
    }

    if (this.state.codigo_motorizado !== "") {
      this.props.asignarMotorizado(this.state.codigo_motorizado, "A");
    } else {
      iziToast.error({
        title: "Error: ",
        message: "Ingrese un código válido",
        timeout: 1500,
        resetOnHover: true,
        icon: "material-icons",
        transitionIn: "flipInX",
        transitionOut: "flipOutX",
        position: "topRight"
      });
    }

    this.setState({
      codigo_motorizado: ""
    });
  };

  render() {
    return (
      <div className="container-fluid topes">
        <div className="row">
          <div className="container-fluid">
            <div className="row fondo">
              <div className="col-sm-7">
                <TextField
                  required={true}
                  error={this.state.errorInput}
                  type="number"
                  value={this.state.codigo_motorizado}
                  onChange={this.handleChange("codigo_motorizado")}
                  id="standard-uncontrolle"
                  label="Código motorizado: "
                  margin="normal"
                />
              </div>
              <div className="col-sm-2">
                <br />
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  onClick={this.asignarMotorizado}
                >
                  Activar
                </Button>
              </div>
              <div className="col-sm-3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivarMotorizado;
