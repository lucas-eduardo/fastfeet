// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

import fileModel from '../models/file.model';

class FileController {
  async store(req: Request, res: Response) {
    const { originalname: name, filename: path } = req.file;
    const file = await fileModel.create({ name, path });
    return res.json(file);
  }
}

export default new FileController();
