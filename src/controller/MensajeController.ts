import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Whatsapp } from '../entity/Whatsapp';

export class MensajeController {
  static getAll = async (req: Request, res: Response) => {
    const whatsappRepository = getRepository(Whatsapp);
    let mensajes;

    try {
      mensajes = await whatsappRepository.find({ select: ['id_wpp','mensaje', 'fecha' ]});
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (mensajes.length > 0) {
      res.send(mensajes);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id_correo } = req.params;
    const whatsappRepository = getRepository(Whatsapp);
    try {
      const wpp = await whatsappRepository.findOneOrFail(id_correo);
      res.send(wpp);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { mensaje, fecha } = req.body;
    const wpp = new Whatsapp();

    wpp.mensaje = mensaje;
    wpp.fecha = fecha;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(wpp, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const whatsappRepository = getRepository(Whatsapp);
    try {
      //prospecto.hashPassword();
      let newMensaje = await whatsappRepository.save(wpp);
      res.send({id: newMensaje.id_wpp});
    } catch (e) {
      return res.status(409).json({ message: 'wpp already exist' });
    }
    // All ok
    //res.send('wpp created');
  };

  static edit = async (req: Request, res: Response) => {
    let wpp;
    const { id_wpp } = req.params;
    const { mensaje, fecha } = req.body;

    const whatsappRepository = getRepository(Whatsapp);
    // Try get user
    try {
      wpp = await whatsappRepository.findOneOrFail(id_wpp);
      wpp.mensaje = mensaje;
      wpp.fecha = fecha;
    } catch (e) {
      return res.status(404).json({ message: 'wpp not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(wpp, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await whatsappRepository.save(wpp);
    } catch (e) {
      return res.status(409).json({ message: 'Cedula already in use' });
    }

    res.status(201).json({ message: 'wpp update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id_wpp } = req.params;
    const whatsappRepository = getRepository(Whatsapp);
    let wpp: Whatsapp;

    try {
      wpp = await whatsappRepository.findOneOrFail(id_wpp);
    } catch (e) {
      return res.status(404).json({ message: 'wpp not found' });
    }

    // Remove user
    whatsappRepository.delete(id_wpp);
    res.status(201).json({ message: ' wpp deleted' });
  };
}

export default MensajeController;
