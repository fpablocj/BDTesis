import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { DetalleWhatsapp } from '../entity/DetalleWhatsapp';

export class DetalleMensajeController {
  static getAll = async (req: Request, res: Response) => {
    const detalleMensajeRepository = getRepository(DetalleWhatsapp);
    let detalleMensajes;

    try {
      detalleMensajes = await detalleMensajeRepository.find({ relations: ['whatsapp', 'prospecto']});
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (detalleMensajes.length > 0) {
      res.send(detalleMensajes);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id_wpp } = req.params;
    const detalleMensajeRepository = getRepository(DetalleWhatsapp);
    try {
      const detalleMensaje = await detalleMensajeRepository.findOneOrFail(id_wpp);
      res.send(detalleMensaje);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getByProspecto = async (req: Request, res: Response) => {
    const detalleMensajeRepository = getRepository(DetalleWhatsapp);
    let detalleMensajes;

    const { prospecto } = req.params; // Obtener el parámetro de búsqueda desde la solicitud

    try {
      detalleMensajes = await detalleMensajeRepository.find({
            where: { prospecto: prospecto },
            select: ['id_wpp'],
            relations: ['whatsapp', 'prospecto']
          });

    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
      return;
    }

    if (detalleMensajes.length > 0) {
      res.send(detalleMensajes);
    } else {
      res.status(404).json({ message: 'No results' });
    }
  };

  static getByWhatsapp = async (req: Request, res: Response) => {
    const detalleMensajeRepository = getRepository(DetalleWhatsapp);
    let detalleMensajes;

    const { whatsapp } = req.params; // Obtener el parámetro de búsqueda desde la solicitud

    try {
      detalleMensajes = await detalleMensajeRepository.find({
            where: { whatsapp: whatsapp },
            select: ['id_wpp'],
            relations: ['whatsapp', 'prospecto']
          });

    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
      return;
    }

    if (detalleMensajes.length > 0) {
      res.send(detalleMensajes);
    } else {
      res.status(404).json({ message: 'No results' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { whatsapp, prospecto } = req.body;
    const detalleMensaje = new DetalleWhatsapp();

    detalleMensaje.whatsapp = whatsapp;
    detalleMensaje.prospecto = prospecto;

    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(detalleMensaje, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }


    const detalleMensajeRepository = getRepository(DetalleWhatsapp);
    try {
      //prospecto.hashPassword();
      await detalleMensajeRepository.save(detalleMensaje);
    } catch (e) {
      return res.status(409).json({ message: 'detalleMensaje already exist' });
    }
    // All ok
    res.send({message: 'detalleMensaje created'});
  };

  static edit = async (req: Request, res: Response) => {
    let detalleMensaje;
    const { id_wpp } = req.params;
    const { whatsapp, prospecto } = req.body;

    const detalleMensajeRepository = getRepository(DetalleWhatsapp);
    // Try get user
    try {
      detalleMensaje = await detalleMensajeRepository.findOneOrFail(id_wpp);
      detalleMensaje.whatsapp = whatsapp;
      detalleMensaje.prospecto = prospecto;
    } catch (e) {
      return res.status(404).json({ message: 'correo not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(detalleMensaje, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await detalleMensajeRepository.save(detalleMensaje);
    } catch (e) {
      return res.status(409).json({ message: 'ID already in use' });
    }

    res.status(201).json({ message: 'detalleMensaje update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id_wpp } = req.params;
    const detalleMensajeRepository = getRepository(DetalleWhatsapp);
    let detalleMensaje: DetalleWhatsapp;

    try {
      detalleMensaje = await detalleMensajeRepository.findOneOrFail(id_wpp);
    } catch (e) {
      return res.status(404).json({ message: 'correo not found' });
    }

    // Remove user
    detalleMensajeRepository.delete(id_wpp);
    res.status(201).json({ message: ' mensaje deleted' });
  };
}

export default DetalleMensajeController;
