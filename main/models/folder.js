'use strict';

module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    name: DataTypes.STRING
  }, {});

  Folder.associate = function (models) {
    // associations can be defined here
    Folder.hasMany(models.Collection, { foreignKey: 'folderId', as: 'collections' })
  };
  return Folder;
};
