import Sequelize from 'sequelize';

const { Model, DataTypes } = Sequelize;

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'users',
      }
    );
  }
}

export { User };
