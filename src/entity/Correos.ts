import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { DetalleCorreo } from "./DetalleCorreo";
import { Users } from "./Users";

@Entity({ name: "correos" })
export class Correos {
  @PrimaryGeneratedColumn({ name: "id_correo" })
  id_correo: number;

  @Column({ name: "asunto", type: "varchar", length: 50 })
  asunto: string;

  @Column({ name: "mensaje", type: "mediumtext" })
  mensaje: string;

  @Column({ name: "fecha", type: "date" })
  fecha: Date;

  @Column({ name: "hora", type: "varchar", length: 20, nullable:true })
  hora: string;

  @ManyToOne(() => Users, (user)=> user.prospecto)
  @JoinColumn({ name: "id"})
  user: Users;

  @OneToMany(() => DetalleCorreo, (detalle_correo) => detalle_correo.correo)
detalle_correo: DetalleCorreo[];
}
