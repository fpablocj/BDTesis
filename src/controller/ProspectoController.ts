import { Like, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Prospectos } from '../entity/Prospectos';

export class ProspectoController {
  static getAll = async (req: Request, res: Response) => {
    const prospectoRepository = getRepository(Prospectos);
    let prospectos;

    try {
      prospectos = await prospectoRepository.find({ select: ['id_prospecto', 'cedula', 'tipo_documento', 'nombres', 'estado', 'celular', 'fecha_registro', 'correo', 'carrera_interes', 'jornada', 'pais', 'provincia', 'ciudad', 'sexo', 'colegio', 'fuente_registro', 'comentario'], relations: ['user']  });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (prospectos.length > 0) {
      res.send(prospectos);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getByCarrera = async (req: Request, res: Response) => {
    const prospectoRepository = getRepository(Prospectos);
    let prospectos;

    const { carrera } = req.params; // Obtener el parámetro de búsqueda desde la solicitud


    try {
        // Si se proporciona un filtro, realizar la consulta con el filtro
          prospectos = await prospectoRepository.find({
            where: { carrera_interes: Like(`%${carrera}%`) }, // Filtrar por nombres que coincidan parcialmente con el filtro
            select: ['id_prospecto', 'cedula', 'tipo_documento', 'nombres', 'estado', 'celular', 'fecha_registro', 'correo', 'carrera_interes', 'jornada', 'pais', 'provincia', 'ciudad', 'sexo', 'colegio', 'fuente_registro', 'comentario'],
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

  static getById = async (req: Request, res: Response) => {
    const { id_prospecto } = req.params;
    const prospectoRepository = getRepository(Prospectos);
    try {
      const prospecto = await prospectoRepository.findOneOrFail(id_prospecto);
      res.send(prospecto);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { cedula, tipo_documento, nombres, estado, celular, fecha_registro, correo, carrera_interes, jornada, pais, provincia, ciudad, sexo, colegio, fuente_registro, comentario, user } = req.body;
    const prospecto = new Prospectos();

    prospecto.cedula = cedula;
    prospecto.tipo_documento = tipo_documento;
    prospecto.nombres = nombres;
    prospecto.estado = estado;
    //prospecto.idperiodo = idperiodo;
    prospecto.celular = celular;
    prospecto.fecha_registro = fecha_registro;
    prospecto.correo = correo;
    prospecto.carrera_interes = carrera_interes;
    prospecto.jornada = jornada;
    prospecto.pais = pais;
    prospecto.provincia = provincia;
    prospecto.ciudad = ciudad;
    prospecto.sexo = sexo;
    prospecto.colegio = colegio;
    prospecto.fuente_registro = fuente_registro;
    prospecto.comentario = comentario;
    prospecto.user = user;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(prospecto, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const prospectoRepository = getRepository(Prospectos);
    try {
      //prospecto.hashPassword();
      await prospectoRepository.save(prospecto);
    } catch (e) {
      console.log(e)
      return res.status(409).json({ message: 'Prospecto already exist', e });
    }
    // All ok
    res.send({ message: 'Prospecto created' });
  };

  static edit = async (req: Request, res: Response) => {
    let prospecto;
    const { id_prospecto } = req.params;
    const { cedula, tipo_documento, nombres, estado, idperiodo, celular, fecha_registro, correo, carrera_interes, jornada, pais, provincia, ciudad, sexo, colegio, fuente_registro, comentario, user } = req.body;

    const prospectoRepository = getRepository(Prospectos);
    // Try get user
    try {
      prospecto = await prospectoRepository.findOneOrFail(id_prospecto);
      prospecto.cedula = cedula;
      prospecto.tipo_documento = tipo_documento;
      prospecto.nombres = nombres;
      prospecto.estado = estado;
      prospecto.idperiodo = idperiodo;
      prospecto.celular = celular;
      prospecto.fecha_registro = fecha_registro;
      prospecto.correo = correo;
      prospecto.carrera_interes = carrera_interes;
      prospecto.jornada = jornada;
      prospecto.pais = pais;
      prospecto.provincia = provincia;
      prospecto.ciudad = ciudad;
      prospecto.sexo = sexo;
      prospecto.colegio = colegio;
      prospecto.fuente_registro = fuente_registro;
      prospecto.comentario = comentario;
      prospecto.user = user;
    } catch (e) {
      return res.status(404).json({ message: 'Prospecto not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(prospecto, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await prospectoRepository.save(prospecto);
    } catch (e) {
      return res.status(409).json({ message: 'Cedula already in use' });
    }

    res.status(201).json({ message: 'Prospecto update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id_prospecto } = req.params;
    const prospectoRepository = getRepository(Prospectos);
    let prospecto: Prospectos;

    try {
      prospecto = await prospectoRepository.findOneOrFail(id_prospecto);
    } catch (e) {
      return res.status(404).json({ message: 'Prospecto not found' });
    }

    // Remove user
    try{
      await prospectoRepository.delete(id_prospecto);
    } catch (e){
      return res.status(409).json({ message: 'Prospecto', e });
    }
    
    res.status(201).json({ message: ' Prospecto deleted' });
  };
}

export default ProspectoController;
