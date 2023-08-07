import { Entity, PrimaryGeneratedColumn, Unique, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Prospectos } from './Prospectos';
import { Carreras } from './Carreras';
import { Whatsapp } from './Whatsapp';
import { Correos } from './Correos';

@Entity()
@Unique(['username'])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @MinLength(6)
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @Column()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @ManyToOne(() => Carreras, (carrera)=> carrera.prospecto)
  @JoinColumn({ name: "id_carrera"})
  carrera: Carreras;

  @OneToMany(() => Prospectos, (prospecto) => prospecto.user)
  @JoinColumn({name: 'id_prospecto'})
  prospecto: Prospectos[];

  @OneToMany(() => Whatsapp, (whatsapp) => whatsapp.user)
  @JoinColumn({name: 'id_wpp'})
  whatsapp: Whatsapp[];

  @OneToMany(() => Correos, (correo) => correo.user)
  @JoinColumn({name: 'id_correo'})
  correo: Correos[];


  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
