import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.jwtPayload;

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized', error });
    }


    const { role } = user;
    if (roles.includes(role)) {
      next();
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  };
};
