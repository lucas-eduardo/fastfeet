/* eslint-disable object-curly-newline */
/* eslint-disable array-callback-return */
/* eslint-disable comma-dangle */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { Op } from 'sequelize';

import verifyDataPackage from '../services/verifyDataPackage.service';

import deliverymanModel from '../models/deliveryman.model';
import recipientModel from '../models/recipient.model';
import packageModel from '../models/package.model';
import fileModel from '../models/file.model';

import queueLib from '../../libs/queue';
import assignedOrderJob from '../jobs/assignedOrder.job';

class PackageController {
  async index(req: Request, res: Response) {
    let where = {};
    const { q } = req.query;

    if (q) {
      const temp = { ...where, product: { [Op.iLike]: `%${q}%` } };
      where = temp;
    }
    const packages = await packageModel.findAll({
      where,
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: deliverymanModel,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: recipientModel,
          as: 'recipient',
        },
        {
          model: fileModel,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
      order: [['created_at', 'desc']],
    });

    return res.json(packages);
  }

  async store(req: Request, res: Response) {
    const deliveryman = await deliverymanModel.findByPk(
      req.body.deliveryman_id
    );

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const recipient = await recipientModel.findByPk(req.body.recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    if (req.body.start_date) {
      const { start_date } = req.body;
      await verifyDataPackage.run({ start_date });
    }

    const { id, product } = await packageModel.create(req.body);

    const dataEmail = await packageModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: deliverymanModel,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: recipientModel,
          as: 'recipient',
        },
      ],
    });

    if (process.env.NODE_ENV !== 'test') {
      await queueLib.add(assignedOrderJob.key, { dataEmail });
    }

    return res.json({ id, product });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const dataPackage = await packageModel.findOne({
      where: {
        id,
      },
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: deliverymanModel,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: recipientModel,
          as: 'recipient',
        },
      ],
    });

    return res.json(dataPackage);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const dataPackage = await packageModel.findByPk(id);

    if (!dataPackage) {
      return res.status(400).json({ error: 'Order not found' });
    }

    if (req.body.deliveryman_id) {
      const deliveryman = await deliverymanModel.findByPk(
        req.body.deliveryman_id
      );

      if (!deliveryman) {
        return res.status(400).json({ error: 'Delivery not found' });
      }
    }

    if (req.body.recipient_id) {
      const recipient = await recipientModel.findByPk(req.body.recipient_id);

      if (!recipient) {
        return res.status(400).json({ error: 'Recipient not found' });
      }
    }

    if (req.body.start_date) {
      const { start_date } = req.body;
      await verifyDataPackage.run({ start_date });
    }

    await dataPackage.update(req.body);

    return res.json(dataPackage);
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    const dataPackage = await packageModel.findByPk(id);

    if (!dataPackage) {
      return res.status(400).json({ error: 'Order not found' });
    }

    await dataPackage.destroy();

    return res.json();
  }
}

export default new PackageController();
