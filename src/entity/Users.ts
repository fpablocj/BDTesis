import { Entity, PrimaryGeneratedColumn, Unique, Column, OneToMany } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Prospectos } from './Prospectos';

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

  @Column()
  @IsNotEmpty()
  carrera_asignada: string;

  @OneToMany(() => Prospectos, (prospecto) => prospecto.user)
  prospecto: Prospectos[];


  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
