/**
 * @author Hanyuu
 * @version 1.0.3
 * @date 2019/09/02
 */
import sequelize from 'sequelize';
export default {
	itemid: {
		type: sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	uuid:
	{
		type: sequelize.INTEGER,
		allowNull: false,
	},
	title: {
		type: sequelize.STRING,
		allowNull: false,
	},
	type: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	price: {
		type: sequelize.DOUBLE,
		allowNull: false,
	},
	imgurl: {
		type: sequelize.STRING,
		allowNull: false,
	},
	depreciatione: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	note: {
		type: sequelize.STRING,
		allowNull: false
	},
	sold: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	to:
	{
		type: sequelize.INTEGER,
		allowNull:true,
	}
}