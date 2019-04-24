import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.modalLogin,
      usuario: null,
      password: null
    };
  }

  handleChangeUsuario = usuario => event => {
    this.setState({ [usuario]: event.target.value });
  };

  handleChangePassword = password => event => {
    this.setState({ [password]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    // this.setState({ open: false });
    this.setState({
        usuario:"",
        password:""
    })
    this.props.closeModalLogin();
  };

  login = () => {
    this.props.login(this.state.usuario , this.state.password);

    this.setState({
        usuario:"",
        password:""
    })

  };

  render() {
    var open = this.props.modalLogin;
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Autenticación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para realizar esta acción es necesario que digite sus
              credenciales.
            </DialogContentText>
            <TextField
              value={this.state.usuario}
              onChange={this.handleChangeUsuario("usuario")}
              autoFocus
              margin="dense"
              id="name"
              label="Usuario"
              type="text"
              fullWidth
            />
            <TextField
               value={this.state.password}
               onChange={this.handleChangePassword("password")}
              margin="dense"
              id="passw"
              label="Contraseña"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.login} color="primary">
              Autenticar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Page;
