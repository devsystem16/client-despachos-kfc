import React, { Component } from "react";

import MUIDataTable from "mui-datatables";
import { createMuiTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import NotInterested from "@material-ui/icons/NotInterested";
import Print from "@material-ui/icons/Print";

// import Motorcycle from "@material-ui/icons/Motorcycle";

// import LinearProgress from "@material-ui/core/LinearProgress";
import Swal from "sweetalert2";

import axios from "axios";

import iziToast from "izitoast";
import "../../../node_modules/izitoast/dist/css/iziToast.css";

import { Button, Modal } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import ImpresionFactura from "../ImpresionFactura/index";
import Api from "../../services/index";
import IconoBoton from '../IconoBoton'
import {
  API_POST_ASIGNAR_MOTORIZADO,
  API_POST_EN_CAMINO_MOTORIZADO,
  API_POST_SECUENCIAL,
  API_POST_CLAVE_ACCESO,
  API_POST_ENTREGADO,
  API_GET_IMPRIMIR_FACTURA
} from "../../Constants";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlFactura: "",
      anchorEl: null,
      completed: 0,
      buffer: 10,

      smShow: false,
      lgShow: false
    };
  }

  closeModalLogin = () => {};
  login = () => {};

  abrirModalLogin() {
    this.props.abrirModalLogin();
  }

  quitarMotoroloDelDespacho = () => {
    var parametros = {
      codigo_restaurante: localStorage.getItem("rst_id"),
      codigo_factura: localStorage.getItem("current_invoice")
    };

    this.props.quitarMotoroloDelDespacho(parametros);
  };

  actualizaDispositivosYcargarDespachos = () => {
    const api = new Api();

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
      .catch(error => {});

    this.props.getDespachos();
  };

  // componentRef: ImpresionFactura;

  getMuiTheme = () =>
    createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "red"
          },
          paper: {
            boxShadow: "none"
          }
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "red"
          }
        }
      }
    });

  componentDidMount() {}

  handleClick = event => {
    this.setState({ anchorEl: Boolean(event.currentTarget) });
  };

  handleClose = event => {
    if (event.currentTarget.firstChild) {
      alert(event.currentTarget.firstChild.data);
      console.log(event.currentTarget.firstChild.data);
    }
    this.setState({ anchorEl: null });
  };

  getMuiTheme = () =>
    createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FF"
          }
        }
      }
    });

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // Despues de imprimir
  handleAfterPrint = () => {
    // alert('Si imprimio')

    this.setState({
      smShow: false
    });

    iziToast.success({
      title: "Imprimiendo: ",
      message: "",
      timeout: 1000,
      resetOnHover: true,
      icon: "material-icons",
      transitionIn: "flipInX",
      transitionOut: "flipOutX",
      position: "topRight"
    });
  };
  handleBeforePrint = () => console.log("before print!");
  renderContent = () => this.componentRef;
  renderTrigger = () => <Button onClick={this.cerrarmodal}>imprimir</Button>;

  setRef = ref => (this.componentRef = ref);

  render() {
    var json = this.props.despachos;
    var data_ = [];
    var fila = [];

    var pos_factura = 0;
    // var pos_cliente = 1;
    var pos_estado = 2;
    // var pos_zipCode = 3;
    // var pos_motorizado = 4;
    // var pos_t_espera = 5;
    // var pos_t_salida = 6;

    Object.values(json).forEach(item => {
      fila = [
        item.Cod_Factura,
        item.Nombres + " " + item.Apellidos,
        // item.Cod_AppMovil,
        item.Estado,
        item.Cod_ZipCode,
        item.nombreMotorizado,
        item.tiempoEspera,
        item.tiempoSalida
      ];
      data_.push(fila);
    });

    const columns = [
      {
        name: "Factura",
        options: {
          sort: false,
          filter: false
        }
      },
      {
        label: "Cliente",
        name: "Title",
        options: {
          sort: false,
          filter: false
        }
      },
      // {
      //   name: "C. App"
      // },
      {
        name: "Estado",
        options: {
          sort: false,
          filter: false
        }
      },
      {
        name: "Zip Code",
        options: {
          filter: true,
          sort: false
        }
      },

      {
        name: "Motorizado",
        options: {
          filter: true,
          sort: false
        }
      },
      {
        name: "T. Espera",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "T. Salida",
        options: {
          filter: false,
          sort: false
        }
      },

      {
        name: "",
        options: {
          // filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            var esManual = false;
            var botonMotorizado = "mostrar";
            var estadoDespacho = ""

            if (tableMeta.rowData !== undefined) {
              var current_factura = tableMeta.rowData[pos_factura];
                estadoDespacho =tableMeta.rowData[pos_estado]
 

              if (tableMeta.rowData[pos_estado] === "Asignado") {
                botonMotorizado = "mostrar";
              } else {
                botonMotorizado = "ocultar";
              }

              var jsonDatos = this.props.despachos;
              Object.values(jsonDatos).forEach(item => {
                if (item.Cod_Factura === current_factura) {
                  if (item.tipoAsignacion === "AUTOMATICA") {
                    esManual = true;
                  }
                }
              });
            }

            return (
              <div>
                <IconButton
                  title="Imprimir"
                  color="primary"
                  aria-label="Imprimir"
                  onClick={() => {
                    axios
                      .get(
                        `${API_GET_IMPRIMIR_FACTURA}${
                          tableMeta.rowData[pos_factura]
                        }/F`
                      )
                      .then(response => {
                        if (response.data.html === null) {
                          this.setState({
                            smShow: false
                          });

                          iziToast.warning({
                            title: "La orden " + tableMeta.rowData[pos_factura],
                            message: "Aún no se puede imprimir",
                            timeout: 2500,
                            resetOnHover: true,
                            icon: "material-icons",
                            transitionIn: "flipInX",
                            transitionOut: "flipOutX",
                            position: "topRight"
                          });
                        } else {
                          this.setState({
                            htmlFactura: response.data.html,
                            smShow: true
                          });
                        }
                      })
                      .catch(error => {
                        Swal.fire("Error", error, "error");
                      });
                  }}
                >
                  <Print fontSize="small" />
                </IconButton>

                <IconButton
                  disabled={esManual}
                  color="inherit"
                  title="Opciones motorizado"
                  aria-label="Delete"
                  onClick={() => {
                    switch (tableMeta.rowData[pos_estado]) {
                      case "Por Asignar":
                        Swal.fire({
                          title: "Ingrese el código del motorizado",
                          input: "number",
                          inputAttributes: {
                            autocapitalize: "off"
                          },
                          showCancelButton: true,
                          confirmButtonText: "Ok",
                          showLoaderOnConfirm: true,
                          preConfirm: login => {
                            var contenidoPost = {
                              codigo_restaurante: localStorage.getItem(
                                "rst_id"
                              ),
                              codigo_tarjeta: login,
                              codigo_factura: tableMeta.rowData[pos_factura]
                            };

                            return axios
                              .post(
                                `${API_POST_ASIGNAR_MOTORIZADO}`,
                                contenidoPost
                              )
                              .then(response => {
                                if (response.data.estado !== "200") {
                                  throw new Error(response.data.mensaje);
                                }
                                return response.data;
                              })
                              .catch(error => {
                                Swal.showValidationMessage(`Mensaje: ${error}`);
                              });
                          },
                          allowOutsideClick: () => !Swal.isLoading()
                        }).then(result => {
                          if (result.dismiss !== "cancel") {
                            console.log("case  : Pos Asignar ");
                            this.props.obtenerJsonMotorizados();
                            this.actualizaDispositivosYcargarDespachos();
                          }

                          if (result.value) {
                            Swal.fire(
                              "Asignado!",
                              "El motorizado se asignó al despacho con éxito.",
                              "success"
                            );
                          }
                        });
                        break;

                      case "Asignado": // next, en camino
                        var parametros = {
                          codigo_restaurante: localStorage.getItem("rst_id"),
                          codigo_factura: tableMeta.rowData[pos_factura]
                        };

                        Swal.fire({
                          title: "Colocar en camino?",
                          text:
                            "Desea que el pedido " +
                            tableMeta.rowData[pos_estado] +
                            " Se envíe en este momento",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Si, colocar"
                        }).then(result => {
                          if (result.value) {
                            // Consume ws colocar al motorolo en camino
                            axios
                              .post(
                                `${API_POST_EN_CAMINO_MOTORIZADO}`,
                                parametros
                              )
                              .then(response => {
                                if (response.data.status !== "200") {
                                  Swal.fire("Error", "error");
                                }

                                // consume ws para colocar el secuencial  a la factura.
                                axios
                                  .post(`${API_POST_SECUENCIAL}`, parametros)
                                  .then(response => {
                                    console.log(
                                      "WS API_POST_SECUENCIAL ",
                                      response.data
                                    );
                                    if (response.data.status !== "200") {
                                      Swal.fire("Error", "error");
                                    }

                                    parametros = {
                                      codigo_factura:
                                        tableMeta.rowData[pos_factura],
                                      tipo_comprobante: "F"
                                    };

                                    // Consume ws para generar clave de acceso a la factura.
                                    axios
                                      .post(
                                        `${API_POST_CLAVE_ACCESO}`,
                                        parametros
                                      )
                                      .then(response => {
                                        console.log("case  : Asignado ");
                                        this.actualizaDispositivosYcargarDespachos(); // ojo
                                        this.props.obtenerJsonMotorizados();

                                        console.log(
                                          "WS API_POST_CLAVE_ACCESO ",
                                          response.data
                                        );

                                        if (response.data.status !== "200") {
                                          Swal.fire("Error", "error");
                                        }

                                        // Swal.fire(
                                        //   "En camino!",
                                        //   "El motorizado esta en camino",
                                        //   "success"
                                        // );

                                        // iziToast.success({
                                        //   title: "Imprimiendo: ",
                                        //   message: "imprimiendo",
                                        //   timeout: 2000,
                                        //   resetOnHover: true,
                                        //   icon: "material-icons",
                                        //   transitionIn: "flipInX",
                                        //   transitionOut: "flipOutX",
                                        //   position: "topRight"
                                        // });
                                      })
                                      .catch(error => {
                                        Swal.fire("Error", error, "error");
                                      });
                                  })
                                  .catch(error => {
                                    Swal.fire("Error", error, "error");
                                  });

                                // Swal.fire(
                                //   "En camino!",
                                //   "El motorizado esta en camino",
                                //   "success"
                                // );
                              })
                              .catch(error => {
                                Swal.fire("Error", error, "error");
                              });
                          }
                        });
                        break;

                      case "En Camino":
                        parametros = {
                          codigo_restaurante: localStorage.getItem("rst_id"),
                          codigo_factura: tableMeta.rowData[pos_factura]
                        };

                        Swal.fire({
                          title: "¿Está entregado?",
                          text:
                            "¿Esta orden de despacho ya ha sido entregada al cliente?",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Sí, está entregada"
                        }).then(result => {
                          if (result.value) {
                            axios
                              .post(`${API_POST_ENTREGADO}`, parametros)
                              .then(response => {
                                if (response.data.status !== "200") {
                                  Swal.fire("Error", "error");
                                }
                                console.log("case  : En Camino ");
                                this.actualizaDispositivosYcargarDespachos(); // ojo
                                this.props.obtenerJsonMotorizados();

                                Swal.fire(
                                  "Correcto!",
                                  "El despacho ha sido entregado",
                                  "success"
                                );
                              })
                              .catch(error => {
                                Swal.fire("Error", error, "error");
                              });
                          }
                        });

                        break;

                      default:
                        break;
                    }
                  }}
                >
                <IconoBoton opcion={estadoDespacho}></IconoBoton>
               
                </IconButton>

                <IconButton
                  title="Anular Orden"
                  color="secondary"
                  aria-label="Delete"
                  onClick={() => {
                    var _this = this;

                    localStorage.setItem(
                      "current_invoice",
                      tableMeta.rowData[pos_factura]
                    );
                    localStorage.setItem(
                      "status_dispatching",
                      tableMeta.rowData[pos_estado]
                    );
                    iziToast.show({
                      timeout: 200000,
                      close: false,
                      overlay: true,
                      displayMode: "once",
                      id: "question",
                      zindex: 999,
                      title: "",
                      message: "Seleccione acción",
                      position: "center",
                      buttons: [
                        [
                          "<button><b>Anular Orden</b></button>",
                          function(instance, toast) {
                            instance.hide(
                              { transitionOut: "fadeOut" },
                              toast,
                              "button"
                            );

                            _this.abrirModalLogin();
                          },
                          true
                        ],

                        [
                          "<button class='" +
                            esManual +
                            " " +
                            botonMotorizado +
                            "'><b>Quitar Motorizado</b></button>",
                          function(instance, toast) {
                            instance.hide(
                              { transitionOut: "fadeOut" },
                              toast,
                              "button"
                            );

                            _this.quitarMotoroloDelDespacho();
                          }
                        ],
                        [
                          "<button>Cancelar </button>",
                          function(instance, toast) {
                            instance.hide(
                              { transitionOut: "fadeOut" },
                              toast,
                              "button"
                            );
                          }
                        ]
                      ],
                      onClosing: function(instance, toast, closedBy) {
                        console.info("Closing | closedBy: " + closedBy);
                      },
                      onClosed: function(instance, toast, closedBy) {
                        console.info("Closed | closedBy: " + closedBy);
                      }
                    });
                  }}
                >
                  <NotInterested fontSize="small" />
                </IconButton>
              </div>
            );
          }
        }
      }
    ];

    const data = data_;

    const options = {
      download: false,
      print: false,
      filter: false,
      responsive: "scroll", // stacked
      selectableRows: true,
      filterType: "dropdown",
      // responsive: "scroll",
      rowsPerPage: 100,

      setRowProps: row => {
        var minutes = 0;
        if (row[5] !== undefined) {
            minutes = parseInt(row[5].replace(" min", ""));
        }

        var factura = row[0];

        var minutosEspera = parseInt(JSON.parse(localStorage.getItem('configuraciones')).tiempoEspera)

        

        if (minutes >= minutosEspera) {
          if (localStorage.getItem("current_invoice") === factura) {
            return {
              style: { backgroundColor: "rgb(255, 117, 141)" }
            };
          } else {
            return {
              style: { backgroundColor: "pink" } // rgb(223, 237, 247)
            };
          }
        } else {
          if (localStorage.getItem("current_invoice") === factura) {
            return {
              style: { backgroundColor: "rgb(223, 244, 237)" }
            };
          }
        }
      },

      body: {
        noMatch: "ningun",
        toolTip: "Sort"
      },
      textLabels: {
        body: {
          noMatch: "Ningún despacho encontrado de momento...",
          toolTip: "Sort"
        },
        pagination: {
          next: "Sigiente",
          previous: "Anterior",
          rowsPerPage: "Filas por página:",
          displayRows: "of"
        },
        toolbar: {
          search: "Buscar",
          downloadCsv: "Download CSV",
          print: "Print",
          viewColumns: "View Columns",
          filterTable: "Filter Table"
        },
        filter: {
          all: "TODOS",
          title: "FILTROS",
          reset: "RESETEAR"
        },
        viewColumns: {
          title: "Mostrar Columnas",
          titleAria: "Show/Hide Table Columns"
        }
      },

      onRowClick: (rowData, rowState) => {
        localStorage.setItem("current_invoice", rowData[0]);
        this.props.pasarParametro(rowData[0]);
      },
      isRowSelectable: dataIndex => {
        //prevents selection of row with title "Attorney"
        // console.log("mm: " , data[dataIndex]);
        return data[dataIndex][3] !== "Attorney";
      }
    };

    let smClose = () => this.setState({ smShow: false });

    return (
      <div>
        <MUIDataTable
          title={"Ordenes"}
          data={data}
          columns={columns}
          options={options}
          theme={this.getMuiTheme()}
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
          <ImpresionFactura datos={this.state.htmlFactura} ref={this.setRef} />
        </Modal>
      </div>
    );
  }
}

export default Page;
