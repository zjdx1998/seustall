/**
 * @author Hanyuu
 * @version 1.0.3
 * @date 2019/09/02
 */
import sequelize from 'sequelize';

export default {
	uuid:
	{
		type: sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	password: {
		type: sequelize.STRING,
		allowNull: false,
	},
	username: {
		type: sequelize.STRING,
		allowNull: false,
	},
	phonenumber: {
		type: sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	idcard: {
		type: sequelize.STRING,
		allowNull: false,
	},
	studentid: {
		type: sequelize.STRING,
		allowNull: false,
	},
	address: {
		type: sequelize.STRING,
		allowNull: false,
	},
	avatarurl: {
		type: sequelize.STRING,
		allowNull: false,
	},
	verified: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	score: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	info: {
		type: sequelize.STRING,
		allowNull: true,
	},

}
const indexes =
	[
		{
			name: 'uuid',
			unique: true,
			method: 'BTREE',
			fields: ['uuid'],
		},
		{
			name: 'phonenumber',
			unique: true,
			method: 'BTREE',
			fields: ['phonenumber'],
		},
	]
export { indexes as userIndexes }