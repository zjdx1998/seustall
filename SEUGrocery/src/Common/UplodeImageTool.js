/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-8-28
*/
/*
 * 使用fetch实现图片上传
 * @param {string} url 接口地址
 * @param {JSON} params body的请求参数
 * @return 返回Promise
 */
export function uploadImage(url,params) {
    let formData = new FormData();
    for (let key in params){
        formData.append(key, params[key]);
    }
    let file = {uri: params.path, type: 'image/jpeg', name: 'image.jpg'};
    formData.append("file0", file);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data;charset=utf-8',
        },
        body: formData,
    }).then((response) => response.json())
}
