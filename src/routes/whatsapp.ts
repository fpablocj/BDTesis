import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { MensajeController } from './../controller/MensajeController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/',[checkJwt], MensajeController.getAll);

// Get one user
router.get('/:id_wpp', [checkJwt],MensajeController.getById);

router.get('/user/:user',[checkJwt], MensajeController.getByUser);

// Create a new user
router.post('/', [checkJwt],MensajeController.new);

// Edit user
router.patch('/:id_wpp', [checkJwt, checkRole(['ADMIN'])], MensajeController.edit);

// Delete
router.delete('/:id_wpp',[checkJwt], MensajeController.delete);

export default router;
