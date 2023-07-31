import { Router } from 'express';
import auth from './auth';
import user from './user';
import prospecto from './prospecto';
import correo from './correo';
import carrera from './carrera';
import detalleCorreo from './detalleCorreo';
import detalleWhatsapp from './detalleWhatsapp'
import whatsapp from './whatsapp'
import periodoAcademico from './periodoAcademico'


const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/prospectos', prospecto);
routes.use('/correos', correo);
routes.use('/carreras', carrera);
routes.use('/detalleCorreos', detalleCorreo);
routes.use('/whatsapp', whatsapp )
routes.use('/detalleWhatsapp', detalleWhatsapp); 
routes.use('/periodoAcademico', periodoAcademico);

export default routes;
