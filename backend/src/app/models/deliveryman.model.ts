/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Sequelize, Model, DataTypes } from 'sequelize';

class Deliveryman extends Model<DeliverymanInterface> {
  public name: string;

  public email: string;

  public avatar_id: number;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliveryman;
