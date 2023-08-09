import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { ProspectoController } from './../controller/ProspectoController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/',[checkJwt], ProspectoController.getAll);

router.get('/carrera/:carrera/paginados/:page/:pageSize',[checkJwt], ProspectoController.getByCarreraPaginado);

router.get('/carrera-estado/:carrera/paginados/:page/:pageSize',[checkJwt], ProspectoController.getByCarreraPaginadoAndEstado);

router.get('/carrera/:carrera',[checkJwt], ProspectoController.getByCarrera);

router.get('/paginados/:page/:pageSize',[checkJwt], ProspectoController.getAllPaginado);

router.get('/estado/:page/:pageSize',[checkJwt], ProspectoController.getPaginadoByEstado);

router.get('/periodo/:page/:pageSize',[checkJwt], ProspectoController.getPaginadoByPeriodo);

// Get one user
router.get('/:id_prospecto',[checkJwt], ProspectoController.getById);

// Create a new user
router.post('/', [checkJwt],ProspectoController.new);

// Edit user
router.patch('/:id_prospecto',[checkJwt], ProspectoController.edit);

// Delete
router.delete('/:id_prospecto',[checkJwt], ProspectoController.delete);

export default router;
