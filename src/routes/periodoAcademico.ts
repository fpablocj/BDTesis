import { Router } from 'express';
import {PeriodoAcademicoController} from '../controller/PeriodoAcademicoController'
import { checkJwt } from '../middlewares/jwt';

const router = Router();

// Get all users
router.get('/',[checkJwt], PeriodoAcademicoController.getAll);

router.get('/:id_periodo',[checkJwt], PeriodoAcademicoController.getById);

router.get('/activo/:activo',[checkJwt], PeriodoAcademicoController.getByActivo);

// Create a new user
router.post('/',[checkJwt], PeriodoAcademicoController.new);

router.post('/activar/:id_periodo',[checkJwt], PeriodoAcademicoController.activarPeriodoAcademico);

// Edit user
router.patch('/:id_periodo',[checkJwt], PeriodoAcademicoController.edit);

// Delete
router.delete('/:id_periodo',[checkJwt], PeriodoAcademicoController.delete);

export default router;
