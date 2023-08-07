import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { DetalleWhatsapp } from "./DetalleWhatsapp";
import { Users } from "./Users";

@Entity({name: 'whatsapp'})
export class Whatsapp {
  @PrimaryGeneratedColumn()
  id_wpp: number;

  @Column({ type: "varchar", length: 300 })
  mensaje: string;

  @Column({ type: "date" })
  fecha: Date;

  @Column({ name: "hora", type: "varchar", length: 20, nullable:true })
  hora: string;

  @ManyToOne(() => Users, (user)=> user.prospecto)
  @JoinColumn({ name: "id"})
  user: Users;

  @OneToMany(() => DetalleWhatsapp, (detalle_whatsapp) => detalle_whatsapp.whatsapp)
  detalle_whatsapp: any;
}
