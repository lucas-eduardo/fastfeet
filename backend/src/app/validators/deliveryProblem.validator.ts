/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = yup.object().shape({
      description: yup.string().required(),
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
};
