/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = yup.object().shape({
      name: yup.string(),
      avatar_id: yup.number(),
      email: yup.string().email(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};

export default {
  store,
  update,
};
