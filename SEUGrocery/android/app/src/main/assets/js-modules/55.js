__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;function f(t){if(null===t||void 0===t)throw new TypeError('Object.assign cannot be called with null or undefined');return Object(t)}m.exports=(function(){try{if(!Object.assign)return!1;var n=new String('abc');if(n[5]='de','5'===Object.getOwnPropertyNames(n)[0])return!1;for(var o={},c=0;c<10;c++)o['_'+String.fromCharCode(c)]=c;if('0123456789'!==Object.getOwnPropertyNames(o).map(function(t){return o[t]}).join(''))return!1;var f={};return'abcdefghijklmnopqrst'.split('').forEach(function(t){f[t]=t}),'abcdefghijklmnopqrst'===Object.keys(t({},f)).join('')}catch(t){return!1}})()?Object.assign:function(t,u){for(var s,b,l=f(t),p=1;p<arguments.length;p++){for(var j in s=Object(arguments[p]))o.call(s,j)&&(l[j]=s[j]);if(n){b=n(s);for(var O=0;O<b.length;O++)c.call(s,b[O])&&(l[b[O]]=s[b[O]])}}return l}},55,[17]);