__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),o=r(d[1]),n=r(d[2]),s=r(d[3]),u=r(d[4]),l=r(d[5]),p=r(d[6]),w=r(d[7]),c=r(d[8]),h=r(d[9]),f=r(d[10]),D=r(d[11]),v=r(d[12]),C=r(d[13]),y=r(d[14]),k=v.getViewManagerConfig('AndroidDrawerLayout').Constants,_=r(d[15]),b=r(d[16]),S=['Idle','Dragging','Settling'],B=(function(D){function k(){var t,o;n(this,k);for(var s=arguments.length,p=new Array(s),w=0;w<s;w++)p[w]=arguments[w];return(o=u(this,(t=l(k)).call.apply(t,[this].concat(p))))._nativeRef=c.createRef(),o.state={statusBarBackgroundColor:null},o._onDrawerSlide=function(t){o.props.onDrawerSlide&&o.props.onDrawerSlide(t),'on-drag'===o.props.keyboardDismissMode&&_()},o._onDrawerOpen=function(){o.props.onDrawerOpen&&o.props.onDrawerOpen()},o._onDrawerClose=function(){o.props.onDrawerClose&&o.props.onDrawerClose()},o._onDrawerStateChanged=function(t){o.props.onDrawerStateChanged&&o.props.onDrawerStateChanged(S[t.nativeEvent.drawerState])},o}return p(k,D),s(k,[{key:"render",value:function(){var n=this.props,s=(n.onDrawerStateChanged,o(n,["onDrawerStateChanged"])),u=w.Version>=21&&this.props.statusBarBackgroundColor,l=c.createElement(C,{style:[L.drawerSubview,{width:this.props.drawerWidth,backgroundColor:this.props.drawerBackgroundColor}],collapsable:!1},this.props.renderNavigationView(),u&&c.createElement(C,{style:L.drawerStatusBar})),p=c.createElement(C,{style:L.mainSubview,collapsable:!1},u&&c.createElement(f,{translucent:!0,backgroundColor:this.props.statusBarBackgroundColor}),u&&c.createElement(C,{style:[L.statusBar,{backgroundColor:this.props.statusBarBackgroundColor}]}),this.props.children);return c.createElement(b,t({},s,{ref:this._nativeRef,drawerWidth:this.props.drawerWidth,drawerPosition:this.props.drawerPosition,drawerLockMode:this.props.drawerLockMode,style:[L.base,this.props.style],onDrawerSlide:this._onDrawerSlide,onDrawerOpen:this._onDrawerOpen,onDrawerClose:this._onDrawerClose,onDrawerStateChanged:this._onDrawerStateChanged}),p,l)}},{key:"openDrawer",value:function(){v.dispatchViewManagerCommand(this._getDrawerLayoutHandle(),v.getViewManagerConfig('AndroidDrawerLayout').Commands.openDrawer,null)}},{key:"closeDrawer",value:function(){v.dispatchViewManagerCommand(this._getDrawerLayoutHandle(),v.getViewManagerConfig('AndroidDrawerLayout').Commands.closeDrawer,null)}},{key:"_getDrawerLayoutHandle",value:function(){return h.findNodeHandle(this._nativeRef.current)}},{key:"blur",value:function(){y(this._nativeRef.current).blur()}},{key:"focus",value:function(){y(this._nativeRef.current).focus()}},{key:"measure",value:function(t){y(this._nativeRef.current).measure(t)}},{key:"measureInWindow",value:function(t){y(this._nativeRef.current).measureInWindow(t)}},{key:"measureLayout",value:function(t,o,n){y(this._nativeRef.current).measureLayout(t,o,n)}},{key:"setNativeProps",value:function(t){y(this._nativeRef.current).setNativeProps(t)}}]),k})(c.Component);B.positions=k.DrawerPosition,B.defaultProps={drawerBackgroundColor:'white'};var L=D.create({base:{flex:1,elevation:16},mainSubview:{position:'absolute',top:0,left:0,right:0,bottom:0},drawerSubview:{position:'absolute',top:0,bottom:0},statusBar:{height:f.currentHeight},drawerStatusBar:{position:'absolute',top:0,left:0,right:0,height:f.currentHeight,backgroundColor:'rgba(0, 0, 0, 0.251)'}});m.exports=B},265,[17,15,28,29,36,39,42,49,53,81,266,56,48,79,188,241,267]);