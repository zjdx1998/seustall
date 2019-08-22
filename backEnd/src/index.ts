import webServer from "./webServer";
import data from "./database";
import { Person,PersonInterface } from './role';
var exp = new Person({
	uuid: "zsn",
	password:"9166e526e62603e01719ba3e326ae4e5b7e5d3d1",
	username: "张思宁",
	idcard: "213182034",
	studentid: "04118208",
	address: "T3C",
	avatorurl: "https://avatars2.githubusercontent.com/u/45632558?s=400&v=4",
	verified: false,
	score: 10,
})
console.log(exp.jsonPublic());
console.log(exp.modify({
	uuid: "zsn",
	username: "阿伟"
}));
var dt = new data();
dt.writeGood(
	{
		itemid: "1234567890",
		uuid: "zsn",
		title: "肥宅快乐水",
		type: 1,
		price: 3.5,
		depreciatione: 4,
		imgurl: "none",
		note: "快乐水本体(✿◕‿◕✿)，欲购从速",
		sold: 1
	}
);
// dt.writeUser({
// 	uuid: "zsn",
// 	password: "9166e526e62603e01719ba3e326ae4e5b7e5d3d1",
// 	username: "张思宁",
// 	idcard: "213182034",
// 	studentid: "04118208",
// 	address: "T3C",
// 	avatorurl: "https://avatars2.githubusercontent.com/u/45632558?s=400&v=4",
// 	verified: false,
// 	score: 10,
// });