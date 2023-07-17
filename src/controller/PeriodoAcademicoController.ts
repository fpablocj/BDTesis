import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { PeriodoAcademico } from '../entity/PeriodoAcademico';


export class PeriodoAcademicoController {
  static getAll = async (req: Request, res: Response) => {
    const periodoRepository = getRepository(PeriodoAcademico);
    let periodos;

    try {
      periodos = await periodoRepository.find({ select: ['id_periodo', 'fecha_inicio', 'fecha_fin', 'descripcion' ]});
      res.send(periodos);
    } catch (e) {
      res.status(404).json({ message: 'Something goes wrong!' });
    }
  };

  static  new = async (req: Request, res: Response) => {
    const { descripcion, fecha_inicio, fecha_fin } = req.body;
    const periodo = new PeriodoAcademico();

    periodo.fecha_inicio = new Date(fecha_inicio);
    periodo.fecha_fin = new Date(fecha_fin);
    periodo.descripcion = descripcion;

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
    const { descripcion, fecha_inicio, fecha_fin } = req.body;

    const periodoRepository = getRepository(PeriodoAcademico);

    try {
      const periodo = await periodoRepository.findOneOrFail(id_periodo);
      periodo.descripcion = descripcion;
      periodo.fecha_inicio = new Date(fecha_inicio);
      periodo.fecha_fin = new Date(fecha_fin);

      await periodoRepository.save(periodo);
      res.status(200).json({ message: 'Academic period updated' });
    } catch (e) {
      return res.status(404).json({ message: 'Academic period not found' });
    }
  };

  static delete = async (req: Request, res: Response) => {
    const { id_periodo } = req.params;
    const periodoRepository = getRepository(PeriodoAcademico);

    try {
      await periodoRepository.delete(id_periodo);
      res.status(200).json({ message: 'Academic period deleted' });
    } catch (e) {
      return res.status(404).json({ message: 'Academic period not found' });
    }
  };
}

export default PeriodoAcademicoController;
