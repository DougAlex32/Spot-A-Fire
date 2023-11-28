'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Library extends Model {
    static associate(models) {
      Library.belongsTo(models.user, { foreignKey: 'userId' });
      Library.belongsTo(models.Song, { foreignKey: 'songId' });
    }
  }

  Library.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Library',
      tableName: 'Libraries',
    }
  );

  return Library;
};
