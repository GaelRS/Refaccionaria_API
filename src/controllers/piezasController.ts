import { Request, Response } from "express";
import { PiezasService } from "../services/piezasService";
import { CodigoExistente } from "../exceptions/codigoExistente";

export class PiezasController {
    private piezasService: PiezasService;

    constructor(piezasService: PiezasService) {
        this.piezasService = piezasService;
    }
    
    async getPiezaById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const pieza = await this.piezasService.getPiezaById(id);
            if (pieza) {
                res.status(200).json(pieza);
            } else {
                res.status(404).json({ error: "Pieza no encontrada" });
            }
        } catch (error) {
            console.error("Error al obtener la pieza:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async getPiezasByCategoria(req: Request, res: Response): Promise<void> {
        const { categoria } = req.params;
        const { page, limit, orderBy } = req.query;

        try {
            const piezas = await this.piezasService.getPiezasByCategoria(categoria, parseInt(page as string), parseInt(limit as string), orderBy as string);
            if (piezas.length > 0) {
                res.status(200).json(piezas);
            } else {
                res.status(404).json({ error: "Categoría no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async deletePiezaById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const pieza = await this.piezasService.deletePiezaById(id);
            if (pieza) {
                res.status(204).send(); 
            } else {
                res.status(404).json({ error: "Pieza a eliminar no encontrada" }); 
            }
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    

    async createPieza(req: Request, res: Response) {
        const nuevaPieza = req.body; 
        try {
            const { id, producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos } = nuevaPieza;
            const pieza = await this.piezasService.createPieza(id, producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos);
            res.status(201).json(pieza);
        } catch (error) {
            if (error instanceof CodigoExistente) { 
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    }   
     

    async updatePieza(req: Request, res: Response) {
        const { id } = req.params;
        const updatedData = req.body; 

        try {
            const { producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos } = updatedData;
            const piezaActualizada = await this.piezasService.updatePieza(id, producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos);
            if (piezaActualizada) {
                res.status(200).json(piezaActualizada);
            } else {
                res.status(404).json({ error: "Pieza no encontrada" });
            }
        } catch (error) {
            if (error instanceof CodigoExistente) { 
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    }

    async updatePatchPieza(req: Request, res: Response) {
        const { id } = req.params;
        const updatedFields = req.body; 

        try {
            const { producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos } = updatedFields;
            const piezaActualizada = await this.piezasService.updatePatchPieza(id, producto, categoria, precio, descripcion, codigo, marca, stock, modelosVehiculos);
            if (piezaActualizada) {
                res.status(200).json(piezaActualizada);
            } else {
                res.status(404).json({ error: "Pieza no encontrada" });
            }
        } catch (error) {
            if (error instanceof CodigoExistente) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    }
}
