import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth.middleware';
import validators from '../app/validators/package.validator';
import packageController from '../app/controllers/package.controller';

class PackageRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router
      .route('/packages')
      .get(authMiddleware, packageController.index)
      .post(authMiddleware, validators.store, packageController.store);

    this.router
      .route('/packages/:id')
      .get(authMiddleware, packageController.show)
      .put(authMiddleware, validators.update, packageController.update)
      .delete(authMiddleware, packageController.destroy);
  }
}

export default new PackageRoute().router;
