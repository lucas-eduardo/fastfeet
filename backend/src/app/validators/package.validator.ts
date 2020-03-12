/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = yup.object().shape({
      recipient_id: yup.number().required(),
      deliveryman_id: yup.number().required(),
      product: yup.string().required(),
      start_date: yup.date().notRequired(),
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
      recipient_id: yup.number(),
      deliveryman_id: yup.number(),
      signature_id: yup.number(),
      product: yup.string(),
      canceled_at: yup.date(),
      start_date: yup.date(),
      end_date: yup.date(),
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
