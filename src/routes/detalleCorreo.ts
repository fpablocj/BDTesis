import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import DetalleCorreoController from '../controller/DetalleCorreoController';

const router = Router();

// Get all users
router.get('/', DetalleCorreoController.getAll);

// Get one user
router.get('/:id_detalle', DetalleCorreoController.getById);

// Create a new user
router.post('/', DetalleCorreoController.new);

// Edit user
router.patch('/:id_detalle', [checkJwt, checkRole(['ADMIN'])], DetalleCorreoController.edit);

// Delete
router.delete('/:id_detalle', DetalleCorreoController.delete);

export default router;
