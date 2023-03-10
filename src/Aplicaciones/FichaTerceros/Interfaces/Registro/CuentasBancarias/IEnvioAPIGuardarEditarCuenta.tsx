export interface IEnvioAPIGuardarEditarCuenta {
    tcbId: number,
    tcbTercero: number,
    tcbEntidad: string,
    tcbTipo: number,
    tcbCuentaNo: string,
    tcbSwift: string,
    tcbAbba: string,
    tcbEmail: string,
    tcbContacto: string,
    tcbTelefono: string,
    tcbPagoNit: boolean,
    tcbActiva?:boolean,
    ruta: string
};