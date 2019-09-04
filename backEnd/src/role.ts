/**
 * @author Hanyuu
 * @version 1.0.3
 * @date 2019/09/02
 */
export class User
{
	data: UserInterface;
	constructor(data: UserInterface)
	{
		this.data = data as any;
	}
	private jsonPrivate(): UserInterface
	{
		return this.data;
	}

	public public(): UserInterface
	{
		var temp: any = this.data;
		temp.password = undefined;
		temp.idcard = undefined;
		temp.studentid = undefined;
		temp.address = undefined;
		temp.phonenumber = undefined;
		return temp;
	}

	public protect(): UserInterface
	{
		var temp: any = this.data;
		temp.password = undefined;
		return temp;
	}

	modify(requests: UserInterface): string
	{
		var response = new Object() as any;
		var temp = requests as UserInterface;
		if (requests['uuid'] != this.data['uuid'])
		{
			response['status'] = 'failure';
			response['info'] = 'illegal request';
			return JSON.stringify(response);
		}
		for (var key in temp)
		{
			if (
				key.localeCompare('verified') == 0 ||
				key.localeCompare('score') == 0
			)
			{
				response['status'] = 'bad';
				response['info'] = 'illegal request';
				return JSON.stringify(response);
			}
		}
		//TODO,更新数据库列表
		// for (var key in temp)
		// {
		// 	if (key.localeCompare('uuid') == 0)
		// 	{ continue; }
		// 	this.data[key] = temp[key];
		// }
		response['status'] = 'success';
		return JSON.stringify(response);
	}
}


export class Item
{
	data: ItemInterface;
	constructor(data: ItemInterface)
	{
		this.data = data as any;
		// for (var key in data)
		// {
		// 	// console.log(key);
		// }
	}
	json(): ItemInterface
	{
		return this.data;
	}
}
export interface UserInterface
{
	uuid: number,
	password?: string,
	username?: string,
	phonenumber?: number,
	idcard?: string,
	studentid?: number,
	address?: string,
	avatarurl?: string,
	verified?: boolean,
	score?: number,
	note?: string,
	info?: string
}
export interface ItemInterface
{
	itemid?: number,
	uuid: number,
	title: string,
	type: number,
	price: number,
	imgurl: string,
	depreciatione: number,
	note: string,
	sold: number,
	to:number,
}
export interface favoritesInterface
{
	uuid: number,
	itemid: number,
}
export interface chatInterface
{
	from: number,
	to: number,
	data: string,
	fetched?: boolean,
}