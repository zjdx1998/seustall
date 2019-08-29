/**
 * @author Hanyuu
 */
import Server from "./webServer";

while (true)
{
	try {
		Server();
	} catch (error) {
		console.error(`[error] fetal error ${error},\n restarting`)
	}
}