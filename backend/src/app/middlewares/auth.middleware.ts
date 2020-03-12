/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

import tokenHelper from '../helpers/token.helper';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    await tokenHelper.verifyToken(token);
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
