/* eslint-disable */
import { Sequelize } from 'sequelize';
import { readdirSync } from 'fs';
import { resolve } from 'path';

import dataBaseConfig from '../config/database';

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);

    this.loadsModels(this.connection);
  }

  private loadsModels(conn: Sequelize) {
    const modelsPath = resolve(__dirname, '..', 'app', 'models');
    const modelsInstance = [];

    readdirSync(modelsPath).map((file: string) =>
      modelsInstance.push(require(`${modelsPath}/${file}`).default)
    );

    modelsInstance.map(
      (instance: any) => instance.initialize && instance.initialize(conn)
    );

    modelsInstance.map(
      (instance: any) => instance.associate && instance.associate(conn.models)
    );
  }
}

export default new Database();
