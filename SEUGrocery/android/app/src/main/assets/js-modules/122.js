__d(function(g,r,i,a,m,e,d){var t,o;t=this,o=function(t){'use strict';var o={searchParams:'URLSearchParams'in self,iterable:'Symbol'in self&&'iterator'in Symbol,blob:'FileReader'in self&&'Blob'in self&&(function(){try{return new Blob,!0}catch(t){return!1}})(),formData:'FormData'in self,arrayBuffer:'ArrayBuffer'in self};if(o.arrayBuffer)var n=['[object Int8Array]','[object Uint8Array]','[object Uint8ClampedArray]','[object Int16Array]','[object Uint16Array]','[object Int32Array]','[object Uint32Array]','[object Float32Array]','[object Float64Array]'],s=ArrayBuffer.isView||function(t){return t&&n.indexOf(Object.prototype.toString.call(t))>-1};function f(t){if('string'!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError('Invalid character in header field name');return t.toLowerCase()}function h(t){return'string'!=typeof t&&(t=String(t)),t}function u(t){var n={next:function(){var o=t.shift();return{done:void 0===o,value:o}}};return o.iterable&&(n["function"==typeof Symbol?Symbol.iterator:"@@iterator"]=function(){return n}),n}function c(t){this.map={},t instanceof c?t.forEach(function(t,o){this.append(o,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(o){this.append(o,t[o])},this)}function y(t){if(t.bodyUsed)return Promise.reject(new TypeError('Already read'));t.bodyUsed=!0}function l(t){return new Promise(function(o,n){t.onload=function(){o(t.result)},t.onerror=function(){n(t.error)}})}function p(t){var o=new FileReader,n=l(o);return o.readAsArrayBuffer(t),n}function b(t){for(var o=new Uint8Array(t),n=new Array(o.length),s=0;s<o.length;s++)n[s]=String.fromCharCode(o[s]);return n.join('')}function w(t){if(t.slice)return t.slice(0);var o=new Uint8Array(t.byteLength);return o.set(new Uint8Array(t)),o.buffer}function v(){return this.bodyUsed=!1,this._initBody=function(t){var n;this._bodyInit=t,t?'string'==typeof t?this._bodyText=t:o.blob&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:o.formData&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:o.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():o.arrayBuffer&&o.blob&&((n=t)&&DataView.prototype.isPrototypeOf(n))?(this._bodyArrayBuffer=w(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):o.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(t)||s(t))?this._bodyArrayBuffer=w(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText='',this.headers.get('content-type')||('string'==typeof t?this.headers.set('content-type','text/plain;charset=UTF-8'):this._bodyBlob&&this._bodyBlob.type?this.headers.set('content-type',this._bodyBlob.type):o.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set('content-type','application/x-www-form-urlencoded;charset=UTF-8'))},o.blob&&(this.blob=function(){var t=y(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error('could not read FormData body as blob');return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?y(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(p)}),this.text=function(){var t,o,n,s=y(this);if(s)return s;if(this._bodyBlob)return t=this._bodyBlob,o=new FileReader,n=l(o),o.readAsText(t),n;if(this._bodyArrayBuffer)return Promise.resolve(b(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error('could not read FormData body as text');return Promise.resolve(this._bodyText)},o.formData&&(this.formData=function(){return this.text().then(A)}),this.json=function(){return this.text().then(JSON.parse)},this}c.prototype.append=function(t,o){t=f(t),o=h(o);var n=this.map[t];this.map[t]=n?n+', '+o:o},c.prototype.delete=function(t){delete this.map[f(t)]},c.prototype.get=function(t){return t=f(t),this.has(t)?this.map[t]:null},c.prototype.has=function(t){return this.map.hasOwnProperty(f(t))},c.prototype.set=function(t,o){this.map[f(t)]=h(o)},c.prototype.forEach=function(t,o){for(var n in this.map)this.map.hasOwnProperty(n)&&t.call(o,this.map[n],n,this)},c.prototype.keys=function(){var t=[];return this.forEach(function(o,n){t.push(n)}),u(t)},c.prototype.values=function(){var t=[];return this.forEach(function(o){t.push(o)}),u(t)},c.prototype.entries=function(){var t=[];return this.forEach(function(o,n){t.push([n,o])}),u(t)},o.iterable&&(c.prototype["function"==typeof Symbol?Symbol.iterator:"@@iterator"]=c.prototype.entries);var E=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];function _(t,o){var n,s,f=(o=o||{}).body;if(t instanceof _){if(t.bodyUsed)throw new TypeError('Already read');this.url=t.url,this.credentials=t.credentials,o.headers||(this.headers=new c(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,f||null==t._bodyInit||(f=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=o.credentials||this.credentials||'same-origin',!o.headers&&this.headers||(this.headers=new c(o.headers)),this.method=(n=o.method||this.method||'GET',s=n.toUpperCase(),E.indexOf(s)>-1?s:n),this.mode=o.mode||this.mode||null,this.signal=o.signal||this.signal,this.referrer=null,('GET'===this.method||'HEAD'===this.method)&&f)throw new TypeError('Body not allowed for GET or HEAD requests');this._initBody(f)}function A(t){var o=new FormData;return t.trim().split('&').forEach(function(t){if(t){var n=t.split('='),s=n.shift().replace(/\+/g,' '),f=n.join('=').replace(/\+/g,' ');o.append(decodeURIComponent(s),decodeURIComponent(f))}}),o}function x(t,o){o||(o={}),this.type='default',this.status=void 0===o.status?200:o.status,this.ok=this.status>=200&&this.status<300,this.statusText='statusText'in o?o.statusText:'OK',this.headers=new c(o.headers),this.url=o.url||'',this._initBody(t)}_.prototype.clone=function(){return new _(this,{body:this._bodyInit})},v.call(_.prototype),v.call(x.prototype),x.prototype.clone=function(){return new x(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new c(this.headers),url:this.url})},x.error=function(){var t=new x(null,{status:0,statusText:''});return t.type='error',t};var B=[301,302,303,307,308];x.redirect=function(t,o){if(-1===B.indexOf(o))throw new RangeError('Invalid status code');return new x(null,{status:o,headers:{location:t}})},t.DOMException=self.DOMException;try{new t.DOMException}catch(o){t.DOMException=function(t,o){this.message=t,this.name=o;var n=Error(t);this.stack=n.stack},t.DOMException.prototype=Object.create(Error.prototype),t.DOMException.prototype.constructor=t.DOMException}function T(n,s){return new Promise(function(f,h){var u=new _(n,s);if(u.signal&&u.signal.aborted)return h(new t.DOMException('Aborted','AbortError'));var y=new XMLHttpRequest;function l(){y.abort()}y.onload=function(){var t,o,n={status:y.status,statusText:y.statusText,headers:(t=y.getAllResponseHeaders()||'',o=new c,t.replace(/\r?\n[\t ]+/g,' ').split(/\r?\n/).forEach(function(t){var n=t.split(':'),s=n.shift().trim();if(s){var f=n.join(':').trim();o.append(s,f)}}),o)};n.url='responseURL'in y?y.responseURL:n.headers.get('X-Request-URL');var s='response'in y?y.response:y.responseText;f(new x(s,n))},y.onerror=function(){h(new TypeError('Network request failed'))},y.ontimeout=function(){h(new TypeError('Network request failed'))},y.onabort=function(){h(new t.DOMException('Aborted','AbortError'))},y.open(u.method,u.url,!0),'include'===u.credentials?y.withCredentials=!0:'omit'===u.credentials&&(y.withCredentials=!1),'responseType'in y&&o.blob&&(y.responseType='blob'),u.headers.forEach(function(t,o){y.setRequestHeader(o,t)}),u.signal&&(u.signal.addEventListener('abort',l),y.onreadystatechange=function(){4===y.readyState&&u.signal.removeEventListener('abort',l)}),y.send(void 0===u._bodyInit?null:u._bodyInit)})}T.polyfill=!0,self.fetch||(self.fetch=T,self.Headers=c,self.Request=_,self.Response=x),t.Headers=c,t.Request=_,t.Response=x,t.fetch=T,Object.defineProperty(t,'__esModule',{value:!0})},'object'==typeof e&&void 0!==m?o(e):'function'==typeof define&&define.amd?define(['exports'],o):o(t.WHATWGFetch={})},122,[]);