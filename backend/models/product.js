'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
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
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      countInStock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      numReviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      modelName: 'Product',
      freezeTableName: true,
      timestamps: true,
    },
  );

  Product.associate = function (models) {
    Product.belongsTo(models.User, { foreignKey: 'userId' });
    Product.hasMany(models.Review, { foreignKey: 'productId' });
  };

  return Product;
};
