import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { ProspectoController } from './../controller/ProspectoController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/all/:periodo',[checkJwt], ProspectoController.getAll);

router.get('/carrera/:carrera/:periodo',[checkJwt], ProspectoController.getByCarrera);

//--------------CONTEO------------------------------------------------------------

router.get('/count/:periodo', [checkJwt], ProspectoController.getCount);

router.get('/count/estado/:periodo', [checkJwt], ProspectoController.getCountByEstado);

router.get('/count/carrera/:carrera/:periodo', [checkJwt], ProspectoController.getCountByCarrera);

router.get('/count/carrera-estado/:carrera/:periodo', [checkJwt], ProspectoController.getCountByCarreraAndEstado);

//-------------PAGINADO---------------------------------------------------------------------------

router.get('/carrera/:carrera/paginados/:page/:pageSize/:periodo',[checkJwt], ProspectoController.getByCarreraPaginado);

router.get('/carrera-estado/:carrera/:page/:pageSize/:periodo',[checkJwt], ProspectoController.getByCarreraPaginadoAndEstado);

router.get('/paginados/:page/:pageSize/:periodo',[checkJwt], ProspectoController.getAllPaginado);

router.get('/estado/:page/:pageSize/:periodo',[checkJwt], ProspectoController.getPaginadoByEstado);


// Get one user
router.get('/:id_prospecto',[checkJwt], ProspectoController.getById);

router.get('/cedula/:cedula',[checkJwt], ProspectoController.getByCedula);

// Create a new user
router.post('/', [checkJwt],ProspectoController.new);

// Edit user
router.patch('/:id_prospecto',[checkJwt], ProspectoController.edit);

// Delete
router.delete('/:id_prospecto',[checkJwt], ProspectoController.delete);

export default router;
