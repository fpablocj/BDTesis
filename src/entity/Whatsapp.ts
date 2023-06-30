import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DetalleWhatsapp } from "./DetalleWhatsapp";

@Entity({name: 'whatsapp'})
export class Whatsapp {
  @PrimaryGeneratedColumn()
  id_wpp: number;

  @Column({ type: "varchar", length: 300 })
  mensaje: string;

  @Column({ type: "date" })
  fecha: Date;

  @OneToMany(() => DetalleWhatsapp, (detalle_whatsapp) => detalle_whatsapp.whatsapp)
  detalle_whatsapp: any;
}
