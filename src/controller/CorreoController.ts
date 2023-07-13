import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Correos } from '../entity/Correos';

export class CorreoController {
  static getAll = async (req: Request, res: Response) => {
    const correoRepository = getRepository(Correos);
    let correos;

    try {
      correos = await correoRepository.find({ select: ['id_correo', 'asunto', 'mensaje', 'fecha' ] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (correos.length > 0) {
      res.send(correos);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id_correo } = req.params;
    const correoRepository = getRepository(Correos);
    try {
      const correo = await correoRepository.findOneOrFail(id_correo);
      res.send(correo);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { asunto, mensaje, fecha } = req.body;
    const correo = new Correos();

    correo.asunto = asunto;
    correo.mensaje = mensaje;
    correo.fecha = fecha;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(correo, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const correoRepository = getRepository(Correos);
    try {
      //prospecto.hashPassword();
      let newCorreo = await correoRepository.save(correo);
      res.send({id: newCorreo.id_correo});
    } catch (e) {
      return res.status(409).json({ message: 'correo already exist', e });
    }
    // All ok
    res.send({message: 'correo created'});
  };

  static edit = async (req: Request, res: Response) => {
    let correo;
    const { id_correo } = req.params;
    const { asunto, mensaje, fecha } = req.body;

    const correoRepository = getRepository(Correos);
    // Try get user
    try {
      correo = await correoRepository.findOneOrFail(id_correo);
      correo.asunto = asunto;
      correo.mensaje = mensaje;
      correo.fecha = fecha;
    } catch (e) {
      return res.status(404).json({ message: 'correo not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(correo, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await correoRepository.save(correo);
    } catch (e) {
      return res.status(409).json({ message: 'Cedula already in use' });
    }

    res.status(201).json({ message: 'correo update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id_correo } = req.params;
    const correoRepository = getRepository(Correos);
    let correo: Correos;

    try {
      correo = await correoRepository.findOneOrFail(id_correo);
    } catch (e) {
      return res.status(404).json({ message: 'correo not found' });
    }

    // Remove user
    correoRepository.delete(id_correo);
    res.status(201).json({ message: ' correo deleted' });
  };
}

export default CorreoController;
