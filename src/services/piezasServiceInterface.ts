import { IPieza } from "../models/piezasModel";

export interface piezasServiceInterface {
    getPiezaById(id: string): Promise<IPieza | null>;
    getPiezasByCategoria(categoria: string, page: number, limit: number, orderBy: string): Promise<IPieza[]>;
    deletePiezaById(id: string): Promise<boolean>;
    createPieza(producto:string, categoria:string, precio:number, descripcion:string, codigo:string, marca:string, stock:string, modelosVehiculos:string[]): Promise<IPieza>;
    updatePieza(id: string,producto:string, categoria:string, precio:number, descripcion:string, codigo:string, marca:string, stock:string, modelosVehiculos:string[]): Promise<IPieza | null>;
    updatePatchPieza(id: string, producto:string, categoria:string, precio:number, descripcion:string, codigo:string, marca:string, stock:string, modelosVehiculos:string[]): Promise<IPieza  | null>;
    existsByCodigo(codigo: string): Promise<boolean>;
}