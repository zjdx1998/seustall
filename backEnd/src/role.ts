/**
 * @author Hanyuu
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
		delete temp.password;
		delete temp.idcard;
		delete temp.studentid;
		delete temp.address;
		return this.data;
	}

	public protect(): UserInterface
	{
		var temp: any = this.data;
		delete temp.password;
		// delete temp.idcard;
		// delete temp.studentid;
		// delete temp.address;
		return this.data;
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
		for (var key in data)
		{
			console.log(key);
		}
	}
	json(): ItemInterface
	{
		return this.data;
	}
}
export interface UserInterface
{
	uuid: string,
	password?: string,
	username?: string,
	phonenumber?:number,
	idcard?: string,
	studentid?: string,
	address?: string,
	avatarurl?: string,
	verified?: boolean,
	score?: number,
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
	sold: number
}
console.log("role module loaded.")