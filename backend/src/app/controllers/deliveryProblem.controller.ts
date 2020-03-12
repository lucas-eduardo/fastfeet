// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

import deliveryProblemModel from '../models/deliveryProblem';
import packageModel from '../models/package.model';
import deliverymanModel from '../models/deliveryman.model';
import recipientModel from '../models/recipient.model';

import queueLib from '../../libs/queue';
import cancellationJob from '../jobs/cancellationMail.job';

class DeliverymanController {
  async index(req: Request, res: Response) {
    const deliveryProblems = await deliveryProblemModel.findAll({
      where: {
        '$delivery.end_date$': null,
      },
      include: [
        {
          model: packageModel,
          as: 'delivery',
          include: [
            {
              model: deliverymanModel,
              as: 'deliveryman',
            },
          ],
        },
      ],
      order: [['createdAt', 'desc']],
    });

    return res.json(deliveryProblems);
  }

  async store(req: Request, res: Response) {
    const { id } = req.params;

    const packageDate = await packageModel.findOne({
      where: { id, end_date: null, canceled_at: null },
    });

    if (!packageDate) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const create = await deliveryProblemModel.create({
      delivery_id: id,
      description: req.body.description,
    });

    return res.json(create);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const deliveryProblems = await deliveryProblemModel.findAll({
      where: {
        delivery_id: id,
        '$delivery.end_date$': null,
      },
      include: [
        {
          model: packageModel,
          as: 'delivery',
          include: [
            {
              model: deliverymanModel,
              as: 'deliveryman',
            },
          ],
        },
      ],
    });

    if (!deliveryProblems) {
      return res.status(400).json({ error: 'Order not found problem' });
    }

    return res.json(deliveryProblems);
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    const packageData = await packageModel.findOne({
      where: {
        id,
        end_date: null,
      },
      include: [
        {
          model: recipientModel,
          as: 'recipient',
        },
        {
          model: deliverymanModel,
          as: 'deliveryman',
        },
      ],
    });

    if (!packageData) {
      return res.status(400).json({ error: 'Order not found problem' });
    }

    await packageData.update({ canceled_at: new Date() });

    await queueLib.add(cancellationJob.key, { packageData });

    return res.json();
  }
}

export default new DeliverymanController();
