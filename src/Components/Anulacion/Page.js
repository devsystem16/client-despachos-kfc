import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import TextField from "@material-ui/core/TextField";

import { Form } from "react-bootstrap";
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, text_motivo: "" };
  }

  handleChangetext_motivo = text_motivo => event => {
    this.setState({ [text_motivo]: event.target.value });
  };

  selectmotivo = React.createRef();
  text_motivo = React.createRef();

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.fn_CloseModalAnulacion();
  };

  anularDespacho = () => {
    var parametros = {
      codigo_restaurante: localStorage.getItem("rst_id"),
      codigo_factura: localStorage.getItem("current_invoice"),
      codigo_motivo_anulacion: this.selectmotivo.current.value, //
      codigo_administrador: localStorage.getItem("idUser"),
      comentario: this.state.text_motivo
    };



    this.setState({
      text_motivo: ""
    })

    this.props.fn_anularDespacho(parametros);
  };


  cargarOpcionesAnulacion = () => {
    const opcionesAnulacion = this.props.opcionesAnulacion
    return (<React.Fragment>
      {Object.keys(opcionesAnulacion).map(opcion => (
        <option value={this.props.opcionesAnulacion[opcion].Cod_Motivo}>
         {this.props.opcionesAnulacion[opcion].Descripcion}
         </option>
      ))}
    </React.Fragment>
    )
  }

  render() {
    var open = this.props.modalAnulacion;
    return (
      <div>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Anulación"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div className="row">

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Motivo</Form.Label>
                  <Form.Control as="select" ref={this.selectmotivo}>
                    {this.cargarOpcionesAnulacion()}
                    {/* <option value="1">Pedido Falso</option>
                    <option value="2">Aumento de Pedido</option> */}
                  </Form.Control>
                </Form.Group>
              </div>

              <div className="row">
                <TextField
                  id="outlined-textarea"
                  label="Comentario"
                  placeholder="Ingrese un comentario"
                  multiline
                  margin="normal"
                  variant="outlined"
                  value={this.state.text_motivo}
                  onChange={this.handleChangetext_motivo("text_motivo")}
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.anularDespacho} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Page;
