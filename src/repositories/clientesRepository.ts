
import { clienteMapper } from '../mappers/clientesMapper';
import { Cliente, ICliente } from '../models/clientesModel';
import { ClientesRepositoryInterface } from './clientesRepositoryInterface';

export class ClientesRepository implements ClientesRepositoryInterface {
    async getClienteById(id: string): Promise<ICliente | null> {
        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return null;
        }
        return clienteMapper.toDto(cliente);
    } 
    async deleteClienteById(id: string): Promise<ICliente | null> {
        return Cliente.findByIdAndDelete(id);
    }
    async existsByCorreo(correo: string): Promise<boolean> {
        const cliente = await Cliente.findOne({ correo });
        return !!cliente; 
    }
    async createCliente(nombre:string, correo:string, telefono:string, productosComprados:string[]): Promise<ICliente> {
        const cliente = new Cliente({nombre, correo, telefono, productosComprados});
        await cliente.save();
        return clienteMapper.toDto(cliente);
    }
    async updateCliente(id: string,nombre:string, correo:string, telefono:string, productosComprados:string[]): Promise<ICliente | null> {
        const clienteActualizado = await Cliente.findByIdAndUpdate(id,{nombre, correo, telefono, productosComprados}, { new: true });
        return clienteActualizado ? clienteMapper.toDto(clienteActualizado) : null;
    }
    async updatePatchCliente(id: string,nombre:string, correo:string, telefono:string, productosComprados:string[]): Promise<ICliente | null> {
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, {nombre, correo, telefono, productosComprados }, { new: true });
        return clienteActualizado ? clienteMapper.toDto(clienteActualizado) : null;
    }
}