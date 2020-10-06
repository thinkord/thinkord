'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: DataTypes.STRING,
    display: DataTypes.BOOLEAN,
    folderId: DataTypes.INTEGER
  }, {})

  // Collection.createOne = async (name, folderId) => {
  //   try {
  //     Collection.create({
  //       collectionName: name,
  //       display: true,
  //       folderId: folderId
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // Collection.updateName = async (id, name) => {
  //   try {
  //     await Collection.update({
  //       name: name
  //     }, {
  //       where: { id: id }
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  Collection.associate = function (models) {
    // associations can be defined here
    Collection.belongsTo(models.Folder, { foreignKey: 'folderId', as: 'folders' })
    Collection.hasMany(models.Block, { foreignKey: 'collectionId', as: 'blocks' })
  };
  return Collection;
};
