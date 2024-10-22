import { ICliente } from "../models/clientesModel";

export interface ClientesRepositoryInterface {
    getClienteById(id: string): Promise<ICliente | null>;
    deleteClienteById(id: string): Promise<ICliente | null>;
    existsByCorreo(correo: string): Promise<boolean>;
    createCliente(nombre:string, correo:string, telefono:string, productosComprados:string[]): Promise<ICliente>;
    updateCliente(id: string, nombre:string, correo:string, telefono:string, productosComprados:string[]): Promise<ICliente | null>;
    updatePatchCliente(id: string, nombre:string, correo:string, telefono:string, productosComprados:string[]): Promise<ICliente | null>;
}