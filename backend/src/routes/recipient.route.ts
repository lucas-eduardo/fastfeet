import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth.middleware';

import validators from '../app/validators/recipient.validator';
import recipientController from '../app/controllers/recipient.controller';

class RecipientRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router
      .route('/recipients')
      .get(authMiddleware, recipientController.index)
      .post(authMiddleware, validators.store, recipientController.store);

    this.router
      .route('/recipients/:id')
      .get(authMiddleware, recipientController.show)
      .put(authMiddleware, validators.update, recipientController.update)
      .delete(authMiddleware, recipientController.destroy);
  }
}

export default new RecipientRouter().router;
