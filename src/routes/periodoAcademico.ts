import { Router } from 'express';
import {PeriodoAcademicoController} from '../controller/PeriodoAcademicoController'

const router = Router();

// Get all users
router.get('/', PeriodoAcademicoController.getAll);

// Create a new user
router.post('/', PeriodoAcademicoController.new);

// Edit user
router.patch('/:id_periodo', PeriodoAcademicoController.edit);

// Delete
router.delete('/:id_periodo', PeriodoAcademicoController.delete);

export default router;
