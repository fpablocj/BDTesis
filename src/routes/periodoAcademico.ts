import { Router } from 'express';
import {PeriodoAcademicoController} from '../controller/PeriodoAcademicoController'

const router = Router();

// Get all users
router.get('/', PeriodoAcademicoController.getAll);

router.get('/:id_periodo', PeriodoAcademicoController.getById);

router.get('/activo/:activo', PeriodoAcademicoController.getByActivo);

// Create a new user
router.post('/', PeriodoAcademicoController.new);

router.post('/activar/:id_periodo', PeriodoAcademicoController.activarPeriodoAcademico);

// Edit user
router.patch('/:id_periodo', PeriodoAcademicoController.edit);

// Delete
router.delete('/:id_periodo', PeriodoAcademicoController.delete);

export default router;
