/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Sequelize, Model, DataTypes } from 'sequelize';

class DeliveryProblem extends Model<DeliveryProblemInterface> {
  public delivery_id: number;

  public description: string;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        description: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Package, { foreignKey: 'delivery_id', as: 'delivery' });
  }
}

export default DeliveryProblem;
