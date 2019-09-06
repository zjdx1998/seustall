/**
 * @author Hanyuu
 * @version 0.0.1
 * @description 验证码中心
 */
class Record
{
	private id: string;
	private code: string;
	private time: Date;

	public constructor(id: string, code: string)
	{
		this.id = id;
		this.code = code;
		this.time = new Date();
	}
}
class VerifyCenter
{
	private dict: any;
	public constructor()
	{
		this.dict = {};
		console.log("verify center constructor called.")
	}
	public push(id: string, code: string)
	{
		if (this.dict.id)
		{

		}
	}
}
export var verifyCenter: VerifyCenter;