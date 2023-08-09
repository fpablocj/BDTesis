import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import DetalleCorreoController from '../controller/DetalleCorreoController';

const router = Router();

// Get all users
router.get('/', DetalleCorreoController.getAll);

// Get one user
router.get('/:id_detalle', [checkJwt], DetalleCorreoController.getById);

router.get('/prospecto/:prospecto',[checkJwt], DetalleCorreoController.getByProspecto);

router.get('/correo/:correo',[checkJwt], DetalleCorreoController.getByCorreo);

// Create a new user
router.post('/',[checkJwt], DetalleCorreoController.new);

// Edit user
router.patch('/:id_detalle', [checkJwt, checkRole(['ADMIN'])], DetalleCorreoController.edit);

// Delete
router.delete('/:id_detalle',[checkJwt], DetalleCorreoController.delete);

export default router;
