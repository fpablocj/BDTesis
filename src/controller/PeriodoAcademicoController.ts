import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { PeriodoAcademico } from '../entity/PeriodoAcademico';


export class PeriodoAcademicoController {
  static getAll = async (req: Request, res: Response) => {
    const periodoRepository = getRepository(PeriodoAcademico);
    let periodos;

    try {
      periodos = await periodoRepository.find({ select: ['id_periodo', 'fecha_inicio', 'fecha_fin', 'descripcion', 'activo', 'estado' ]});
      res.send(periodos);
    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
    }
  };

  static getByActivo = async (req: Request, res: Response) => {
    const periodoRepository = getRepository(PeriodoAcademico);
    let periodos;

    const { activo } = req.params; // Obtener el parámetro de búsqueda desde la solicitud

    try {
          periodos = await periodoRepository.find({
            where: { activo: activo },
            select: ['id_periodo', 'fecha_inicio', 'fecha_fin', 'descripcion', 'activo', 'estado' ],
          });

    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
      return;
    }

    if (periodos.length > 0) {
      res.send(periodos);
    } else {
      res.status(404).json({ message: 'No results' });
    }
  };

  static  new = async (req: Request, res: Response) => {
    const { descripcion, fecha_inicio, fecha_fin, activo, estado } = req.body;
    const periodo = new PeriodoAcademico();

    periodo.fecha_inicio = new Date(fecha_inicio);
    periodo.fecha_fin = new Date(fecha_fin);
    periodo.descripcion = descripcion;
    periodo.activo = activo;
    periodo.estado = estado;

    const periodoRepository = getRepository(PeriodoAcademico);

    try {
      const newPeriodo = await periodoRepository.save(periodo);
      res.send({ id_periodo: newPeriodo.id_periodo });
    } catch (e) {
      return res.status(409).json({ message: 'Academic period already exists' });
    }
  };

  static edit = async (req: Request, res: Response) => {
    const { id_periodo } = req.params;
    const { descripcion, fecha_inicio, fecha_fin, activo, estado } = req.body;

    const periodoRepository = getRepository(PeriodoAcademico);

    try {
      const periodo = await periodoRepository.findOneOrFail(id_periodo);

      if (activo) {
        // Si se va a activar, primero desactivar todos los demás registros
        await periodoRepository
          .createQueryBuilder()
          .update(PeriodoAcademico)
          .set({ activo: false })
          .execute();
      }
      periodo.descripcion = descripcion;
      periodo.fecha_inicio = new Date(fecha_inicio);
      periodo.fecha_fin = new Date(fecha_fin);
      periodo.activo = activo;
      periodo.estado = estado;

      await periodoRepository.save(periodo);
      res.status(200).json({ message: 'Academic period updated' });
    } catch (e) {
      return res.send({ message: 'Academic period not found', e });
    }
  };

  static activarPeriodoAcademico = async(req: Request, res: Response) => {
      const { id } = req.params;
      const periodoRepository = getRepository(PeriodoAcademico);
  
      try {
        const periodo = await periodoRepository.findOneOrFail(id);
        await periodoRepository
          .createQueryBuilder()
          .update(PeriodoAcademico)
          .set({ activo: false })
          .where('id_periodo != :id', { id: periodo.id_periodo })
          .execute();
        
        periodo.activo = true;
        await periodoRepository.save(periodo);
  
        res.status(200).json({ message: 'Academic period activated' });
      } catch (e) {
        return res.send({ message: 'Academic period not found', e });
      }
  };

  static delete = async (req: Request, res: Response) => {
    const { id_periodo } = req.params;
    const periodoRepository = getRepository(PeriodoAcademico);

    try {
      await periodoRepository.delete(id_periodo);
      res.status(200).json({ message: 'Academic period deleted' });
    } catch (e) {
      return res.send({ message: 'Academic period not found', e });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id_periodo } = req.params;
    const periodoRepository = getRepository(PeriodoAcademico);
    try {
      const periodo = await periodoRepository.findOneOrFail(id_periodo);
      res.send(periodo);
    } catch (e) {
      res.send({ message: 'Not result' });
    }
  };
}

export default PeriodoAcademicoController;
