import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Correos } from "./Correos";
import { Prospectos } from "./Prospectos";

@Entity({ name: 'detalle_correo' })
export class DetalleCorreo {
  @PrimaryGeneratedColumn({name: "id_detalle"})
  id_detalle: number;

  @ManyToOne(() => Correos, (correo) => correo.detalle_correo)
  @JoinColumn({ name: "idcorreo" })
  correo: Correos;

  @ManyToOne(() => Prospectos, (prospecto) => prospecto.detalle_correo)
  @JoinColumn({ name: "idinteresado" })
  prospecto: Prospectos;
}
