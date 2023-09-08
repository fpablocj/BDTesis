import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import { validate } from 'class-validator';

export class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(Users);
    let users;

    try {
      users = await userRepository.find({ select: ['id', 'name', 'username', 'role'], relations: ['carrera'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (users.length > 0) {
      res.send(users);
    } else {
      res.send({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    try {
      const user = await userRepository.findOneOrFail(id, {select:['name', 'username', 'role', 'password'], relations:['carrera']});
      res.send(user);
    } catch (e) {
      res.send({ message: 'Not result', e });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { name, username, password, role, carrera } = req.body;
    const user = new Users();


    user.name = name;
    user.username = username;
    user.password = password;
    user.role = role;
    user.carrera = carrera;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const userRepository = getRepository(Users);
    try {
      user.hashPassword();
      await userRepository.save(user);
    } catch (e) {
      return res.send({ message: 'Username already exist' });
    }
    // All ok
    res.send({message: 'User created'});
  };

  static edit = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { name, username, role, carrera } = req.body;

    const userRepository = getRepository(Users);
    try {
      user = await userRepository.findOneOrFail(id);
      user.name = name;
      user.username = username;
      user.role = role;
      user.carrera = carrera;
    } catch (e) {
      return res.send({ message: 'User not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: 'Username already in use' });
    }

    res.status(201).json({ message: 'User update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (e) {
      return res.send({ message: 'User not found' });
    }

    userRepository.delete(id);
    res.status(201).json({ message: ' User deleted' });
  };
}

export default UserController;
