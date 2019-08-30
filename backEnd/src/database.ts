/**
 * @author Hanyuu
 */
import sequelize, { Sequelize, ConnectionRefusedError, JSON, where } from 'sequelize';
// The bug of sequelize https://github.com/sequelize/sequelize/issues/9489
let mysql2 = require('mysql2');
import conf from './conf';
import { UserInterface, ItemInterface, User } from './role';
import { ResolvePlugin } from 'webpack';
import { JsonWebTokenError } from 'jsonwebtoken';
import users from './users';
import items from './items';
import { stack } from 'sequelize/types/lib/utils';


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
		this.database.authenticate()
		.then(function (err: any)
		{
			console.log(conf.except.dbConnT);
		}).catch(function (err: any)
		{
			console.log(err);
			throw Error(conf.except.dbConnF);
		});
		try
		{

			this.users = this.database.define(
				conf.userTableName,users,
				{
					timestamps: false,
					engine: "Innodb",
					charset: "utf8",
				}
			);
			this.items = this.database.define(
				conf.itemTableName,
				items,
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
	/**
	 * @description 写入物品信息
	 */
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
	/**
	 * @description 写入用户信息
	 */
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
	/**
	 * @description 写入物品信息
	 */
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
			return this.responseFix(res);
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}
	/**
	 * @description 查询用户
	 */
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
			return this.responseFix(userRes.public());
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}
	/**
	 * @description 查询用户自身信息
	 */
	public async queryUserSelf(uuid: number)
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
			return this.responseFix(userRes.protect());
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}
	/**
	 * @description 查询电话号码
	 */
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
	/**
	 * @description 电话号码登录
	 */
	public async loginByPhonenumber(phonenumber:string,password:string)
	{
		var response = new Object() as any;
		try
		{
			const res: UserInterface = await this.users.findOne({
				where:
				{
					phonenumber
				}
			})
			if (res)
			{
				if (res.password === password)
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
	/**
	 * @description 更新头像url
	 */
	public async updateAvatorURL(uuid: number, avatar: string)
	{
		try
		{
			const queryres: any = await this.queryUser(uuid)
			if (queryres.status === "none")
			{
				return false;
			}
			const res = await this.users.update(
				{
					avatarurl: avatar
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
	/**
	 * @description 更新用户信息
	 */
	public async updateUser(src:UserInterface)
	{
		try {
			const queryres:any = await this.queryUser(src.uuid)
			if (queryres.status ==="none")
			{
				return false;
			}
			const res = await this.users.update(
				{
					password:src.password,
					username:src.username,
					idcard:src.idcard,
					studentid:src.studentid,
					address:src.address,
					avatarurl:src.avatarurl,
					note:src.note
				},
				{
					where:
					{
						uuid:src.uuid
					}
				}
			)
			return true;
		} catch (error) {
		}
	}
	/**
	 * @description 更新物品信息
	 */
	public async updateItem(src:ItemInterface)
	{
		try {
			const queryres:any = await this.queryItem(src.itemid as number)
			if (queryres.status ==="none")
			{
				return false;
			}
			const res = await this.items.update(
				{
					title:src.title,
					type:src.type,
					price:src.price,
					imgurl:src.imgurl,
					depreciatione:src.depreciatione,
					note:src.note,
				},
				{
					where:
					{
						itemid:src.itemid
					}
				}
			)
			return true;
		} catch (error) {
		}
	}
	/**
	 * @description 发起交易
	 */
	public async tradeItem(itemid:number,uuid:number)
	{
		try {
			const queryres:any = await this.queryItem(itemid as number)
			if (queryres.status ==="none")
			{
				return false;
			}
			const res = await this.items.update(
				{
					sold:uuid
				},
				{
					where:
					{
						itemid:itemid
					}
				}
			)
			return true;
		} catch (error) {
		}
	}
	/**
	 * @description 更新图像URL
	 */
	public async updateImageURL(itemid: number, imgurl: string)
	{
		try
		{
			const queryres: any = await this.queryItem(itemid)
			if (queryres.status == "none")
			{
				return false;
			}
			const res = await this.items.update(
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
	/**
	 * @description 查询用户已发布信息
	 */
	public async queryPublished(uuid: string)
	{
		try
		{
			const res = await this.items.findAll(
				{
					where:
					{
						uuid
					}
				}
			)
			return res;
		} catch (error)
		{
			console.error(`[ERROR] ${error}`);
			return { status: "failure" };
		}
	}
	/**
	 * @description 响应修饰器
	 */
	private responseFix(res: any): string
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