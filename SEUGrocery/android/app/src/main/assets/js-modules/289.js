__d(function(g,r,i,a,m,e,d){'use strict';var n,t=r(d[0]),l=r(d[1]),o=(r(d[2]),r(d[3])),u=r(d[4]),s=(r(d[5]),r(d[6])),v=u.forwardRef(function(v,f){var c=s.compose(n.slider,v.style),p=v.onValueChange,C=v.onSlidingComplete,S=l(v,["onValueChange","onSlidingComplete"]),h=p?function(n){null!=n.nativeEvent.fromUser&&n.nativeEvent.fromUser&&p(n.nativeEvent.value)}:null,E=h,V=C?function(n){C(n.nativeEvent.value)}:null;return u.createElement(o,t({},S,{ref:f,style:c,onChange:E,onSlidingComplete:V,onValueChange:h,enabled:!v.disabled,onStartShouldSetResponder:function(){return!0},onResponderTerminationRequest:function(){return!1}}))});v.defaultProps={disabled:!1,value:0,minimumValue:0,maximumValue:1,step:0},n=s.create({slider:{}}),m.exports=v},289,[17,15,49,290,53,81,56]);