import { Request, Response } from 'express';
import { PiezasService } from '../services/piezasService'; 
import { ClientesService } from '../services/clientesService';
import { CorreoExistente } from '../exceptions/correoExistente';
import { PiezaInvalida } from '../exceptions/piezaInvalida';

export class ClientesController {
    private clientesService: ClientesService; 
    private piezasService: PiezasService; 

    constructor(piezasService: PiezasService) {
        this.piezasService = piezasService; 
        this.clientesService = new ClientesService(this.piezasService);
    }

    async getClienteById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const clienteConProductos = await this.clientesService.getClienteById(id);
            if (clienteConProductos) {
                res.status(200).json(clienteConProductos);
            } else {
                res.status(404).json({ error: "Cliente no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    
    
    async deleteClienteById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const cliente = await this.clientesService.deleteClienteById(id);
            if (cliente) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Cliente a eliminar no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }


    async createCliente(req: Request, res: Response) {
        const nuevoCliente = req.body; 
        try {
            const { nombre, correo, telefono, productosComprados } = nuevoCliente;
            const cliente = await this.clientesService.createCliente(nombre, correo, telefono, productosComprados);
            res.status(201).json(cliente);
        } catch (error) {
            if (error instanceof PiezaInvalida) { 
                res.status(400).json({ error: error.message });
            } else if (error instanceof CorreoExistente) {
                res.status(400).json({ error: error.message }); 
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    }
    

    async updateCliente(req: Request, res: Response) {
        const { id } = req.params;
        const updatedData = req.body; 
    
        try {
            const { nombre, correo, telefono, productosComprados } = updatedData;
            const clienteActualizado = await this.clientesService.updateCliente(id, nombre, correo, telefono, productosComprados);
            if (clienteActualizado) {
                res.status(200).json(clienteActualizado);
            } else {
                res.status(404).json({ error: "Cliente no encontrado" });
            }
        } catch (error) {
            if (error instanceof PiezaInvalida) { 
                res.status(400).json({ error: error.message });
            } else if (error instanceof CorreoExistente) {
                res.status(400).json({ error: error.message }); 
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    }

    async updatePatchCliente(req: Request, res: Response) {
        const { id } = req.params;
        const campos = req.body; 
    
        try {
            const { nombre, correo, telefono, productosComprados } = campos;
            const clienteActualizado = await this.clientesService.updatePatchCliente(id, nombre, correo, telefono, productosComprados);
            if (clienteActualizado) {
                res.status(200).json(clienteActualizado);
            } else {
                res.status(404).json({ error: "Cliente no encontrado" });
            }
        } catch (error) {
            if (error instanceof PiezaInvalida) { 
                res.status(400).json({ error: error.message });
            } else if (error instanceof CorreoExistente) {
                res.status(400).json({ error: error.message }); 
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    } 
}
