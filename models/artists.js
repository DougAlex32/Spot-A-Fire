'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  artists.init({
    name: DataTypes.STRING,
    popularity: DataTypes.INTEGER,
    type: DataTypes.STRING,
    followers: DataTypes.INTEGER,
    genres: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'artists',
  });
  return artists;
};