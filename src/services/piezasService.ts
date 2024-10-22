import { PiezasRepository } from '../repositories/piezasRepository';
import { CodigoExistente } from '../exceptions/codigoExistente'; 
import { redisClient } from '../config/redis'; 

export class PiezasService {

    private piezasRepository: PiezasRepository;

    constructor(piezasRepository: PiezasRepository) {
        this.piezasRepository = piezasRepository;
    }

    async getPiezaById(id: string) {
        const Key = `pieza:${id}`;
        const Pieza = await redisClient.get(Key);

        if (Pieza) {
            return JSON.parse(Pieza);
        }

        const pieza = await this.piezasRepository.getPiezaById(id);
        if (pieza) {
            await redisClient.set(Key, JSON.stringify(pieza), { EX: 3600 });
        }
        return pieza;
    }

    async getPiezasByCategoria(categoria: string, page: number, limit: number, orderBy: string) {
        const Key = `piezas:categoria:${categoria}:page:${page}:limit:${limit}`;
        const Piezas = await redisClient.get(Key);

        if (Piezas) {
            return JSON.parse(Piezas);
        }

        const piezas = await this.piezasRepository.getPiezasByCategoria(categoria, page, limit, orderBy);
        if (piezas.length > 0) {
            await redisClient.set(Key, JSON.stringify(piezas), { EX: 3600 });
        }
        return piezas;
    }

    async deletePiezaById(id: string): Promise<boolean> {
        const piezaEliminada = await this.piezasRepository.deletePiezaById(id);
        return piezaEliminada !== null; 
    }
    

    async createPieza(id: string, producto:string, categoria:string, precio:number, descripcion:string, codigo:string, marca:string, stock:string, modelosVehiculos:string[]) {
        const existe = await this.piezasRepository.existsByCodigo(codigo);
        if (existe) {
            throw new CodigoExistente("El código ya existe"); 
        }
        return this.piezasRepository.createPieza(id, producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos);
    }

    async updatePieza(id: string, producto:string, categoria:string, precio:number, descripcion:string, codigo:string, marca:string, stock:string, modelosVehiculos:string[]) {
        const existe = await this.piezasRepository.existsByCodigo(codigo);
        if (existe) {
            throw new CodigoExistente("El código ya existe");
        }
        return this.piezasRepository.updatePieza(id, producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos);
    }

    async updatePatchPieza(id: string, producto:string, categoria:string, precio:number, descripcion:string, codigo:string, marca:string, stock:string, modelosVehiculos:string[]) {
        const existe = await this.piezasRepository.existsByCodigo(codigo);
        if (existe) {
            throw new CodigoExistente("El código ya existe");
        }
        return this.piezasRepository.updatePatchPieza(id, producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos);
    }
}
