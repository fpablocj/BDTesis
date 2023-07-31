import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Carreras } from '../entity/Carreras';

export class CarreraController {
  static getAll = async (req: Request, res: Response) => {
    const carreraRepository = getRepository(Carreras);
    let carreras;

    try {
        carreras = await carreraRepository.find({ select: ['id_carrera', 'nombre', 'descripcion', 'campo_estudio' ] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (carreras.length > 0) {
      res.send(carreras);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id_carrera } = req.params;
    const carreraRepository = getRepository(Carreras);
    try {
      const carrera = await carreraRepository.findOneOrFail(id_carrera);
      res.send(carrera);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getByNombre = async (req: Request, res: Response) => {
    const carreraRepository = getRepository(Carreras);
    let carreras;

    const { nombre } = req.params; // Obtener el parámetro de búsqueda desde la solicitud

    try {
          carreras = await carreraRepository.find({
            where: { nombre: nombre },
            select: ['id_carrera', 'nombre', 'descripcion', 'campo_estudio' ],
          });

    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
      return;
    }

    if (carreras.length > 0) {
      res.send(carreras);
    } else {
      res.status(404).json({ message: 'No results' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { nombre, descripcion, campo_estudio } = req.body;
    const carrera = new Carreras();

    carrera.nombre = nombre;
    carrera.descripcion = descripcion;
    carrera.campo_estudio = campo_estudio;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(carrera, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const carreraRepository = getRepository(Carreras);
    try {
      //prospecto.hashPassword();
      let newCarrera = await carreraRepository.save(carrera);
      res.send({id: newCarrera.id_carrera});
    } catch (e) {
      return res.status(409).json({ message: 'carrera already exist', e });
    }
    // All ok
    //res.send({message: 'carrera created'});
  };

  static edit = async (req: Request, res: Response) => {
    let carrera;
    const { id_carrera } = req.params;
    const { nombre, descripcion, campo_estudio }= req.body;

    const carreraRepository = getRepository(Carreras);
    // Try get user
    try {
        carrera = await carreraRepository.findOneOrFail(id_carrera);
        carrera.nombre = nombre;
        carrera.descripcion = descripcion;
        carrera.campo_estudio = campo_estudio;
    } catch (e) {
      return res.status(404).json({ message: 'carrera not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(carrera, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await carreraRepository.save(carrera);
    } catch (e) {
      return res.status(409).json({ message: 'Cedula already in use' });
    }

    res.status(201).json({ message: 'carrera update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id_carrera } = req.params;
    const carreraRepository = getRepository(Carreras);
    let carrera: Carreras;

    try {
        carrera = await carreraRepository.findOneOrFail(id_carrera);
    } catch (e) {
      return res.status(404).json({ message: 'carrera not found' });
    }
    carreraRepository.delete(id_carrera);
    res.status(201).json({ message: ' carrera deleted' });
  };
}

export default CarreraController;
