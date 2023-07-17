import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Prospectos } from "./Prospectos";


@Entity()
export class PeriodoAcademico {
  @PrimaryGeneratedColumn({name: "id_periodo"})
  id_periodo: number;

  @Column({ type: "date" })
  fecha_inicio: Date;

  @Column({ type: "date" })
  fecha_fin: Date;

  @Column({ type: "varchar", length: 250 })
  descripcion: string;

  @OneToMany(() => Prospectos, (prospecto) => prospecto.periodo)
  @JoinColumn({name: 'idinteresado'})
  prospecto: Prospectos[];
}

