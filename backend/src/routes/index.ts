/* eslint-disable */
import { Router } from 'express';
import { readdirSync } from 'fs';
import { basename, join } from 'path';

const initialize = () => {
  const extensions = ['.ts', '.js'];

  const route: Router = Router();

  readdirSync(__dirname)
    .filter(
      (file: string) => file.indexOf('.') !== 0 &&
        file !== basename(__filename) &&
        extensions.includes(file.slice(-3))
    )
    .forEach((file: string) => {
      const fileRouter = require(join(__dirname, file));
      route.use(fileRouter.default);
    });

  return route;
};

export default initialize();
