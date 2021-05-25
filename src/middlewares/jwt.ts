import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  let jwtPayload: any;

  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);

    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    return res.status(401).send({ message: 'Not authorized' });
  }

  const { id, username } = jwtPayload;

  const newToken = jwt.sign({ id, username }, config.jwtSecret, {
    expiresIn: '1h',
  });

  res.setHeader('token', newToken);

  next();
};
