/**
 * @description file storge
 * @author Hanyuu Furude
 * @version 0.0.0
 * @date 2019/09/08
 */
import conf from './conf';
import fs from 'fs';
import path from 'path';
export function imgClear(uuid: number, itemid: number)
{
	fs.readdir(conf.imgurlfs, function (err, files)
	{
		if (err)
		{
			console.error(err);
			return err;
		}
		files.forEach(function (file)
		{
			// console.log(file);
			var re = new RegExp(`^${uuid}-${itemid}-\\d+\\.jpg$`);
			var res = file.match(re);
			if (res)
			{
				fs.unlink(path.join(conf.imgurlfs, res[0]), function (error)
				{
					if (error)
					{
						console.error(error)
					}
				})
			}
		}
		)
	})
}
