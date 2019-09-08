"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var node_xlsx_1 = __importDefault(require("node-xlsx"));
var fs_1 = __importDefault(require("fs"));
var conf_1 = __importDefault(require("./conf"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secreatkey_1 = __importDefault(require("./secreatkey"));
var rawdata = node_xlsx_1.default.parse(fs_1.default.readFileSync("" + conf_1.default.dataFile));
var data = rawdata;
for (var sheet in data) {
    for (var rec in data[sheet].data) {
        var record = data[sheet].data[rec];
        var item = {
            token: jsonwebtoken_1.default.sign({
                uuid: record[0],
                generate: (new Date()).valueOf()
            }, secreatkey_1.default),
            title: record[1],
            type: record[2],
            price: record[3],
            imgurl: record[4],
            depreciatione: record[5],
            note: record[6],
            sold: record[7],
        };
        console.log(item);
        post(item);
    }
}
function post(data) {
    var res = node_fetch_1.default(conf_1.default.root + conf_1.default.addItem, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
    }).then(function (response) { return console.log(response.status); });
}
//# sourceMappingURL=index.js.map