__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]);function o(t,o){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);o&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable})),s.push.apply(s,n)}return s}function s(s){for(var n=1;n<arguments.length;n++){var p=null!=arguments[n]?arguments[n]:{};n%2?o(p,!0).forEach(function(o){t(s,o,p[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(p)):o(p).forEach(function(t){Object.defineProperty(s,t,Object.getOwnPropertyDescriptor(p,t))})}return s}var n=r(d[1]),p=r(d[2]),c=r(d[3]),u=r(d[4]),l=r(d[5]),h=r(d[6]),b=r(d[7]),f=r(d[8]),y=r(d[9]),P=r(d[10]),R=r(d[11]),F=c.shape({type:c.oneOf(['RippleAndroid']),color:c.number,borderless:c.bool}),v=c.shape({type:c.oneOf(['ThemeAttrAndroid']),attribute:c.string.isRequired}),S=c.oneOfType([F,v]),O={top:20,left:20,right:20,bottom:30},T=y({displayName:'TouchableNativeFeedback',propTypes:s({},h.propTypes,{background:S,hasTVPreferredFocus:c.bool,nextFocusDown:c.number,nextFocusForward:c.number,nextFocusLeft:c.number,nextFocusRight:c.number,nextFocusUp:c.number,useForeground:c.bool}),statics:{SelectableBackground:function(){return{type:'ThemeAttrAndroid',attribute:'selectableItemBackground'}},SelectableBackgroundBorderless:function(){return{type:'ThemeAttrAndroid',attribute:'selectableItemBackgroundBorderless'}},Ripple:function(t,o){return{type:'RippleAndroid',color:R(t),borderless:o}},canUseNativeForeground:function(){return n.Version>=23}},mixins:[l.Mixin],getDefaultProps:function(){return{background:this.SelectableBackground()}},getInitialState:function(){return this.touchableGetInitialState()},componentDidMount:function(){P(this.props)},UNSAFE_componentWillReceiveProps:function(t){P(t)},touchableHandleActivePressIn:function(t){this.props.onPressIn&&this.props.onPressIn(t),this._dispatchPressedStateChange(!0),this.pressInLocation&&this._dispatchHotspotUpdate(this.pressInLocation.locationX,this.pressInLocation.locationY)},touchableHandleActivePressOut:function(t){this.props.onPressOut&&this.props.onPressOut(t),this._dispatchPressedStateChange(!1)},touchableHandlePress:function(t){this.props.onPress&&this.props.onPress(t)},touchableHandleLongPress:function(t){this.props.onLongPress&&this.props.onLongPress(t)},touchableGetPressRectOffset:function(){return this.props.pressRetentionOffset||O},touchableGetHitSlop:function(){return this.props.hitSlop},touchableGetHighlightDelayMS:function(){return this.props.delayPressIn},touchableGetLongPressDelayMS:function(){return this.props.delayLongPress},touchableGetPressOutDelayMS:function(){return this.props.delayPressOut},_handleResponderMove:function(t){this.touchableHandleResponderMove(t),this._dispatchHotspotUpdate(t.nativeEvent.locationX,t.nativeEvent.locationY)},_dispatchHotspotUpdate:function(t,o){b.dispatchViewManagerCommand(u.findNodeHandle(this),b.getViewManagerConfig('RCTView').Commands.hotspotUpdate,[t||0,o||0])},_dispatchPressedStateChange:function(t){b.dispatchViewManagerCommand(u.findNodeHandle(this),b.getViewManagerConfig('RCTView').Commands.setPressed,[t])},render:function(){var o,n=p.Children.only(this.props.children),c=n.props.children;l.TOUCH_TARGET_DEBUG&&n.type===f&&(Array.isArray(c)||(c=[c]),c.push(l.renderDebugView({color:'brown',hitSlop:this.props.hitSlop}))),this.props.useForeground&&!T.canUseNativeForeground()&&console.warn("Requested foreground ripple, but it is not available on this version of Android. Consider calling TouchableNativeFeedback.canUseNativeForeground() and using a different Touchable if the result is false.");var u=this.props.useForeground&&T.canUseNativeForeground()?'nativeForegroundAndroid':'nativeBackgroundAndroid',h=s({},n.props,(t(o={},u,this.props.background),t(o,"accessible",!1!==this.props.accessible),t(o,"accessibilityLabel",this.props.accessibilityLabel),t(o,"accessibilityRole",this.props.accessibilityRole),t(o,"accessibilityStates",this.props.accessibilityStates),t(o,"children",c),t(o,"testID",this.props.testID),t(o,"onLayout",this.props.onLayout),t(o,"hitSlop",this.props.hitSlop),t(o,"isTVSelectable",!0),t(o,"nextFocusDown",this.props.nextFocusDown),t(o,"nextFocusForward",this.props.nextFocusForward),t(o,"nextFocusLeft",this.props.nextFocusLeft),t(o,"nextFocusRight",this.props.nextFocusRight),t(o,"nextFocusUp",this.props.nextFocusUp),t(o,"hasTVPreferredFocus",this.props.hasTVPreferredFocus),t(o,"clickable",!1!==this.props.clickable&&void 0!==this.props.onPress&&!this.props.disabled),t(o,"onClick",this.touchableHandlePress),t(o,"onStartShouldSetResponder",this.touchableHandleStartShouldSetResponder),t(o,"onResponderTerminationRequest",this.touchableHandleResponderTerminationRequest),t(o,"onResponderGrant",this.touchableHandleResponderGrant),t(o,"onResponderMove",this._handleResponderMove),t(o,"onResponderRelease",this.touchableHandleResponderRelease),t(o,"onResponderTerminate",this.touchableHandleResponderTerminate),o));return p.cloneElement(n,h)}});m.exports=T},189,[52,49,53,65,81,181,190,48,79,191,195,73]);