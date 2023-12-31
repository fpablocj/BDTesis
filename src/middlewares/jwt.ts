import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { log } from 'console';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers['authorization'];
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
    return res.status(401).json({ message: 'Not Authorized', e });
  }

  const { userId, username } = jwtPayload;

  const newToken = jwt.sign({ userId, username }, config.jwtSecret, { expiresIn: '120m' });
  res.setHeader('token', newToken);
  // Call next
  next();
};
