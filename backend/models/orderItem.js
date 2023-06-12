'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      modelName: 'OrderItem',
      freezeTableName: true,
      timestamps: true,
    },
  );

  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
  };

  return OrderItem;
};
