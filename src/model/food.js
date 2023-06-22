import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class food extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    food_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    food_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'food_type',
        key: 'type_id'
      }
    }
  }, {
    sequelize,
    tableName: 'food',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "food_id" },
        ]
      },
      {
        name: "type_id",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
  }
}
