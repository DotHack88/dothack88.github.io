(function($,window,document,undefined){
(function(init){
	var _rjs=typeof define==="function" && define.amd, 
		_dlp=("https:"==document.location.protocol) ? "https:" : "http:",
		_url="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.11/jquery.mousewheel.min.js";
	if(!_rjs){
		$.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src="+_dlp+"//"+_url+"%3E%3C/script%3E"));
	}
	init();
}(function(){
	var pluginNS="mCustomScrollbar",
		pluginPfx="mCS",
		defaultSelector=".mCustomScrollbar",
		defaults={
			setWidth:false,
			setHeight:false,
			setTop:0,
			setLeft:0,
			axis:"y",
			scrollbarPosition:"inside",
			scrollInertia:950,
			autoDraggerLength:true,
			autoHideScrollbar:false,
			autoExpandScrollbar:false,
			alwaysShowScrollbar:0,
			snapAmount:null,
			snapOffset:0,
			mouseWheel:{
				enable:true,
				scrollAmount:"auto",
				axis:"y",
				preventDefault:false,
				deltaFactor:"auto",
				normalizeDelta:false,
				invert:false,
				disableOver:["select","option","keygen","datalist","textarea"]
			},
			scrollButtons:{ 
				enable:false,
				scrollType:"stepless",
				scrollAmount:"auto"
			},
			keyboard:{ 
				enable:true,
				scrollType:"stepless",
				scrollAmount:"auto"
			},
			contentTouchScroll:25,
			advanced:{
				autoExpandHorizontalScroll:false,
				autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
				updateOnContentResize:true,
				updateOnImageLoad:true,
				updateOnSelectorChange:false,
				releaseDraggableSelectors:false
			},
			theme:"light",
			callbacks:{
				onInit:false,
				onScrollStart:false,
				onScroll:false,
				onTotalScroll:false,
				onTotalScrollBack:false,
				whileScrolling:false,
				onTotalScrollOffset:0,
				onTotalScrollBackOffset:0,
				alwaysTriggerOffsets:true,
				onOverflowY:false,
				onOverflowX:false,
				onOverflowYNone:false,
				onOverflowXNone:false
			},
			live:false,
			liveSelector:null
		},

		totalInstances=0, 
		liveTimers={}, 
		removeLiveTimers=function(selector){
			if(liveTimers[selector]){
				clearTimeout(liveTimers[selector]);
				functions._delete.call(null,liveTimers[selector]);
			}
		},
		oldIE=(window.attachEvent && !window.addEventListener) ? 1 : 0, 
		touchActive=false, 
		
		methods={
			
			init:function(options){
				
				var options=$.extend(true,{},defaults,options),
					selector=functions._selector.call(this); 
				if(options.live){
					var liveSelector=options.liveSelector || this.selector || defaultSelector, 
						$liveSelector=$(liveSelector);
					if(options.live==="off"){
						removeLiveTimers(liveSelector);
						return;
					}
					liveTimers[liveSelector]=setTimeout(function(){
						$liveSelector.mCustomScrollbar(options);
						if(options.live==="once" && $liveSelector.length){
							removeLiveTimers(liveSelector);
						}
					},500);
				}else{
					removeLiveTimers(liveSelector);
				}
				
				options.setWidth=(options.set_width) ? options.set_width : options.setWidth;
				options.setHeight=(options.set_height) ? options.set_height : options.setHeight;
				options.axis=(options.horizontalScroll) ? "x" : functions._findAxis.call(null,options.axis);
				options.scrollInertia=options.scrollInertia>0 && options.scrollInertia<17 ? 17 : options.scrollInertia;
				if(typeof options.mouseWheel!=="object" &&  options.mouseWheel==true){ 
					options.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}
				}
				options.mouseWheel.scrollAmount=!options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
				options.mouseWheel.normalizeDelta=!options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
				options.scrollButtons.scrollType=functions._findScrollButtonsType.call(null,options.scrollButtons.scrollType); 
				
				functions._theme.call(null,options);
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if(!$this.data(pluginPfx)){
					
						$this.data(pluginPfx,{
							idx:++totalInstances, 
							opt:options,
							scrollRatio:{y:null,x:null}, 
							overflowed:null,
							contentReset:{y:null,x:null}, 
							bindEvents:false,
							tweenRunning:false, 
							sequential:{},
							langDir:$this.css("direction"), 
							cbOffsets:null,
							
							trigger:null
						});
						
						var o=$this.data(pluginPfx).opt,
							htmlDataAxis=$this.data("mcs-axis"),htmlDataSbPos=$this.data("mcs-scrollbar-position"),htmlDataTheme=$this.data("mcs-theme");
						if(htmlDataAxis){o.axis=htmlDataAxis;}
						if(htmlDataSbPos){o.scrollbarPosition=htmlDataSbPos;} 
						if(htmlDataTheme){
							o.theme=htmlDataTheme;
							functions._theme.call(null,o); 
						}
						
						functions._pluginMarkup.call(this); 
						
						methods.update.call(null,$this); 
					
					}
					
				});
				
			},
			update:function(el){
				
				var selector=el || functions._selector.call(this);
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){
						
						var d=$this.data(pluginPfx),o=d.opt,
							mCSB_container=$("#mCSB_"+d.idx+"_container"),
							mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
						
						if(!mCSB_container.length){return;}
						
						if(d.tweenRunning){functions._stop.call(null,$this);} 
						if($this.hasClass("mCS_disabled")){$this.removeClass("mCS_disabled");}
						if($this.hasClass("mCS_destroyed")){$this.removeClass("mCS_destroyed");}
						
						functions._maxHeight.call(this); 
						
						functions._expandContentHorizontally.call(this); 
						
						if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
							mCSB_container.css("width",functions._contentWidth(mCSB_container.children()));
						}
						
						d.overflowed=functions._overflowed.call(this); 
						
						functions._scrollbarVisibility.call(this); 
						if(o.autoDraggerLength){functions._setDraggerLength.call(this);}
						
						functions._scrollRatio.call(this); 
						
						functions._bindEvents.call(this);
						
						var to=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)];
						if(o.axis!=="x"){
							if(!d.overflowed[0]){
								functions._resetContentPosition.call(this); 
								if(o.axis==="y"){
									functions._unbindEvents.call(this);
								}else if(o.axis==="yx" && d.overflowed[1]){
									functions._scrollTo.call(this,$this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
								}
							}else if(mCSB_dragger[0].height()>mCSB_dragger[0].parent().height()){
								functions._resetContentPosition.call(this); 
							}else{ 
								functions._scrollTo.call(this,$this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
								d.contentReset.y=null;
							}
						}
						if(o.axis!=="y"){
							if(!d.overflowed[1]){
								functions._resetContentPosition.call(this); 
								if(o.axis==="x"){
									functions._unbindEvents.call(this);
								}else if(o.axis==="yx" && d.overflowed[0]){
									functions._scrollTo.call(this,$this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
								}
							}else if(mCSB_dragger[1].width()>mCSB_dragger[1].parent().width()){
								functions._resetContentPosition.call(this);
							}else{
								functions._scrollTo.call(this,$this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
								d.contentReset.x=null;
							}
						}
						
						functions._autoUpdate.call(this); 
						
					}
					
				});
				
			},
			scrollTo:function(val,options){
				
				if(typeof val=="undefined" || val==null){return;}
				
				var selector=functions._selector.call(this); 
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){
					
						var d=$this.data(pluginPfx),o=d.opt,
							methodDefaults={
								trigger:"external",
								scrollInertia:o.scrollInertia, 
								scrollEasing:"mcsEaseInOut", 
								moveDragger:false,
								timeout:60,
								callbacks:true,
								onStart:true,
								onUpdate:true,
								onComplete:true
							},
							methodOptions=$.extend(true,{},methodDefaults,options),
							to=functions._arr.call(this,val),dur=methodOptions.scrollInertia>0 && methodOptions.scrollInertia<17 ? 17 : methodOptions.scrollInertia;
						
						to[0]=functions._to.call(this,to[0],"y");
						to[1]=functions._to.call(this,to[1],"x");
						if(methodOptions.moveDragger){
							to[0]*=d.scrollRatio.y;
							to[1]*=d.scrollRatio.x;
						}
						
						methodOptions.dur=dur;
						
						setTimeout(function(){ 
							if(to[0]!==null && typeof to[0]!=="undefined" && o.axis!=="x" && d.overflowed[0]){
								methodOptions.dir="y";
								methodOptions.overwrite="all";
								functions._scrollTo.call(this,$this,to[0].toString(),methodOptions);
							}
							if(to[1]!==null && typeof to[1]!=="undefined" && o.axis!=="y" && d.overflowed[1]){ 
								methodOptions.dir="x";
								methodOptions.overwrite="none";
								functions._scrollTo.call(this,$this,to[1].toString(),methodOptions);
							}
						},methodOptions.timeout);
						
					}
					
				});
				
			},
			stop:function(){
				
				var selector=functions._selector.call(this); 
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ 
										
						functions._stop.call(null,$this);
					
					}
					
				});
				
			},
			disable:function(r){
				
				var selector=functions._selector.call(this); 
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ 
						
						var d=$this.data(pluginPfx),o=d.opt;
						
						functions._autoUpdate.call(this,"remove");
						
						functions._unbindEvents.call(this);
						
						if(r){functions._resetContentPosition.call(this);} 
						
						functions._scrollbarVisibility.call(this,true); 
						
						$this.addClass("mCS_disabled"); 
					
					}
					
				});
				
			},

			destroy:function(){
				
				var selector=functions._selector.call(this); 
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ 
					
						var d=$this.data(pluginPfx),o=d.opt,
							mCustomScrollBox=$("#mCSB_"+d.idx),
							mCSB_container=$("#mCSB_"+d.idx+"_container"),
							scrollbar=$(".mCSB_"+d.idx+"_scrollbar");
					
						if(o.live){removeLiveTimers(selector);}
						
						functions._autoUpdate.call(this,"remove"); 
						
						functions._unbindEvents.call(this);
						
						functions._resetContentPosition.call(this); 
						
						$this.removeData(pluginPfx);
						
						functions._delete.call(null,this.mcs); 
						
						mCustomScrollBox.replaceWith(mCSB_container.contents());
						$this.removeClass(pluginNS+" _"+pluginPfx+"_"+d.idx+" mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed");
					
					}
					
				});
				
			}
			
		},
	
		functions={
			
			_selector:function(){
				return (typeof $(this)!=="object" || $(this).length<1) ? defaultSelector : this;
			},
			_theme:function(obj){
				var fixedSizeScrollbarThemes=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],
					nonExpandedScrollbarThemes=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],
					disabledScrollButtonsThemes=["minimal","minimal-dark"],
					enabledAutoHideScrollbarThemes=["minimal","minimal-dark"],
					scrollbarPositionOutsideThemes=["minimal","minimal-dark"];
				obj.autoDraggerLength=$.inArray(obj.theme,fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
				obj.autoExpandScrollbar=$.inArray(obj.theme,nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
				obj.scrollButtons.enable=$.inArray(obj.theme,disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
				obj.autoHideScrollbar=$.inArray(obj.theme,enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
				obj.scrollbarPosition=$.inArray(obj.theme,scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
			},
			_findAxis:function(val){
				return (val==="yx" || val==="xy" || val==="auto") ? "yx" : (val==="x" || val==="horizontal") ? "x" : "y";
			},
			_findScrollButtonsType:function(val){
				return (val==="stepped" || val==="pixels" || val==="step" || val==="click") ? "stepped" : "stepless";
			},
			_pluginMarkup:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					expandClass=o.autoExpandScrollbar ? " mCSB_scrollTools_onDrag_expand" : "",
					scrollbar=["<div id='mCSB_"+d.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+expandClass+"'><div class='mCSB_draggerContainer'><div id='mCSB_"+d.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+d.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+expandClass+"'><div class='mCSB_draggerContainer'><div id='mCSB_"+d.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
					wrapperClass=o.axis==="yx" ? "mCSB_vertical_horizontal" : o.axis==="x" ? "mCSB_horizontal" : "mCSB_vertical",
					scrollbars=o.axis==="yx" ? scrollbar[0]+scrollbar[1] : o.axis==="x" ? scrollbar[1] : scrollbar[0],
					contentWrapper=o.axis==="yx" ? "<div id='mCSB_"+d.idx+"_container_wrapper' class='mCSB_container_wrapper' />" : "",
					autoHideClass=o.autoHideScrollbar ? " mCS-autoHide" : "",
					scrollbarDirClass=(o.axis!=="x" && d.langDir==="rtl") ? " mCS-dir-rtl" : "";
				if(o.setWidth){$this.css("width",o.setWidth);}
				if(o.setHeight){$this.css("height",o.setHeight);} 
				o.setLeft=(o.axis!=="y" && d.langDir==="rtl") ? "989999px" : o.setLeft; 
				$this.addClass(pluginNS+" _"+pluginPfx+"_"+d.idx+autoHideClass+scrollbarDirClass).wrapInner("<div id='mCSB_"+d.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+wrapperClass+"'><div id='mCSB_"+d.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir="+d.langDir+" /></div>");
				var mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container");
				if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
					mCSB_container.css("width",functions._contentWidth(mCSB_container.children()));
				}
				if(o.scrollbarPosition==="outside"){
					if($this.css("position")==="static"){
						$this.css("position","relative");
					}
					$this.css("overflow","visible");
					mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
				}else{
					mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
					mCSB_container.wrap(contentWrapper);
				}
				functions._scrollButtons.call(this); 
				var mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
				mCSB_dragger[0].css("min-height",mCSB_dragger[0].height());
				mCSB_dragger[1].css("min-width",mCSB_dragger[1].width());
			},
			_contentWidth:function(el){
				return Math.max.apply(Math,el.map(function(){return $(this).outerWidth(true);}).get());
			},
			_expandContentHorizontally:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCSB_container=$("#mCSB_"+d.idx+"_container");
				if(o.advanced.autoExpandHorizontalScroll && o.axis!=="y"){
					mCSB_container.css({"position":"absolute","width":"auto"})
						.wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
						.css({
							
							"width":(Math.ceil(mCSB_container[0].getBoundingClientRect().right+0.4)-Math.floor(mCSB_container[0].getBoundingClientRect().left)),
							"position":"relative"
						}).unwrap();
				}
			},
			_scrollButtons:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCSB_scrollTools=$(".mCSB_"+d.idx+"_scrollbar:first"),
					btnHTML=[
						"<a href='#' class='mCSB_buttonUp' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonDown' oncontextmenu='return false;' />",
						"<a href='#' class='mCSB_buttonLeft' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonRight' oncontextmenu='return false;' />"
					],
					btn=[(o.axis==="x" ? btnHTML[2] : btnHTML[0]),(o.axis==="x" ? btnHTML[3] : btnHTML[1]),btnHTML[2],btnHTML[3]];
				if(o.scrollButtons.enable){
					mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
				}
			},
			_maxHeight:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mh=$this.css("max-height"),pct=mh.indexOf("%")!==-1,
					bs=$this.css("box-sizing");
				if(mh!=="none"){
					var val=pct ? $this.parent().height()*parseInt(mh)/100 : parseInt(mh);
					if(bs==="border-box"){val-=(($this.innerHeight()-$this.height())+($this.outerHeight()-$this.innerHeight()));}
					mCustomScrollBox.css("max-height",Math.round(val));
				}
			},
			_setDraggerLength:function(){
				var $this=$(this),d=$this.data(pluginPfx),
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
					ratio=[mCustomScrollBox.height()/mCSB_container.outerHeight(false),mCustomScrollBox.width()/mCSB_container.outerWidth(false)],
					l=[
						parseInt(mCSB_dragger[0].css("min-height")),Math.round(ratio[0]*mCSB_dragger[0].parent().height()),
						parseInt(mCSB_dragger[1].css("min-width")),Math.round(ratio[1]*mCSB_dragger[1].parent().width())
					],
					h=oldIE && (l[1]<l[0]) ? l[0] : l[1],w=oldIE && (l[3]<l[2]) ? l[2] : l[3];
				mCSB_dragger[0].css({
					"height":h,"max-height":(mCSB_dragger[0].parent().height()-10)
				}).find(".mCSB_dragger_bar").css({"line-height":l[0]+"px"});
				mCSB_dragger[1].css({
					"width":w,"max-width":(mCSB_dragger[1].parent().width()-10)
				});
			},
			_scrollRatio:function(){
				var $this=$(this),d=$this.data(pluginPfx),
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
					scrollAmount=[mCSB_container.outerHeight(false)-mCustomScrollBox.height(),mCSB_container.outerWidth(false)-mCustomScrollBox.width()],
					ratio=[
						scrollAmount[0]/(mCSB_dragger[0].parent().height()-mCSB_dragger[0].height()),
						scrollAmount[1]/(mCSB_dragger[1].parent().width()-mCSB_dragger[1].width())
					];
				d.scrollRatio={y:ratio[0],x:ratio[1]};
			},
			_onDragClasses:function(el,action,xpnd){
				var expandClass=xpnd ? "mCSB_dragger_onDrag_expanded" : "",classes=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag"],
					scrollbar=el.closest(".mCSB_scrollTools");
				if(action==="active"){
					el.toggleClass(classes[0]+" "+expandClass); scrollbar.toggleClass(classes[1]); 
					el[0]._draggable=el[0]._draggable ? 0 : 1;
				}else{
					if(!el[0]._draggable){
						if(action==="hide"){
							el.removeClass(classes[0]); scrollbar.removeClass(classes[1]);
						}else{
							el.addClass(classes[0]); scrollbar.addClass(classes[1]);
						}
					}
				}
			},
			_overflowed:function(){
				var $this=$(this),d=$this.data(pluginPfx),
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					contentHeight=d.overflowed==null ? mCSB_container.height() : mCSB_container.outerHeight(false),
					contentWidth=d.overflowed==null ? mCSB_container.width() : mCSB_container.outerWidth(false);
				return [contentHeight>mCustomScrollBox.height(),contentWidth>mCustomScrollBox.width()];
			},
			_resetContentPosition:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
				functions._stop($this);
				if((o.axis!=="x" && !d.overflowed[0]) || (o.axis==="y" && d.overflowed[0])){ 
					mCSB_dragger[0].add(mCSB_container).css("top",0);
					functions._scrollTo($this,"_resetY");
				}
				if((o.axis!=="y" && !d.overflowed[1]) || (o.axis==="x" && d.overflowed[1])){ 
					var cx=dx=0;
					if(d.langDir==="rtl"){
						cx=mCustomScrollBox.width()-mCSB_container.outerWidth(false);
						dx=Math.abs(cx/d.scrollRatio.x);
					}
					mCSB_container.css("left",cx);
					mCSB_dragger[1].css("left",dx);
					functions._scrollTo($this,"_resetX");
				}
			},
			_bindEvents:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt;
				if(!d.bindEvents){ 
					functions._draggable.call(this);
					if(o.contentTouchScroll){functions._contentDraggable.call(this);}
					if(o.mouseWheel.enable){
						function _mwt(){
							mousewheelTimeout=setTimeout(function(){
								if(!$.event.special.mousewheel){
									_mwt();
								}else{
									clearTimeout(mousewheelTimeout);
									functions._mousewheel.call($this[0]);
								}
							},1000);
						}
						var mousewheelTimeout;
						_mwt();
					}
					functions._draggerRail.call(this);
					functions._wrapperScroll.call(this);
					if(o.advanced.autoScrollOnFocus){functions._focus.call(this);}
					if(o.scrollButtons.enable){functions._buttons.call(this);}
					if(o.keyboard.enable){functions._keyboard.call(this);}
					d.bindEvents=true;
				}
			},
			_unbindEvents:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					namespace=pluginPfx+"_"+d.idx,
					sb=".mCSB_"+d.idx+"_scrollbar",
					sel=$("#mCSB_"+d.idx+",#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,"+sb+" .mCSB_draggerContainer,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal,"+sb+">a"),
					mCSB_container=$("#mCSB_"+d.idx+"_container");
				if(o.advanced.releaseDraggableSelectors){sel.add($(o.advanced.releaseDraggableSelectors));}
				if(d.bindEvents){
					$(document).unbind("."+namespace);
					sel.each(function(){
						$(this).unbind("."+namespace);
					});
					clearTimeout($this[0]._focusTimeout); functions._delete.call(null,$this[0]._focusTimeout);
					clearTimeout(d.sequential.step); functions._delete.call(null,d.sequential.step);
					clearTimeout(mCSB_container[0].onCompleteTimeout); functions._delete.call(null,mCSB_container[0].onCompleteTimeout);
					d.bindEvents=false;
				}
			},
			_scrollbarVisibility:function(disabled){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					contentWrapper=$("#mCSB_"+d.idx+"_container_wrapper"),
					content=contentWrapper.length ? contentWrapper : $("#mCSB_"+d.idx+"_container"),
					scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
					mCSB_dragger=[scrollbar[0].find(".mCSB_dragger"),scrollbar[1].find(".mCSB_dragger")];
				if(o.axis!=="x"){
					if(d.overflowed[0] && !disabled){
						scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display","block");
						content.removeClass("mCS_no_scrollbar_y mCS_y_hidden");
					}else{
						if(o.alwaysShowScrollbar){
							if(o.alwaysShowScrollbar!==2){mCSB_dragger[0].add(scrollbar[0].children("a")).css("display","none");}
							content.removeClass("mCS_y_hidden");
						}else{
							scrollbar[0].css("display","none");
							content.addClass("mCS_y_hidden");
						}
						content.addClass("mCS_no_scrollbar_y");
					}
				}
				if(o.axis!=="y"){
					if(d.overflowed[1] && !disabled){
						scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display","block");
						content.removeClass("mCS_no_scrollbar_x mCS_x_hidden");
					}else{
						if(o.alwaysShowScrollbar){
							if(o.alwaysShowScrollbar!==2){mCSB_dragger[1].add(scrollbar[1].children("a")).css("display","none");}
							content.removeClass("mCS_x_hidden");
						}else{
							scrollbar[1].css("display","none");
							content.addClass("mCS_x_hidden");
						}
						content.addClass("mCS_no_scrollbar_x");
					}
				}
				if(!d.overflowed[0] && !d.overflowed[1]){
					$this.addClass("mCS_no_scrollbar");
				}else{
					$this.removeClass("mCS_no_scrollbar");
				}
			},
			_coordinates:function(e){
				var t=e.type;
				switch(t){
					case "pointerdown": case "MSPointerDown": case "pointermove": case "MSPointerMove": case "pointerup": case "MSPointerUp":
						return [e.originalEvent.pageY,e.originalEvent.pageX,false];
						break;
					case "touchstart": case "touchmove": case "touchend":
						var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
							touches=e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
						return [touch.pageY,touch.pageX,touches>1];
						break;
					default:
						return [e.pageY,e.pageX,false];
				}
			},
			_draggable:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					namespace=pluginPfx+"_"+d.idx,
					draggerId=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					mCSB_dragger=$("#"+draggerId[0]+",#"+draggerId[1]),
					draggable,dragY,dragX,
					rds=o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger;
				mCSB_dragger.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
					e.stopImmediatePropagation();
					e.preventDefault();
					if(!functions._mouseBtnLeft(e)){return;}
					touchActive=true;
					if(oldIE){document.onselectstart=function(){return false;}}
					_iframe(false); 
					functions._stop($this);
					draggable=$(this);
					var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left,
						h=draggable.height()+offset.top,w=draggable.width()+offset.left;
					if(y<h && y>0 && x<w && x>0){
						dragY=y; 
						dragX=x;
					}
					functions._onDragClasses(draggable,"active",o.autoExpandScrollbar);

					$(document).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
						if(draggable){
							var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
							if(dragY===y){return;} 
							_drag(dragY,dragX,y,x);
						}
					}).add(rds).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
						if(draggable){
							functions._onDragClasses(draggable,"active",o.autoExpandScrollbar); 
							draggable=null;
						}
						touchActive=false;
						if(oldIE){document.onselectstart=null;}
						_iframe(true);
					});
					
				}).bind("touchmove."+namespace,function(e){
					e.stopImmediatePropagation();
					e.preventDefault();
					var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
					_drag(dragY,dragX,y,x);
				}).bind("mousemove."+namespace,function(e){
					if(draggable){
						var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
						if(dragY===y){return;} 
						_drag(dragY,dragX,y,x);
					}
				});
				$(document).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
					if(draggable){
						var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
						if(dragY===y){return;} 
						_drag(dragY,dragX,y,x);
					}
				}).add(rds).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
					if(draggable){
						functions._onDragClasses(draggable,"active",o.autoExpandScrollbar); 
						draggable=null;
					}
					touchActive=false;
					if(oldIE){document.onselectstart=null;} 
					_iframe(true);
				});
				
				
				
				function _iframe(evt){
					var el=mCSB_container.find("iframe");
					if(!el.length){return;} 
					var val=!evt ? "none" : "auto";
					el.css("pointer-events",val); 
				}
				function _drag(dragY,dragX,y,x){
					mCSB_container[0].idleTimer=o.scrollInertia<233 ? 250 : 0;
					if(draggable.attr("id")===draggerId[1]){
						var dir="x",to=((draggable[0].offsetLeft-dragX)+x)*d.scrollRatio.x;
					}else{
						var dir="y",to=((draggable[0].offsetTop-dragY)+y)*d.scrollRatio.y;
					}
					functions._scrollTo($this,to.toString(),{dir:dir,drag:true});
				}
			},
			_contentDraggable:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					namespace=pluginPfx+"_"+d.idx,
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
					dragY,dragX,touchStartY,touchStartX,touchMoveY=[],touchMoveX=[],startTime,runningTime,endTime,distance,speed,amount,
					durA=0,durB,overwrite=o.axis==="yx" ? "none" : "all",touchIntent=[];
				mCSB_container.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
					if(!functions._pointerTouch(e) || touchActive || functions._coordinates(e)[2]){return;}
					var offset=mCSB_container.offset();
					dragY=functions._coordinates(e)[0]-offset.top;
					dragX=functions._coordinates(e)[1]-offset.left;
					touchIntent=[functions._coordinates(e)[0],functions._coordinates(e)[1]];
				}).bind("touchmove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
					if(!functions._pointerTouch(e) || touchActive || functions._coordinates(e)[2]){return;}
					e.stopImmediatePropagation();
					runningTime=functions._getTime();
					var offset=mCustomScrollBox.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left,
						easing="mcsLinearOut";
					touchMoveY.push(y);
					touchMoveX.push(x);
					touchIntent[2]=Math.abs(functions._coordinates(e)[0]-touchIntent[0]); touchIntent[3]=Math.abs(functions._coordinates(e)[1]-touchIntent[1]);
					if(d.overflowed[0]){
						var limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
							prevent=((dragY-y)>0 && (y-dragY)>-(limit*d.scrollRatio.y) && (touchIntent[3]*2<touchIntent[2] || o.axis==="yx"));
					}
					if(d.overflowed[1]){
						var limitX=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
							preventX=((dragX-x)>0 && (x-dragX)>-(limitX*d.scrollRatio.x) && (touchIntent[2]*2<touchIntent[3] || o.axis==="yx"));
					}
					if(prevent || preventX){e.preventDefault();} /* prevent native document scrolling */
					amount=o.axis==="yx" ? [(dragY-y),(dragX-x)] : o.axis==="x" ? [null,(dragX-x)] : [(dragY-y),null];
					mCSB_container[0].idleTimer=250;
					if(d.overflowed[0]){_drag(amount[0],durA,easing,"y","all",true);}
					if(d.overflowed[1]){_drag(amount[1],durA,easing,"x",overwrite,true);}
				});
				mCustomScrollBox.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
					if(!functions._pointerTouch(e) || touchActive || functions._coordinates(e)[2]){return;}
					e.stopImmediatePropagation();
					functions._stop($this);
					startTime=functions._getTime();
					var offset=mCustomScrollBox.offset();
					touchStartY=functions._coordinates(e)[0]-offset.top;
					touchStartX=functions._coordinates(e)[1]-offset.left;
					touchMoveY=[]; touchMoveX=[];
				}).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
					if(!functions._pointerTouch(e) || touchActive || functions._coordinates(e)[2]){return;}
					e.stopImmediatePropagation();
					endTime=functions._getTime();
					var offset=mCustomScrollBox.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
					if((endTime-runningTime)>30){return;}
					speed=1000/(endTime-startTime);
					var easing="mcsEaseOut",slow=speed<2.5,
						diff=slow ? [touchMoveY[touchMoveY.length-2],touchMoveX[touchMoveX.length-2]] : [0,0];
					distance=slow ? [(y-diff[0]),(x-diff[1])] : [y-touchStartY,x-touchStartX];
					var absDistance=[Math.abs(distance[0]),Math.abs(distance[1])];
					speed=slow ? [Math.abs(distance[0]/4),Math.abs(distance[1]/4)] : [speed,speed];
					var a=[
						Math.abs(mCSB_container[0].offsetTop)-(distance[0]*_m((absDistance[0]/speed[0]),speed[0])),
						Math.abs(mCSB_container[0].offsetLeft)-(distance[1]*_m((absDistance[1]/speed[1]),speed[1]))
					];
					amount=o.axis==="yx" ? [a[0],a[1]] : o.axis==="x" ? [null,a[1]] : [a[0],null];
					durB=[(absDistance[0]*4)+o.scrollInertia,(absDistance[1]*4)+o.scrollInertia];
					var md=parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
					amount[0]=absDistance[0]>md ? amount[0] : 0;
					amount[1]=absDistance[1]>md ? amount[1] : 0;
					if(d.overflowed[0]){_drag(amount[0],durB[0],easing,"y",overwrite,false);}
					if(d.overflowed[1]){_drag(amount[1],durB[1],easing,"x",overwrite,false);}
				});
				function _m(ds,s){
					var r=[s*1.5,s*2,s/1.5,s/2];
					if(ds>90){
						return s>4 ? r[0] : r[3];
					}else if(ds>60){
						return s>3 ? r[3] : r[2];
					}else if(ds>30){
						return s>8 ? r[1] : s>6 ? r[0] : s>4 ? s : r[2];
					}else{
						return s>8 ? s : r[3];
					}
				}
				function _drag(amount,dur,easing,dir,overwrite,drag){
					if(!amount){return;}
					functions._scrollTo($this,amount.toString(),{dur:dur,scrollEasing:easing,dir:dir,overwrite:overwrite,drag:drag});
				}
			},
			_mousewheel:function(){
				var $this=$(this),d=$this.data(pluginPfx);
				if(d){ 
					var o=d.opt,
						namespace=pluginPfx+"_"+d.idx,
						mCustomScrollBox=$("#mCSB_"+d.idx),
						mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
						iframe=$("#mCSB_"+d.idx+"_container").find("iframe"),
						el=mCustomScrollBox 
					if(iframe.length){
						iframe.each(function(){
							var iFobj=this;
							if(_canAccessIFrame(iFobj)){ 
								el=el.add($(iFobj).contents().find("body"));
							}
						});
					}
					el.bind("mousewheel."+namespace,function(e,delta){
						functions._stop($this);
						if(functions._disableMousewheel($this,e.target)){return;} /* disables mouse-wheel when hovering specific elements */
						var deltaFactor=o.mouseWheel.deltaFactor!=="auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor<100) ? 100 : e.deltaFactor || 100;
						if(o.axis==="x" || o.mouseWheel.axis==="x"){
							var dir="x",
								px=[Math.round(deltaFactor*d.scrollRatio.x),parseInt(o.mouseWheel.scrollAmount)],
								amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.width() ? mCustomScrollBox.width()*0.9 : px[0],
								contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetLeft),
								draggerPos=mCSB_dragger[1][0].offsetLeft,
								limit=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
								dlt=e.deltaX || e.deltaY || delta;
						}else{
							var dir="y",
								px=[Math.round(deltaFactor*d.scrollRatio.y),parseInt(o.mouseWheel.scrollAmount)],
								amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.height() ? mCustomScrollBox.height()*0.9 : px[0],
								contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetTop),
								draggerPos=mCSB_dragger[0][0].offsetTop,
								limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
								dlt=e.deltaY || delta;
						}
						if((dir==="y" && !d.overflowed[0]) || (dir==="x" && !d.overflowed[1])){return;}
						if(o.mouseWheel.invert){dlt=-dlt;}
						if(o.mouseWheel.normalizeDelta){dlt=dlt<0 ? -1 : 1;}
						if((dlt>0 && draggerPos!==0) || (dlt<0 && draggerPos!==limit) || o.mouseWheel.preventDefault){
							e.stopImmediatePropagation();
							e.preventDefault();
						}
						functions._scrollTo($this,(contentPos-(dlt*amount)).toString(),{dir:dir});
					});
				}
				function _canAccessIFrame(iframe){
					var html=null;
					try{
						var doc=iframe.contentDocument || iframe.contentWindow.document;
						html=doc.body.innerHTML;
					}catch(err){}
					return(html!==null);
				}
			},
			_disableMousewheel:function(el,target){
				var tag=target.nodeName.toLowerCase(),
					tags=el.data(pluginPfx).opt.mouseWheel.disableOver,
					focusTags=["select","textarea"];
				return $.inArray(tag,tags) > -1 && !($.inArray(tag,focusTags) > -1 && !$(target).is(":focus"));
			},
			_draggerRail:function(){
				var $this=$(this),d=$this.data(pluginPfx),
					namespace=pluginPfx+"_"+d.idx,
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent(),
					mCSB_draggerContainer=$(".mCSB_"+d.idx+"_scrollbar .mCSB_draggerContainer");
				mCSB_draggerContainer.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
					touchActive=true;
				}).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
					touchActive=false;
				}).bind("click."+namespace,function(e){
					if($(e.target).hasClass("mCSB_draggerContainer") || $(e.target).hasClass("mCSB_draggerRail")){
						functions._stop($this);
						var el=$(this),mCSB_dragger=el.find(".mCSB_dragger");
						if(el.parent(".mCSB_scrollTools_horizontal").length>0){
							if(!d.overflowed[1]){return;}
							var dir="x",
								clickDir=e.pageX>mCSB_dragger.offset().left ? -1 : 1,
								to=Math.abs(mCSB_container[0].offsetLeft)-(clickDir*(wrapper.width()*0.9));
						}else{
							if(!d.overflowed[0]){return;}
							var dir="y",
								clickDir=e.pageY>mCSB_dragger.offset().top ? -1 : 1,
								to=Math.abs(mCSB_container[0].offsetTop)-(clickDir*(wrapper.height()*0.9));
						}
						functions._scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
					}
				});
			},
			_focus:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					namespace=pluginPfx+"_"+d.idx,
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent();
				mCSB_container.bind("focusin."+namespace,function(e){
					var el=$(document.activeElement),
						nested=mCSB_container.find(".mCustomScrollBox").length,
						dur=0;
					if(!el.is(o.advanced.autoScrollOnFocus)){return;}
					functions._stop($this);
					clearTimeout($this[0]._focusTimeout);
					$this[0]._focusTimer=nested ? (dur+17)*nested : 0;
					$this[0]._focusTimeout=setTimeout(function(){
						var	to=[el.offset().top-mCSB_container.offset().top,el.offset().left-mCSB_container.offset().left],
							contentPos=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft],
							isVisible=[
								(contentPos[0]+to[0]>=0 && contentPos[0]+to[0]<wrapper.height()-el.outerHeight(false)),
								(contentPos[1]+to[1]>=0 && contentPos[0]+to[1]<wrapper.width()-el.outerWidth(false))
							],
							overwrite=(o.axis==="yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
						if(o.axis!=="x" && !isVisible[0]){
							functions._scrollTo($this,to[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
						}
						if(o.axis!=="y" && !isVisible[1]){
							functions._scrollTo($this,to[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
						}
					},$this[0]._focusTimer);
				});
			},
			_wrapperScroll:function(){
				var $this=$(this),d=$this.data(pluginPfx),
					namespace=pluginPfx+"_"+d.idx,
					wrapper=$("#mCSB_"+d.idx+"_container").parent();
				wrapper.bind("scroll."+namespace,function(e){
					if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){
						$(".mCSB_"+d.idx+"_scrollbar").css("visibility","hidden");
					}
				});
			},
			_buttons:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
					namespace=pluginPfx+"_"+d.idx,
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					sel=".mCSB_"+d.idx+"_scrollbar",
					btn=$(sel+">a");
				btn.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace+" mouseout."+namespace+" pointerout."+namespace+" MSPointerOut."+namespace+" click."+namespace,function(e){
					e.preventDefault();
					if(!functions._mouseBtnLeft(e)){return;} 
                    var btnClass=$(this).attr("class");
					seq.type=o.scrollButtons.scrollType;
					switch(e.type){
						case "mousedown": case "touchstart": case "pointerdown": case "MSPointerDown":
							if(seq.type==="stepped"){return;}
							touchActive=true;
							d.tweenRunning=false;
							_seq("on",btnClass);
							break;
						case "mouseup": case "touchend": case "pointerup": case "MSPointerUp":
						case "mouseout": case "pointerout": case "MSPointerOut":
							if(seq.type==="stepped"){return;}
							touchActive=false;
							if(seq.dir){_seq("off",btnClass);}
							break;
						case "click":
							if(seq.type!=="stepped" || d.tweenRunning){return;}
							_seq("on",btnClass);
							break;
					}
					function _seq(a,c){
						seq.scrollAmount=o.snapAmount || o.scrollButtons.scrollAmount;
						functions._sequentialScroll.call(this,$this,a,c);
					}
				});
			},
			_keyboard:function(){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
					namespace=pluginPfx+"_"+d.idx,
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent(),
					editables="input,textarea,select,datalist,keygen,[contenteditable='true']";
				mCustomScrollBox.attr("tabindex","0").bind("blur."+namespace+" keydown."+namespace+" keyup."+namespace,function(e){
					switch(e.type){
						case "blur":
							if(d.tweenRunning && seq.dir){_seq("off",null);}
							break;
						case "keydown": case "keyup":
							var code=e.keyCode ? e.keyCode : e.which,action="on";
							if((o.axis!=="x" && (code===38 || code===40)) || (o.axis!=="y" && (code===37 || code===39))){
								if(((code===38 || code===40) && !d.overflowed[0]) || ((code===37 || code===39) && !d.overflowed[1])){return;}
								if(e.type==="keyup"){action="off";}
								if(!$(document.activeElement).is(editables)){
									e.preventDefault();
									e.stopImmediatePropagation();
									_seq(action,code);
								}
							}else if(code===33 || code===34){
								if(d.overflowed[0] || d.overflowed[1]){
									e.preventDefault();
									e.stopImmediatePropagation();
								}
								if(e.type==="keyup"){
									functions._stop($this);
									var keyboardDir=code===34 ? -1 : 1;
									if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
										var dir="x",to=Math.abs(mCSB_container[0].offsetLeft)-(keyboardDir*(wrapper.width()*0.9));
									}else{
										var dir="y",to=Math.abs(mCSB_container[0].offsetTop)-(keyboardDir*(wrapper.height()*0.9));
									}
									functions._scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
								}
							}else if(code===35 || code===36){
								if(!$(document.activeElement).is(editables)){
									if(d.overflowed[0] || d.overflowed[1]){
										e.preventDefault();
										e.stopImmediatePropagation();
									}
									if(e.type==="keyup"){
										if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
											var dir="x",to=code===35 ? Math.abs(wrapper.width()-mCSB_container.outerWidth(false)) : 0;
										}else{
											var dir="y",to=code===35 ? Math.abs(wrapper.height()-mCSB_container.outerHeight(false)) : 0;
										}
										functions._scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
									}
								}
							}
							break;
					}
					function _seq(a,c){
						seq.type=o.keyboard.scrollType;
						seq.scrollAmount=o.snapAmount || o.keyboard.scrollAmount;
						if(seq.type==="stepped" && d.tweenRunning){return;}
						functions._sequentialScroll.call(this,$this,a,c);
					}
				});
			},
			_sequentialScroll:function(el,action,trigger){
				var d=el.data(pluginPfx),o=d.opt,seq=d.sequential,
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					once=seq.type==="stepped" ? true : false;
				switch(action){
					case "on":
						seq.dir=[
							(trigger==="mCSB_buttonRight" || trigger==="mCSB_buttonLeft" || trigger===39 || trigger===37 ? "x" : "y"),
							(trigger==="mCSB_buttonUp" || trigger==="mCSB_buttonLeft" || trigger===38 || trigger===37 ? -1 : 1)
						];
						functions._stop(el);
						if(functions._isNumeric(trigger) && seq.type==="stepped"){return;}
						_start(once);
						break;
					case "off":
						_stop();
						if(once || (d.tweenRunning && seq.dir)){
							_start(true);
						}
						break;
				}
				function _start(once){
					var c=seq.type!=="stepped", 
						t=!once ? 1000/60 : c ? o.scrollInertia/1.5 : o.scrollInertia, 
						m=!once ? 2.5 : c ? 7.5 : 40, 
						contentPos=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)],
						ratio=[d.scrollRatio.y>10 ? 10 : d.scrollRatio.y,d.scrollRatio.x>10 ? 10 : d.scrollRatio.x],
						amount=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*(ratio[1]*m)) : contentPos[0]+(seq.dir[1]*(ratio[0]*m)),
						px=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*parseInt(seq.scrollAmount)) : contentPos[0]+(seq.dir[1]*parseInt(seq.scrollAmount)),
						to=seq.scrollAmount!=="auto" ? px : amount,
						easing=!once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
						onComplete=!once ? false : true;
					if(once && t<17){
						to=seq.dir[0]==="x" ? contentPos[1] : contentPos[0];
					}
					functions._scrollTo(el,to.toString(),{dir:seq.dir[0],scrollEasing:easing,dur:t,onComplete:onComplete});
					if(once){
						seq.dir=false;
						return;
					}
					clearTimeout(seq.step);
					seq.step=setTimeout(function(){
						_start();
					},t);
				}
				function _stop(){
					clearTimeout(seq.step);
					functions._stop(el);
				}
			},
			_arr:function(val){
				var o=$(this).data(pluginPfx).opt,vals=[];
				if(typeof val==="function"){val=val();}
				if(!(val instanceof Array)){
					vals[0]=val.y ? val.y : val.x || o.axis==="x" ? null : val;
					vals[1]=val.x ? val.x : val.y || o.axis==="y" ? null : val;
				}else{
					vals=val.length>1 ? [val[0],val[1]] : o.axis==="x" ? [null,val[0]] : [val[0],null];
				}
				if(typeof vals[0]==="function"){vals[0]=vals[0]();}
				if(typeof vals[1]==="function"){vals[1]=vals[1]();}
				return vals;
			},
			_to:function(val,dir){
				if(val==null || typeof val=="undefined"){return;}
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent(),
					t=typeof val;
				if(!dir){dir=o.axis==="x" ? "x" : "y";}
				var contentLength=dir==="x" ? mCSB_container.outerWidth(false) : mCSB_container.outerHeight(false),
					contentOffset=dir==="x" ? mCSB_container.offset().left : mCSB_container.offset().top,
					contentPos=dir==="x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
					cssProp=dir==="x" ? "left" : "top";
				switch(t){
					case "function": 
						return val();
						break;
					case "object":
						if(val.nodeType){ 
							var objOffset=dir==="x" ? $(val).offset().left : $(val).offset().top;
						}else if(val.jquery){ 
							if(!val.length){return;}
							var objOffset=dir==="x" ? val.offset().left : val.offset().top;
						}
						return objOffset-contentOffset;
						break;
					case "string": case "number":
						if(functions._isNumeric.call(null,val)){
							return Math.abs(val);
						}else if(val.indexOf("%")!==-1){
							return Math.abs(contentLength*parseInt(val)/100);
						}else if(val.indexOf("-=")!==-1){ 
							return Math.abs(contentPos-parseInt(val.split("-=")[1]));
						}else if(val.indexOf("+=")!==-1){
							var p=(contentPos+parseInt(val.split("+=")[1]));
							return p>=0 ? 0 : Math.abs(p);
						}else if(val.indexOf("px")!==-1 && functions._isNumeric.call(null,val.split("px")[0])){ /* pixels string value (e.g. "100px") */
							return Math.abs(val.split("px")[0]);
						}else{
							if(val==="top" || val==="left"){
								return 0;
							}else if(val==="bottom"){
								return Math.abs(wrapper.height()-mCSB_container.outerHeight(false));
							}else if(val==="right"){
								return Math.abs(wrapper.width()-mCSB_container.outerWidth(false));
							}else if(val==="first" || val==="last"){
								var obj=mCSB_container.find(":"+val),
									objOffset=dir==="x" ? $(obj).offset().left : $(obj).offset().top;
								return objOffset-contentOffset;
							}else{
								if($(val).length){ 
									var objOffset=dir==="x" ? $(val).offset().left : $(val).offset().top;
									return objOffset-contentOffset;
								}else{
									mCSB_container.css(cssProp,val);
									methods.update.call(null,$this[0]);
									return;
								}
							}
						}
						break;
				}
			},
			_autoUpdate:function(rem){
				var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
					mCSB_container=$("#mCSB_"+d.idx+"_container");
				if(rem){
					clearTimeout(mCSB_container[0].autoUpdate);
					functions._delete.call(null,mCSB_container[0].autoUpdate);
					return;
				}
				var	wrapper=mCSB_container.parent(),
					scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
					scrollbarSize=function(){return [
						scrollbar[0].is(":visible") ? scrollbar[0].outerHeight(true) : 0, 
						scrollbar[1].is(":visible") ? scrollbar[1].outerWidth(true) : 0 
					]},
					oldSelSize=sizesSum(),newSelSize,
					os=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false),wrapper.height(),wrapper.width(),scrollbarSize()[0],scrollbarSize()[1]],ns,
					oldImgsLen=imgSum(),newImgsLen;
				upd();
				function upd(){
					clearTimeout(mCSB_container[0].autoUpdate);
					mCSB_container[0].autoUpdate=setTimeout(function(){
						if(o.advanced.updateOnSelectorChange){
							newSelSize=sizesSum();
							if(newSelSize!==oldSelSize){
								doUpd();
								oldSelSize=newSelSize;
								return;
							}
						}
						if(o.advanced.updateOnContentResize){
							ns=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false),wrapper.height(),wrapper.width(),scrollbarSize()[0],scrollbarSize()[1]];
							if(ns[0]!==os[0] || ns[1]!==os[1] || ns[2]!==os[2] || ns[3]!==os[3] || ns[4]!==os[4] || ns[5]!==os[5]){
								doUpd();
								os=ns;
							}
						}
						if(o.advanced.updateOnImageLoad){
							newImgsLen=imgSum();
							if(newImgsLen!==oldImgsLen){
								mCSB_container.find("img").each(function(){
									imgLoader(this.src);
								});
								oldImgsLen=newImgsLen;
							}
						}
						if(o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad){upd();}
					},60);
				}
				function imgSum(){
					var total=0
					if(o.advanced.updateOnImageLoad){total=mCSB_container.find("img").length;}
					return total;
				}
				function imgLoader(src){
					var img=new Image();
					function createDelegate(contextObject,delegateMethod){
						return function(){return delegateMethod.apply(contextObject,arguments);}
					}
					function imgOnLoad(){
						this.onload=null;
						doUpd();
					}
					img.onload=createDelegate(img,imgOnLoad);
					img.src=src;
				}
				function sizesSum(){
					if(o.advanced.updateOnSelectorChange===true){o.advanced.updateOnSelectorChange="*";}
					var total=0,sel=mCSB_container.find(o.advanced.updateOnSelectorChange);
					if(o.advanced.updateOnSelectorChange && sel.length>0){sel.each(function(){total+=$(this).height()+$(this).width();});}
					return total;
				}
				function doUpd(){
					clearTimeout(mCSB_container[0].autoUpdate); 
					methods.update.call(null,$this[0]);
				}
			},
			_snapAmount:function(to,amount,offset){
				return (Math.round(to/amount)*amount-offset); 
			},
			_stop:function(el){
				var d=el.data(pluginPfx),
					sel=$("#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal");
				sel.each(function(){
					functions._stopTween.call(this);
				});
			},
			_scrollTo:function(el,to,options){
				var d=el.data(pluginPfx),o=d.opt,
					defaults={
						trigger:"internal",
						dir:"y",
						scrollEasing:"mcsEaseOut",
						drag:false,
						dur:o.scrollInertia,
						overwrite:"all",
						callbacks:true,
						onStart:true,
						onUpdate:true,
						onComplete:true
					},
					options=$.extend(defaults,options),
					dur=[options.dur,(options.drag ? 0 : options.dur)],
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_container=$("#mCSB_"+d.idx+"_container"),
					wrapper=mCSB_container.parent(),
					totalScrollOffsets=o.callbacks.onTotalScrollOffset ? functions._arr.call(el,o.callbacks.onTotalScrollOffset) : [0,0],
					totalScrollBackOffsets=o.callbacks.onTotalScrollBackOffset ? functions._arr.call(el,o.callbacks.onTotalScrollBackOffset) : [0,0];
				d.trigger=options.trigger;
				if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){
					$(".mCSB_"+d.idx+"_scrollbar").css("visibility","visible");
					wrapper.scrollTop(0).scrollLeft(0);
				}
				if(to==="_resetY" && !d.contentReset.y){
					if(_cb("onOverflowYNone")){o.callbacks.onOverflowYNone.call(el[0]);}
					d.contentReset.y=1;
				}
				if(to==="_resetX" && !d.contentReset.x){
					if(_cb("onOverflowXNone")){o.callbacks.onOverflowXNone.call(el[0]);}
					d.contentReset.x=1;
				}
				if(to==="_resetY" || to==="_resetX"){return;}
				if((d.contentReset.y || !el[0].mcs) && d.overflowed[0]){
					if(_cb("onOverflowY")){o.callbacks.onOverflowY.call(el[0]);}
					d.contentReset.x=null;
				}
				if((d.contentReset.x || !el[0].mcs) && d.overflowed[1]){
					if(_cb("onOverflowX")){o.callbacks.onOverflowX.call(el[0]);}
					d.contentReset.x=null;
				}
				if(o.snapAmount){to=functions._snapAmount(to,o.snapAmount,o.snapOffset);} 
				switch(options.dir){
					case "x":
						var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_horizontal"),
							property="left",
							contentPos=mCSB_container[0].offsetLeft,
							limit=[
								mCustomScrollBox.width()-mCSB_container.outerWidth(false),
								mCSB_dragger.parent().width()-mCSB_dragger.width()
							],
							scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.x)],
							tso=totalScrollOffsets[1],
							tsbo=totalScrollBackOffsets[1],
							totalScrollOffset=tso>0 ? tso/d.scrollRatio.x : 0,
							totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.x : 0;
						break;
					case "y":
						var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_vertical"),
							property="top",
							contentPos=mCSB_container[0].offsetTop,
							limit=[
								mCustomScrollBox.height()-mCSB_container.outerHeight(false),
								mCSB_dragger.parent().height()-mCSB_dragger.height()
							],
							scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.y)],
							tso=totalScrollOffsets[0],
							tsbo=totalScrollBackOffsets[0],
							totalScrollOffset=tso>0 ? tso/d.scrollRatio.y : 0,
							totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.y : 0;
						break;
				}
				if(scrollTo[1]<0 || (scrollTo[0]===0 && scrollTo[1]===0)){
					scrollTo=[0,0];
				}else if(scrollTo[1]>=limit[1]){
					scrollTo=[limit[0],limit[1]];
				}else{
					scrollTo[0]=-scrollTo[0];
				}
				if(!el[0].mcs){
					_mcs();  
					if(_cb("onInit")){o.callbacks.onInit.call(el[0]);} 
				}
				clearTimeout(mCSB_container[0].onCompleteTimeout);
				if(!d.tweenRunning && ((contentPos===0 && scrollTo[0]>=0) || (contentPos===limit[0] && scrollTo[0]<=limit[0]))){return;}
				functions._tweenTo.call(null,mCSB_dragger[0],property,Math.round(scrollTo[1]),dur[1],options.scrollEasing);
				functions._tweenTo.call(null,mCSB_container[0],property,Math.round(scrollTo[0]),dur[0],options.scrollEasing,options.overwrite,{
					onStart:function(){
						if(options.callbacks && options.onStart && !d.tweenRunning){
							if(_cb("onScrollStart")){_mcs(); o.callbacks.onScrollStart.call(el[0]);}
							d.tweenRunning=true;
							functions._onDragClasses(mCSB_dragger);
							d.cbOffsets=_cbOffsets();
						}
					},onUpdate:function(){
						if(options.callbacks && options.onUpdate){
							if(_cb("whileScrolling")){_mcs(); o.callbacks.whileScrolling.call(el[0]);}
						}
					},onComplete:function(){
						if(options.callbacks && options.onComplete){
							if(o.axis==="yx"){clearTimeout(mCSB_container[0].onCompleteTimeout);}
							var t=mCSB_container[0].idleTimer || 0;
							mCSB_container[0].onCompleteTimeout=setTimeout(function(){
								if(_cb("onScroll")){_mcs(); o.callbacks.onScroll.call(el[0]);}
								if(_cb("onTotalScroll") && scrollTo[1]>=limit[1]-totalScrollOffset && d.cbOffsets[0]){_mcs(); o.callbacks.onTotalScroll.call(el[0]);}
								if(_cb("onTotalScrollBack") && scrollTo[1]<=totalScrollBackOffset && d.cbOffsets[1]){_mcs(); o.callbacks.onTotalScrollBack.call(el[0]);}
								d.tweenRunning=false;
								mCSB_container[0].idleTimer=0;
								functions._onDragClasses(mCSB_dragger,"hide");
							},t);
						}
					}
				});
				function _cb(cb){
					return d && o.callbacks[cb] && typeof o.callbacks[cb]==="function";
				}
				function _cbOffsets(){
					return [o.callbacks.alwaysTriggerOffsets || contentPos>=limit[0]+tso,o.callbacks.alwaysTriggerOffsets || contentPos<=-tsbo];
				}
				function _mcs(){
					var cp=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft], /* content position */
						dp=[mCSB_dragger[0].offsetTop,mCSB_dragger[0].offsetLeft], /* dragger position */
						cl=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false)], /* content length */
						pl=[mCustomScrollBox.height(),mCustomScrollBox.width()]; /* content parent length */
					el[0].mcs={
						content:mCSB_container, /* original content wrapper as jquery object */
						top:cp[0],left:cp[1],draggerTop:dp[0],draggerLeft:dp[1],
						topPct:Math.round((100*Math.abs(cp[0]))/(Math.abs(cl[0])-pl[0])),leftPct:Math.round((100*Math.abs(cp[1]))/(Math.abs(cl[1])-pl[1])),
						direction:options.dir
					};
				}
			},
			_tweenTo:function(el,prop,to,duration,easing,overwrite,callbacks){
				if(!el._malihuTween){el._malihuTween={top:{},left:{}};}
				var callbacks=callbacks || {},
					onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){},
					startTime=functions._getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style,_request,tobj=el._malihuTween[prop];
				if(prop==="left"){from=el.offsetLeft;}
				var diff=to-from;
				tobj.stop=0;
				if(overwrite!=="none"){_cancelTween();}
				_startTween();
				function _step(){
					if(tobj.stop){return;}
					if(!progress){onStart.call();}
					progress=functions._getTime()-startTime;
					_tween();
					if(progress>=tobj.time){
						tobj.time=(progress>tobj.time) ? progress+_delay-(progress-tobj.time) : progress+_delay-1;
						if(tobj.time<progress+1){tobj.time=progress+1;}
					}
					if(tobj.time<duration){tobj.id=_request(_step);}else{onComplete.call();}
				}
				function _tween(){
					if(duration>0){
						tobj.currVal=_ease(tobj.time,from,diff,duration,easing);
						elStyle[prop]=Math.round(tobj.currVal)+"px";
					}else{
						elStyle[prop]=to+"px";
					}
					onUpdate.call();
				}
				function _startTween(){
					_delay=1000/60;
					tobj.time=progress+_delay;
					_request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
					tobj.id=_request(_step);
				}
				function _cancelTween(){
					if(tobj.id==null){return;}
					if(!window.requestAnimationFrame){clearTimeout(tobj.id);
					}else{window.cancelAnimationFrame(tobj.id);}
					tobj.id=null;
				}
				function _ease(t,b,c,d,type){
					switch(type){
						case "linear": case "mcsLinear":
							return c*t/d + b;
							break;
						case "mcsLinearOut":
							t/=d; t--; return c * Math.sqrt(1 - t*t) + b;
							break;
						case "easeInOutSmooth":
							t/=d/2;
							if(t<1) return c/2*t*t + b;
							t--;
							return -c/2 * (t*(t-2) - 1) + b;
							break;
						case "easeInOutStrong":
							t/=d/2;
							if(t<1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
							t--;
							return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
							break;
						case "easeInOut": case "mcsEaseInOut":
							t/=d/2;
							if(t<1) return c/2*t*t*t + b;
							t-=2;
							return c/2*(t*t*t + 2) + b;
							break;
						case "easeOutSmooth":
							t/=d; t--;
							return -c * (t*t*t*t - 1) + b;
							break;
						case "easeOutStrong":
							return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
							break;
						case "easeOut": case "mcsEaseOut": default:
							var ts=(t/=d)*t,tc=ts*t;
							return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
					}
				}
			},
			_getTime:function(){
				if(window.performance && window.performance.now){
					return window.performance.now();
				}else{
					if(window.performance && window.performance.webkitNow){
						return window.performance.webkitNow();
					}else{
						if(Date.now){return Date.now();}else{return new Date().getTime();}
					}
				}
			},
			_stopTween:function(){
				var el=this;
				if(!el._malihuTween){el._malihuTween={top:{},left:{}};}
				if(el._malihuTween.top.id){
					if(!window.requestAnimationFrame){clearTimeout(el._malihuTween.top.id);
					}else{window.cancelAnimationFrame(el._malihuTween.top.id);}
					el._malihuTween.top.id=null;
					el._malihuTween.top.stop=1;
				}
				if(el._malihuTween.left.id){
					if(!window.requestAnimationFrame){clearTimeout(el._malihuTween.left.id);
					}else{window.cancelAnimationFrame(el._malihuTween.left.id);}
					el._malihuTween.left.id=null;
					el._malihuTween.left.stop=1;
				}
			},
			_delete:function(p){
				try{delete p;}catch(e){p=null;}
			},
			_mouseBtnLeft:function(e){
				return !(e.which && e.which!==1);
			},
			_pointerTouch:function(e){
				var t=e.originalEvent.pointerType;
				return !(t && t!=="touch" && t!==2);
			},
			_isNumeric:function(val){
				return !isNaN(parseFloat(val)) && isFinite(val);
			}
			
		};
		
	
	
	
	

	$.fn[pluginNS]=function(method){ 
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};
	$[pluginNS]=function(method){ /* usage: $.mCustomScrollbar(); */
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};
	
	$[pluginNS].defaults=defaults;

	window[pluginNS]=true;
	
	$(window).on("load",function(){
		$(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */
	});

}))}(jQuery,window,document));
