import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, OneToMany } from "typeorm";
import { PeriodoAcademico } from "./PeriodoAcademico";
import { DetalleCorreo } from "./DetalleCorreo";
import { DetalleWhatsapp } from "./DetalleWhatsapp";
import { Users } from "./Users";
import { Carreras } from "./Carreras";

@Entity({name: 'prospectos'})
@Unique(['cedula'])
//@Unique(['nombres'])
export class Prospectos {
  @PrimaryGeneratedColumn()
  id_prospecto: number;

  @Column({ type: "varchar", length: 10, nullable: true })
  cedula: string;

  @Column({ type: "varchar", length: 20 })
  tipo_documento: string;

  @Column({ type: "varchar", length: 250 })
  nombres: string;

  @Column({ type: "varchar", length: 50 })
  estado: string;


  
  @Column({ type: "varchar", length: 12 })
  celular: string;

  @Column({ type: "date" })
  fecha_registro: Date;

  @Column({ type: "varchar", length: 250 })
  correo: string;

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

  @Column({ type: "varchar", length: 70, nullable:true })
  colegio: string;

  @Column({ type: "varchar", length: 50 })
  fuente_registro: string;

  @Column({ type: "varchar", length: 1000, nullable:true })
  comentario: string;

  @ManyToOne(() => Carreras, (carrera)=> carrera.prospecto)
  @JoinColumn({ name: "id_carrera"})
  carrera: Carreras;

  @ManyToOne(() => PeriodoAcademico, (periodo) => periodo.prospecto)
  @JoinColumn({ name: "id_periodo" })
  periodo: PeriodoAcademico;

  @ManyToOne(() => Users, (user) => user.prospecto)
  @JoinColumn({ name: "idusuario" })
  user: Users;

  @OneToMany(() => DetalleCorreo, (detalle_correo) => detalle_correo.prospecto)
  detalle_correo: DetalleCorreo[];

  @OneToMany(() => DetalleWhatsapp, (detalle_whatsapp) => detalle_whatsapp.prospecto)
  detalle_whatsapp: DetalleWhatsapp[];
}


