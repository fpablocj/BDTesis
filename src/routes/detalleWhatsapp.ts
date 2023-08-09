import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import DetalleMensajeController from '../controller/DetalleMensajeController';

const router = Router();

// Get all users
router.get('/', [checkJwt],DetalleMensajeController.getAll);

// Get one user
router.get('/:id_wpp',[checkJwt], DetalleMensajeController.getById);

router.get('/prospecto/:prospecto', [checkJwt],DetalleMensajeController.getByProspecto);

router.get('/mensaje/:whatsapp',[checkJwt],DetalleMensajeController.getByWhatsapp);

// Create a new user
router.post('/',[checkJwt], DetalleMensajeController.new);

// Edit user
router.patch('/:id_wpp', [checkJwt, checkRole(['ADMIN'])], DetalleMensajeController.edit);

// Delete
router.delete('/:id_wpp',[checkJwt], DetalleMensajeController.delete);

export default router;
