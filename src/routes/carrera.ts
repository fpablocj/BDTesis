import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { CarreraController } from './../controller/CarreraController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', CarreraController.getAll);

// Get one user
router.get('/:id_carrera', CarreraController.getById);

router.get('/nombre/:nombre', CarreraController.getByNombre);

// Create a new user
router.post('/', CarreraController.new);

// Edit user
router.patch('/:id_carrera', CarreraController.edit);

// Delete
router.delete('/:id_carrera', CarreraController.delete);

export default router;