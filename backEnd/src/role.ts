
export class User
{
	data: any;
	constructor(data: UserInterface)
	{
		this.data = data as any;
	}
	private jsonPrivate(): string
	{
		return JSON.stringify(this.data);
	}

	public jsonPublic(): string
	{
		var temp: any = this.data;
		delete temp.password;
		delete temp.idcard;
		delete temp.studentid;
		delete temp.address;
		return JSON.stringify(this.data);
	}

	public jsonProtect(): string
	{
		var temp: any = this.data;
		delete temp.password;
		// delete temp.idcard;
		// delete temp.studentid;
		// delete temp.address;
		return JSON.stringify(this.data);
	}

	modify(requests: UserInterface): string
	{
		var response = new Object() as any;
		var temp = requests as any;
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
		for (var key in temp)
		{
			if (key.localeCompare('uuid') == 0)
			{ continue; }
			this.data[key] = temp[key];
		}
		response['status'] = 'success';
		return JSON.stringify(response);
	}
}


export class Good
{
	data: GoodInterface;
	constructor(data: GoodInterface)
	{
		this.data = data;
		for (var key in data)
		{
			console.log(key);
		}
	}
	json(): string
	{
		return JSON.stringify(this.data);
	}
}
export interface UserInterface
{
	uuid: string,
	password?: string,
	username?: string,
	idcard?: string,
	studentid?: string,
	address?: string,
	avatorurl?: string,
	verified?: boolean,
	score?: number,
}
export interface GoodInterface
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