import { Router } from 'express';
import auth from './auth';
import user from './user';
import prospecto from './prospecto';
import correo from './correo';
import detalleCorreo from './detalleCorreo';
import detalleWhatsapp from './detalleWhatsapp'
import whatsapp from './whatsapp'


const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/prospectos', prospecto);
routes.use('/correos', correo);
routes.use('/detalleCorreos', detalleCorreo);
routes.use('/whatsapp', whatsapp )
routes.use('/detalleWhatsapp', detalleWhatsapp);

export default routes;
