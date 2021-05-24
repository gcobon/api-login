import { User } from './../entity/User';
import { Response } from 'express';
import { Request } from 'express';
import { getRepository } from 'typeorm';

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

    if (user.checkPassword(password)) {
      delete user.password;
      res.send(user);
    } else {
      res.status(400).json({ status: 'Username or password incorrect' });
    }
  };
}

export default AuthController;
