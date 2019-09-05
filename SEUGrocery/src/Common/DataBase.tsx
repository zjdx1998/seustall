import { AsyncStorage } from 'react-native';

// 设置 item
export async function setItem(key, value) {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
}

// 查询 item
export function getItem(key) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then(data => {
            resolve(JSON.parse(data))
        });
    })
}

// 删除 item
export async function removeItem(key) {
    return await AsyncStorage.removeItem(key)
}

// 修改 item: 只能修改 json 数据,不能直接修改数组数据
export async function mergeItem(key, value) {
    return await AsyncStorage.mergeItem(key, JSON.stringify(value))
}
// 数组删除一个或多个 index:从第几个开始 length:删除几个,默认为1,可不传
export function arrDelete(arr, index, length = 1) {
    let tempArr = arr;
    arr.splice(index, length);
    return tempArr;
}
