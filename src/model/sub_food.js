import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class sub_food extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    sub_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sub_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sub_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'food',
        key: 'food_id'
      }
    }
  }, {
    sequelize,
    tableName: 'sub_food',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sub_id" },
        ]
      },
      {
        name: "food_id",
        using: "BTREE",
        fields: [
          { name: "food_id" },
        ]
      },
    ]
  });
  }
}
