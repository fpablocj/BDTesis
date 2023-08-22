import { In, Like, Not, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Prospectos } from '../entity/Prospectos';

export class ProspectoController {
  static getAll = async (req: Request, res: Response) => {
    const prospectoRepository = getRepository(Prospectos);
    const { periodo } = req.params;
    let prospectos;

    try {
      prospectos = await prospectoRepository.find({ 
        where: {periodo: periodo},
        select: ['id_prospecto', 'cedula', 'tipo_documento', 'nombres', 'estado', 'celular', 'fecha_registro', 'correo', 'jornada', 'pais', 'provincia', 'ciudad', 'sexo', 'colegio', 'fuente_registro', 'comentario'], 
        relations: ['user', 'periodo', 'carrera']  });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (prospectos.length > 0) {
      res.send(prospectos);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };
  static getCount = async (req: Request, res: Response) => {
    const prospectoRepository = getRepository(Prospectos);
    const { periodo } = req.params;

    try {
      const filtro: any = {
        periodo:periodo
      };

      const totalProspectos = await prospectoRepository.count(filtro);
      res.send({ totalProspectos });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
};

  static getCountByEstado = async (req: Request, res: Response) => {
    const prospectoRepository = getRepository(Prospectos);
    const { periodo } = req.params;

    try {
      const filtro: any = {
        periodo: periodo,
        estado: Not(In(['DESCARTADO', 'DESCARTADO DEFINITIVAMENTE', 'MATRICULADO/A']))
      };

      const totalProspectos = await prospectoRepository.count(filtro);
      res.send({ totalProspectos });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
  };

  static getCountByCarrera = async (req: Request, res: Response) => {
    const prospectoRepository = getRepository(Prospectos);
    const { carrera, periodo } = req.params;

    try {
      const filtro: any = {
        carrera: carrera,
        periodo:periodo
      };

      const totalProspectos = await prospectoRepository.count(filtro);
      res.send({ totalProspectos });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
};

static getCountByCarreraAndEstado = async (req: Request, res: Response) => {
  const prospectoRepository = getRepository(Prospectos);
  const { carrera, periodo } = req.params;

  try {
    const filtro: any = {
      carrera: carrera,
      periodo:periodo,
      estado: Not(In(['DESCARTADO', 'DESCARTADO DEFINITIVAMENTE', 'MATRICULADO/A']))
    };

    const totalProspectos = await prospectoRepository.count(filtro);
    res.send({ totalProspectos });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};



  static getByCarreraPaginado = async (req: Request, res: Response) => {
    const { periodo, carrera, page, pageSize } = req.params; // Obtener los parámetros de búsqueda desde la solicitud

    const prospectoRepository = getRepository(Prospectos);

    try {
      const [prospectos, totalItems] = await prospectoRepository.findAndCount({
        where: { carrera: carrera, periodo:periodo },
        select: ['id_prospecto', 'cedula', 'tipo_documento', 'nombres', 'estado', 'celular', 'fecha_registro', 'correo', 'jornada', 'pais', 'provincia', 'ciudad', 'sexo', 'colegio', 'fuente_registro', 'comentario'],
        relations: ['user', 'periodo', 'carrera'],
        take: parseInt(pageSize),
        skip: (parseInt(page) - 1) * parseInt(pageSize),
      });

      if (prospectos.length > 0) {
        const totalPages = Math.ceil(totalItems / parseInt(pageSize)); // Convertir el valor de pageSize a número
        res.send({ prospectos, totalItems, totalPages });
      } else {
        res.status(404).json({ message: 'No results' });
      }
    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
    }
  };

  static getByCarrera = async (req: Request, res: Response) => {
    const prospectoRepository = getRepository(Prospectos);
    let prospectos;

    const { carrera, periodo } = req.params; // Obtener el parámetro de búsqueda desde la solicitud

    try {
          prospectos = await prospectoRepository.find({
            where: { carrera: carrera, periodo:periodo },
            select: ['id_prospecto', 'cedula', 'tipo_documento', 'nombres', 'estado', 'celular', 'fecha_registro', 'correo', 'jornada', 'pais', 'provincia', 'ciudad', 'sexo', 'colegio', 'fuente_registro', 'comentario'],
            relations: ['user', 'periodo', 'carrera']
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

  static getByCedula = async (req: Request, res: Response) => {
    const prospectoRepository = getRepository(Prospectos);
    let prospectos;

    const { cedula } = req.params; // Obtener el parámetro de búsqueda desde la solicitud

    try {
          prospectos = await prospectoRepository.find({
            where: { cedula: cedula },
            select: ['id_prospecto', 'cedula', 'tipo_documento', 'nombres', 'estado', 'celular', 'fecha_registro', 'correo', 'jornada', 'pais', 'provincia', 'ciudad', 'sexo', 'colegio', 'fuente_registro', 'comentario'],
            relations: ['user', 'periodo', 'carrera']
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
      const prospecto = await prospectoRepository.findOneOrFail(id_prospecto, { select: ['id_prospecto', 'cedula', 'tipo_documento', 'nombres', 'estado', 'celular', 'fecha_registro', 'correo','jornada', 'pais', 'provincia', 'ciudad', 'sexo', 'colegio', 'fuente_registro', 'comentario'], relations: ['user', 'periodo', 'carrera']  });
      res.send(prospecto);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { cedula, tipo_documento, nombres, estado, celular, fecha_registro, correo, carrera, jornada, pais, provincia, ciudad, sexo, colegio, fuente_registro, comentario, user, periodo } = req.body;
    const prospecto = new Prospectos();

    prospecto.cedula = cedula;
    prospecto.tipo_documento = tipo_documento;
    prospecto.nombres = nombres;
    prospecto.estado = estado;
    prospecto.periodo = periodo;
    prospecto.celular = celular;
    prospecto.fecha_registro = fecha_registro;
    prospecto.correo = correo;
    prospecto.carrera = carrera;
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
      return res.status(409).json({ message: 'Prospecto already exist', e });
    }
    // All ok
    res.send({ message: 'Prospecto created' });
  };

  static edit = async (req: Request, res: Response) => {
    let prospecto;
    const { id_prospecto } = req.params;
    const { cedula, tipo_documento, nombres, estado, idperiodo, celular, fecha_registro, correo, carrera, jornada, pais, provincia, ciudad, sexo, colegio, fuente_registro, comentario, user, periodo } = req.body;

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
      prospecto.carrera = carrera;
      prospecto.jornada = jornada;
      prospecto.pais = pais;
      prospecto.provincia = provincia;
      prospecto.ciudad = ciudad;
      prospecto.sexo = sexo;
      prospecto.colegio = colegio;
      prospecto.fuente_registro = fuente_registro;
      prospecto.comentario = comentario;
      prospecto.user = user;
      prospecto.periodo = periodo;
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
      return res.status(409).json({ message: 'Cedula already in use', e });
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


  static getAllPaginado = async (req: Request, res: Response) => {
    const { periodo, page, pageSize } = req.params; // Obtener los parámetros de paginación desde la solicitud

    const prospectoRepository = getRepository(Prospectos);

    try {
      const [prospectos, totalItems] = await prospectoRepository.findAndCount({
        select: ['id_prospecto', 'cedula', 'tipo_documento', 'nombres', 'estado', 'celular', 'fecha_registro', 'correo', 'jornada', 'pais', 'provincia', 'ciudad', 'sexo', 'colegio', 'fuente_registro', 'comentario'],
        relations: ['user', 'periodo', 'carrera'],
        where: {periodo: periodo},
        take: parseInt(pageSize),
        skip: (parseInt(page) - 1) * parseInt(pageSize),
      });

      if (prospectos.length > 0) {
        const totalPages = Math.ceil(totalItems /  parseInt(pageSize));
        res.send({ prospectos, totalItems, totalPages });
      } else {
        res.status(404).json({ message: 'No results' });
      }
    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
    }
  };

  static getPaginadoByEstado = async (req: Request, res: Response) => {
    const { periodo, page, pageSize } = req.params; // Obtener los parámetros de paginación desde la solicitud

    const prospectoRepository = getRepository(Prospectos);

    try {
      const [prospectos, totalItems] = await prospectoRepository.findAndCount({
        select: ['id_prospecto', 'cedula', 'tipo_documento', 'nombres', 'estado', 'celular', 'fecha_registro', 'correo', 'jornada', 'pais', 'provincia', 'ciudad', 'sexo', 'colegio', 'fuente_registro', 'comentario'],
        relations: ['user', 'periodo', 'carrera'],
        where: {
          estado: Not(In(['DESCARTADO', 'DESCARTADO DEFINITIVAMENTE', 'MATRICULADO/A'])),
          periodo: periodo
        },
        take: parseInt(pageSize),
        skip: (parseInt(page) - 1) * parseInt(pageSize),
      });

      if (prospectos.length > 0) {
        const totalPages = Math.ceil(totalItems /  parseInt(pageSize));
        res.send({ prospectos, totalItems, totalPages });
      } else {
        res.status(404).json({ message: 'No results' });
      }
    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
    }
  };
  static getByCarreraPaginadoAndEstado = async (req: Request, res: Response) => {
    const { periodo, carrera, page, pageSize } = req.params; // Obtener los parámetros de búsqueda desde la solicitud

    const prospectoRepository = getRepository(Prospectos);

    try {
      const [prospectos, totalItems] = await prospectoRepository.findAndCount({
        select: ['id_prospecto', 'cedula', 'tipo_documento', 'nombres', 'estado', 'celular', 'fecha_registro', 'correo', 'jornada', 'pais', 'provincia', 'ciudad', 'sexo', 'colegio', 'fuente_registro', 'comentario'],
        relations: ['user', 'periodo', 'carrera'],
        where: {
          estado: Not(In(['DESCARTADO', 'DESCARTADO DEFINITIVAMENTE', 'MATRICULADO/A'])), 
          carrera: carrera,
          periodo: periodo
        },
        take: parseInt(pageSize),
        skip: (parseInt(page) - 1) * parseInt(pageSize),
      });

      if (prospectos.length > 0) {
        const totalPages = Math.ceil(totalItems / parseInt(pageSize)); // Convertir el valor de pageSize a número
        res.send({ prospectos, totalItems, totalPages });
      } else {
        res.status(404).json({ message: 'No results' });
      }
    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
    }
  };
}

export default ProspectoController;
