'use strict';

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
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
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'Review',
      freezeTableName: true,
      timestamps: true,
    },
  );

  Review.associate = function (models) {
    Review.belongsTo(models.Product, { foreignKey: 'productId' });
    Review.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Review;
};
