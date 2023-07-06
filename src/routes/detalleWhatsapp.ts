import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import DetalleMensajeController from '../controller/DetalleMensajeController';

const router = Router();

// Get all users
router.get('/', DetalleMensajeController.getAll);

// Get one user
router.get('/:id_wpp', DetalleMensajeController.getById);

// Create a new user
router.post('/', DetalleMensajeController.new);

// Edit user
router.patch('/:id_wpp', [checkJwt, checkRole(['ADMIN'])], DetalleMensajeController.edit);

// Delete
router.delete('/:id_wpp', DetalleMensajeController.delete);

export default router;
