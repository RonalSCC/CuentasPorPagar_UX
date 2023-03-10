import ISucursalCuentaBancaria from "./ISucursalCuentaBancaria";

export interface ICuentaBancaria {
    tcbId: number,
    tcbNumeroCuenta: string,
    tcbTercero:number,
    tcbEntidad: string,
    tcbEntidadId: string,
    tcbTipoCuenta: string,
    tcbTipoCuentaId: number,
    tcbSucursalPrincipal: string,
    tcbTelefono: string,
    tcbContacto: string,
    tcbCorreoElectronico: string,
    tcbPagoPorNit: boolean,
    tcbSwift: string,
    tcbAbbaIban: string,
    tcbPrincipal: boolean,
    tcbBloqueo: boolean,
    tcbEstadoMatriculaRiesgo: string,
    tcbEstadoMatriculaRiesgoDesc: string,
    tcbActiva: boolean,
    tcbListaSucursales: Array<ISucursalCuentaBancaria>
}