/**
 * @author Hanyuu
 * @version 1.0.3
 * @date 2019/09/04
 */
import sequelize from 'sequelize';
export default {
	from:
	{
		type: sequelize.INTEGER,
		allowNull: false,
	},
	to:
	{
		type: sequelize.INTEGER,
		allowNull: false,
	},
	data:
	{
		type: sequelize.STRING,
		allowNull: false,
	},
	fetched:
	{
		type: sequelize.BOOLEAN,
		allowNull: false,
		default: false,
	}
}
const indexes =
	[
		{
			name: 'from',
			unique: false,
			method: 'BTREE',
			fields: ['from'],
		},
		{
			name: 'to',
			unique: false,
			method: 'BTREE',
			fields: ['to'],
		}
	]
export { indexes as chatIndexes }