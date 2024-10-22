import {Pieza, IPieza} from '../models/piezasModel';
import {piezaMapper} from '../mappers/piezasMapper';
import { PiezasRepositoryInterface } from './piezasRepositoryInterface';

export class PiezasRepository implements PiezasRepositoryInterface {
    async getPiezaById(id: string): Promise<IPieza | null> {
        const pieza = await Pieza.findById(id);
        if (!pieza) {
            return null;
        }
        return piezaMapper.toDto(pieza);
    } 
    async getPiezasByCategoria(categoria: string, page: number, limit: number, orderBy: string): Promise<IPieza[]> {
        const sortOptions: { [key: string]: any } = {nombre: -1, precio: 1};
        const piezas = await Pieza.find({ categoria: new RegExp(categoria, 'i') }).sort({ [orderBy]: sortOptions[orderBy]}) .skip((page - 1) * limit).limit(limit);
        return piezas.map(piezaMapper.toDto);
    }

    async deletePiezaById(id: string): Promise<IPieza | null> {
        const pieza = await Pieza.findByIdAndDelete(id); 
        return pieza;
    }
    
    async existsByCodigo(codigo: string): Promise<boolean> {
        const pieza = await Pieza.findOne({ codigo });
        return !!pieza; 
    }

    async createPieza(id: string, producto:string, categoria:string, precio:number, descripcion:string, codigo:string, marca:string, stock:string, modelosVehiculos:string[]): Promise<IPieza> {
        const pieza = new Pieza({ producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos });
        await pieza.save();
        return piezaMapper.toDto(pieza);
    }
    async updatePieza(id: string, producto:string, categoria:string, precio:number, descripcion:string, codigo:string, marca:string, stock:string, modelosVehiculos:string[]): Promise<IPieza | null> {
        const piezaActualizada = await Pieza.findByIdAndUpdate(id, { producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos }, { new: true });
        return piezaActualizada ? piezaMapper.toDto(piezaActualizada) : null;
    }
    async updatePatchPieza(id: string, producto:string, categoria:string, precio:number, descripcion:string, codigo:string, marca:string, stock:string, modelosVehiculos:string[]): Promise<IPieza | null> {
        const piezaActualizada = await Pieza.findByIdAndUpdate(id, { producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos }, { new: true });
        return piezaActualizada ? piezaMapper.toDto(piezaActualizada) : null;
    }
    
}