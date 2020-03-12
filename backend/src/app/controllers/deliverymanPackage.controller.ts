/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';

import deliverymanModel from '../models/deliveryman.model';
import packageModel from '../models/package.model';
import recipientModel from '../models/recipient.model';
import fileModel from '../models/file.model';

class DeliverymanPackageController {
  async index(req: Request, res: Response) {
    const { id } = req.params;

    const deliveryman = await deliverymanModel.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const { isCanceled, isConcluded } = req.query;

    let where = {};

    where = { deliveryman_id: id };

    if (isCanceled && isCanceled === 'true') {
      const obj = { canceled_at: { [Op.ne]: null } };
      where = { ...where, ...obj };
    } else {
      const obj = { canceled_at: { [Op.eq]: null } };
      where = { ...where, ...obj };
    }

    if (isConcluded && isConcluded === 'true') {
      const obj = { end_date: { [Op.ne]: null } };
      where = { ...where, ...obj };
    } else {
      const obj = { end_date: { [Op.eq]: null } };
      where = { ...where, ...obj };
    }

    const packageData = await packageModel.findAll({
      where,
      include: [
        {
          model: recipientModel,
          as: 'recipient',
        },
        {
          model: fileModel,
          as: 'signature',
        },
      ],
      order: [['createdAt', 'desc']],
    });

    return res.json(packageData);
  }

  async show(req: Request, res: Response) {
    const { id, idPackage } = req.params;

    const deliveryman = await deliverymanModel.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const packageData = await packageModel.findOne({
      where: {
        id: idPackage,
        canceled_at: {
          [Op.eq]: null,
        },
        end_date: {
          [Op.eq]: null,
        },
      },
      include: [
        {
          model: recipientModel,
          as: 'recipient',
        },
        {
          model: fileModel,
          as: 'signature',
        },
      ],
    });

    if (!packageData) {
      return res.status(400).json({ error: 'Package not found' });
    }

    return res.json(packageData);
  }

  async update(req: Request, res: Response) {
    const { id, idPackage } = req.params;

    const deliveryman = await deliverymanModel.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const packagesData = await packageModel.findAll({
      where: {
        end_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });

    if (packagesData.length === 5) {
      return res.status(401).json({ error: 'Limit reached' });
    }

    const packageData = await packageModel.findOne({
      where: {
        id: idPackage,
        start_date: {
          [Op.ne]: null,
        },
        canceled_at: {
          [Op.eq]: null,
        },
        end_date: {
          [Op.eq]: null,
        },
      },
    });

    if (!packageData) {
      return res.status(400).json({ error: 'Package not found' });
    }

    await packageData.update({
      end_date: new Date(),
      signature_id: req.body.signature_id,
    });

    return res.json(packageData);
  }
}

export default new DeliverymanPackageController();
