import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Prospectos } from "./Prospectos";

@Entity()
export class PeriodoAcademico {
  @PrimaryGeneratedColumn()
  id_periodo: number;

  @Column()
  descripcion: string;

  @OneToMany(() => Prospectos, (prospecto) => prospecto.periodo_academico)
  prospectos: Prospectos[];
}
