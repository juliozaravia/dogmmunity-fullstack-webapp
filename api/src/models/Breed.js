const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('breed', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		height: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		weight: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		life_span: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		origin: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {
		freezeTableName: true,
	});
};