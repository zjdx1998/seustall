/**
 * @name role
 * @author Hanyuu Furude
 * @description .
 * - ??????
 * - ????
 * - ????
 */

/**
 * @description
 *   ????????
 */
export interface PersonInterface
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
/**
 * @description .
 * 	- ????
 * @todo .
 *  - ????
 *  - ????
 *  - etc
 */
export class Person
{
	data: any;
	constructor(data: PersonInterface)
	{
		this.data = data as any;
	}
	/**
	 * @param none
	 * @returns .
	 * - string : json
	 * @description .
	 *   - ?????????json
	 *   - **????????????????**
	 */
	private jsonPrivate(): string
	{
		return JSON.stringify(this.data);
	}
	/**
	 * @param none
	 * @returns .
	 * - string : json
	 * @description .
	 *   - ?????????json
	 */
	public jsonPublic(): string
	{
		var temp: any = this.data;
		delete temp.password;
		delete temp.idcard;
		delete temp.studentid;
		delete temp.address;
		return JSON.stringify(this.data);
	}
	/**
	 * @param none
	 * @returns .
	 * - string : json
	 * @description .
	 *   - ?????????json
	 *   - **?????????????**
	 */
	public jsonProtect(): string
	{
		var temp: any = this.data;
		delete temp.password;
		// delete temp.idcard;
		// delete temp.studentid;
		// delete temp.address;
		return JSON.stringify(this.data);
	}
	/**
	 * @param modify requests:PersonInterface
	 * @returns json:string
	 * @description
	 */
	modify(requests: PersonInterface): string
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


export interface GoodInterface
{
	itemid: string,
	uuid: string,
	title: string,
	type: number,
	price: number,
	imgurl: string,
	depreciatione: number,
	note: string,
	sold: number
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
	jsonPrivate(): string
	{
		return JSON.stringify(this.data);
	}
	json(): string
	{
		return JSON.stringify(this.data);
	}
}
console.log("role module loaded.")