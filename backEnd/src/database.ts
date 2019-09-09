/**
 * @author Hanyuu
 * @version 1.0.6
 * @date 2019/09/02
 */
import sequelize, { Sequelize, ConnectionRefusedError, JSON, where } from 'sequelize';
// The bug of sequelize https://github.com/sequelize/sequelize/issues/9489
let mysql2 = require('mysql2');
import conf from './conf';
import
{
	UserInterface, ItemInterface, favoritesInterface, chatInterface,
	User, Item,
} from './role';
import users from './users';
import items from './items';
import favorites, { favoritesIndexes } from './favorites';
import chat, { chatIndexes } from './chat';


export default class data
{
	database: Sequelize;
	users: any;
	items: any;
	favorites: any;
	chat: any;
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
				},
				logging: false,
			});
		this.connect();
	}

	connect()
	{
		this.database.authenticate()
			.then(function (err: any)
			{
				// console.log(conf.except.dbConnT);
			}).catch(function (err: any)
			{
				console.error(err);
				throw Error(conf.except.dbConnF);
			});
		try
		{

			this.users = this.database.define(
				conf.table.users,
				users,
				{
					timestamps: false,
					engine: "Innodb",
					charset: "utf8",
				}
			);
			this.items = this.database.define(
				conf.table.items,
				items,
				{
					timestamps: false,
					engine: "Innodb",
					charset: "utf8",
				}
			);
			this.favorites = this.database.define(
				conf.table.favorites,
				favorites,
				{
					timestamps: false,
					engine: "Innodb",
					charset: "utf8",
				}
			)
			this.chat = this.database.define(
				conf.table.chat,
				chat,
				{
					timestamps: true,
					engine: "Innodb",
					charset: "utf8",
				}
			)
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
		var res = new Object() as any;
		try
		{
			item.to = 0;
			const data = await this.items.create(item);
			res.status = conf.res.success;
			res.data = data;
			return res;
		} catch (error)
		{
			console.error(`[ERROR] failed while writing item\n${error}`);
			res.status = conf.res.failure;
			res.info = "invaild request";
			return res;
		}
	}

	/**
	 * @description 写入用户信息
	 */
	public async writeUser(user: UserInterface)
	{
		var res = new Object() as any;
		try
		{
			const resquery = await this.queryPhoneNumber(user.phonenumber as string);
			if (resquery.data != null)
			{
				res.status = conf.res.failure;
				res.info = "phone number already token"
				return res;
			}
			const data = await this.users.create(user);
			res.status = conf.res.success;
			res.data = data;
			return res;
		} catch (error)
		{
			console.error("[ERROR] Database connect failed.\n" + error);
			res.status = conf.res.failure;
			res.info = "invaild request";
			return res;
		}
	}
	/**
	 * @description 查询物品信息
	 */
	public async queryItem(itemid: number)
	{
		var res = new Object() as any;
		try
		{
			const resquery = await this.items.findOne({
				where:
				{
					itemid
				}
			})
			res = resquery;
			return this.responseFix(res);
		} catch (error)
		{
			res.status = "failure";
			res.info = error;
			return res;
		}
	}
	/**
	 * @description 查询用户
	 */
	public async queryUser(uuid: number)
	{
		var res = new Object() as any;
		try
		{
			const resquery = await this.users.findOne({
				where:
				{
					uuid
				}
			})
			if (resquery)
			{
				const userRes = new User(resquery);
				res = this.responseFix(userRes.public());
				res.status = conf.res.success;
			} else
			{
				res.status = conf.res.failure;
				res.info = conf.except.noUser;
			}

			return res;
		} catch (error)
		{
			console.error(error);
			res.status = conf.res.failure;
			res.info = error;
			return res;
		}
	}
	/**
	 * @description 查询用户自身信息
	 */
	public async queryUserS(uuid: number)
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
	 * @description 查询用户自身信息
	 */
	public async queryUserRaw(uuid: number)
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
			return userRes;
		} catch (error)
		{
			throw new Error("[ERROR] Database connect failed.\n" + error);
		}
	}
	/**
	 * @description 查询电话号码
	 */
	public async queryPhoneNumber(phonenumber: string)
	{
		var res = new Object() as any;
		try
		{
			const resquery = await this.users.findOne({
				where:
				{
					phonenumber
				}
			})
			res.status = conf.res.success;
			res.data = resquery;
			return res;
		} catch (error)
		{
			console.error(error);
			res.status = conf.res.success;
			res.info = error;
			return res;
		}
	}
	/**
	 * @description 电话号码登录
	 */
	public async loginByPhonenumber(phonenumber: string, password: string)
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
					response.status = conf.res.success;
					response.info = new User(res).protect();
					return response;
				}
				response.status = conf.res.failure;
				response.info = "password incorrect";
				return response;
			}
			response.status = conf.res.failure;
			response.info = "user not found";
			return response;
		} catch (error)
		{
			console.error("[ERROR] Database connect failed.\n" + error);
			response.status = conf.res.failure;
			response.info = "bad request";
			return response;
		}
	}

	/**
	 * @description 删除物品
	 */
	public async deleteItem(itemid: number)
	{
		var res = new Object() as any;
		try
		{
			const resquery = await this.queryItem(itemid);
			if (resquery.status == conf.res.success)
			{
				if (resquery.sold > 0)
				{
					res = await this.items.update(
						{ sold: 3 },
						{ where: { itemid } }
					)
				}
				else
				{
					res = await this.items.update(
						{ sold: 3 },
						{ where: { itemid } }
					)
				}
			};
			res.status = conf.res.success;
			res.data = data;
			return res;
		} catch (error)
		{
			console.error(`[ERROR] failed while writing item\n${error}`);
			res.status = conf.res.failure;
			res.info = "invaild request";
			return res;
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
			if (queryres.status == conf.res.failure)
			{
				return false;
			}
			const res = await this.users.update(
				{
					"avatarurl": avatar
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
	public async updateUser(src: UserInterface)
	{
		var res = new Object() as any;
		try
		{
			const resquery: any = await this.queryUser(src.uuid)
			if (resquery.status == conf.res.failure)
			{
				res.status = conf.res.failure;
				res.info = resquery.info;
				return res;
			}
			if (src.password)
			{
				const resupdate = await this.users.update(
					{
						password: src.password,
						username: src.username,
						idcard: src.idcard,
						studentid: src.studentid,
						address: src.address,
						info: src.info,
					},
					{
						where:
						{
							"uuid": src.uuid
						}
					}
				);
				res.status = conf.res.success;
				res.data = resupdate;
				return res;
			} else
			{
				const resupdate = await this.users.update(
					{
						username: src.username,
						idcard: src.idcard,
						studentid: src.studentid,
						address: src.address,
						avatarurl: src.avatarurl,
						info: src.info,
					},
					{
						where:
						{
							"uuid": src.uuid
						}
					}
				);
				res.status = conf.res.success;
				res.data = resupdate;
				return res;
			}
		} catch (error)
		{
			console.error(error)
			res.status = conf.res.failure;
			res.info = error;
			return res;
		}
	}
	/**
	 * @description 更新用户密码 !危险操作，谨慎使用。
	 */
	public async updatepassword(src: UserInterface)
	{
		var res = new Object() as any;
		try
		{
			const queryres: any = await this.queryUser(src.uuid)
			if (queryres.status == conf.res.failure)
			{
				res.status = conf.res.failure;
				res.info = queryres.info;
				return res;
			}
			const resupdate = await this.users.update(
				{
					password: src.password,
				},
				{
					where:
					{
						"uuid": src.uuid
					}
				}
			);

			return true;
		} catch (error)
		{
			console.error(error)
			return false;
		}
	}
	/**
	 * @description 更新物品信息
	 */
	public async updateItem(src: ItemInterface)
	{
		var res = new Object() as any;
		try
		{
			const queryres: any = await this.queryItem(src.itemid as number)
			if (queryres.status === "none")
			{
				res = conf.res.failure;
				res.info = "no item";
				return res;
			}
			const resupdate = await this.items.update(
				{
					"title": src.title,
					"type": src.type,
					"price": src.price,
					"depreciatione": src.depreciatione,
					"note": src.note,
				},
				{
					where:
					{
						"itemid": src.itemid
					}
				}
			)
			res.status = conf.res.success;
			res.data = resupdate;
			return res;
		} catch (error)
		{
			console.error(error)
			res.status = conf.res.failure;
			res.info = error;
			return res;
		}
	}
	/**
	 * @description 发起交易
	 */
	public async tradeItem(itemid: number, uuid: number)
	{
		try
		{
			const queryres: any = await this.queryItem(itemid as number)
			if (queryres.status === "none" || queryres.sold == 2 || queryres.sold == -2)
			{
				return false;
			}
			if (queryres.sold == -1)
			{

				const res = await this.items.update(
					{
						to: uuid,
						sold: -2
					},
					{
						where:
						{
							itemid: itemid
						}
					}
				)
				return true;
			} else if (queryres.sold == 1)
			{
				const res = await this.items.update(
					{
						to: uuid,
						sold: 2
					},
					{
						where:
						{
							itemid: itemid
						}
					}
				)
				return true;
			}
			return false;
		} catch (error)
		{
			console.error(error)
			return false;
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
	 * @description 查看用户完成交易（非自身发布）的商品
	 */
	public async queryFinished(uuid: string)
	{
		try
		{
			const res = await this.items.findAll(
				{
					where:
					{
						to: uuid
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
	 * @description 验证用户身份
	 */
	public async verifyUser(uuid: number)
	{
		const res = await this.queryUserS(uuid);
		if (res)
		{
			const temp = await this.users.update(
				{
					"verified": 1
				},
				{
					where:
					{
						uuid
					}
				}
			).catch((err: any) =>
			{
				console.error(err)
			}
			)
			return true;
		}
		return false;
	}
	/**
	 * @description 收藏夹查询
	 */
	public async favoritesQuery(uuid: number)
	{
		try
		{
			const res = this.favorites.findAll({
				where:
				{
					uuid
				}
			})
			return res;

		} catch (error)
		{
			return [];
		}
	}
	/**
	 * @description 收藏夹批量添加
	 */
	public async favoritesAdd(uuid: string, src: any)
	{
		var res = new Object() as any;
		try
		{

			for (var i in src)
			{
				const itemid = src[i];
				await this.favorites.create(
					{
						uuid,
						itemid
					}
				)
			}
			res.status = conf.res.success;
			return res
		} catch (error)
		{
			res.status = conf.res.failure;
			res.info = error;
			return res;
		}
	}
	/**
	 * @description 收藏夹批量删除
	*/
	public async favoritesDelete(uuid: string, res: any)
	{
		try
		{
			for (var i in res)
			{
				const itemid: any = res[i];
				const waittodelete = await this.favorites.destroy
					(
						{
							where:
							{
								itemid: { [sequelize.Op.eq]: itemid },
								uuid: { [sequelize.Op.eq]: uuid }
							}

						}
					)
			}
			res.status = conf.res.success;
			return res
		} catch (error)
		{
			console.error(error);
			res.status = conf.res.failure;
			res.info = error;
			return res
		}
	}
	/**
	 * @description 添加一个消息记录
	 */
	public async chatPush(from: number, to: number, data: string)
	{
		var res = new Object() as any;
		try
		{
			const resquery = await this.queryUser(to);
			if (resquery.status == conf.res.success)
			{
				const ins: chatInterface =
				{
					from,
					to,
					data,
					fetched: false,
				}
				await this.chat.create(ins);
				res.status = conf.res.success;
				return res;
			} else
			{
				res.status = conf.res.failure;
				res.info = conf.except.noUser;
				return res;
			}
		} catch (error)
		{
			console.error(error);
			res.status = conf.res.failure;
			res.info = error;
			return res;
		}
	}
	/**
	 * @description 查询未读记录
	 */
	public async chatFetchNew(uuid: number)
	{
		var res = new Object() as any;
		try
		{
			const resquery = await this.chat.findAll(
				{
					where:
					{
						to: uuid,
						fetched: false,
					}
				}
			)
			await this.chat.update(
				{
					fetched: true,
				},
				{
					where:
					{
						to: uuid,
						fetched: false,
					}
				}
			)
			res.status = conf.res.success;
			res.data = resquery;
			return res;
		} catch (error)
		{
			console.error(error);
			res.status = conf.res.failure;
			res.info = error;
			return res;
		}
	}
	/**
	 * @description 查询所有记录
	 */
	public async chatFetchAll(uuid: number)
	{
		var res = new Object() as any;
		try
		{
			const resquery = await this.chat.findAll(
				{
					where:
					{
						to: uuid,
					}
				}
			)
			await this.chat.update(
				{
					fetched: true,
				},
				{
					where:
					{
						to: uuid,
						fetched: false,
					}
				}
			)
			res.status = conf.res.success;
			res.data = resquery;
			return res;
		} catch (error)
		{
			console.error(error);
			res.status = conf.res.failure;
			res.info = error;
			return res;
		}
	}
	/**
	 * @description 响应修饰器
	 */
	private responseFix(res: any): string
	{
		if (res && res.dataValues)
		{
			res.dataValues.status = conf.res.success;
			return res.dataValues;
		}
		const noneRes: any = new Object();
		noneRes.status = 'none';
		return noneRes;
	}
}