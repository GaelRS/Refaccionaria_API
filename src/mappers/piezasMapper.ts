import { IPieza, Pieza } from '../models/piezasModel';

export const piezaMapper = {
    toDto: (pieza: IPieza) => ({
        id: pieza._id,
        producto: pieza.producto,
        categoria: pieza.categoria,
        precio: pieza.precio,
        descripcion: pieza.descripcion,
        codigo: pieza.codigo,
        marca: pieza.marca,
        stock: pieza.stock,
        modelosVehiculos: pieza.modelosVehiculos
    }),
    
    fromDto: (data: IPieza) => new Pieza({
        producto: data.producto,
        categoria: data.categoria,
        precio: data.precio,
        descripcion: data.descripcion,
        codigo: data.codigo,
        marca: data.marca,
        stock: data.stock,
        modelosVehiculos: data.modelosVehiculos
    })
};
