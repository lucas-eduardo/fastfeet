import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';

import fileController from '../app/controllers/file.controller';

const upload = multer(multerConfig);

class FileRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router
      .route('/files')
      .post(upload.single('file'), fileController.store);
  }
}

export default new FileRouter().router;
