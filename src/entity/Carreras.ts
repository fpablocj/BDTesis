import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Prospectos } from "./Prospectos";
import { Users } from "./Users";

@Entity({ name: "carreras" })
export class Carreras {
  @PrimaryGeneratedColumn({ name: "id_carrera" })
  id_carrera: number;

  @Column({ name: "nombre", type: "varchar", length: 50 })
  nombre: string;

  @Column({ name: "descripcion", type: "varchar", length: 200 })
  descripcion: string;

  @Column({ name: "campo_estudio", type: "varchar" })
  campo_estudio: string;

  @OneToMany(() => Prospectos, (prospecto) => prospecto.carrera)
  @JoinColumn({name: 'id_prospecto'})
  prospecto: Prospectos[];

  @OneToMany(() => Users, (user) => user.carrera)
  @JoinColumn({name: 'id'})
  user: Users[];

  /*@OneToMany(() => DetalleCorreo, (detalle_correo) => detalle_correo.correo)
detalle_correo: DetalleCorreo[];*/
}