__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),o=r(d[1]),n=r(d[2]),s=r(d[3]),c=r(d[4]),u=r(d[5]);function l(t,o){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);o&&(s=s.filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable})),n.push.apply(n,s)}return n}r(d[6]);var b=r(d[7]),p=r(d[8]),f=r(d[9]),h=r(d[10]),y=(r(d[11]),r(d[12])),x=r(d[13]),F=(function(t){function l(){return o(this,l),s(this,c(l).apply(this,arguments))}return u(l,t),n(l,[{key:"render",value:function(){var t=this.props,o=t.accessibilityLabel,n=t.color,s=t.onPress,c=t.touchSoundDisabled,u=t.title,l=t.hasTVPreferredFocus,p=t.nextFocusDown,F=t.nextFocusForward,D=t.nextFocusLeft,v=t.nextFocusRight,P=t.nextFocusUp,w=t.disabled,j=t.testID,k=[O.button],C=[O.text];n&&k.push({backgroundColor:n});var E=[];w&&(k.push(O.buttonDisabled),C.push(O.textDisabled),E.push('disabled')),x('string'==typeof u,'The title prop of a Button must be a string');var S=u.toUpperCase(),L=h;return b.createElement(L,{accessibilityLabel:o,accessibilityRole:"button",accessibilityStates:E,hasTVPreferredFocus:l,nextFocusDown:p,nextFocusForward:F,nextFocusLeft:D,nextFocusRight:v,nextFocusUp:P,testID:j,disabled:w,onPress:s,touchSoundDisabled:c},b.createElement(y,{style:k},b.createElement(f,{style:C,disabled:w},S)))}}]),l})(b.Component),O=p.create({button:{elevation:4,backgroundColor:'#2196F3',borderRadius:2},text:(function(o){for(var n=1;n<arguments.length;n++){var s=null!=arguments[n]?arguments[n]:{};n%2?l(s,!0).forEach(function(n){t(o,n,s[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(s)):l(s).forEach(function(t){Object.defineProperty(o,t,Object.getOwnPropertyDescriptor(s,t))})}return o})({textAlign:'center',padding:8},{color:'white',fontWeight:'500'}),buttonDisabled:{elevation:0,backgroundColor:'#dfdfdf'},textDisabled:{color:'#a1a1a1'}});m.exports=F},174,[52,28,29,36,39,42,49,53,56,175,189,197,79,9]);