import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prospectos } from './Prospectos';
import { Whatsapp } from './Whatsapp';

@Entity()
export class DetalleWhatsapp {

  @PrimaryGeneratedColumn({name: "id_wpp"})
  id_wpp: number;

  @ManyToOne(() => Whatsapp, (whatsapp) => whatsapp.detalle_whatsapp)
  @JoinColumn({ name: 'idwpp' })
  whatsapp: Whatsapp;

  @ManyToOne(() => Prospectos, (prospecto) => prospecto.detalle_whatsapp)
  @JoinColumn({ name: 'idinteresado' })
  prospecto: Prospectos;
}
