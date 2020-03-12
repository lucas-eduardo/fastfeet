/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = yup.object().shape({
      signature_id: yup.number().required(),
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
  update,
};
