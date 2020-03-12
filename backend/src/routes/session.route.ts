import { Router } from 'express';

import validator from '../app/validators/session.validator';
import sessionController from '../app/controllers/session.controller';

class SessionRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.route('/sessions').post(validator, sessionController.store);
  }
}

export default new SessionRouter().router;
