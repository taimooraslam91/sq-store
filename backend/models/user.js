'use strict';
const Helper = require('../utils/helper');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
        validate: {
          notNull: {
            msg: 'Please enter your name',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email address is invalid',
          },
          notNull: {
            msg: 'Please enter your email',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      modelName: 'User',
      freezeTableName: true,
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          const hashedPassword = await Helper.generateHash(user.password);
          user.password = hashedPassword;
        },
      },
    },
  );

  User.associate = function (models) {
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasMany(models.Product, { foreignKey: 'userId' });
    User.hasMany(models.Review, { foreignKey: 'userId' });
  };

  return User;
};
