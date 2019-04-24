import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
class Despacho extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    if (event.currentTarget.firstChild) {
      alert(event.currentTarget.firstChild.data);
      console.log(event.currentTarget.firstChild.data);
    }
    this.setState({ anchorEl: null });
  };

  dobleClickDespachos = param => {
    // alert(param);
    this.props.ObtenerDatoDespacho(param);

  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const options_menu = ["Asignar Motorizado", "imprimir", "Anular orden"];
    const ITEM_HEIGHT = 48;

    const {
      Cod_Factura,
      Nombres,
      Apellidos,
      Cod_AppMovil,
      Estado,
      Cod_ZipCode,
      Cod_Motorolo,
      CallCenter,
      tiempoEspera
    } = this.props.info;
    return (
      <tr onClick={() => this.dobleClickDespachos(Cod_Factura)}>
        <td>{Cod_Factura}</td>
        <td>
          {Nombres} {Apellidos}
        </td>
        <td>{Cod_AppMovil}</td>
        <td>{Estado}</td>
        <td>{Cod_ZipCode}</td>
        <td>{Cod_Motorolo}</td>
        <td>{tiempoEspera}</td>
        { <td>
          <div>
            <IconButton
              aria-label="More"
              aria-owns={open ? "long-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
            <MoreVertIcon />
            
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              {options_menu.map(op => (
                <MenuItem
                  key={op}
                  selected={op === "Pyxis"}
                  onClick={this.handleClose}
                >
                  {op}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </td> }
      </tr>
    );
  }
}

export default Despacho;
