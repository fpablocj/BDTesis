import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DetalleCorreo } from "./DetalleCorreo";

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

  @OneToMany(() => DetalleCorreo, (detalle_correo) => detalle_correo.correo)
detalle_correo: DetalleCorreo[];
}
