import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { ProspectoController } from './../controller/ProspectoController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', ProspectoController.getAll);

router.get('/c/:carrera/paginados/:page/:pageSize', ProspectoController.getByCarreraPaginado);

router.get('/paginados/:page/:pageSize', ProspectoController.getAllPaginado);

// Get one user
router.get('/:id_prospecto', ProspectoController.getById);

// Create a new user
router.post('/', ProspectoController.new);

// Edit user
router.patch('/:id_prospecto', ProspectoController.edit);

// Delete
router.delete('/:id_prospecto', ProspectoController.delete);

export default router;
