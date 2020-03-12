/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Sequelize, Model, DataTypes } from 'sequelize';

class Recipient extends Model<RecipientInterface> {
  public id: number;

  public name: string;

  public street: string;

  public number: number;

  public complement: string;

  public state: string;

  public city: string;

  public zip_code: number;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.INTEGER,
        complement: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        zip_code: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Recipient;
