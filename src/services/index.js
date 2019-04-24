import axios from "axios";
import {
  API_GET_MOTORIZADOS,
  API_GET_PERIODO,
  API_POST_INSERTAR_AUDITORIA,
  API_GET_ESTADO_FACTURA,
  API_GET_DESPACHOS,
  API_GET_CONIGURACIONES,
  API_POST_OBTENER_TOKEN_AGREGADOR,
  API_POST_INSERTA_AUDITORIA_KFC,
  API_POST_ACTUALIZA_ESTADO_AGREGADORES,
  API_GET_ID_BRING,
  API_POST_NOTIFICA_BRINGG
} from "../Constants/";

export default class {
  catchError(error) {
    switch (error.response.status) {
      case 500:
        throw new Error("Error iterno en el servidor.");
      // break;
      case 422:
        switch (error.response.data.code) {
          case 123:
            throw new Error("Credenciales incorrectas.");
          // break;
          default:
            throw new Error("Codigo de error de datos no especificado.");
          // break;
        }
      // break;
      default:
        throw new Error("Codigo de error de servidor no especificado.");
      // break;
    }
  }

  obtenerJsonMotorizados(rst_id) {
    return axios
      .get(`${API_GET_MOTORIZADOS}${rst_id}`)
      .then(response => response)
      .catch(error => error);
  }

  obtenerConfiguraciones() {
    var defaultConfig = {
      tiempoEspera: 5,
      tiempoRetorno: 5,
      solicitaCredencialRetorno: "1",
      tiempoLecturaDespacho: "3000",
      tiempoLecturaMotorizado: "5000"
    };

    return axios
      .get(`${API_GET_CONIGURACIONES}${localStorage.getItem("rst_id")}`)
      .then(configuraciones => {
        localStorage.setItem("configuraciones",JSON.stringify(configuraciones.data[0]));
      })
      .catch(error => {
        console.log("Ocurrio un problema al leer las configuraciones",error);
        localStorage.setItem("configuraciones", JSON.stringify(defaultConfig));
      });
  }

  ObtenerWsPeriodo() {
    return axios
      .get(`${API_GET_PERIODO}${localStorage.getItem("rst_id")}`)
      .then(response => response)
      .catch(error => error);
  }

  ObtenerWsDespachos() {
    return axios
      .get(`${API_GET_DESPACHOS}${localStorage.getItem("rst_id")}`)
      .then(response => response)
      .catch(error => error);
  }

  wsGetEstadoFactura(codigoFactura) {
    return axios
      .get(`${API_GET_ESTADO_FACTURA}${codigoFactura}`)
      .then(response => response)
      .catch(error => error);
  }

  wsPosInsertaAuditoria(url, peticion, estado, mensaje) {
    var parametros = {
      url,
      peticion,
      estado,
      mensaje
    };

    console.log("Guarda auditoria: ", JSON.stringify(parametros));

    return axios
      .post(API_POST_INSERTAR_AUDITORIA, parametros)
      .then(response => response)
      .catch(error => error);
  }

  wsGetTockenAgregador() {
    var parametros = {
      username: "kfc-superadmin",
      password: 'xTf*WHgz>M869qT"E~R?8y$2,'
    };

    return axios
      .post(API_POST_OBTENER_TOKEN_AGREGADOR, parametros)
      .then(response => {
        if (response.data.token !== undefined) {
          this.wsPosInsertaAuditoria(
            API_POST_INSERTA_AUDITORIA_KFC,
            `username=kfc-superadmin, password=xTf*WHgz>M869qT"E~R?8y$2,`,
            response.data.status,
            response.data.token
          );
        } else {
          this.wsPosInsertaAuditoria(
            API_POST_INSERTA_AUDITORIA_KFC,
            `username=kfc-superadmin, password=xTf*WHgz>M869qT"E~R?8y$2,`,
            response.data.code,
            response.data.message
          );
        }

        return response;
      })
      .catch(error => error);
  }

  wsPatchActualizarAgregador(token, parametros) {
    var config = {
      headers: { Authorization: "Bearer " + token }
    };

    return axios
      .post(API_POST_ACTUALIZA_ESTADO_AGREGADORES, parametros, config)
      .then(response => response)
      .catch(error => error);
  }



  wsGetIdBring(codigoFactura) {
    return axios
      .get(`${API_GET_ID_BRING}${codigoFactura}`)
      .then(response => response)
      .catch(error => error);
  }

  wsNotificaBringg(parametro) {
    return axios
      .post(API_POST_NOTIFICA_BRINGG , parametro)
      .then(response => response)
      .catch(error => error);
  }

}
