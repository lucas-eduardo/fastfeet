/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Sequelize, Model, DataTypes } from 'sequelize';

class File extends Model {
  public name: string;

  public path: string;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        path: DataTypes.STRING,
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${process.env.BASE_URL_API}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default File;
