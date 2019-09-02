/**
 * @author Hanyuu
 * @version 1.0.0
 * @date 2019/09/02
 */
import Server from "./webServer";

var flag = true;
while (flag)
{
	try {
		Server();
		flag = false;
	} catch (error)
	{
		flag = true;
		console.error(`[error] fetal error ${error},\n restarting`)
	}
}