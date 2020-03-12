/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
import './bootstrap';

import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import { resolve } from 'path';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import Youch from 'youch';

import 'express-async-errors';

import './database';

import routes from './routes';

class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(compression());
    this.server.use(helmet());

    if (process.env.NODE_ENV !== 'test') {
      this.server.use(morgan('tiny'));
    }

    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  private routes() {
    this.server.use('/', routes);
  }

  private exceptionHandler() {
    this.server.use(
      async (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        const errors = await new Youch(err, req).toJSON();
        if (process.env.NODE_ENV !== 'prod') {
          return res.status(500).json(errors);
        }
        return res.status(500).json({ error: 'Internal server error' });
      }
    );
  }
}

export default new App().server;
