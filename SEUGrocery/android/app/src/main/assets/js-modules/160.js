__d(function(g,r,i,a,m,e,d){'use strict';var t={.75:'ldpi',1:'mdpi',1.5:'hdpi',2:'xhdpi',3:'xxhdpi',4:'xxxhdpi'};function n(n){if(n.toString()in t)return t[n.toString()];throw new Error('no such scale '+n.toString())}var o=new Set(['gif','jpeg','jpg','png','svg','webp','xml']);function s(t){var n=t.httpServerLocation;return'/'===n[0]&&(n=n.substr(1)),n}m.exports={getAndroidAssetSuffix:n,getAndroidResourceFolderName:function(s,u){if(!o.has(s.type))return'raw';var c=n(u);if(!c)throw new Error("Don't know which android drawable suffix to use for scale: "+u+'\nAsset: '+JSON.stringify(s,null,'\t')+'\nPossible scales are:'+JSON.stringify(t,null,'\t'));return'drawable-'+c},getAndroidResourceIdentifier:function(t){return(s(t)+'/'+t.name).toLowerCase().replace(/\//g,'_').replace(/([^a-z0-9_])/g,'').replace(/^assets_/,'')},getBasePath:s}},160,[]);