import Sequelize from 'sequelize';

const { Model, DataTypes } = Sequelize;

class Token extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: DataTypes.STRING,
        expires_date: DataTypes.DATE,
        refresh_token: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'tokens',
      }
    );
  }
}

export { Token };
