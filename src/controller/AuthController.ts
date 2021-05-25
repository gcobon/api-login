import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from './../entity/User';

const validationOpt = {
  validationError: { target: false, value: false },
};

class AuthController {
  static login = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const { username, password } = req.body;

    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: 'Username & Password are required' });
    }

    let user: User;

    try {
      user = await userRepository.findOneOrFail({
        where: { username },
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: 'Username or password incorrect', error });
    }

    if (!user.checkPassword(password)) {
      res.status(400).json({ status: 'Username or password incorrect' });
    }

    delete user.password;

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ user, token });
  };

  static changePassword = async (req: Request, res: Response) => {
    const { id } = res.locals.jwtPayload;

    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      return res
        .status(400)
        .json({ message: 'Old password & new password are required' });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(400).json({ message: 'Something goes wrong' });
    }

    if (!user.checkPassword(oldPassword)) {
      return res.status(401).json({ message: 'The old password is incorrect' });
    }

    user.password = newPassword;

    const errors = await validate(user, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    user.hashPassword();

    try {
      await userRepository.save(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error to change password' });
    }

    res.status(200).json({ message: 'Password updated' });
  };
}

export default AuthController;
