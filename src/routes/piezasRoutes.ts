import { RequestHandler, Router } from 'express';
import {PiezasController } from '../controllers/piezasController';
import { PiezasService } from '../services/piezasService';
import { PiezasRepository } from '../repositories/piezasRepository';


const router = Router();

const piezasRepository = new PiezasRepository();
const piezaService = new PiezasService(piezasRepository);
const piezasController = new PiezasController(piezaService);

router.get('/piezas/:id', piezasController.getPiezaById.bind(piezasController) as RequestHandler);
router.get('/piezas/categoria/:categoria', piezasController.getPiezasByCategoria.bind(piezasController) as RequestHandler);
router.delete('/piezas/delete/:id', piezasController.deletePiezaById.bind(piezasController));
router.post('/piezas', piezasController.createPieza.bind(piezasController));
router.put('/piezas/update/:id', piezasController.updatePieza.bind(piezasController));
router.patch('/piezas/updatePatch/:id', piezasController.updatePatchPieza.bind(piezasController));

export default router;
