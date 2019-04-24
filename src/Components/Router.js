import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import axios from "axios";

// import socketIOClient from "socket.io-client";
import iziToast from "izitoast";
import Swal from "sweetalert2";

import Motorizados from "./Motorizados";
import MUIDatatables from "./MUIDatatables/index.js";
import Header from "./Header";
import DetallesDespacho from "./DetallesDespacho";
import Anulacion from "./Anulacion/index";
import CardTab from "./Card/index";

import ReactToPrint from "react-to-print";
import ImpresionFactura from "./ImpresionFactura/index";
import { Modal, Button } from "react-bootstrap";

import {
  API_GET_DISPATCHING,
  API_GET_MOTORIZADOS,
  API_POST_ACTIVAR_MOTORIZADO,
  API_GET_LOGIN,
  API_POST_ANULACION,
  API_POST_NOTACREDITO,
  API_POST_QUITAR_ASIGNACION,
  API_POST_CLAVE_ACCESO,
  API_GET_IMPRIMIR_FACTURA,
  _http_socket
} from "../Constants";

import ActivarMotorizado from "./ActivarMotorizado";
import "../Css/Estilos.css";
import Login from "./Login";
import Api from "../services/index";

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smShow: false,
      lgShow: false,
      JsonDespachos: [],
      JsonMorolos: [],
      jsonInfoPeriodo: [],
      response: false,
      endpoint: _http_socket,
      _state_CodigoFactura: "",
      detalllesDespacho: [],
      modalLogin: false,
      modalAnulacion: false,
      htmlDocumento: "<center>Sin datos</center>",
      smModalError: false,
      counter: null,
      number: 1
    };
  }

  componentDidMount() {
    let search;
    let params;
    let foo;
    if (
      !localStorage.getItem("rst_id") ||
      localStorage.getItem("rst_id") === "null"
    ) {
      search = window.location.search;
      params = new URLSearchParams(search);
      foo = params.get("rst_id");
      localStorage.setItem("rst_id", foo);
    }

    const api = new Api();
    api.obtenerConfiguraciones()
    this.ObtenerWsPeriodo();
    this.getDespachos();
    this.obtenerJsonMotorizados();

    localStorage.setItem("current_invoice", "");
    var tiempoLecturaDespacho = parseInt(JSON.parse(localStorage.getItem('configuraciones')).tiempoLecturaDespacho)
    var tiempoLecturaMotorizado = parseInt(JSON.parse(localStorage.getItem('configuraciones')).tiempoLecturaMotorizado)

    if (localStorage.getItem("rst_id") !== "null") {
      this.interval = setInterval(() => {
        this.obtenerJsonMotorizados();
      }, tiempoLecturaMotorizado);

      this.interval = setInterval(() => {
        this.getDespachos();
      }, tiempoLecturaDespacho);

      // const { endpoint } = this.state;
      // const socket = socketIOClient(endpoint);
      // socket.on("Mesa", resultado => {
      //   console.log("Resultado ", resultado);
      //   this.setState({ JsonDespachos: resultado });
      // });
    } else {
      iziToast.error({
        title: "Error:",
        message: "Ocurrió un error al cargar los datos.",
        timeout: 2500,
        resetOnHover: true,
        icon: "material-icons",
        transitionIn: "flipInX",
        transitionOut: "flipOutX",
        position: "topRight"
      });
    }
  }

  getDespachos = () => {
    const api = new Api();
    api.ObtenerWsDespachos().then(response => {
      if (response.data.status === undefined) {
        this.setState({ JsonDespachos: response.data });
        console.log("Despachos : ", this.state.JsonDespachos)
      }
    });
  };

  ObtenerWsPeriodo = () => {
    const api = new Api();
    api.ObtenerWsPeriodo().then(response => {
      if (response.data.estado !== 1) {
        if (response.data.estado === 3) {
          this.setState({
            smModalError: true
          });
        } else {
          Swal.fire({
            title: response.data.mensaje,
            animation: true,
            customClass: {
              popup: "animated tada"
            }
          });
        }
      }

      this.setState({
        jsonInfoPeriodo: response.data
      });
    });
  };

  ObtenerDatoDespachos = parametro => {
    axios.get(`${API_GET_DISPATCHING}${parametro}`).then(response => {
      this.setState({
        detalllesDespacho: response.data
      });
    });
  };

  asignarMotorizado = (codigo, accion) => {
    var parametros = {
      accion: accion, // A: activar , D: desactivar
      codigo_restaurante: localStorage.getItem("rst_id"),
      codigo_tarjeta: codigo
    };

    axios
      .post(`${API_POST_ACTIVAR_MOTORIZADO}`, parametros)
      .then(response => {
        if (response.data.status !== "200") {
          this.obtenerJsonMotorizados();
          iziToast.success({
            title: "Éxito: ",
            message: "Acción exitosa",
            timeout: 1500,
            resetOnHover: true,
            icon: "material-icons",
            transitionIn: "flipInX",
            transitionOut: "flipOutX",
            position: "topRight"
          });
        } else {
          iziToast.error({
            title: "Error: ",
            message: "Ocurrió un problema.",
            timeout: 1500,
            resetOnHover: true,
            icon: "material-icons",
            transitionIn: "flipInX",
            transitionOut: "flipOutX",
            position: "topRight"
          });
        }
      })
      .catch(error => {
        Swal.showValidationMessage(`Mensaje: ${error}`);
      });
  };

  obtenerJsonMotorizados = () => {
    axios
      .get(`${API_GET_MOTORIZADOS}${localStorage.getItem("rst_id")}`)
      .then(response => {
        // console.log("Obteniendo motorizados" , response.data)
        if (response.data.status === undefined) {
          this.setState({
            JsonMorolos: response.data
          });
        }

      });
  };

  funcionDesdeDespachos = parametro => {
    alert("Funcion desde despachos." + parametro);
  };

  pasarParametro = codigoFactura => {
    this.ObtenerDatoDespachos(codigoFactura);
  };

  handleAfterPrint = () => {
    this.setState({
      smShow: false
    });
  };
  handleBeforePrint = () => console.log("before print!");
  renderContent = () => this.componentRef;
  renderTrigger = () => <Button>imprimir</Button>;

  setRef = ref => (this.componentRef = ref);

  fn_modalAnulacion = () => {
    this.setState({
      modalAnulacion: true
    });
  };

  quitarMotoroloDelDespacho = parametros => {
    axios
      .post(`${API_POST_QUITAR_ASIGNACION}`, parametros)
      .then(response => {
        if (response.data.status === "200") {
          this.obtenerJsonMotorizados();

          this.actualizaDispositivosYcargarDespachos(false);
          iziToast.success({
            title: "Éxito: ",
            message: "Motorizado Desasignado",
            timeout: 1500,
            resetOnHover: true,
            icon: "material-icons",
            transitionIn: "flipInX",
            transitionOut: "flipOutX",
            position: "topRight"
          });
        } else {
          iziToast.error({
            title: "Error: ",
            message: "Ocurrió un problema.",
            timeout: 1500,
            resetOnHover: true,
            icon: "material-icons",
            transitionIn: "flipInX",
            transitionOut: "flipOutX",
            position: "topRight"
          });
        }
      })
      .catch(error => {
        Swal.showValidationMessage(`Mensaje: ${error}`);
      });
  };

  fn_anularDespacho = parametros => {
    var estadoDespacho = localStorage.getItem("status_dispatching");
    var OPCION = "";
    var esnotaCredito = false;
    var notaCreditoReqiest = "";
    if (estadoDespacho === "Por Asignar" || estadoDespacho === "Asignado") {
      OPCION = API_POST_ANULACION;
    } else {
      OPCION = API_POST_NOTACREDITO;
      esnotaCredito = true;
    }




    axios
      .post(`${OPCION}`, parametros)
      .then(response => {
        if (response.data.status === "200") {
          this.obtenerJsonMotorizados();

          // response.data.Cod_Nota_Credito
          if (esnotaCredito) {
            parametros = {
              codigo_factura: response.data.Cod_Nota_Credito,
              tipo_comprobante: "N"
            };

            notaCreditoReqiest = response.data.Cod_Nota_Credito;

            axios
              .post(`${API_POST_CLAVE_ACCESO}`, parametros)
              .then(response => {
                if (response.data.status === "200") {
                  iziToast.success({
                    title: "Éxito: ",
                    message: "Despacho Anulado",
                    timeout: 1500,
                    resetOnHover: true,
                    icon: "material-icons",
                    transitionIn: "flipInX",
                    transitionOut: "flipOutX",
                    position: "topRight"
                  });

                  this.fn_CloseModalAnulacion();

                  axios
                    .get(`${API_GET_IMPRIMIR_FACTURA}${notaCreditoReqiest}/N`)
                    .then(response => {

                      this.setState({
                        htmlDocumento: response.data.html,
                        smShow: true
                      });
                      this.actualizaDispositivosYcargarDespachos(true);

                    });
                } else {
                  iziToast.error({
                    title: "Error: ",
                    message: "Ocurrió un problema.",
                    timeout: 1500,
                    resetOnHover: true,
                    icon: "material-icons",
                    transitionIn: "flipInX",
                    transitionOut: "flipOutX",
                    position: "topRight"
                  });
                }
              })
              .catch(error => {
                Swal.showValidationMessage(`Mensaje: ${error}`);
              });

            ///////////////////////////
          } else {


            iziToast.success({
              title: "Éxito: ",
              message: "Despacho Anulado",
              timeout: 1500,
              resetOnHover: true,
              icon: "material-icons",
              transitionIn: "flipInX",
              transitionOut: "flipOutX",
              position: "topRight"
            });

            this.fn_CloseModalAnulacion();
            this.actualizaDispositivosYcargarDespachos(false);
          }
        } else {
          iziToast.error({
            title: "Error: ",
            message: "Ocurrió un problema.",
            timeout: 1500,
            resetOnHover: true,
            icon: "material-icons",
            transitionIn: "flipInX",
            transitionOut: "flipOutX",
            position: "topRight"
          });
        }
      })
      .catch(error => {
        Swal.showValidationMessage(`Mensaje: ${error}`);
      });
  };

  actualizaDispositivosYcargarDespachos = (notificarBringg) => {
    const api = new Api();

    if (notificarBringg) {

      var objDespacho = this.state.JsonDespachos.find(unDespacho => {
        return unDespacho.Cod_Factura === localStorage.getItem("current_invoice")
      })

      // Notificar a bringg solo si el despacho es automatico.
      if (objDespacho.tipoAsignacion === "AUTOMATICA") {
        api.wsGetIdBring(localStorage.getItem("current_invoice"))
          .then(response => {
            if (response.data.status === "200") {
              if (response.data.idBringg !== "") {

                var parametro = {
                  id: response.data.idBringg
                }

                api.wsNotificaBringg(parametro).then(res => {


                  if (res.data.success) {
                    api.wsPosInsertaAuditoria(
                      "https://admin-api.bringg.com/services/kmae04kd/194b9110-a5ce-4e41-b3b2-f39c6fc9f85d/d2e8346a-a376-408d-a6f4-c335ad9ade33/",
                      `Cancelar Orden : ${localStorage.getItem("current_invoice")}`,
                      response.status,
                      response.data.success
                    );
                  } else {
                    api.wsPosInsertaAuditoria(
                      "https://admin-api.bringg.com/services/kmae04kd/194b9110-a5ce-4e41-b3b2-f39c6fc9f85d/d2e8346a-a376-408d-a6f4-c335ad9ade33/",
                      `Cancelar Orden : ${localStorage.getItem("current_invoice")}`,
                      response.status,
                      response.data
                    );
                  }


                })

              }

            }

          })
      } // fin verificacion si es automatica.


    }

    // Obtener el estado del despacho.
    api
      .wsGetEstadoFactura(localStorage.getItem("current_invoice")) // "K020F000413035"
      .then(response => {
        // alert( JSON.stringify(response) )

        // Verificar si regreso datos.
        if (response.data.length > 0) {
          // Verificar que el dato que halla devuelto sea diferente de -
          if (response.data[0].app !== "-") {
            var parametro = {
              order_id: response.data[0].app,
              status: response.data[0].estado
            };
            // obtener el Token del agregador.
            api.wsGetTockenAgregador().then(token => {
              // alert( JSON.stringify(token) )
              if (token.status === 200) {
                api
                  .wsPatchActualizarAgregador(token.data.token, parametro)
                  .then(response => {
                    // alert( JSON.stringify(response) )

                    if (response.status === 200) {
                      api.wsPosInsertaAuditoria(
                        "https://backend.kfc.com.ec/api/order/status/",
                        `order_id: ${parametro.order_id} , status=${
                        parametro.status
                        }`,
                        response.data.status,
                        response.data.message
                      );
                    } else {
                      api.wsPosInsertaAuditoria(
                        "https://backend.kfc.com.ec/api/order/status/",
                        `order_id: ${parametro.order_id} , status=${
                        parametro.status
                        }`,
                        response.response.data.code,
                        response.response.data.message
                      );
                    }
                  })
                  .catch(error => {
                    console.log("eror", JSON.stringify(error.response));
                  });
              }
            });
          } // fin de verificar que el dato devuelto sea diferente de '-'
        } // fin de verificador del estado del despacho
      })
      .catch(error => { });

    this.getDespachos();
  };

  fn_CloseModalAnulacion = () => {
    this.setState({
      modalAnulacion: false
    });
  };

  modalLogin = () => {
    this.setState({
      modalLogin: true
    });
  };

  abrirModalLogin = () => {
    this.setState({
      modalLogin: true
    });
  };

  closeModalLogin = () => {
    this.setState({
      modalLogin: false
    });
  };

  login = (usuario, password) => {
    axios
      .get(
        `${API_GET_LOGIN}${usuario}/${password}/${localStorage.getItem(
          "rst_id"
        )}`
      )
      .then(response => {
        if (response.data.estado !== "200") {
          localStorage.setItem("idUser", null);

          iziToast.error({
            title: "Error",
            message: "Credenciales Incorrectas."
          });
        } else {
          if (response.data.acceso === 1) {
            localStorage.setItem("idUser", response.data.idUser);
            this.setState({
              modalLogin: false
            });

            this.fn_modalAnulacion();
          } else {
            localStorage.setItem("idUser", null);
          }
        }
      });

    // this.setState({
    //   modalLogin:false
    // })
  };

  render() {
    let smClose = () => this.setState({ smShow: false });

    return (
      <BrowserRouter>
        <div className="container-fluid">
          <div className="row">
            <Header infoPeriodo={this.state.jsonInfoPeriodo} />
          </div>
          <div className="row cuadro">
            <div className="col-12 col-md-8">
              <MUIDatatables
                getDespachos={this.getDespachos}
                obtenerJsonMotorizados={this.obtenerJsonMotorizados}
                pasarParametro={this.pasarParametro}
                despachos={this.state.JsonDespachos}
                abrirModalLogin={this.abrirModalLogin}
                closeModalLogin={this.closeModalLogin}
                login={this.login}
                quitarMotoroloDelDespacho={this.quitarMotoroloDelDespacho}
              />
            </div>
            <div className="col-12 col-md-4 ">
              <ActivarMotorizado asignarMotorizado={this.asignarMotorizado}
                motorizados={this.state.JsonMorolos}
              />
              <div className="title-table"> Motorizados Activos </div>
              <Motorizados
                motorizados={this.state.JsonMorolos}
                asignarMotorizado={this.asignarMotorizado}
              />
              <div className="title-table"> Detalle de orden {localStorage.getItem("current_invoice")} </div>
              <DetallesDespacho
                detallesDespaho={this.state.detalllesDespacho}
                funcionDesdeDespachos={this.funcionDesdeDespachos}
                despacho={this.state._state_CodigoFactura}
              />
            </div>
          </div>
        </div>

        <Login
          modalLogin={this.state.modalLogin}
          closeModalLogin={this.closeModalLogin}
          login={this.login}
        />

        <Anulacion
          modalAnulacion={this.state.modalAnulacion}
          fn_CloseModalAnulacion={this.fn_CloseModalAnulacion}
          fn_anularDespacho={this.fn_anularDespacho}
        />
        <Modal
          size="sm"
          show={this.state.smShow}
          onHide={smClose}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <ReactToPrint
            trigger={this.renderTrigger}
            content={this.renderContent}
            onBeforePrint={this.handleBeforePrint}
            onAfterPrint={this.handleAfterPrint}
          />
          <ImpresionFactura
            datos={this.state.htmlDocumento}
            ref={this.setRef}
          />
        </Modal>

        <Modal
          size="sm"
          // show={this.state.smShow}
          show={this.state.smModalError}
          onHide={smClose}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <CardTab />
        </Modal>
      </BrowserRouter>
    );
  }
}

export default Router;
