/*
  @version: 0.1
  @author: 71117133 zmj
  @date: 2019-9-7
*/


const fetch = require('node-fetch');

const itemUrl = 'http://hanyuu.top:8080/item/'

export function goodsInfo(index) {
    return(
        fetch(itemUrl+String(index))
            .then((response) => response.json())

    )
}
