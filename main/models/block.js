'use strict';
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define('Block', {
    title: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM,
      values: ['text', 'image', 'audio', 'video']
    },
    description: DataTypes.TEXT,
    bookmark: DataTypes.BOOLEAN,
    collectionId: DataTypes.INTEGER
  }, {});

  // Block.updateTitle = async (id, title) => {
  //   try {
  //     await Block.update({
  //       title: title
  //     }, {
  //       where: { id: id }
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // Block.updateDescription = async (id, des) => {
  //   try {
  //     await Block.update({
  //       description: des
  //     }, {
  //       where: { id: id }
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // Block.updateBookmark = async (id, bookmark) => {
  //   try {
  //     await Block.update({
  //       bookmark: bookmark
  //     }, {
  //       where: { id: id }
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  Block.associate = function (models) {
    // associations can be defined here
    Block.belongsTo(models.Collection, { foreignKey: 'collectionId', as: 'collection' })
    Block.belongsToMany(models.File, { through: 'BlockFile', foreignKey: 'blockId', as: 'files' })
  };
  return Block;
};
