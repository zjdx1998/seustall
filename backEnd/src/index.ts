/**
 * @author Hanyuu
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