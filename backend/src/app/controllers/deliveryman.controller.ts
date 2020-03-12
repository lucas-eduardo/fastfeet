// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { Op } from 'sequelize';

import deliverymanModel from '../models/deliveryman.model';
import fileModel from '../models/file.model';

class DeliverymanController {
  async index(req: Request, res: Response) {
    const { q } = req.query;
    const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

    const deliverys = await deliverymanModel.findAll({
      where,
      include: [
        {
          model: fileModel,
          as: 'avatar',
        },
      ],
      order: [['createdAt', 'desc']],
    });
    return res.json(deliverys);
  }

  async store(req: Request, res: Response) {
    const emailExists = await deliverymanModel.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'E-mail already exists' });
    }

    const delivery = await deliverymanModel.create(req.body);

    return res.json(delivery);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const delivery = await deliverymanModel.findByPk(id, {
      include: [
        {
          model: fileModel,
          as: 'avatar',
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { email } = req.body;
    const delivery = await deliverymanModel.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (!!email && email !== delivery.email) {
      const emailExists = await deliverymanModel.findOne({
        where: { email },
      });

      if (emailExists) {
        return res.status(400).json({ error: 'E-mail already exists' });
      }
    }

    await delivery.update(req.body);

    return res.json(delivery);
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    const delivery = await deliverymanModel.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await delivery.destroy();

    return res.json();
  }
}

export default new DeliverymanController();
