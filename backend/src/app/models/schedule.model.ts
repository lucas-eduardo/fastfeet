/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Sequelize, Model, DataTypes } from 'sequelize';

class Schedule extends Model<ScheduleInterface> {
  public day: string;

  public hours: string;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        day: DataTypes.STRING,
        hours: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Schedule;
