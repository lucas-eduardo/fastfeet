import { Router } from 'express';

import validators from '../app/validators/deliveryProblem.validator';
import deliveryProblemController from '../app/controllers/deliveryProblem.controller';

class DeliveryRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.route('/deliverys').get(deliveryProblemController.index);

    this.router
      .route('/delivery/:id/problems')
      .get(deliveryProblemController.show)
      .post(validators.store, deliveryProblemController.store);

    this.router
      .route('/problem/:id/cancel-delivery')
      .delete(deliveryProblemController.destroy);
  }
}

export default new DeliveryRouter().router;
