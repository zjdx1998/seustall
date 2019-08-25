/**
 * @author Hanyuu
 */
// let sequelize: any = require('sequelize');
import sequelize, { Sequelize } from 'sequelize';
// let Sequelize = sequelize.Sequelize;
import { UserInterface, GoodInterface } from './role';
// The bug of Sequalize https://github.com/sequelize/sequelize/issues/9489
let mysql2 = require('mysql2');


// import { exists } from 'fs';
// import { json } from 'body-parser';
export default class data
{
	database: Sequelize;
	users: any;
	goods: any;
	constructor()
	{
		try
		{


			this.database = new Sequelize('foof', 'app', 'foof',
				{
					host: 'localhost',
					dialect: 'mysql',
					dialectModule:mysql2,
					pool: {
						max: 5,
						min: 0,
						idle: 1000
					}

				});
			this.database.authenticate()
				.then(function (err: any)
				{
					console.log("√[info] connect had been established successfully.")
				}).catch(function (err: any)
				{
					console.log(err);
				});

			this.users = this.database.define(
				'users',
				{
					uuid:
					{
						type: sequelize.INTEGER,
						primaryKey: true,
					},
					password: sequelize.STRING,
					username: sequelize.STRING,
					idcard: sequelize.STRING,
					studentid: sequelize.STRING,
					address: sequelize.STRING,
					avatorurl: sequelize.STRING,
					verified: sequelize.INTEGER,
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
						type: sequelize.INTEGER,
						primaryKey: true,
					},
					uuid: sequelize.INTEGER,
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
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}

	async writeGood(good: GoodInterface)
	{
		try
		{
			await this.goods.create(good);
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}
	async writeUser(user: UserInterface)
	{
		try
		{
			await this.users.create(user);
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}
	async queryGood(itemid: number)
	{
		try
		{

			const res = await this.goods.findOne({
				where:
				{
					itemid
				}
			})
			return this.clientJSON(res);
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}
	async queryUser(uuid: number)
	{
		try
		{
			const res = await this.users.findOne({
				where:
				{
					uuid
				}
			})
			return this.clientJSON(res);
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}
	clientJSON(res: any): string
	{
		if (res && res.dataValues)
		{
			res.dataValues.status = 'success';
			return JSON.stringify(res.dataValues);
		}
		const noneRes: any = new Object();
		noneRes.status = 'none';
		return JSON.stringify(noneRes);
	}
}