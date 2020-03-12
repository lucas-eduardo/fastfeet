/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(6),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
