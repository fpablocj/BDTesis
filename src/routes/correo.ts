import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { CorreoController } from './../controller/CorreoController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', [checkJwt], CorreoController.getAll);

// Get one user
router.get('/:id_correo', [checkJwt], CorreoController.getById);

router.get('/user/:user', [checkJwt], CorreoController.getByUser);

// Create a new user
router.post('/', CorreoController.new);

// Edit user
router.patch('/:id_correo', [checkJwt, checkRole(['admin'])], CorreoController.edit);

// Delete
router.delete('/:id_correo', [checkJwt], CorreoController.delete);

export default router;
