/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Sequelize, Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model<UserInterface> {
  public id: number;

  public name: string;

  public email: string;

  public password: string;

  private password_hash: string;

  static initialize(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
    },
    {
      sequelize,
    });

    return this;
  }

  checkPassword(password: string) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
