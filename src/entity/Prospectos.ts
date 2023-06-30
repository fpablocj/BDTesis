import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, OneToMany } from "typeorm";
import { PeriodoAcademico } from "./PeriodoAcademico";
import { DetalleCorreo } from "./DetalleCorreo";
import { DetalleWhatsapp } from "./DetalleWhatsapp";
import { Users } from "./Users";

@Entity({name: 'prospectos'})
@Unique(['cedula'])
export class Prospectos {
  @PrimaryGeneratedColumn()
  id_prospecto: number;

  @Column({ type: "varchar", width: 10 })
  cedula: string;

  @Column({ type: "varchar", length: 20 })
  tipo_documento: string;

  @Column({ type: "varchar", length: 250 })
  nombres: string;

  @Column({ type: "varchar", length: 20 })
  estado: string;

  /*@ManyToOne(() => PeriodoAcademico, (periodo) => periodo.prospectos)
  @JoinColumn({ name: "id_periodo" })
  periodo_academico: PeriodoAcademico;*/

  @Column({ type: "varchar", length: 12 })
  celular: string;

  @Column({ type: "date" })
  fecha_registro: Date;

  @Column({ type: "varchar", length: 250 })
  correo: string;

  @Column({ type: "varchar", length: 70 })
  carrera_interes: string;

  @Column({ type: "varchar", length: 30 })
  jornada: string;

  @Column({ type: "varchar", length: 50 })
  pais: string;

  @Column({ type: "varchar", length: 30 })
  provincia: string;

  @Column({ type: "varchar", length: 50 })
  ciudad: string;

  @Column({ type: "varchar", length: 50 })
  sexo: string;

  @Column({ type: "varchar", length: 70 })
  colegio: string;

  @Column({ type: "varchar", length: 50 })
  fuente_registro: string;

  @Column({ type: "varchar", length: 300 })
  comentario: string;

  @ManyToOne(() => Users, (user) => user.prospecto)
  @JoinColumn({ name: "idusuario" })
  user: Users;

  @OneToMany(() => DetalleCorreo, (detalle_correo) => detalle_correo.prospecto)
  detalle_correo: DetalleCorreo[];

  @OneToMany(() => DetalleWhatsapp, (detalle_whatsapp) => detalle_whatsapp.prospecto)
  detalle_whatsapp: DetalleWhatsapp[];
}

