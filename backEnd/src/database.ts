// import sequelize = require("sequelize");
// import { Sequelize } from "sequelize";
let sequelize: any = require('sequelize');
let Sequelize = sequelize.Sequelize;
import { PersonInterface, GoodInterface, Person } from './role';
export default class data
{
	private database = new Sequelize('foof', 'app', 'foof',
		{
			host: 'localhost',
			dialect: 'mysql',
			pool: {
				max: 5,
				min: 0,
				idle: 3000
			}

		});
	users: any;
	goods: any;
	constructor()
	{
		this.database.authenticate()
			.then(function (err: ExceptionInformation)
			{
				console.log("√[info] connect had been established successfully.")
			}).catch(function (err: ExceptionInformation)
			{
				console.log(err);
			});

		this.users = this.database.define(
			'users',
			{
				uuid:
				{
					type: sequelize.STRING,
					primaryKey: true,
				},
				password: sequelize.STRING,
				username: sequelize.STRING,
				idcard: sequelize.STRING,
				studentid: sequelize.STRING,
				address: sequelize.STRING,
				avatorurl: sequelize.STRING,
				verififed: sequelize.INTEGER,
				score: sequelize.INTEGER,
			},
			{
				timestamps: false,
			}
		);
		this.goods = this.database.define(
			'goods',
			{
				itemid: {
					type: sequelize.STRING,
					primaryKey: true,
				},
				uuid: sequelize.STRING,
				title: sequelize.STRING,
				type: sequelize.INTEGER,
				price: sequelize.DOUBLE,
				imgurl: sequelize.STRING,
				depreciatione: sequelize.INTEGER,
				note: sequelize.STRING,
				sold: sequelize.INTEGER
			},
			{
				timestamps: false,
			}
		);
	}

	writeGood(good: GoodInterface)
	{
		this.goods.create(good);
	}
	writeUser(user: PersonInterface)
	{
		this.users.create(user);
	}
}