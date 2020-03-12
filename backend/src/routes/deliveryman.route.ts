/* eslint-disable comma-dangle */
import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth.middleware';

import validatorsDeliveryManPackage from '../app/validators/deliveryManPackage.validator';
import validatorsDeliveryMan from '../app/validators/deliveryMan.validator';

import deliverymanController from '../app/controllers/deliveryman.controller';
import deliverymanPackageController from '../app/controllers/deliverymanPackage.controller';

class DeliverymanRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router
      .route('/deliverymans')
      .get(authMiddleware, deliverymanController.index)
      .post(
        authMiddleware,
        validatorsDeliveryMan.store,
        deliverymanController.store
      );

    this.router
      .route('/deliverymans/:id')
      .get(deliverymanController.show)
      .put(
        authMiddleware,
        validatorsDeliveryMan.update,
        deliverymanController.update
      )
      .delete(authMiddleware, deliverymanController.destroy);

    this.router
      .route('/deliveryman/:id/deliveries')
      .get(deliverymanPackageController.index);

    this.router
      .route('/deliveryman/:id/deliveries/:idPackage')
      .get(deliverymanPackageController.show)
      .put(
        validatorsDeliveryManPackage.update,
        deliverymanPackageController.update
      );
  }
}

export default new DeliverymanRouter().router;
