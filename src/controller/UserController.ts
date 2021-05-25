import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/User';

const validationOpt = {
  validationError: { target: false, value: false },
};

class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    let users: User[];

    try {
      users = await userRepository.find({
        select: ['id', 'username', 'role', 'createdAt', 'updatedAt'],
      });
    } catch (error) {
      return res.status(500).json('Something goes wrong');
    }

    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).json({ message: 'No result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const { id } = req.params;

    try {
      const user = await userRepository.findOneOrFail(id);

      delete user.password;

      res.send(user);
    } catch (error) {
      res.status(404).json({ message: 'Not found' });
    }
  };

  static newUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const { username, password, role } = req.body;

    const user = new User();

    user.username = username;
    user.password = password;
    user.role = role;

    const errors = await validate(user, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      user.hashPassword();

      await userRepository.save(user);

      delete user.password;

      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      res.status(409).json({ message: 'Username already exist', error });
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const { id } = req.params;
    const { username, role } = req.body;
    let user: User;

    /** Try get user */
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username;
    user.role = role;

    // const validationOpt = {
    //   validationError: { target: false, value: false },
    // };

    const errors = await validate(user, validationOpt);

    if (errors.length) {
      return res.status(400).json(errors);
    }

    try {
      await userRepository.save(user);
    } catch (error) {
      res.status(409).json({ message: 'Username already in use' });
    }

    delete user.password;

    res.status(200).json({ message: 'User updated', user });
  };

  static deleteUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const { id } = req.params;
    let user: User;

    /** Try get user */
    try {
      user = await userRepository.findOneOrFail(id);
      await userRepository.remove(user);
    } catch (error) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });
  };
}

export default UserController;
