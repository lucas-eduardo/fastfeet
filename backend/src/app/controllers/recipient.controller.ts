// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { Op } from 'sequelize';

import recipientModel from '../models/recipient.model';

class RecipientController {
  async index(req: Request, res: Response) {
    const { q } = req.query;
    const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

    const recipients = await recipientModel.findAll({
      where,
      order: [['createdAt', 'desc']],
    });

    return res.json(recipients);
  }

  async store(req: Request, res: Response) {
    const recipient: RecipientInterface = req.body;

    const nameExists = await recipientModel.findOne({
      where: { name: recipient.name },
    });

    if (nameExists) {
      return res.status(400).json({ error: 'Name already exists' });
    }

    const create = await recipientModel.create(recipient);

    return res.json(create);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const recipient = await recipientModel.findByPk(id);

    return res.json(recipient);
  }

  async update(req: Request, res: Response) {
    const { name } = req.body;
    const { id } = req.params;
    const recipient = await recipientModel.findByPk(id);

    if (!!name && name !== recipient.name) {
      const nameExists = await recipientModel.findOne({
        where: { name },
      });

      if (nameExists) {
        return res.status(400).json({ error: 'Name already exists' });
      }
    }

    await recipient.update(req.body);

    return res.json({ id: Number(id), name });
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    const existsRecipient = await recipientModel.findByPk(id);

    if (!existsRecipient) {
      return res.status(400).json({ error: 'The recipient does not exist' });
    }

    await existsRecipient.destroy();

    return res.status(200).json();
  }
}

export default new RecipientController();
