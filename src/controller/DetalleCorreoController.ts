import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { DetalleCorreo } from '../entity/DetalleCorreo';

export class DetalleCorreoController {
  static getAll = async (req: Request, res: Response) => {
    const detalleCorreoRepository = getRepository(DetalleCorreo);
    let detalleCorreos;

    try {
      detalleCorreos = await detalleCorreoRepository.find({ relations: ['correo', 'prospecto']});
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (detalleCorreos.length > 0) {
      res.send(detalleCorreos);
    } else {
      res.send({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id_detalle } = req.params;
    const detalleCorreoRepository = getRepository(DetalleCorreo);
    try {
      const detalleCorreo = await detalleCorreoRepository.findOneOrFail(id_detalle);
      res.send(detalleCorreo);
    } catch (e) {
      res.send({ message: 'Not result', e });
    }
  };

  static getByProspecto = async (req: Request, res: Response) => {
    const detalleCorreoRepository = getRepository(DetalleCorreo);
    let detalleCorreo;

    const { prospecto } = req.params; // Obtener el parámetro de búsqueda desde la solicitud

    try {
      detalleCorreo = await detalleCorreoRepository.find({
            where: { prospecto: prospecto },
            select: ['id_detalle'],
            relations: ['correo', 'prospecto']
          });

    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
      return;
    }

    if (detalleCorreo.length > 0) {
      res.send(detalleCorreo);
    } else {
      res.send({ message: 'No results' });
    }
  };

  static getByCorreo = async (req: Request, res: Response) => {
    const detalleCorreoRepository = getRepository(DetalleCorreo);
    let detalleCorreo;

    const { correo } = req.params; // Obtener el parámetro de búsqueda desde la solicitud

    try {
      detalleCorreo = await detalleCorreoRepository.find({
            where: { correo: correo },
            select: ['id_detalle'],
            relations: ['correo', 'prospecto']
          });

    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
      return;
    }

    if (detalleCorreo.length > 0) {
      res.send(detalleCorreo);
    } else {
      res.send({ message: 'No results' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { correo, prospecto } = req.body;
    const detalleCorreo = new DetalleCorreo();

    detalleCorreo.correo = correo;
    detalleCorreo.prospecto = prospecto;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(detalleCorreo, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const detalleCorreoRepository = getRepository(DetalleCorreo);
    try {
      //prospecto.hashPassword();
      await detalleCorreoRepository.save(detalleCorreo);
    } catch (e) {
      return res.status(409).json({ message: 'detalleCorreo already exist' });
    }
    // All ok
    res.send({message: 'detalleCorreo created'});
  };

  static edit = async (req: Request, res: Response) => {
    let detalleCorreo;
    const { id_detalle } = req.params;
    const { correo, prospecto } = req.body;

    const detalleCorreoRepository = getRepository(DetalleCorreo);
    // Try get user
    try {
      detalleCorreo = await detalleCorreoRepository.findOneOrFail(id_detalle);
      detalleCorreo.correo = correo;
      detalleCorreo.prospecto = prospecto;
    } catch (e) {
      return res.send({ message: 'correo not found', e });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(detalleCorreo, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await detalleCorreoRepository.save(detalleCorreo);
    } catch (e) {
      return res.status(409).json({ message: 'ID already in use' });
    }

    res.status(201).json({ message: 'detalleCorreo update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id_detalle } = req.params;
    const detalleCorreoRepository = getRepository(DetalleCorreo);
    let detalleCorreo: DetalleCorreo;

    try {
      detalleCorreo = await detalleCorreoRepository.findOneOrFail(id_detalle);
    } catch (e) {
      return res.send({ message: 'correo not found', e });
    }

    // Remove user
    detalleCorreoRepository.delete(id_detalle);
    res.status(201).json({ message: 'correo deleted' });
  };
}

export default DetalleCorreoController;
