
const ip_server ="http://172.17.0.67"
const puerto="3000"
const puerto_socket="4001"
 
const _http =`${ip_server}:${puerto}` 
export const _http_socket=`${ip_server}:${puerto_socket}` 

export const API_GET_CONIGURACIONES = _http + "/api/configuraciones/";
export const API_GET_PERIODO = _http + "/periodo/";
export const API_GET_MOTORIZADOS = _http + "/api/motorizados/";
export const API_GET_DISPATCHING = _http + "/despacho/";
export const API_POST_ASIGNAR_MOTORIZADO = _http + "/api/despachos/";
export const API_GET_DESPACHOS = _http + "/api/despachos/";
export const API_POST_ACTIVAR_MOTORIZADO = _http + "/api/motorizados/";
export const API_POST_EN_CAMINO_MOTORIZADO = _http + "/api/encamino/";
export const API_POST_SECUENCIAL = _http + "/api/secuencial/";
export const API_POST_CLAVE_ACCESO = _http + "/api/claveacceso/";
export const API_POST_ENTREGADO = _http + "/api/entregado/";
export const API_GET_IMPRIMIR_FACTURA = _http + "/api/impresion/";
export const API_GET_LOGIN = _http + "/api/usuarios/";
export const API_POST_ANULACION = _http + "/api/anulacion/";
export const API_POST_NOTACREDITO = _http + "/api/notacredito/";
export const API_POST_QUITAR_ASIGNACION = _http + "/api/quitarasignacion/";
export const API_GET_ESTADO_FACTURA = _http + "/api/app/";
export const API_POST_INSERTAR_AUDITORIA= _http + "/api/app/";

export const API_POST_OBTENER_TOKEN_AGREGADOR=    "https://backend.kfc.com.ec/api/authenticate/administrator/";
export const API_POST_INSERTA_AUDITORIA_KFC=    "https://backend.kfc.com.ec/api/authenticate/administrator/";
export const API_POST_ACTUALIZA_ESTADO_AGREGADORES= "https://backend.kfc.com.ec/api/authenticate/administrator/";
export const API_GET_ID_BRING= _http + "/api/bring/";
export const API_POST_NOTIFICA_BRINGG= "https://admin-api.bringg.com/services/kmae04kd/194b9110-a5ce-4e41-b3b2-f39c6fc9f85d/d2e8346a-a376-408d-a6f4-c335ad9ade33/";
 


// http://172.17.0.67:3000/api/periodo/60
