/**
 * @author Hanyuu
 */
import sequelize, { Sequelize, ConnectionRefusedError, JSON, where } from 'sequelize';
// The bug of sequelize https://github.com/sequelize/sequelize/issues/9489
let mysql2 = require('mysql2');
import conf from './conf';
import { UserInterface, ItemInterface, User } from './role';
import { ResolvePlugin } from 'webpack';

export default class data
{
	database: Sequelize;
	users: any;
	items: any;
	isConnected: boolean

	constructor()
	{
		this.isConnected = false;
		this.database = new Sequelize(
			conf.datatable,
			conf.username,
			conf.password,
			{
				host: conf.host,
				dialect: 'mysql',
				dialectModule: mysql2,
				pool: {
					max: 5,
					min: 0,
					idle: 1000
				}

			});
		this.connect();
	}

	connect()
	{
		try
		{
			this.database.authenticate()
				.then(function (err: any)
				{
					console.log("[info] connect had been established successfully.")
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
				},
				{
					timestamps: false,
					engine: "Innodb",
					charset: "utf8",
				}
			);
			this.items = this.database.define(
				'goods',
				{
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
					}
				},
				{
					timestamps: false,
					engine: "Innodb",
					charset: "utf8",
				}
			);
			this.database.sync();
		} catch (error)
		{
			console.error("[ERROR] Database connect failed.\n" + error);
			return false;
		}
		console.log("[info] database connect success")
		return true;
	}
	public async writeItem(item: ItemInterface)
	{
		var response = new Object() as any;
		try
		{
			await this.items.create(item);
			response.status = "success";
			return response;
		} catch (error)
		{
			console.error(`[ERROR] failed while writing item\n${error}`);
			response.status = "faliure";
			response.info = "invaild request";
			return response;
		}

	}
	public async writeUser(user: UserInterface)
	{
		var response = new Object() as any;
		try
		{
			const res = await this.queryPhoneNumber(user.phonenumber as number);
			if (res)
			{
				response.status = "failure";
				response.info = "phone number already token"
				return response;
			}
			await this.users.create(user);
			response.status = "success";
			return response;
		} catch (error)
		{
			console.error("[ERROR] Database connect failed.\n" + error);
			response.status = "failure";
			response.info = "invaild request";
			return response;
		}
	}
	public async queryItem(itemid: number)
	{
		try
		{

			const res = await this.items.findOne({
				where:
				{
					itemid
				}
			})
			return this.requestFix(res);
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}
	public async queryUser(uuid: number)
	{
		try
		{
			const res = await this.users.findOne({
				where:
				{
					uuid
				}
			})
			const userRes = new User(res);
			return this.requestFix(userRes.protect());
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}
	private async queryPhoneNumber(phonenumber: number)
	{
		try
		{
			const res = await this.users.findOne({
				where:
				{
					phonenumber
				}
			})
			const userRes = new User(res);
			return res;
		} catch (error)
		{
			console.error(`[ERROR] on query phone number ${error}"`);
			return { status: "failure" };
		}
	}
	public async loginByPhonenumber(body: any)
	{
		var response = new Object() as any;
		try
		{
			const phonenumber = body.phonenumber
			const res: UserInterface = await this.users.findOne({
				where:
				{
					phonenumber
				}
			})
			if (res)
			{
				if (res.password === body.password)
				{
					response.status = "success";
					response.info = new User(res).protect();
					return response;
				}
				response.status = "failure";
				response.info = "password incorrect";
				return response;
			}
			response.status = "failure";
			response.info = "user not found";
			return response;
		} catch (error)
		{
			console.error("[ERROR] Database connect failed.\n" + error);
			response.status = "failure";
			response.info = "bad request";
			return response;
		}
	}
	public async updateAvatorURL(uuid: number, avator: string)
	{
		try
		{
			const queryres:any = await this.queryUser(uuid)
			if (queryres.status == "none")
			{
				return false;
			}
			const res = await this.users.update(
				{
					avatarurl: avator
				}, {
					where:
					{
						uuid
					}
				}
			);
			return true;
		} catch (error)
		{
			return false;
		}
	}
	public async updateImageURL(itemid: number, imgurl: string)
	{
		try
		{
			const queryres: any = await this.queryItem(itemid)
			if (queryres.status == "none")
			{
				return false;
			}
			const res = await this.users.update(
				{
					imgurl
				}, {
					where:
					{
						itemid
					}
				}
			);
			return true;
		} catch (error)
		{
			return false;
		}
	}
	private requestFix(res: any): string
	{
		if (res && res.dataValues)
		{
			res.dataValues.status = 'success';
			return res.dataValues;
		}
		const noneRes: any = new Object();
		noneRes.status = 'none';
		return noneRes;
	}
}