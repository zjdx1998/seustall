__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),n=r(d[1]),o=r(d[2]),s=r(d[3]),l=r(d[4]),u=r(d[5]),p=r(d[6]),c=r(d[7]);function f(t,n){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);n&&(s=s.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),o.push.apply(o,s)}return o}function h(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?f(o,!0).forEach(function(n){c(t,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):f(o).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(o,n))})}return t}var R=r(d[8]),b=r(d[9]),v=r(d[10]),y=r(d[11]),H=r(d[12]),T=r(d[13]),w=r(d[14]),P=r(d[15]),S=r(d[16]),O={top:20,left:20,right:20,bottom:30},x={validAttributes:h({},v.UIView,{isHighlighted:!0,numberOfLines:!0,ellipsizeMode:!0,allowFontScaling:!0,maxFontSizeMultiplier:!0,disabled:!0,selectable:!0,selectionColor:!0,adjustsFontSizeToFit:!0,minimumFontScale:!0,textBreakStrategy:!0,onTextLayout:!0,onInlineViewLayout:!0,dataDetectorType:!0}),directEventTypes:{topTextLayout:{registrationName:'onTextLayout'},topInlineViewLayout:{registrationName:'onInlineViewLayout'}},uiViewClassName:'RCTText'},C=(function(c){function f(){var t,o;n(this,f);for(var p=arguments.length,c=new Array(p),R=0;R<p;R++)c[R]=arguments[R];return(o=s(this,(t=l(f)).call.apply(t,[this].concat(c)))).state=h({},H.Mixin.touchableGetInitialState(),{isHighlighted:!1,createResponderHandlers:o._createResponseHandlers.bind(u(o)),responseHandlers:null}),o}return p(f,c),o(f,[{key:"render",value:function(){var n=this.props;return M(n)&&(n=h({},n,{},this.state.responseHandlers,{isHighlighted:this.state.isHighlighted})),null!=n.selectionColor&&(n=h({},n,{selectionColor:S(n.selectionColor)})),b.createElement(y.Consumer,null,function(o){return o?b.createElement(L,t({},n,{ref:n.forwardedRef})):b.createElement(y.Provider,{value:!0},b.createElement(V,t({},n,{ref:n.forwardedRef})))})}},{key:"_createResponseHandlers",value:function(){var t=this;return{onStartShouldSetResponder:function(){var n=t.props.onStartShouldSetResponder,o=null!=n&&n()||M(t.props);return o&&t._attachTouchHandlers(),o},onResponderGrant:function(n,o){P(t.touchableHandleResponderGrant)(n,o),null!=t.props.onResponderGrant&&t.props.onResponderGrant.call(t,n,o)},onResponderMove:function(n){P(t.touchableHandleResponderMove)(n),null!=t.props.onResponderMove&&t.props.onResponderMove.call(t,n)},onResponderRelease:function(n){P(t.touchableHandleResponderRelease)(n),null!=t.props.onResponderRelease&&t.props.onResponderRelease.call(t,n)},onResponderTerminate:function(n){P(t.touchableHandleResponderTerminate)(n),null!=t.props.onResponderTerminate&&t.props.onResponderTerminate.call(t,n)},onResponderTerminationRequest:function(){var n=t.props.onResponderTerminationRequest;return!!P(t.touchableHandleResponderTerminationRequest)()&&(null==n||n())}}}},{key:"_attachTouchHandlers",value:function(){var t=this;if(null==this.touchableGetPressRectOffset){for(var n in H.Mixin)'function'==typeof H.Mixin[n]&&(this[n]=H.Mixin[n].bind(this));this.touchableHandleActivePressIn=function(){!t.props.suppressHighlighting&&M(t.props)&&t.setState({isHighlighted:!0})},this.touchableHandleActivePressOut=function(){!t.props.suppressHighlighting&&M(t.props)&&t.setState({isHighlighted:!1})},this.touchableHandlePress=function(n){null!=t.props.onPress&&t.props.onPress(n)},this.touchableHandleLongPress=function(n){null!=t.props.onLongPress&&t.props.onLongPress(n)},this.touchableGetPressRectOffset=function(){return null==t.props.pressRetentionOffset?O:t.props.pressRetentionOffset}}}}],[{key:"getDerivedStateFromProps",value:function(t,n){return null==n.responseHandlers&&M(t)?{responseHandlers:n.createResponderHandlers()}:null}}]),f})(b.Component);C.defaultProps={accessible:!0,allowFontScaling:!0,ellipsizeMode:'tail'},C.viewConfig=x;var M=function(t){return null!=t.onPress||null!=t.onLongPress||null!=t.onStartShouldSetResponder},V=w(x.uiViewClassName,function(){return x}),L=null==T.getViewManagerConfig('RCTVirtualText')?V:w('RCTVirtualText',function(){return{validAttributes:h({},v.UIView,{isHighlighted:!0,maxFontSizeMultiplier:!0}),uiViewClassName:'RCTVirtualText'}}),j=b.forwardRef(function(n,o){return b.createElement(C,t({},n,{forwardedRef:o}))});j.displayName='Text',j.propTypes=R,m.exports=j},175,[17,28,29,36,39,38,42,52,176,53,170,180,181,48,152,188,73]);