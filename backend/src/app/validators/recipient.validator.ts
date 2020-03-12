/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = yup.object().shape({
      name: yup.string().required(),
      street: yup.string().required(),
      number: yup.number().required(),
      complement: yup.string(),
      state: yup.string().required(),
      city: yup.string().required(),
      zip_code: yup
        .number()
        .required()
        .min(8),
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
      street: yup.string(),
      number: yup.number(),
      complement: yup.string(),
      state: yup.string(),
      city: yup.string(),
      zip_code: yup.number().min(8),
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
