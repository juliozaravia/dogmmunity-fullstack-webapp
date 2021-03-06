const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('temperament', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	}, {
		freezeTableName: true,
	});
};