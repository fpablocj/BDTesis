import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Whatsapp } from '../entity/Whatsapp';

export class MensajeController {
  static getAll = async (req: Request, res: Response) => {
    const whatsappRepository = getRepository(Whatsapp);
    let mensajes;

    try {
      mensajes = await whatsappRepository.find({ select: ['id_wpp','mensaje', 'fecha', 'hora' ], relations:['user']});
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!', e });
    }

    if (mensajes.length > 0) {
      res.send(mensajes);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id_wpp } = req.params;
    const whatsappRepository = getRepository(Whatsapp);
    try {
      const wpp = await whatsappRepository.findOneOrFail(id_wpp, { select: ['id_wpp','mensaje', 'fecha', 'hora' ], relations:['user']});
      res.send(wpp);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getByUser = async (req: Request, res: Response) => {
    const whatsappRepository = getRepository(Whatsapp);
    let prospectos;

    const { user } = req.params; // Obtener el parámetro de búsqueda desde la solicitud

    try {
          prospectos = await whatsappRepository.find({
            where: { user: user },
            select: ['id_wpp', 'mensaje', 'fecha', 'hora'],
            relations: ['user']
          });

    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
      return;
    }

    if (prospectos.length > 0) {
      res.send(prospectos);
    } else {
      res.status(404).json({ message: 'No results' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { mensaje, fecha, hora, user } = req.body;
    const wpp = new Whatsapp();

    wpp.mensaje = mensaje;
    wpp.fecha = fecha;
    wpp.hora = hora;
    wpp.user = user;

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
      return res.status(409).json({ message: 'wpp already exist', e });
    }
    // All ok
    //res.send('wpp created');
  };

  static edit = async (req: Request, res: Response) => {
    let wpp;
    const { id_wpp } = req.params;
    const { mensaje, fecha, hora, user } = req.body;

    const whatsappRepository = getRepository(Whatsapp);
    // Try get user
    try {
      wpp = await whatsappRepository.findOneOrFail(id_wpp);
      wpp.mensaje = mensaje;
      wpp.fecha = fecha;
      wpp.hora = hora;
      wpp.user = user;
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
