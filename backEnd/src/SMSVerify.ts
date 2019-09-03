/**
 * @author Hanyuu
 * @version 1.0.0
 * @date 2019/09/03
 */
import nodefetch from 'node-fetch';
import conf from './conf';
export default async function (phoneNumber: string, code: string)
{
	return (nodefetch as any)(conf.SMSConfig.host,
		{
			body: `appkey=${conf.SMSConfig.appkey}&phone=${phoneNumber}&zone=${conf.SMSConfig.zone}&code=${code}`,
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'user-agent': 'Mozilla/4.0 MDN Example',
				'content-type': 'text/plain'
			},
			method: 'POST',
			mode: 'cors',
			redirect: 'follow',
			referrer: 'no-referrer',
		}
	).then((response: any) => response.json())

}