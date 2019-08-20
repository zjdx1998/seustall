// import sequelize = require("sequelize");
// import { Sequelize } from "sequelize";
let sequelize: any = require('sequelize');
let Sequelize = sequelize.Sequelize;
class data
{
	database = new Sequelize('foof', 'app', 'foof',
		{
			host: 'localhost',
			dialect: 'mysql',
			pool: {
				max: 5,
				min: 0,
				idle: 3000
			}

		});

	goods()
	{
		this.database.authenticate()
			.then(function (err: ExceptionInformation)
			{
				console.log("Connect had been established successfully.")
			}).catch(function (err: ExceptionInformation)
			{
				console.log(err);
			})
		var goooods = this.database.define(
			'goods',
			{
				itemid: {
					type: sequelize.INTEGER,
					primaryKey: true,
				},
				title: sequelize.STRING,
				type: sequelize.INTEGER,
				price: sequelize.DOUBLE,
				depreciatione: sequelize.STRING,
				note: sequelize.STRING
			},
			{
				timestamps: false,
			}
		);
		goooods.create(
			{
				title: "Surface go 4g 64g 二手99新无锁国行未过保",
				type: 3,
				price: 2999.5,
				depreciatione: 3,
				note: "咸鱼是以盐腌渍后，晒干的鱼。以前因为没有低温保鲜技术，鱼很容易腐烂。因此世界各地沿海的渔民都有以此方法保存鱼。在中国古代，咸鱼称作“鲍鱼”，并有“鲍鱼之肆”此一成语（此非现在作为名贵海产的鲍鱼）。广东咸鱼中以马鲛著名，是梅香咸鱼的一种，有浓烈而特别的气味。广东特色菜肴咸鱼鸡粒炒饭便是以此制作。2017年10月27日，世界卫生组织国际癌症研究机构公布的致癌物清单初步整理参考，中式咸鱼 在一类致癌物清单中。"
			}
		);
	}
}
export default data;