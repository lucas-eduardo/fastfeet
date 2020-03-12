// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

import userModel from '../models/user.model';
import tokenHelper from '../helpers/token.helper';

class SessionController {
  async store(req: Request, res: Response) {
    const auth: UserInterface = req.body;

    const user = await userModel.findOne({
      where: { email: auth.email },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(auth.password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;
    const token: string = tokenHelper.generateToken({ id }, '2d');

    return res.json({
      user: {
        id,
        name,
      },
      token,
    });
  }
}

export default new SessionController();
