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

  @Column({ type: "varchar", length: 50 })
  estado: string;

  @Column({ type: 'tinyint', width: 1, transformer: {
    from: (dbValue: number) => dbValue === 1,
    to: (tsValue: boolean) => tsValue ? 1 : 0,
  }})
  activo: boolean;

  @OneToMany(() => Prospectos, (prospecto) => prospecto.periodo)
  @JoinColumn({name: 'id_prospecto'})
  prospecto: Prospectos[];
}

