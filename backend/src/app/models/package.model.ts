/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Sequelize, Model, DataTypes } from 'sequelize';

class Package extends Model<PackageInterface> {
  public id: number;

  public product: string;

  public canceled_at: Date;

  public start_date: Date;

  public end_date: Date;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        product: DataTypes.STRING,
        canceled_at: DataTypes.DATE,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'signature_id', as: 'signature' });
    this.belongsTo(models.Deliveryman, { foreignKey: 'deliveryman_id', as: 'deliveryman' });
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id', as: 'recipient' });
  }
}

export default Package;
