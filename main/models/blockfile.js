'use strict';

module.exports = (sequelize, DataTypes) => {
  const BlockFile = sequelize.define('BlockFile', {
    blockId: DataTypes.INTEGER,
    fileId: DataTypes.INTEGER
  }, {});

  BlockFile.associate = function (models) {
    // associations can be defined here
    BlockFile.belongsTo(models.Block, { foreignKey: 'blockId' })
    BlockFile.belongsTo(models.File, { foreignKey: 'fileId' })
  };
  return BlockFile;
};
