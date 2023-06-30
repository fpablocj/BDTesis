import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { MensajeController } from './../controller/MensajeController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', MensajeController.getAll);

// Get one user
router.get('/:id_wpp', MensajeController.getById);

// Create a new user
router.post('/', [checkJwt, checkRole(['ADMIN'])], MensajeController.new);

// Edit user
router.patch('/:id_wpp', [checkJwt, checkRole(['admin'])], MensajeController.edit);

// Delete
router.delete('/:id_wpp', MensajeController.delete);

export default router;
