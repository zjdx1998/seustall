/**
 * @author Hanyuu
 * @version 0.0.1
 * @description 验证码中心
 */
import conf from './conf';

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
		var res = new Object() as any;
		if (this.dict[id])
		{
			const timeDelta = (new Date()).valueOf() - (this.dict[id].time).valueOf();
			if (timeDelta < conf.SMSConfig.minInterval)
			{
				res.status = conf.res.failure;
				res.info = conf.except.reqtoofreq;
				return res;
			}
			this.dict[id] = new Record(id, code);
			res.status = conf.res.success;
			res.data = { id, code };
			return res;
		}
		else
		{
			this.dict[id] = new Record(id, code);
			res.status = conf.res.success;
			res.data = { id, code };
			return res;
		}
	}
	public query(id: string, code: string)
	{
		var res = new Object() as any;
		if (this.dict[id])
		{
			if (this.dict[id].code == code)
			{
				res.status = conf.res.success;
				this.clean()
				return res;
			}
			else
			{
				res.status = conf.res.failure;
				res.info = conf.except.badVerifycode;
				return res;
			}
		}
		else
		{
			res.status = conf.res.failure;
			res.info = conf.except.invaildReq;
		}
	}
	public clean()
	{
		for (var i in this.dict)
		{
			if ((this.dict[i].time).valueOf() > conf.SMSConfig.livetime)
			{
				delete this.dict[i]
			}
		}
	}
}

export var verifyCenter: VerifyCenter;