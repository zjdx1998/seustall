/**
 * @author Hanyuu
 * @version 1.0.3
 * @date 2019/09/02
 */
import sequelize from 'sequelize';
export default {
	itemid: {
		type: sequelize.INTEGER,
		primaryKey: false,
		allowNull: false,
	},
	uuid:
	{
		type: sequelize.INTEGER,
		allowNull: false,
	},
}
const indexes =
	[
		{
			name: 'uuid',
			unique: false,
			method: 'BTREE',
			fields: ['uuid'],
		},
		{
			name: 'itemid',
			unique: false,
			fields: ['itemid'],
		}
	]
export { indexes as favoritesIndexes }