import React, { Component } from "react";

import IconButton from "@material-ui/core/IconButton";
import NotInterested from "@material-ui/icons/NotInterested";
import iziToast from "izitoast";

class Motorizado extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deactivarMotorizado = codigo_motorizado => {
    var motololo = this.props.motorizados.find(obj => {
      return obj.Cod_Tarjeta === codigo_motorizado;
    });

    if (motololo.comandas === 0) {
      this.props.asignarMotorizado(codigo_motorizado, "D");
    } else {
      iziToast.error({
        title: "Error: ",
        message: "No se puede desactivar mientras tenga comandas activas",
        timeout: 1500,
        resetOnHover: true,
        icon: "material-icons",
        transitionIn: "flipInX",
        transitionOut: "flipOutX",
        position: "topRight"
      });
    }
  };

  render() {
    const {
      // Cod_Motorolo,
      Cod_Tarjeta,
      nombres,
      comandas,
      Telefono
    } = this.props.info;

    return (
      <tr>
        <td>{Cod_Tarjeta}</td>
        <td>{nombres}</td>
        <td>{comandas}</td>
        <td>{Telefono}</td>
        <td>
          <IconButton
            codigoFactura={Cod_Tarjeta}
            title="Desactivar motorizado"
            color="secondary"
            aria-label="Delete"
            onClick={e => {
              this.deactivarMotorizado(
                e.currentTarget.attributes.codigofactura.value
              );
            }}
          >
            <NotInterested fontSize="small" />
          </IconButton>
        </td>
      </tr>
    );
  }
}

export default Motorizado;
