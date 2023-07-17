(function($){
	"use strict";
    $.fn.Video = function(options, callback)
    {
        return(new Video(this, options));
    };
var idleEvents = "mousemove keydown DOMMouseScroll mousewheel mousedown reset.idle";

var defaults = {
	vastUrl:"",								 	 
    googleAnalyticsTrackingCode: "",             
    instanceName:"player1",                      
    instanceTheme:"dark",                        
    autohideControls:5,                          
    hideControlsOnMouseOut:"No",                 
    playerLayout: "fixedSize",                   
    videoPlayerWidth:746,                        
    videoPlayerHeight:420,                      
    videoRatio: 16/9,                            
    videoRatioMobile: 16/9,                            
    videoRatioStretch: false,                    
    iOSPlaysinline: true,                        
    floatPlayerOutsideViewport: false,           
    pauseStickyOutsideViewport: false,           
    lightBox:false,                              
    lightBoxAutoplay: false,                    
    lightBoxThumbnail:"images/preview_images/poster.jpg", 
    lightBoxThumbnailWidth: 400,                
    lightBoxThumbnailHeight: 220,               
    lightBoxCloseOnOutsideClick: true,           
    playlist:"Off",                              
    playlistShowOnlyThumbnails:false,            
    playlistOrder:"",                            
    playlistScrollType:"light",                  
    playlistBehaviourOnPageload:"opened (default)",
    autoplay:false,                              
    colorAccent:"#cc181e",                      
    vimeoColor:"00adef",                         
    youtubeControls:"custom controls",			 
    youtubeSkin:"dark",                          
    youtubeColor:"red",                         
    youtubeQuality:"default",                    
    youtubeShowRelatedVideos:"Yes",				
    videoPlayerShadow:"effect1",                 
    loadRandomVideoOnStart:"No",                 
    shuffle:"No",				                 
    posterImg:"",
    posterImgOnVideoFinish:"",
    onFinish:"Play next video",                  
    nowPlayingText:"Yes",                        
    HTML5VideoQuality:"HD",                      
    HTML5videoThumbnails: "vtt",               
    preloadSelfHosted:"none",                    
    rightClickMenu:true,                        
    hideVideoSource:false,						
    showAllControls:true,						
    allowSkipAd:true,                           
    showAdvertiserName:true,                    
    rewindShow: "Yes", 							
    qualityShow: "Yes",   
	fastForwardShow: "No",                                          
	fastBackwardShow: "No",                                        
	stepFastForward: 5,	
	stepFastBackward: 5,	
    infoShow:"Yes",                             
    shareShow:"Yes",                             
    facebookShow:"Yes",                          
    twitterShow:"Yes",                           
    facebookShareName:"Elite video player",      
    facebookShareLink:"http://codecanyon.net/item/elite-video-player-wordpress-plugin/10496434",  
    facebookShareDescription:"Elite Video Player is stunning, modern, responsive, fully customisable high-end video player for WordPress that support advertising and the most popular video platforms like YouTube, Vimeo or self-hosting videos (mp4).", 
    facebookSharePicture:"https://0.s3.envato.com/files/123866118/preview.jpg", 
    twitterText:"Elite video player",			 
    twitterLink:"http://codecanyon.net/item/elite-video-player-wordpress-plugin/10496434", 
    twitterHashtags:"wordpressvideoplayer",		 
    twitterVia:"Creative media",				 
    logoShow:"Yes",                              
    logoClickable:"Yes",                         
    logoPath:"images/logo/logo.png",             
    logoGoToLink:"http://codecanyon.net/",       
    logoPosition:"bottom-left",                  
    embedShow:"Yes",                            
    embedCodeSrc:"www.yourwebsite.com/videoplayer/index.html", 
    embedCodeW:"746",                            
    embedCodeH:"420",                            
    embedShareLink:"www.yourwebsite.com/videoplayer/index.html", 
    showGlobalPrerollAds: false,                 
    globalPrerollAds: "url1;url2;url3;url4;url5",
    globalPrerollAdsSkipTimer: 5,                
    globalPrerollAdsGotoLink: "http://codecanyon.net/",
    advertisementTitle:"Advertisement",          
    advertiserName:"visitAdvertiser.com",        
    skipAdvertisementText:"Skip advertisement",  
    skipAdText:"You can skip this ad in",        
    mutedNotificationText:"Video has no sound",  
    playBtnTooltipTxt:"Play",                    
    pauseBtnTooltipTxt:"Pause",                  
    rewindBtnTooltipTxt:"Rewind",                
    downloadVideoBtnTooltipTxt:"Download video", 
    qualityBtnOpenedTooltipTxt:"Close settings", 
    qualityBtnClosedTooltipTxt:"Settings",       
    ccShowOnHTML5Videos: true,                   
    ccShowOnVideoLoad: true,                     
    ccBtnOpenedTooltipTxt:"Hide captions",       
    ccBtnClosedTooltipTxt:"Show captions",       
    muteBtnTooltipTxt:"Mute",                    
    unmuteBtnTooltipTxt:"Unmute",                
    fullscreenBtnTooltipTxt:"Fullscreen",        
    exitFullscreenBtnTooltipTxt:"Exit fullscreen",
    infoBtnTooltipTxt:"Show info",				 
    embedBtnTooltipTxt:"Embed",                  
    shareBtnTooltipTxt:"Share",                  
    volumeTooltipTxt:"Volume",    
	fastForwardBtnTooltipTxt:"Fast forward",					
	fastBackwardBtnTooltipTxt:"Fast backward",	
    playlistBtnClosedTooltipTxt:"Show playlist",
    playlistBtnOpenedTooltipTxt:"Hide playlist", 
    facebookBtnTooltipTxt:"Share on Facebook",   
    twitterBtnTooltipTxt:"Share on Twitter",     
    lastBtnTooltipTxt:"Go to last video",        
    firstBtnTooltipTxt:"Go to first video",      
    nextBtnTooltipTxt:"Play next video",         
    previousBtnTooltipTxt:"Play previous video", 
    shuffleBtnOnTooltipTxt:"Shuffle on",         
    shuffleBtnOffTooltipTxt:"Shuffle off",       
    nowPlayingTooltipTxt:"NOW PLAYING",          
    embedWindowTitle1:"SHARE THIS PLAYER:",      
    embedWindowTitle2:"EMBED THIS VIDEO IN YOUR SITE:",
    embedWindowTitle3:"SHARE CURRENT VIDEO:",    
    copyTxt:"Copy",
    copiedTxt:"Copied!",
    youtubePlaylistID:"",                        
    youtubeChannelID:"",                         
    youtubeChannelNumberOfVideos: "",
	videos:[
        {
            videoType:"HTML5",
            title:"This is default video for test purpose.",
            youtubeID:"0dJO0HyE8xE",
            vimeoID:"119641053",
            mp4HD:"http://creativeinteractivemedia.com/player/videos/Pieces.mp4",
            mp4SD:"http://creativeinteractivemedia.com/player/videos/PiecesSD.mp4",
            mp4VideoThumbnails_vtt:"",                                                           
            mp4VideoThumbnails_img:"",                                                        
            ccUrl: "",
            enable_mp4_download:"yes",
            imageUrl:"images/preview_images/poster2.jpg",
            imageTimer:4,
            prerollAD:"no",
            prerollGotoLink:"http://codecanyon.net/",
            preroll_mp4:"http://creativeinteractivemedia.com/player/videos/Short_Elegant_Logo_Reveal.mp4",
            prerollSkipTimer:5,
            midrollAD:"no",                                                                  
            midrollAD_displayTime:"00:10",                                                    
            midrollGotoLink:"http://codecanyon.net/",                                         
            midroll_mp4:"http://creativeinteractivemedia.com/player/videos/Logo_Explode.mp4", 
            midrollSkipTimer:5,	
            postrollAD:"no",                                                                
            postrollGotoLink:"http://codecanyon.net/",                                        
            postroll_mp4:"http://creativeinteractivemedia.com/player/videos/Logo_Light.mp4",  
            postrollSkipTimer:5,
            popupImg:"images/preview_images/popup.jpg",                        			  
            popupAdShow:"no",                                                                
            popupAdStartTime:"00:03",                                                         
            popupAdEndTime:"00:07",                                                          
            popupAdGoToLink:"http://codecanyon.net/",
            description:"Video description goes here.",
            thumbImg:"images/thumbnail_images/pic1.jpg",
            info:"Video info goes here.<br>This text can be <i>HTML formatted</i>, <a href='http://codecanyon.net/user/_zac_' target='_blank'><font color='008BFF'>find out more</font></a>.<br>You can disable this info window in player options. <br><br>Lorem ipsum dolor sit amet, eu pri dolores theophrastus. Posidonium vituperatoribus cu mel, cum feugiat nostrum sapientem ne. Vis ea summo persius, unum velit erant in eos, pri ut suas iriure euripidis. Ad augue expetendis sea. Ne usu saperet appetere honestatis, ne qui nulla debitis sententiae."
        }
		
	]
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var CLICK_EV = isMobile.any() ? 'touchend' : 'click';
var START_EV = isMobile.any() ? 'touchstart' : 'mousedown';
var MOVE_EV = isMobile.any() ? 'touchmove' : 'mousemove';
var END_EV = isMobile.any() ? 'touchend' : 'mouseup';
var RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize'

var params = {
	id: getParameterByName("id"),
	googleAnalyticsTrackingCode: getParameterByName("googleAnalyticsTrackingCode"),
	embed: getParameterByName("embed"),
	colorAccent: getParameterByName("colorAccent"),
	instanceName: getParameterByName("instanceName"),
	instanceTheme: getParameterByName("instanceTheme"),
	autohideControls: getParameterByName("autohideControls"),
	hideControlsOnMouseOut: getParameterByName("hideControlsOnMouseOut"),
	playerLayout: getParameterByName("playerLayout"),
	videoPlayerWidth: getParameterByName("videoPlayerWidth"),
	videoPlayerHeight: getParameterByName("videoPlayerHeight"),
	videoRatio: getParameterByName("videoRatio"),
	videoRatioMobile: getParameterByName("videoRatioMobile"),
	videoRatioStretch: getParameterByName("videoRatioStretch"),
	iOSPlaysinline: getParameterByName("iOSPlaysinline"),
	floatPlayerOutsideViewport: getParameterByName("floatPlayerOutsideViewport"),
	pauseStickyOutsideViewport: getParameterByName("pauseStickyOutsideViewport"),
	lightBox: getParameterByName("lightBox"),
	lightBoxAutoplay: getParameterByName("lightBoxAutoplay"),
	lightBoxThumbnail: getParameterByName("lightBoxThumbnail"),
	lightBoxThumbnailWidth: getParameterByName("lightBoxThumbnailWidth"),
	lightBoxThumbnailHeight: getParameterByName("lightBoxThumbnailHeight"),
	lightBoxCloseOnOutsideClick: getParameterByName("lightBoxCloseOnOutsideClick"),
	playlist: getParameterByName("playlist"),
	playlistShowOnlyThumbnails: getParameterByName("playlistShowOnlyThumbnails"),
	playlistScrollType: getParameterByName("playlistScrollType"),
	playlistBehaviourOnPageload: getParameterByName("playlistBehaviourOnPageload"),
	autoplay: getParameterByName("autoplay"),
	vimeoColor: getParameterByName("vimeoColor"),
	youtubeControls: getParameterByName("youtubeControls"),
	youtubeSkin: getParameterByName("youtubeSkin"),
	youtubeColor: getParameterByName("youtubeColor"),
	youtubeQuality: getParameterByName("youtubeQuality"),
	youtubeShowRelatedVideos: getParameterByName("youtubeShowRelatedVideos"),
	videoPlayerShadow: getParameterByName("videoPlayerShadow"),
	loadRandomVideoOnStart: getParameterByName("loadRandomVideoOnStart"),
	shuffle: getParameterByName("shuffle"),
	posterImg: getParameterByName("posterImg"),
	posterImgOnVideoFinish: getParameterByName("posterImgOnVideoFinish"),
	onFinish: getParameterByName("onFinish"),
	nowPlayingText: getParameterByName("nowPlayingText"),
	HTML5VideoQuality: getParameterByName("HTML5VideoQuality"),
	preloadSelfHosted: getParameterByName("preloadSelfHosted"),
	rightClickMenu: getParameterByName("rightClickMenu"),
    
	hideVideoSource: getParameterByName("hideVideoSource"),
	showAllControls: getParameterByName("showAllControls"),
	allowSkipAd: getParameterByName("allowSkipAd"),
	rewindShow: getParameterByName("rewindShow"),
	qualityShow: getParameterByName("qualityShow"),
	fastForwardShow: getParameterByName("fastForwardShow"),
	fastBackwardShow: getParameterByName("fastBackwardShow"),
	stepFastForward: getParameterByName("stepFastForward"),
	stepFastBackward: getParameterByName("stepFastBackward"),
	infoShow: getParameterByName("infoShow"),
	shareShow: getParameterByName("shareShow"),
	facebookShow: getParameterByName("facebookShow"),
	twitterShow: getParameterByName("twitterShow"),
	facebookShareName: getParameterByName("facebookShareName"),
	facebookShareLink: getParameterByName("facebookShareLink"),
	facebookShareDescription: getParameterByName("facebookShareDescription"),
	facebookSharePicture: getParameterByName("facebookSharePicture"),
	twitterText: getParameterByName("twitterText"),
	twitterLink: getParameterByName("twitterLink"),
	twitterHashtags: getParameterByName("twitterHashtags"),
	twitterVia: getParameterByName("twitterVia"),
	logoShow: getParameterByName("logoShow"),
	logoClickable: getParameterByName("logoClickable"),
	logoPath: getParameterByName("logoPath"),
	logoGoToLink: getParameterByName("logoGoToLink"),
	logoPosition: getParameterByName("logoPosition"),
	embedShow: getParameterByName("embedShow"),
	embedCodeSrc: getParameterByName("embedCodeSrc"),
	embedCodeW: getParameterByName("embedCodeW"),
	embedCodeH: getParameterByName("embedCodeH"),
	embedShareLink: getParameterByName("embedShareLink"),
	showGlobalPrerollAds: getParameterByName("showGlobalPrerollAds"),
	globalPrerollAds: getParameterByName("globalPrerollAds"),
	globalPrerollAdsSkipTimer: getParameterByName("globalPrerollAdsSkipTimer"),
	globalPrerollAdsGotoLink: getParameterByName("globalPrerollAdsGotoLink"),
	advertisementTitle: getParameterByName("advertisementTitle"),
	skipAdvertisementText: getParameterByName("skipAdvertisementText"),
	skipAdText: getParameterByName("skipAdText"),
	mutedNotificationText: getParameterByName("mutedNotificationText"),
	playBtnTooltipTxt: getParameterByName("playBtnTooltipTxt"),
	pauseBtnTooltipTxt: getParameterByName("pauseBtnTooltipTxt"),
	rewindBtnTooltipTxt: getParameterByName("rewindBtnTooltipTxt"),
    
	downloadVideoBtnTooltipTxt: getParameterByName("downloadVideoBtnTooltipTxt"),
	qualityBtnOpenedTooltipTxt: getParameterByName("qualityBtnOpenedTooltipTxt"),
	qualityBtnClosedTooltipTxt: getParameterByName("qualityBtnClosedTooltipTxt"),
	ccShowOnHTML5Videos: getParameterByName("ccShowOnHTML5Videos"),
	ccShowOnVideoLoad: getParameterByName("ccShowOnVideoLoad"),
	ccBtnOpenedTooltipTxt: getParameterByName("ccBtnOpenedTooltipTxt"),
	ccBtnClosedTooltipTxt: getParameterByName("ccBtnClosedTooltipTxt"),
	muteBtnTooltipTxt: getParameterByName("muteBtnTooltipTxt"),
	unmuteBtnTooltipTxt: getParameterByName("unmuteBtnTooltipTxt"),
	fullscreenBtnTooltipTxt: getParameterByName("fullscreenBtnTooltipTxt"),
	exitFullscreenBtnTooltipTxt: getParameterByName("exitFullscreenBtnTooltipTxt"),
	infoBtnTooltipTxt: getParameterByName("infoBtnTooltipTxt"),
	embedBtnTooltipTxt: getParameterByName("embedBtnTooltipTxt"),
	shareBtnTooltipTxt: getParameterByName("shareBtnTooltipTxt"),
	volumeTooltipTxt: getParameterByName("volumeTooltipTxt"),
	fastForwardBtnTooltipTxt: getParameterByName("fastForwardBtnTooltipTxt"),
	fastBackwardBtnTooltipTxt: getParameterByName("fastBackwardBtnTooltipTxt"),
	playlistBtnClosedTooltipTxt: getParameterByName("playlistBtnClosedTooltipTxt"),
	playlistBtnOpenedTooltipTxt: getParameterByName("playlistBtnOpenedTooltipTxt"),
	facebookBtnTooltipTxt: getParameterByName("facebookBtnTooltipTxt"),
	twitterBtnTooltipTxt: getParameterByName("twitterBtnTooltipTxt"),
	lastBtnTooltipTxt: getParameterByName("lastBtnTooltipTxt"),
	firstBtnTooltipTxt: getParameterByName("firstBtnTooltipTxt"),
	nextBtnTooltipTxt: getParameterByName("nextBtnTooltipTxt"),
	previousBtnTooltipTxt: getParameterByName("previousBtnTooltipTxt"),
	shuffleBtnOnTooltipTxt: getParameterByName("shuffleBtnOnTooltipTxt"),
	shuffleBtnOffTooltipTxt: getParameterByName("shuffleBtnOffTooltipTxt"),
	nowPlayingTooltipTxt: getParameterByName("nowPlayingTooltipTxt"),
	embedWindowTitle1: getParameterByName("embedWindowTitle1"),
	embedWindowTitle2: getParameterByName("embedWindowTitle2"),
	embedWindowTitle3: getParameterByName("embedWindowTitle3"),
	copyTxt: getParameterByName("copyTxt"),
	copiedTxt: getParameterByName("copiedTxt"),
	youtubePlaylistID: getParameterByName("youtubePlaylistID"),
	youtubeChannelID: getParameterByName("youtubeChannelID"),
	youtubeChannelNumberOfVideos: getParameterByName("youtubeChannelNumberOfVideos"),
    
	videosLength: getParameterByName("videosLength"),
	videoType: getParameterByName("videoType"),
	videoTypeGlobal: getParameterByName("videoTypeGlobal"),
	title: getParameterByName("title"),
	youtubeID: getParameterByName("youtubeID"),
	vimeoID: getParameterByName("vimeoID"),
	mp4HD: getParameterByName("mp4HD"),
	mp4SD: getParameterByName("mp4SD"),
	mp4VideoThumbnails_vtt: getParameterByName("mp4VideoThumbnails_vtt"),
	mp4VideoThumbnails_img: getParameterByName("mp4VideoThumbnails_img"),
	ccUrl: getParameterByName("ccUrl"),
	enable_mp4_download: getParameterByName("enable_mp4_download"),
	imageUrl: getParameterByName("imageUrl"),
	imageTimer: getParameterByName("imageTimer"),
	prerollAD: getParameterByName("prerollAD"),
	prerollGotoLink: getParameterByName("prerollGotoLink"),
	preroll_mp4: getParameterByName("preroll_mp4"),
	prerollSkipTimer: getParameterByName("prerollSkipTimer"),
	midrollAD: getParameterByName("midrollAD"),
	midrollAD_displayTime: getParameterByName("midrollAD_displayTime"),
	midrollGotoLink: getParameterByName("midrollGotoLink"),
	midroll_mp4: getParameterByName("midroll_mp4"),
	midrollSkipTimer: getParameterByName("midrollSkipTimer"),
	postrollAD: getParameterByName("postrollAD"),
	postrollGotoLink: getParameterByName("postrollGotoLink"),
	postroll_mp4: getParameterByName("postroll_mp4"),
	postrollSkipTimer: getParameterByName("postrollSkipTimer"),
	popupImg: getParameterByName("popupImg"),
	popupAdShow: getParameterByName("popupAdShow"),
	popupAdStartTime: getParameterByName("popupAdStartTime"),
	popupAdEndTime: getParameterByName("popupAdEndTime"),
	popupAdGoToLink: getParameterByName("popupAdGoToLink"),
	description: getParameterByName("description"),
	thumbImg: getParameterByName("thumbImg"),
	info: getParameterByName("info"),
}
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var Video = function(parent, options)
{
    var self=this;
	this._class  = Video;
	this.parent  = parent;
	this.parentWidth = this.parent.width();
	this.parentHeight = this.parent.height();
	this.windowWidth = $(window).width();
	this.windowHeight = $(window).height();
	this.options = $.extend({}, defaults, options);
	this.sources = this.options.srcs || this.options.sources;
	this.options.vimeoColor = this.options.vimeoColor.replace('#', '')
	this.state        = null;
    this.inFullScreen = false;
	this.realFullscreenActive=false;
	this.stretching = false;
	this.infoOn = false;
	this.lightBoxOn = false;
	this.adOn = false;
	this.skipCountOn = false;
	this.skipBoxOn = false;
	this.shareOn = false;
	this.videoPlayingAD = false;
	this.embedOn = false;
	this.pw = false;
	this.buttonsMargin ;
	this.loaded       = false;
	this.readyList    = [];
    this.videoAdStarted=false;
    this.youtubeReady=false;
	this.volPerc=1;
	this.html5STARTED=false;
	this.YTAPIReady=false;
	this.isYoutubeAPICreated = false;
	this.ytSkin = this.options.youtubeSkin;
    this.ytColor = this.options.youtubeColor;
	this.ytSkin.toString();
    this.ytColor.toString();
	this.youtubeControls = this.options.youtubeControls;
	this.midrollPlayed = false;
	this.postrollPlayed = false;
	this.prerollActive = true;
	this.midrollActive = false;
	this.postrollActive = false;
	this.qualityBtnEnabled=false;
    this.ccBtnEnabled=false;
	this.lightBoxThumbnail;
	this.lightBoxOverlay;
	this.lightBoxInitiated = false;
	this.globalPrerollAds_arr = self.options.globalPrerollAds.split(';');
	this.poster2Showing = false;
	this.playedVideos = [];
    this.initializedFloating = false;
    this.initializedAutoplay = false;
	this.initializedPlay = false;
    this.stickyClosedOnButton = false;
    this.stickyPaused = false;
    this.savedVolumeBarWidth;
    this.volRatio;
    this.savePageOffsetY;
	this.videoHasError = false;
	this._onloaded = false;
	this.POPUP_CLOSED = false;
	this.videoTrackPoints = [];
	this.videoTrackPositions = [];
	this.videoTrackPositions_nonlinear = [];
	this.isPointsGenerated = false;
	this.isPointsGenerated_Nonlinear = false;
	this.YOUTUBE_DURATION = 0;
	this.PLAY_CLICKED_INIT = false;
	
	this.PREROLLS_INDEX = 0;
	this.MIDROLLS_INDEX = 0;
	this.POSTROLLS_INDEX = 0;
	this.NONLINEARS_INDEX = 0;
	this.CURRENT_ACTIVE_VAST = {}
	this.IS_POSTROLLS_ACTIVE = false;
	this.IS_MIDROLLS_ACTIVE = false;
	
	
    var url = window.location.href
    if (url.indexOf("?embed=") >= 0){
        $('body').css({
            margin: 0,
            padding: 0
        })
        if(params.colorAccent){
            params.colorAccent.replace('#', '')
            if (params.colorAccent.length == 6)
                params.colorAccent = "#"+params.colorAccent
            this.options.colorAccent = params.colorAccent || this.options.colorAccent;
        }
        
        this.options.googleAnalyticsTrackingCode = params.googleAnalyticsTrackingCode || this.options.googleAnalyticsTrackingCode;
        this.options.instanceName = params.instanceName || this.options.instanceName;
        this.options.instanceTheme = params.instanceTheme || this.options.instanceTheme;
        this.options.autohideControls = parseInt(params.autohideControls) || this.options.autohideControls;
        this.options.hideControlsOnMouseOut = params.hideControlsOnMouseOut || this.options.hideControlsOnMouseOut;
        this.options.playerLayout = params.playerLayout || this.options.playerLayout;
        this.options.videoPlayerWidth = params.videoPlayerWidth || this.options.videoPlayerWidth;
        this.options.videoPlayerHeight = params.videoPlayerHeight || this.options.videoPlayerHeight;
        this.options.videoRatio = parseFloat(params.videoRatio) || this.options.videoRatio;
        this.options.videoRatioMobile = parseFloat(params.videoRatioMobile) || this.options.videoRatioMobile;
        this.options.videoRatioStretch = JSON.parse(params.videoRatioStretch) || this.options.videoRatioStretch;
        this.options.iOSPlaysinline = JSON.parse(params.iOSPlaysinline) || this.options.iOSPlaysinline;
        this.options.floatPlayerOutsideViewport = JSON.parse(params.floatPlayerOutsideViewport) || this.options.floatPlayerOutsideViewport;
        this.options.pauseStickyOutsideViewport = JSON.parse(params.pauseStickyOutsideViewport) || this.options.pauseStickyOutsideViewport;
        this.options.lightBox = JSON.parse(params.lightBox) || this.options.lightBox;
        
        this.options.lightBoxAutoplay = JSON.parse(params.lightBoxAutoplay) || this.options.lightBoxAutoplay;
        this.options.lightBoxThumbnail = params.lightBoxThumbnail || this.options.lightBoxThumbnail;
        this.options.lightBoxThumbnailWidth = params.lightBoxThumbnailWidth || this.options.lightBoxThumbnailWidth;
        this.options.lightBoxThumbnailHeight = params.lightBoxThumbnailHeight || this.options.lightBoxThumbnailHeight;
        this.options.lightBoxCloseOnOutsideClick = JSON.parse(params.lightBoxCloseOnOutsideClick) || this.options.lightBoxCloseOnOutsideClick;
        this.options.playlist = params.playlist || this.options.playlist;
        this.options.playlistShowOnlyThumbnails = params.playlistShowOnlyThumbnails || this.options.playlistShowOnlyThumbnails;
        this.options.playlistScrollType = params.playlistScrollType || this.options.playlistScrollType;
        this.options.playlistBehaviourOnPageload = params.playlistBehaviourOnPageload || this.options.playlistBehaviourOnPageload;
        this.options.autoplay = JSON.parse(params.autoplay) || this.options.autoplay;
        this.options.vimeoColor = params.vimeoColor || this.options.vimeoColor;
        this.options.youtubeControls = params.youtubeControls || this.options.youtubeControls;
        this.options.youtubeSkin = params.youtubeSkin || this.options.youtubeSkin;
        this.options.youtubeColor = params.youtubeColor || this.options.youtubeColor;
        this.options.youtubeQuality = params.youtubeQuality || this.options.youtubeQuality;
        this.options.youtubeShowRelatedVideos = params.youtubeShowRelatedVideos || this.options.youtubeShowRelatedVideos;
        this.options.videoPlayerShadow = params.videoPlayerShadow || this.options.videoPlayerShadow;
        this.options.loadRandomVideoOnStart = params.loadRandomVideoOnStart || this.options.loadRandomVideoOnStart;
        this.options.shuffle = params.shuffle || this.options.shuffle;
        this.options.posterImg = params.posterImg || "";
        this.options.posterImgOnVideoFinish = params.posterImgOnVideoFinish || "";
        this.options.onFinish = params.onFinish || this.options.onFinish;
        this.options.nowPlayingText = params.nowPlayingText || this.options.nowPlayingText;
        this.options.HTML5VideoQuality = params.HTML5VideoQuality || this.options.HTML5VideoQuality;
        this.options.preloadSelfHosted = params.preloadSelfHosted || this.options.preloadSelfHosted;
        this.options.rightClickMenu = JSON.parse(params.rightClickMenu) || this.options.rightClickMenu;
        
        this.options.hideVideoSource = JSON.parse(params.hideVideoSource) || this.options.hideVideoSource;
        this.options.showAllControls = JSON.parse(params.showAllControls) || this.options.showAllControls;
        this.options.allowSkipAd = JSON.parse(params.allowSkipAd) || this.options.allowSkipAd;
        this.options.rewindShow = params.rewindShow || this.options.rewindShow;
        this.options.qualityShow = params.qualityShow || this.options.qualityShow;
        this.options.fastForwardShow = params.fastForwardShow || this.options.fastForwardShow;
        this.options.fastBackwardShow = params.fastBackwardShow || this.options.fastBackwardShow;
        this.options.stepFastForward = params.stepFastForward || this.options.stepFastForward;
        this.options.stepFastBackward = params.stepFastBackward || this.options.stepFastBackward;
        this.options.infoShow = params.infoShow || this.options.infoShow;
        this.options.shareShow = params.shareShow || this.options.shareShow;
        this.options.facebookShow = params.facebookShow || this.options.facebookShow;
        this.options.twitterShow = params.twitterShow || this.options.twitterShow;
        this.options.facebookShareName = params.facebookShareName || this.options.facebookShareName;
        this.options.facebookShareLink = params.facebookShareLink || this.options.facebookShareLink;
        this.options.facebookShareDescription = params.facebookShareDescription || this.options.facebookShareDescription;
        this.options.facebookSharePicture = params.facebookSharePicture || this.options.facebookSharePicture;
        this.options.twitterText = params.twitterText || this.options.twitterText;
        this.options.twitterLink = params.twitterLink || this.options.twitterLink;
        this.options.twitterHashtags = params.twitterHashtags || this.options.twitterHashtags;
        this.options.twitterVia = params.twitterVia || this.options.twitterVia;
        this.options.logoShow = params.logoShow || this.options.logoShow;
        this.options.logoClickable = params.logoClickable || this.options.logoClickable;
        this.options.logoPath = params.logoPath || "";
        this.options.logoGoToLink = params.logoGoToLink || this.options.logoGoToLink;
        this.options.logoPosition = params.logoPosition || this.options.logoPosition;
        this.options.embedShow = params.embedShow || this.options.embedShow;
        this.options.embedCodeSrc = params.embedCodeSrc || this.options.embedCodeSrc;
        this.options.embedCodeW = params.embedCodeW || this.options.embedCodeW;
        this.options.embedCodeH = params.embedCodeH || this.options.embedCodeH;
        this.options.embedShareLink = params.embedShareLink || this.options.embedShareLink;
        this.options.showGlobalPrerollAds = JSON.parse(params.showGlobalPrerollAds) || this.options.showGlobalPrerollAds;
        this.options.globalPrerollAds = params.globalPrerollAds || this.options.globalPrerollAds;
        this.options.globalPrerollAdsSkipTimer = params.globalPrerollAdsSkipTimer || this.options.globalPrerollAdsSkipTimer;
        this.options.globalPrerollAdsGotoLink = params.globalPrerollAdsGotoLink || this.options.globalPrerollAdsGotoLink;
        this.globalPrerollAds_arr = this.options.globalPrerollAds.split(';');
        this.options.advertisementTitle = params.advertisementTitle || this.options.advertisementTitle;
        this.options.skipAdvertisementText = params.skipAdvertisementText || this.options.skipAdvertisementText;
        this.options.skipAdText = params.skipAdText || this.options.skipAdText;
        this.options.mutedNotificationText = params.mutedNotificationText || this.options.mutedNotificationText;
        this.options.playBtnTooltipTxt = params.playBtnTooltipTxt || this.options.playBtnTooltipTxt;
        this.options.pauseBtnTooltipTxt = params.pauseBtnTooltipTxt || this.options.pauseBtnTooltipTxt;
        this.options.rewindBtnTooltipTxt = params.rewindBtnTooltipTxt || this.options.rewindBtnTooltipTxt;
        
        this.options.downloadVideoBtnTooltipTxt = params.downloadVideoBtnTooltipTxt || this.options.downloadVideoBtnTooltipTxt;
        this.options.qualityBtnOpenedTooltipTxt = params.qualityBtnOpenedTooltipTxt || this.options.qualityBtnOpenedTooltipTxt;
        this.options.qualityBtnClosedTooltipTxt = params.qualityBtnClosedTooltipTxt || this.options.qualityBtnClosedTooltipTxt;
        this.options.ccShowOnHTML5Videos = JSON.parse(params.ccShowOnHTML5Videos) || this.options.ccShowOnHTML5Videos;
        this.options.ccShowOnVideoLoad = JSON.parse(params.ccShowOnVideoLoad) || this.options.ccShowOnVideoLoad;
        this.options.ccBtnOpenedTooltipTxt = params.ccBtnOpenedTooltipTxt || this.options.ccBtnOpenedTooltipTxt;
        this.options.ccBtnClosedTooltipTxt = params.ccBtnClosedTooltipTxt || this.options.ccBtnClosedTooltipTxt;
        this.options.muteBtnTooltipTxt = params.muteBtnTooltipTxt || this.options.muteBtnTooltipTxt;
        this.options.unmuteBtnTooltipTxt = params.unmuteBtnTooltipTxt || this.options.unmuteBtnTooltipTxt;
        this.options.fullscreenBtnTooltipTxt = params.fullscreenBtnTooltipTxt || this.options.fullscreenBtnTooltipTxt;
        this.options.exitFullscreenBtnTooltipTxt = params.exitFullscreenBtnTooltipTxt || this.options.exitFullscreenBtnTooltipTxt;
        this.options.infoBtnTooltipTxt = params.infoBtnTooltipTxt || this.options.infoBtnTooltipTxt;
        this.options.embedBtnTooltipTxt = params.embedBtnTooltipTxt || this.options.embedBtnTooltipTxt;
        this.options.volumeTooltipTxt = params.volumeTooltipTxt || this.options.volumeTooltipTxt;
        this.options.fastForwardBtnTooltipTxt = params.fastForwardBtnTooltipTxt || this.options.fastForwardBtnTooltipTxt;
        this.options.fastBackwardBtnTooltipTxt = params.fastBackwardBtnTooltipTxt || this.options.fastBackwardBtnTooltipTxt;
        this.options.playlistBtnClosedTooltipTxt = params.playlistBtnClosedTooltipTxt || this.options.playlistBtnClosedTooltipTxt;
        this.options.playlistBtnOpenedTooltipTxt = params.playlistBtnOpenedTooltipTxt || this.options.playlistBtnOpenedTooltipTxt;
        this.options.facebookBtnTooltipTxt = params.facebookBtnTooltipTxt || this.options.facebookBtnTooltipTxt;
        this.options.twitterBtnTooltipTxt = params.twitterBtnTooltipTxt || this.options.twitterBtnTooltipTxt;
        this.options.lastBtnTooltipTxt = params.lastBtnTooltipTxt || this.options.lastBtnTooltipTxt;
        this.options.firstBtnTooltipTxt = params.firstBtnTooltipTxt || this.options.firstBtnTooltipTxt;
        this.options.nextBtnTooltipTxt = params.nextBtnTooltipTxt || this.options.nextBtnTooltipTxt;
        this.options.previousBtnTooltipTxt = params.previousBtnTooltipTxt || this.options.previousBtnTooltipTxt;
        this.options.shuffleBtnOnTooltipTxt = params.shuffleBtnOnTooltipTxt || this.options.shuffleBtnOnTooltipTxt;
        this.options.shuffleBtnOffTooltipTxt = params.shuffleBtnOffTooltipTxt || this.options.shuffleBtnOffTooltipTxt;
        this.options.nowPlayingTooltipTxt = params.nowPlayingTooltipTxt || this.options.nowPlayingTooltipTxt;
        this.options.embedWindowTitle1 = params.embedWindowTitle1 || this.options.embedWindowTitle1;
        this.options.embedWindowTitle2 = params.embedWindowTitle2 || this.options.embedWindowTitle2;
        this.options.embedWindowTitle3 = params.embedWindowTitle3 || this.options.embedWindowTitle3;
        this.options.copyTxt = params.copyTxt || this.options.copyTxt;
        this.options.copiedTxt = params.copiedTxt || this.options.copiedTxt;
        this.options.youtubePlaylistID = params.youtubePlaylistID || this.options.youtubePlaylistID;
        this.options.youtubeChannelID = params.youtubeChannelID || this.options.youtubeChannelID;
        this.options.youtubeAPIKey = params.youtubeAPIKey || this.options.youtubeAPIKey;
        this.options.videoTypeGlobal = params.videoTypeGlobal || this.options.videoTypeGlobal;
        this.options.youtubeChannelNumberOfVideos = parseInt(params.youtubeChannelNumberOfVideos) || parseInt(this.options.youtubeChannelNumberOfVideos);

        this.options.videosLength = parseInt(params.videosLength) || this.options.videos.length; 
        this.options.videos.length = this.options.videosLength        
        
        for(var i=0; i <= this.options.videosLength-1; i++){
            if(this.options.videoTypeGlobal != null){
                this.options.videos[i].videoType = this.options.videoTypeGlobal
            }
            else{
                this.options.videoType = params.videoType || this.options.videos[i].videoType;
            }
            this.options.title = params.title || this.options.videos[i].title;
            this.options.youtubeID = params.youtubeID || this.options.videos[i].youtubeID;
            this.options.vimeoID = params.vimeoID || this.options.videos[i].vimeoID;
            this.options.mp4HD = params.mp4HD || this.options.videos[i].mp4HD;
            this.options.mp4SD = params.mp4SD || this.options.videos[i].mp4SD;
            this.options.mp4VideoThumbnails_vtt = params.mp4VideoThumbnails_vtt || this.options.videos[i].mp4VideoThumbnails_vtt;
            this.options.mp4VideoThumbnails_img = params.mp4VideoThumbnails_img || this.options.videos[i].mp4VideoThumbnails_img;
            this.options.ccUrl = params.ccUrl || this.options.videos[i].ccUrl;
            this.options.enable_mp4_download = params.enable_mp4_download || this.options.videos[i].enable_mp4_download;
            this.options.imageUrl = params.imageUrl || this.options.videos[i].imageUrl;
            this.options.imageTimer = params.imageTimer || this.options.videos[i].imageTimer;
            this.options.prerollAD = params.prerollAD || this.options.videos[i].prerollAD;
            this.options.prerollGotoLink = params.prerollGotoLink || this.options.videos[i].prerollGotoLink;
            this.options.preroll_mp4 = params.preroll_mp4 || this.options.videos[i].preroll_mp4;
            this.options.prerollSkipTimer = params.prerollSkipTimer || this.options.videos[i].prerollSkipTimer;
            this.options.midrollAD = params.midrollAD || this.options.videos[i].midrollAD;
            this.options.midrollAD_displayTime = params.midrollAD_displayTime || this.options.videos[i].midrollAD_displayTime;
            this.options.midrollGotoLink = params.midrollGotoLink || this.options.videos[i].midrollGotoLink;
            this.options.midroll_mp4 = params.midroll_mp4 || this.options.videos[i].midroll_mp4;
            this.options.midrollSkipTimer = params.midrollSkipTimer || this.options.videos[i].midrollSkipTimer;
            this.options.postrollAD = params.postrollAD || this.options.videos[i].postrollAD;
            this.options.postrollGotoLink = params.postrollGotoLink || this.options.videos[i].postrollGotoLink;
            this.options.postroll_mp4 = params.postroll_mp4 || this.options.videos[i].postroll_mp4;
            this.options.postrollSkipTimer = params.postrollSkipTimer || this.options.videos[i].postrollSkipTimer;
            this.options.popupImg = params.popupImg || this.options.videos[i].popupImg;
            this.options.popupAdShow = params.popupAdShow || this.options.videos[i].popupAdShow;
            this.options.popupAdStartTime = params.popupAdStartTime || this.options.videos[i].popupAdStartTime;
            this.options.popupAdEndTime = params.popupAdEndTime || this.options.videos[i].popupAdEndTime;
            this.options.popupAdGoToLink = params.popupAdGoToLink || this.options.videos[i].popupAdGoToLink;
            this.options.description = params.description || this.options.videos[i].description;
            this.options.thumbImg = params.thumbImg || this.options.videos[i].thumbImg;
            this.options.info = params.info || this.options.videos[i].info;
            
            for(var key in params){
                if(params[key] != null && (key != "videosLength" && key != "embed" && key != "colorAccent")){
                    if (params[key].indexOf(',') > -1){
                        this.options.videos[i][key] = this.options[key].split(',')[i]
                    }
                    else{
                        this.options.videos[0][key] = this.options[key]
                    }
                }
            }
        }
        
        
    }
    
    if(this.options.autoplay)
        this.mutedBoxOn = true;
    else
        this.mutedBoxOn = false;
	switch(this.options.youtubeShowRelatedVideos){
		case "Yes":
			self.ytShowRelatedVideos = 1;
		break;
		case "No":
			self.ytShowRelatedVideos = 0;
		break;
	}
	this.isMobile = isMobile;

    this.RESIZE_EV = RESIZE_EV;
    this.CLICK_EV = CLICK_EV;
    this.START_EV = START_EV;
    this.MOVE_EV = MOVE_EV;
    this.END_EV = END_EV;

    this.canPlay = false;
    this.myVideo = document.createElement('video');
    self.deviceAgent = navigator.userAgent.toLowerCase();
    self.agentID = self.deviceAgent.match(/(iphone|ipod)/);
	if (typeof self.options.instanceName == "string")											  
		self.options.instanceName = self.options.instanceName.split(' ').join('')
   
    document.addEventListener('touchmove', function (event) {
        if ($(self.element).hasClass('elite_vp_fullScreen')){
            event.preventDefault(); 
        }
    },{ passive: false });


		if(this.options.playerLayout == "fitToBrowser" || options.playerLayout == "fitToBrowser"){
			var videoplayers = $("#Elite_video_player");
			$.each(videoplayers, function(){
				var fixedCont = $("<div />")
				.addClass("fixedCont")
				.css({
						position: 'fixed',
						width: '100%',
						height: '100%',
						top: 0,
						left: 0,
						background: '#000000',
						zIndex: 2147483647
					});
				videoplayers.parent().append(fixedCont);
				videoplayers.appendTo(fixedCont);
			})
		}

	this.setupElement();
    this.setupElementAD();
	
	this._vast = new PLAYER.Vast(self);
	
		
	if(!this.options.rightClickMenu){
		$("#Elite_video_player").bind('contextmenu',function() { return false; });
		$(".Elite_video_player").bind('contextmenu',function() { return false; });
		
		if(this.options.lightBox)
			$(".elite_vp_mainContainer").bind('contextmenu',function() { return false; });
	}
    
    if(!window["ga"] && self.options.googleAnalyticsTrackingCode && self.options.googleAnalyticsTrackingCode != ''){
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', self.options.googleAnalyticsTrackingCode, 'auto');
        ga('send', 'pageview');
    }else if(window["ga"] && self.options.googleAnalyticsTrackingCode && self.options.googleAnalyticsTrackingCode != ''){
        ga('create', self.options.googleAnalyticsTrackingCode, 'auto');
        ga('send', 'pageview');
    }

	$(options.videos).each(function ()
    {
		if(this.videoType == "youtube")
			self.includeYoutubeAPI = true;
	});

	if(!this.includeYoutubeAPI)
	{
		this.init();
	}
	else 
	{
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 
	
		if(this.youtubeControls == "default controls"){
			this.options.posterImg=="";
			this.element.css("visibility","hidden");
		}
		
		if(this.options.videoType!="YouTube playlist" && this.options.videoType!=undefined){
			this.options.youtubePlaylistID="";
		}
		if(this.options.videoType!="YouTube channel" && this.options.videoType!=undefined){
			this.options.youtubeChannelID="";
		}
		
		if( (this.options.youtubePlaylistID != "" || this.options.youtubeChannelID != "") ){
		
			var youtubePlaylistID = this.options.youtubePlaylistID;
			var youtubeChannelID = this.options.youtubeChannelID;
			var youtubeAPIKey = this.options.youtubeAPIKey;
			this.url;

			var channelURL = 'https://www.googleapis.com/youtube/v3/search?order=date&maxResults=50&part=snippet&channelId='+youtubeChannelID+'&key='+youtubeAPIKey;
			
			var playListURL = 'https://www.googleapis.com/youtube/v3/playlistItems?&maxResults=50&part=snippet&playlistId='+youtubePlaylistID+'&key='+youtubeAPIKey;

			var videoURL= 'http://www.youtube.com/watch?v=';

			if(youtubePlaylistID != "")
				this.url = playListURL;
			else if(youtubeChannelID != "")
				this.url = channelURL;
			
			this.id=-1;
			this.youtube_array = new Array();
			this.ads_array = new Array();
			this.data;

			$(this.options.videos).each(function loopingItems()
			{
				var obj=
				{
					prerollAD:this.prerollAD,
					prerollGotoLink:this.prerollGotoLink,
					preroll_mp4:this.preroll_mp4,
					prerollSkipTimer:this.prerollSkipTimer,
					midrollAD:this.midrollAD,
					midrollAD_displayTime:this.midrollAD_displayTime,
					midrollGotoLink:this.midrollGotoLink,
					midroll_mp4:this.midroll_mp4,
					midrollSkipTimer:this.midrollSkipTimer,
					postrollAD:this.postrollAD,
					postrollGotoLink:this.postrollGotoLink,
					postroll_mp4:this.postroll_mp4,
					postrollSkipTimer:this.postrollSkipTimer,
					popupAdShow:this.popupAdShow,
					popupImg:this.popupImg,
					popupAdStartTime:this.popupAdStartTime,
					popupAdEndTime:this.popupAdEndTime,
					popupAdGoToLink:this.popupAdGoToLink
				};
				self.ads_array.push(obj);
			});				
			
			this.requestYTList();
		}
		else{
			this.init();
			
			this.waitAPIReady();
		}
	}
};
Video.fn = Video.prototype;

Video.fn.waitAPIReady = function()
{
	var self = this;
	var APIIsLoaded = false;
	if (!this.YTAPIReady)
	{
		if (typeof(YT) != 'undefined' && typeof(YT.Player) != 'undefined')
		{
			this.YTAPIReady = true;
			
			if (this.isYoutubeAPICreated)
			{
				this.createYoutubeInstance();
			}
			else
			{
				this.setupYoutubeAPI();
			}
		}
		else
		{
			var apiReadyInterval = setInterval(function() {
				if (typeof(YT.Player) == 'function' && !APIIsLoaded){
					APIIsLoaded = true;
					clearInterval(apiReadyInterval);
					self.waitAPIReady();
				}
			}, 400);
			
		}
	}
};

Video.fn.setupYoutubeAPI = function()
{
	var self = this;
    
	if(this.isYoutubeAPICreated) return;
		this.isYoutubeAPICreated = true;
		
	if (this.YTAPIReady)
	{
		this.createYoutubeInstance();
	}
	else
	{
		if (!window.onYouTubeIframeAPIReady)
		{
			window.onYouTubePlayerAPIReady = function(){
				self.YTAPIReady=true;
				self.createYoutubeInstance();
			}
		}
	}
}

Video.fn.createYoutubeInstance = function(){

	var self = this;
    
    var _playsinline = 0;
    if(this.options.iOSPlaysinline)
        _playsinline = 1;

	if(this.options.youtubeControls == "custom controls")
	{
		this.youtubePlayer = new YT.Player(this.options.instanceName+'youtube', {
			height: '100%',
			width: '100%',
			events: {
				'onReady': this._playlist.onPlayerReady,
				'onStateChange': this._playlist.onPlayerStateChange,
				'onPlaybackQualityChange': this.onPlayerPlaybackQualityChange
			},
			playerVars:
			{
				rel:this.ytShowRelatedVideos,
                playsinline: _playsinline,
				wmode:'transparent',
				
				controls:0,   
				enablejsapi:1,
				iv_load_policy : 3, 
				showinfo:0
			}
		});
	}
	else if(this.options.youtubeControls == "default controls")
	{			
		this.youtubePlayer = new YT.Player(this.options.instanceName+'youtube', {
			height: '100%',
			width: '100%',
			events: {
				'onReady': this._playlist.onPlayerReady,
				'onStateChange': this._playlist.onPlayerStateChange,
				'onPlaybackQualityChange': this.onPlayerPlaybackQualityChange
			},
			playerVars:
			{
				theme:this.ytSkin, 
				color:this.ytColor,
				rel:this.ytShowRelatedVideos,
                playsinline: _playsinline,
				wmode:'transparent',
				
				controls:1,     
				enablejsapi:1,
				iv_load_policy : 3, 
				modestbranding: 0,
				showinfo:1,
				autohide:1
			}
		});
	}
}

Video.fn.requestYTList = function(){
	var self = this;
	var url;
	if (self.nextPageToken!=undefined)
		url  = this.url + "&pageToken=" + self.nextPageToken
	else
		url = this.url

	$.ajax({
		url: url,
		success: function(data) {
			self.data = data;
			self.nextPageToken = data.nextPageToken;
			
			$.each(data.items, function(i, item) {
                
				self.id=self.id+1;
				var feedTitle = item.snippet.title;
				var feedInfo = item.snippet.description;
				var authorName = item.snippet.channelTitle;
				if(self.options.youtubePlaylistID!="")
					var videoID = item.snippet.resourceId.videoId;
				if(self.options.youtubeChannelID!="")
					var videoID = item.id;
				var feedURL = 'https://www.youtube.com/watch?v='+videoID;
				
				var thumb;
				if(item.snippet.thumbnails!=undefined){
					if(self.options.playlistShowOnlyThumbnails) thumb = item.snippet.thumbnails.medium.url;
					else {
						if(item.snippet.thumbnails.default != undefined)
							thumb = item.snippet.thumbnails.default.url;
					}
				}
				else thumb="";
				
				var _o=
				{
					prerollAD:"no",
					prerollGotoLink:"prerollGotoLink",
					preroll_mp4:"preroll_mp4",
					prerollSkipTimer:"prerollSkipTimer",
					midrollAD:"no",
					midrollAD_displayTime:"midrollAD_displayTime",
					midrollGotoLink:"midrollGotoLink",
					midroll_mp4:"midroll_mp4",
					midrollSkipTimer:"midrollSkipTimer",
					postrollAD:"no",
					postrollGotoLink:"postrollGotoLink",
					postroll_mp4:"postroll_mp4",
					postrollSkipTimer:"postrollSkipTimer",
					popupAdShow:"no",
					popupImg:"popupImg",
					popupAdStartTime:"popupAdStartTime",
					popupAdEndTime:"popupAdEndTime",
					popupAdGoToLink:"popupAdGoToLink"
				};
				self.ads_array.push(_o);
				
				var obj=
				{
					id: self.id,
					title:feedTitle,
					videoType:"youtube",
					youtubeID:videoID,
					vimeoID:this.vimeoID,
					video_path_mp4HD:this.mp4HD,
                    video_path_mp4SD:this.mp4SD,
                    ccUrl:this.ccUrl,
					enable_mp4_download:this.enable_mp4_download,
					prerollAD:self.ads_array[self.id].prerollAD,
					prerollGotoLink:self.ads_array[self.id].prerollGotoLink,
					preroll_mp4:self.ads_array[self.id].preroll_mp4,
					prerollSkipTimer:self.ads_array[self.id].prerollSkipTimer,
					midrollAD:self.ads_array[self.id].midrollAD,
					midrollAD_displayTime:self.ads_array[self.id].midrollAD_displayTime,
					midrollGotoLink:self.ads_array[self.id].midrollGotoLink,
					midroll_mp4:self.ads_array[self.id].midroll_mp4,
					midrollSkipTimer:self.ads_array[self.id].midrollSkipTimer,
					postrollAD:self.ads_array[self.id].postrollAD,
					postrollGotoLink:self.ads_array[self.id].postrollGotoLink,
					postroll_mp4:self.ads_array[self.id].postroll_mp4,
					postrollSkipTimer:self.ads_array[self.id].postrollSkipTimer,
					popupAdShow:self.ads_array[self.id].popupAdShow,
					popupImg:self.ads_array[self.id].popupImg,
					popupAdStartTime:self.ads_array[self.id].popupAdStartTime,
					popupAdEndTime:self.ads_array[self.id].popupAdEndTime,
					popupAdGoToLink:self.ads_array[self.id].popupAdGoToLink,
					description:authorName,
					thumbImg:thumb,
					info: feedInfo
				};
				self.youtube_array.push(obj);
			});
            if(self.options.youtubeChannelNumberOfVideos != "") 
                self.youtube_array.length = parseInt(self.options.youtubeChannelNumberOfVideos);
            else{
                if(self.options.videoType=="YouTube channel")
                    self.youtube_array.length = self.youtube_array.length - 2
            }
			
			if(data.nextPageToken!=undefined){
				self.requestYTList();
			}
			else{
				self.init();
				self.waitAPIReady();
			}
		}
	});
}
Video.fn.init = function init()
{
    var self=this;
	
                self.preloader = $("<div />");
                self.preloader.addClass("elite_vp_preloader");
                self.element.append(self.preloader);
				
				self.preloaderAD = $("<div />");
                self.preloaderAD.addClass("elite_vp_preloader");
                self.elementAD.append(self.preloaderAD);

                this.videoElement = $("<video />");
                this.videoElement.addClass("elite_vp_videoPlayer");
                this.videoElement.attr({
                    width:this.options.width,
                    height:this.options.height,
                    preload:this.options.preloadSelfHosted,
                    controls:this.options.controls
                });
				
                this.videoElementAD = $("<video />");
                this.videoElementAD.addClass("elite_vp_videoPlayerAD");
                this.videoElementAD.attr({
                    width:this.options.width,
                    height:this.options.height,
                    preload:this.options.preloadSelfHosted,
                    controls:this.options.controls
                });
				
                if(this.options.HTML5videoThumbnails !== "none"){
                    this.canvasWrap = $("<div />");
                    this.canvasWrap.addClass("elite_vp_canvasWrap")
                                   .hide();
                    this.element.append(this.canvasWrap)
                }
                
                if(this.options.HTML5videoThumbnails == "live"){
                    this.videoElementClone = $("<video />");
                    this.videoElementClone.addClass("elite_vp_videoPlayerClone");
                    
                    this.canvas = document.createElement("canvas");
                    this.canvas.classList.add("elite_vp_canvas");
                    this.canvas.classList.add("elite_vp_"+this.options.instanceTheme);
                    this.context = this.canvas.getContext("2d");
                    this.canvasWrap.append(this.canvas)
                }
                
                if(this.options.HTML5videoThumbnails == "vtt"){
                    this.vtt_thumb = $("<div />");
                    this.vtt_thumb.addClass("elite_vp_vtt_thumb")
                              .addClass("elite_vp_"+this.options.instanceTheme);
                    this.canvasWrap.append(this.vtt_thumb)
                }
				if(isMobile.iOS() && self.options.iOSPlaysinline){
					this.videoElement.attr('playsinline','').attr('webkit-playsinline','');
					this.videoElementAD.attr('playsinline','').attr('webkit-playsinline','');
				}
                if(this.options.autoplay){
                    this.videoElement.attr('muted','')
                    this.videoElement.muted = true;
                    this.videoElement.attr('autoplay','autoplay')
                    this.videoElementAD.attr('muted','')
                    this.videoElementAD.muted = true;
                    this.videoElementAD.attr('autoplay','autoplay')
                }
				
				this.controls = $("<div />");
				this.controls.addClass("elite_vp_controls");
				this.controls.addClass("elite_vp_disabled");
				if(this.element)
					this.element.append(this.controls);
				if(!this.options.showAllControls)
					this.controls.hide();
				
				this.nowPlayingTitle = $("<div />")
					.addClass("elite_vp_nowPlayingTitle");

				this.controls.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme);
				this.nowPlayingTitle.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme);

				if(!this.options.showAllControls)
					this.nowPlayingTitle.hide();
			    if(this.element)
				this.element.append(this.nowPlayingTitle);
				
				this.setupButtonsOnScreen();

                self._playlist = new PLAYER.Playlist($, self, self.options, self._vast, self.mainContainer, self.element, self.preloader, self.preloaderAD, self.myVideo, this.canPlay, self.CLICK_EV, params, self.pw, self.deviceAgent, self.agentID, self.youtube_array, self.isMobile);

                if(self.options.playlist=="Right playlist")                {
                    self.playerWidth = self.options.videoPlayerWidth - self._playlist.playlistW;
                    self.playerHeight = self.options.videoPlayerHeight;
                }
                else if(self.options.playlist=="Bottom playlist")                {
                    self.playerWidth = self.options.videoPlayerWidth;
                    self.playerHeight = self.options.videoPlayerHeight - self._playlist.playlistH;
                }
                else if(self.options.playlist=="Off")                {
                    self.playerWidth = self.options.videoPlayerWidth;
                    self.playerHeight = self.options.videoPlayerHeight;
                }

                self.playlistWidth = self._playlist.playlistW;

                self.initPlayer();
                self.resize();
                self.resizeAll();
				self.autohideControls();
};

Video.fn.initPlayer = function()
{
	var self = this;
    
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    
    this.setupHTML5Video();
    this.setupHTML5VideoAD();

	this.setupEvents();
	this.change("initial");
	this.setupControls();
	this.load();
	this.setupAutoplay();
	this.setupLightBox();
	this.setupElements();
	this.element.bind("idle", $.proxy(this.idle, this));
	this.element.bind("state.videoPlayer", $.proxy(function(){
		this.element.trigger("reset.idle");
	}, this))

    this.secondsFormat = function(sec)
    {
        if(isNaN(sec))
        {
            sec=0;
        }
        var result  = [];

        var minutes = Math.floor( sec / 60 );
		if(minutes>60)
			minutes = minutes%60
        var hours   = Math.floor( sec / 3600 );
        var seconds = (sec == 0) ? 0 : (sec % 60)
        seconds     = Math.round(seconds);

        var pad = function(num) {
            if (num < 10)
                return "0" + num;
            return num;
        }

        if (hours > 0)
            result.push(pad(hours));

        result.push(pad(minutes));
        result.push(pad(seconds));

        return result.join(":");
    };

    var self = this;

    $(window).resize(function() {

        if(!self.realFullscreenActive)
        {
            self.resizeAll();
        }
    });

	$(window).bind(this.RESIZE_EV,function(e)
    {
		if(!self.realFullscreenActive)
            self.resizeAll();
    });
    
    $(window).on('resize scroll', function() {
		
        if(!self.options.floatPlayerOutsideViewport){
            
            if($(self.mainContainer.parent()).isInViewport()){
                
                if(self.options.autoplay ){
                    self.play();
                    if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
                    self.youtubePlayer.playVideo();
                    if(self._playlist.videos_array[self._playlist.videoid].videoType == "vimeo" || self.options.videoType=="Vimeo")
					self.vimeoPlay();
                }
            } else {
				
                if(self.options.autoplay){
					if(self._playlist.videos_array[self._playlist.videoid].videoType == "youtube" || self.options.videoType=="YouTube")
						self.youtubePlayer.pauseVideo();
					if(self._playlist.videos_array[self._playlist.videoid].videoType == "HTML5" || self.options.videoType=="HTML5 (self-hosted)")
						self.pause();
					if(self._playlist.videos_array[self._playlist.videoid].videoType == "vimeo" || self.options.videoType=="Vimeo")
						self._playlist.vimeoPlayer.pause();
				}
			}
            return 
        }
        
        if(THREEx.FullScreen.activated() || self.inFullScreen)
             return
        
        if($(self.mainContainer.parent()).isInViewport()){
            self.initializedFloating = true;
            
            
            if(self.initializedFloating){
                $(self.mainContainer).removeClass("elite_vp_sticky")
                $(self.mainContainer.parent()).css({zIndex:1})
                
                self.mainContainerStickyBG.hide()
                
                self.stickyClosedOnButton = false;
                self.stickyPaused = false;
            }
            
            
            if(self.options.autoplay && self.element.hasClass("elite_vp_playing")){
                self.play();
                if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
                self.youtubePlayer.playVideo();
                if(self._playlist.videos_array[self._playlist.videoid].videoType == "vimeo" || self.options.videoType=="Vimeo")
				self.vimeoPlay();
            }
        }
        else{
            if(self.initializedFloating){
                    if(self.stickyClosedOnButton)
                    return
                self.mainContainer.addClass("elite_vp_sticky")
                
                $(self.mainContainer.parent()).css({zIndex:2})
               
                self.resizeStickyBG();
                self.mainContainerStickyBG.show()
                
                self.mainContainer.width(self.mainContainer.parent().width())
				
				if(self.options.pauseStickyOutsideViewport){
					if(!self.stickyPaused){
						if(self._playlist.videos_array[self._playlist.videoid].videoType == "youtube" || self.options.videoType=="YouTube"){
							self.youtubePlayer.pauseVideo();
						}
						if(self._playlist.videos_array[self._playlist.videoid].videoType == "HTML5" || self.options.videoType=="HTML5 (self-hosted)"){
							self.pause();
						}
						if(self._playlist.videos_array[self._playlist.videoid].videoType == "vimeo" || self.options.videoType=="Vimeo"){
							self._playlist.vimeoPlayer.pause();
						}
					}
					self.stickyPaused = true;
				}
            }
        }
    });
    
    window.addEventListener("orientationchange", function() {
        
        if(document.webkitIsFullScreen || document.fullscreenElement || document.mozFullScreen || document.msieFullScreen || document.msFullscreenElement  || this.inFullScreen){
            self.timeTotal.show();
            self.videoTrack.show();
            self.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
            self.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
            
            if(self.parent.height()<450)
                self.videoTrack.hide();
            if(self.parent.height()<438)
                self.timeTotal.hide();
            if(self.parent.height()<375)
                self.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
            if(self.parent.height()<350)
                self.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
        }
        self.positionControlsBtnsWrapperRight();
		self.positionTimeTotal();

		self.videoTrack.css({
			left:self.timeElapsed.position().left+self.timeElapsed.width()+10,
			width: screen.width - (123 + $(".elite_vp_controlsBtnsWrapperRight").width() +  $(".elite_vp_unmuteBtnWrapper").width() + 8 + $(".elite_vp_volumeTrack").width() + 7 + $(".elite_vp_fsBtnWrapper").width() + 28 + 30 + 10)
		});	
		
    }, false);
	
    $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange',function(e)
    {
        self.resize(e);
    });

    this.resize = function(e)
    {
		if(document.webkitIsFullScreen || document.fullscreenElement || document.mozFullScreen || document.msieFullScreen || document.msFullscreenElement)
        {
            this._playlist.hidePlaylist();
            this.element.addClass("elite_vp_fullScreen");
            this.elementAD.addClass("elite_vp_fullScreen");
            $(this.mainContainer).find(".fa-elite-expand").removeClass("fa-elite-expand").addClass("fa-elite-compress");
            $(this.fsEnterADBox).find(".fa-elite-expandAD").removeClass("fa-elite-expandAD").addClass("fa-elite-compressAD");
            self.element.width("100%");
            self.element.height("100%");
            self.elementAD.width("100%");
            self.elementAD.height("100%");
			self.mainContainer.width("100%");
            self.mainContainer.height("100%");
            self.mainContainer.css("position","fixed");
            self.mainContainer.css("left",0);
            self.mainContainer.css("top",0);
			this.timeElapsed.show();
			this.timeTotal.show();
			this.volumeTrack.show();
			if(this.options.rewindShow) this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
			if(this.options.ccShowOnHTML5Videos) this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
			if(this.options.qualityShow) this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
            if((this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")&&this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes")
                this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
			this.unmuteBtnWrapper.show();
			this.videoTrack.show();
            
            if(self.parent.width()<450)
                self.videoTrack.hide();
            if(this.parent.width()<438) 
                this.timeTotal.hide();
            if(this.parent.width()<375)
                this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
            if(this.parent.width()<350)
                this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
            
			this.positionTimeTotal();
			this.resizeVideoTrack();
            if(this.options.infoShow=="Yes")
                this.infoBtn.show();
            if(self.options.embedShow=="Yes")
                this.embedBtn.show();
            if(self.options.shareShow=="Yes")
                this.shareBtn.show();
            this.revertOriginalScale();
            this.setMaxHeightInfoEmbed();
            self.realFullscreenActive=true;
			
			if(this.options.lightBox){
				this.lightBoxThumbnailWrap.parent().hide();
			}
        }
        else
        {
            this._playlist.showPlaylist();
            this.element.removeClass("elite_vp_fullScreen");
            this.elementAD.removeClass("elite_vp_fullScreen");
            $(this.mainContainer).find(".fa-elite-compress").removeClass("fa-elite-compress").addClass("fa-elite-expand");
            $(this.fsEnterADBox). find(".fa-elite-compressAD").removeClass("fa-elite-compressAD").addClass("fa-elite-expandAD");
            self.element.width(self.playerWidth);
            self.element.height(self.playerHeight);

            self.elementAD.width(self.playerWidth);
            self.elementAD.height(self.playerHeight);
			
			self.mainContainer.css("left","");
            self.mainContainer.css("top","");
			if(self.options.playerLayout == "fitToContainer"  || self.options.playerLayout == "fitToBrowser")
			{
				self.mainContainer.width(self.mainContainer.parent().width);
				self.mainContainer.height("100%");
			}
			else if (self.options.playerLayout == "fixedSize"){
				self.mainContainer.width(self.options.videoPlayerWidth);
				self.mainContainer.height(self.options.videoPlayerHeight);
			}
			
			
			self.mainContainer.css("position","absolute");
			
            if(this.stretching){
                this.stretching=false;
                this.toggleStretch();
            }

            self.element.css({zIndex:455558 });
			self.mainContainer.parent().css("zIndex",1);
			self.mainContainer.css("zIndex",999999);
			self.realFullscreenActive=false;
            self.resizeAll();
            
            $('html, body').animate({
                'scrollTop' : self.savePageOffsetY
            }, 0);
			
			if(this.options.lightBox){
				this.lightBoxThumbnailWrap.parent().show();
			}
        }
		this.positionControlsBtnsWrapperRight();
		this.positionTimeTotal();
		this.resizeVideoTrack();
		this.positionOverScreenButtons();
		this.positionShareWindowFromTop();
		this.positionQualityWindow();
		this.positionLogo();
		this.positionPopup();
		this.resizeBars();
		if(self.options.hideControlsOnMouseOut=="Yes")
			this.hideControls();
		
        if(this.options.ccShowOnHTML5Videos){
            this.initialCCState()
            this.updateCCState()
        }
    }
};
Video.fn.setupLightBox = function(){
	var self = this;
	if(this.options.lightBox){
		this.options.playerLayout = "fixedSize"
		var videoplayers = this.mainContainer.parent();
		
		$.each(videoplayers, function(){
			self.lightBoxOverlay = $("<div />")
				.addClass("elite_vp_lightBoxOverlay")
				.hide()
				.css({
					opacity: 0
				})

				self.lightBoxCloseBtnWrapper = $("<div />")
					.addClass("elite_vp_lightBoxCloseBtnWrapper")
					.addClass("elite_vp_bg"+" "+"elite_vp_"+self.options.instanceTheme)
					.addClass("elite_vp_playerElement")
					.bind(self.CLICK_EV, function(){
						self.toggleLightBox();
					});
				self.mainContainer.append(self.lightBoxCloseBtnWrapper)
				self.lightBoxCloseBtn = $("<span />")
					.attr("aria-hidden","true")
					.attr("id", "elite_vp_lightBoxCloseBtn")
					.addClass("fa-elite")
					.addClass("elite-icon-general")
					.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+self.options.instanceTheme)
					.addClass("fa-elite-times")		
				self.lightBoxCloseBtnWrapper.append(self.lightBoxCloseBtn);
				
				self.lightBoxOverlayTransparent = $("<div />")
					.addClass("elite_vp_lightBoxOverlayTransparent")
					.bind(self.CLICK_EV, function(){
						if(self.options.lightBoxCloseOnOutsideClick)
						self.toggleLightBox();
					})
					.appendTo(self.lightBoxOverlay);
		
			
			self.mainContainer.addClass("elite_vp_lightBoxBorder");
				
			videoplayers.parent().append(self.lightBoxOverlay);
			self.mainContainer.appendTo(self.lightBoxOverlay);
			
			var w, h;
			if(self.options.lightBoxThumbnailAutoSize){
				w = "100%";
				h = videoplayers.parent().height();
			} else {
				w = self.options.lightBoxThumbnailWidth;
				h = self.options.lightBoxThumbnailHeight;
			}
			
			self.lightBoxThumbnailWrap = $("<div />")
				.addClass("elite_vp_lightBoxThumbnailWrap")
				.bind(self.CLICK_EV, function(){
					self.toggleLightBox();
				})
				.css({
					cursor: 'pointer',
					width: w,
					height: h
				})
				.appendTo(videoplayers)
			
				self.lightBoxThumbnail = $('<img class="elite_vp_lightBoxThumbnail">')
					.attr('src', self.options.lightBoxThumbnail)
					.appendTo(self.lightBoxThumbnailWrap)
					
				
				self.lightBoxPlayButton = $("<div />");
				self.lightBoxPlayButton.addClass("elite_vp_playButtonScreen")
					.attr("aria-hidden","true")
					.addClass("fa-elite")
					.addClass("fa-elite-playScreen"+" "+"elite_vp_"+self.options.instanceTheme)
					.appendTo(self.lightBoxThumbnailWrap)
		})
	}
}
Video.fn.setColorAccent = function(colorAccent, btn){
	var self=this;
	if($(btn).hasClass('fa-elite-random'))
	{
		this.mainContainer.find("#elite_vp_shuffleBtn.elite_vp_themeColor").css({"background":colorAccent});
		this.mainContainer.find("#elite_vp_shuffleBtn.elite_vp_themeColorText").css({"color":colorAccent});
		this.mainContainer.find("#elite_vp_shuffleBtn.elite_vp_themeColorButton").css({"color":colorAccent});
		this.mainContainer.find("#elite_vp_shuffleBtn.elite_vp_playBtnBg").css({"background":colorAccent});
	}
	if($(btn).hasClass('fa-elite-cog'))
	{
		this.mainContainer.find("#elite_vp_qualityBtn.elite_vp_themeColor").css({"background":colorAccent});
		this.mainContainer.find("#elite_vp_qualityBtn.elite_vp_themeColorText").css({"color":colorAccent});
		this.mainContainer.find("#elite_vp_qualityBtn.elite_vp_themeColorButton").css({"color":colorAccent});
		this.mainContainer.find("#elite_vp_qualityBtn.elite_vp_playBtnBg").css({"background":colorAccent});
	}
    if($(btn).hasClass('fa-elite-cc'))
	{
		this.mainContainer.find("#elite_vp_ccBtn.elite_vp_themeColor").css({"background":colorAccent});
		this.mainContainer.find("#elite_vp_ccBtn.elite_vp_themeColorText").css({"color":colorAccent});
		this.mainContainer.find("#elite_vp_ccBtn.elite_vp_themeColorButton").css({"color":colorAccent});
		this.mainContainer.find("#elite_vp_ccBtn.elite_vp_playBtnBg").css({"background":colorAccent});
	}
};
Video.fn.removeColorAccent = function(btn){
	if($(btn).hasClass('fa-elite-random'))
	{
		this.mainContainer.find(".fa-elite-random").css("color", "");
	}
	if($(btn).hasClass('fa-elite-cog'))
	{
		this.mainContainer.find(".fa-elite-cog").css("color", "");
	}
    if($(btn).hasClass('fa-elite-cc'))
	{
		this.mainContainer.find(".fa-elite-cc").css("color", "");
	}
};
Video.fn.resizeStickyBG = function(){
    var self = this;
    $(self.mainContainerStickyBG).css({
        width: $(self.mainContainer).width() + 20,
        height: $(self.mainContainer).height() + 20
    })
}
Video.fn.resizeAll = function(){
    var self = this;
	
    var plW = 260
    var plH = self.options.playlistShowOnlyThumbnails ? 198 : 142
	var ratio;
	if(this.isMobile.any())	ratio = this.options.videoRatioMobile;
	else ratio = this.options.videoRatio;

    if(this.realFullscreenActive)
        return
    
    if(self.options.playerLayout == "fitToContainer" || self.options.playerLayout == "fitToBrowser")
    {
		if(this.options.playlist == "Right playlist"){
			if(this.options.videoRatioStretch)
				var height = (this.parent.width()-this._playlist.playlist.width())/(ratio);
			else
				var height = this.parent.width()/(ratio);
			this.mainContainer.height(height);
		}
		else if(this.options.playlist == "Bottom playlist"){
			if(this.options.videoRatioStretch)
                var height = (this.parent.width()/(ratio))+this._playlist.playlist.height();
            else
                var height = this.parent.width()/(ratio);
			this.mainContainer.height(height);
		}
        else{
            var height = this.parent.width()/(ratio);
			this.mainContainer.height(height);
        }
        if(self.options.playerLayout == "fitToBrowser"){
            this.mainContainer.height("100%");
            this.mainContainer.width("100%");
        }
		
		this.parent.height(height);
        switch(self.options.playlist){
            case "Right playlist": 
                if(this.stretching){
                    if(this.parent.width()<440 && this.controlsBtnsWrapperRight.children().length==4){
                        this.timeTotal.hide();
						this.videoTrack.hide();
					}else if(this.parent.width()<412 && this.controlsBtnsWrapperRight.children().length==3){
                        this.timeTotal.hide();
						this.videoTrack.hide();
					}else if(this.parent.width()<384 && this.controlsBtnsWrapperRight.children().length==2){
                        this.timeTotal.hide();
						this.videoTrack.hide();
					}else if(this.parent.width()<356 && this.controlsBtnsWrapperRight.children().length==1){
                        this.timeTotal.hide();
						this.videoTrack.hide();
					}
					else if(this.parent.width()<328 && this.controlsBtnsWrapperRight.children().length==0){
                        this.timeTotal.hide();
						this.videoTrack.hide();
					}
                    else{
                        this.timeTotal.show();
                        this.videoTrack.show();
					}
					
					if(this.options.qualityShow){
						if(this.parent.width()<320)
							this.qualityBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
						else
							this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
					}
					if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes"){
						if(this.parent.width()<378){
							this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
                        }
						else{
                            this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
                        }
					}
					if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
					{
						if(this.options.ccShowOnHTML5Videos){
							if(this.parent.width()<350)
								this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
							else
								this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
						}
					}
					if(this.parent.width()<290)
                        this.rewindBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
                    else
                        this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
					if(this.parent.width()<262)
						this.unmuteBtnWrapper.hide();
					else
						this.unmuteBtnWrapper.show();
                    if(this.parent.width()<235)
                        this.volumeTrack.hide();
                    else
                        this.volumeTrack.show();
					if(self.options.embedShow=="Yes"){
						if(this.parent.width() < 560)
						self.embedBtn.hide();
						else
						self.embedBtn.show();
					}
                }
                else{
					if(this.parent.width()<700 && this.controlsBtnsWrapperRight.children().length==4){
                        this.timeTotal.hide();
						this.videoTrack.hide();
					}else if(this.parent.width()<672 && this.controlsBtnsWrapperRight.children().length==3){
                        this.timeTotal.hide();
						this.videoTrack.hide();
					}else if(this.parent.width()<644 && this.controlsBtnsWrapperRight.children().length==2){
                        this.timeTotal.hide();
						this.videoTrack.hide();
					}else if(this.parent.width()<616 && this.controlsBtnsWrapperRight.children().length==1){
                        this.timeTotal.hide();
						this.videoTrack.hide();
					}
					else if(this.parent.width()<588 && this.controlsBtnsWrapperRight.children().length==0){
                        this.timeTotal.hide();
						this.videoTrack.hide();
					}
                    else{
                        this.timeTotal.show();
                        this.videoTrack.show();
					}
					if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes"){
						if(this.parent.width()<638){
							this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
                        }
						else{
                            this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
                        }
					}
					if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
					{
						if(this.options.ccShowOnHTML5Videos){
							if(this.parent.width()<608){
								this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
                            }
							else
								this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
						}
					}
					if(this.options.qualityShow){
						if(this.parent.width()<580){
							this.qualityBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
                        }
						else
							this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
					}
					if(this.options.rewindShow){
						if(this.parent.width()<552){
							this.rewindBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
                        }
						else
							this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
					}
					if(this.options.playlistShowOnlyThumbnails){
						if(this.parent.width()<523) this.unmuteBtnWrapper.hide();
						else this.unmuteBtnWrapper.show();
						if(this.parent.width()<493) this.volumeTrack.hide();
						else this.volumeTrack.show();
					}else{
						if(this.parent.width()<452) this.unmuteBtnWrapper.hide();
						else this.unmuteBtnWrapper.show();
						if(this.parent.width()<425) this.volumeTrack.hide();
						else this.volumeTrack.show();
					}
                    
					if(self.options.embedShow=="Yes"){
						if(this.parent.width() < 590)
							self.embedBtn.hide();
						else
							self.embedBtn.show();
					}
					if(!this.options.playlistShowOnlyThumbnails){
					
						if(this.parent.width()<522){
							this.mainContainer.find(".elite_vp_playlistBarBtn").css({
								width:"20px"
							});
							this._playlist.lastBtn.hide();
							this._playlist.firstBtn.hide();
							this._playlist.playlist.css({width:90});
							
							for(var i = 0; i <= self._playlist.item_array.length-1; i++ ) {
								
								if(self._playlist.videos_array[i].thumbnail_image == '' 
									|| self._playlist.videos_array[i].thumbnail_image == 'thumbImg' 
									|| self._playlist.videos_array[i].thumbnail_image == 'undefined'){
									$(self._playlist.item_array)[i].find(".elite_vp_itemRight").show();
									$(self._playlist.item_array)[i].find('.elite_vp_itemRight').css({
										left: 5,
										paddingTop: 5,
										width: '76'
									})
									$(self._playlist.item_array)[i].find('.elite_vp_title').addClass("elite_vp_playlist_smallTitle")
									$(self._playlist.item_array)[i].find('.elite_vp_description').addClass("elite_vp_playlist_smallDescription")
								}else if(self._playlist.videos_array[i].thumbnail_image !== '' 
									|| self._playlist.videos_array[i].thumbnail_image !== 'thumbImg' 
									|| self._playlist.videos_array[i].thumbnail_image !== 'undefined'){
									$(self._playlist.item_array)[i].find(".elite_vp_itemRight").hide();
									$(self._playlist.item_array)[i].find('.elite_vp_itemRight').css({
										left: 76,
										paddingTop: 3,
										width: '170'
									})
								}
								this.removeHClasses(i);
								switch(this.getPlaylistTitleH(i)){
									case 14:
										$(self._playlist.item_array)[i].find('.elite_vp_description').addClass("elite_vp_playlist_height55Description")
									break;
									case 28:
										$(self._playlist.item_array)[i].find('.elite_vp_description').addClass("elite_vp_playlist_height41Description")
									break;
									case 42:
										$(self._playlist.item_array)[i].find('.elite_vp_description').addClass("elite_vp_playlist_height27Description")
									break;
								}
							}
							
							this.videoTrack.show();
							this.timeElapsed.show();
							this.timeTotal.show();
							this.volumeTrack.show();
							this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							if(this.options.qualityShow)
								this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
							{
								if(this.ccBtnWrapper!=undefined && this._playlist.videos_array[this._playlist.videoid].ccUrl != undefined)
								this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							}
							if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes"){
								this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
							}
							this.unmuteBtnWrapper.show();
							
							if(this.parent.width()<522 && this.controlsBtnsWrapperRight.children().length==4){
								this.timeTotal.hide();
								this.videoTrack.hide();
							}else if(this.parent.width()<502 && this.controlsBtnsWrapperRight.children().length==3){
								this.timeTotal.hide();
								this.videoTrack.hide();
							}else if(this.parent.width()<474 && this.controlsBtnsWrapperRight.children().length==2){
								this.timeTotal.hide();
								this.videoTrack.hide();
							}else if(this.parent.width()<446 && this.controlsBtnsWrapperRight.children().length==1){
								this.timeTotal.hide();
								this.videoTrack.hide();
							}
							else if(this.parent.width()<418 && this.controlsBtnsWrapperRight.children().length==0){
								this.timeTotal.hide();
								this.videoTrack.hide();
							}
							if(this.options.qualityShow){
								if(this.parent.width()<410)
									this.qualityBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
								else
									this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							}
							if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
							{
								if(this.parent.width()<410)
									this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
								else{
									if(this.ccBtnWrapper!=undefined && this._playlist.videos_array[this._playlist.videoid].ccUrl != undefined)
									this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
								}
							}
							if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes"){
								if(this.parent.width()<467)
									this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
								else
									this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");	
							}
							if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
							{
								if(this.options.ccShowOnHTML5Videos){
									if(this.parent.width()<440)
										this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
									else
										this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");	
								}
							}
							if(this.parent.width()<380)
								this.rewindBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
							else
								this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							if(this.parent.width()<353)
								this.unmuteBtnWrapper.hide();
							else
								this.unmuteBtnWrapper.show();
							if(this.parent.width()<322)
								this.volumeTrack.hide();
							else
								this.volumeTrack.show();
						}
						else{
							self._playlist.playlist.css({width:plW});
							for(var i = 0; i <= self._playlist.item_array.length-1; i++ ) {
								
								if(self._playlist.videos_array[i].thumbnail_image == '' 
									|| self._playlist.videos_array[i].thumbnail_image == 'thumbImg' 
									|| self._playlist.videos_array[i].thumbnail_image == 'undefined'){
									$(self._playlist.item_array)[i].find(".elite_vp_itemRight").show();
									$(self._playlist.item_array)[i].find('.elite_vp_itemRight').css({
										left: 5,
										paddingTop: 5,
										width: '240'
									})
									$(self._playlist.item_array)[i].find('.elite_vp_title').removeClass("elite_vp_playlist_smallTitle")
									$(self._playlist.item_array)[i].find('.elite_vp_description').removeClass("elite_vp_playlist_smallDescription")
								}else if(self._playlist.videos_array[i].thumbnail_image !== '' 
									|| self._playlist.videos_array[i].thumbnail_image !== 'thumbImg' 
									|| self._playlist.videos_array[i].thumbnail_image !== 'undefined'){
									$(self._playlist.item_array)[i].find(".elite_vp_itemRight").show();
									$(self._playlist.item_array)[i].find('.elite_vp_itemRight').css({
										left: 76,
										paddingTop: 3,
										width: '170'
									})
								}
								this.removeHClasses(i);
								switch(this.getPlaylistTitleH(i)){
									case 14:
										$(self._playlist.item_array)[i].find('.elite_vp_description').addClass("elite_vp_playlist_height55Description")
									break;
									case 28:
										$(self._playlist.item_array)[i].find('.elite_vp_description').addClass("elite_vp_playlist_height41Description")
									break;
									case 42:
										$(self._playlist.item_array)[i].find('.elite_vp_description').addClass("elite_vp_playlist_height27Description")
									break;
								}
							}
							
							this.mainContainer.find(".elite_vp_playlistBarBtn").css({
								width:"30px"
							});
							this._playlist.lastBtn.show();
							this._playlist.firstBtn.show();
						}
					}
                }
				if(this._playlist.playlist.height()<190 )
				{
					this.scaleElements();
				}
				else
				{
					this.revertOriginalScale();
				}
				if(self.options.infoShow=="Yes"){
					if(this._playlist.playlist.height()<198)
						this.infoBtn.hide();
					else
						this.infoBtn.show();
				}
				if(self.options.embedShow=="Yes"){
					if(this._playlist.playlist.height()<159)
						this.embedBtn.hide();
					else
						this.embedBtn.show();
				}
				if(self.options.shareShow=="Yes"){
					if(this._playlist.playlist.height()<123)
						this.shareBtn.hide();
					else
						this.shareBtn.show();
				}
                break;
            case "Bottom playlist":
				if(this.parent.width()<440 && this.controlsBtnsWrapperRight.children().length==4){
					this.timeTotal.hide();
					this.videoTrack.hide();
				}else if(this.parent.width()<412 && this.controlsBtnsWrapperRight.children().length==3){
					this.timeTotal.hide();
					this.videoTrack.hide();
				}else if(this.parent.width()<384 && this.controlsBtnsWrapperRight.children().length==2){
					this.timeTotal.hide();
					this.videoTrack.hide();
				}else if(this.parent.width()<356 && this.controlsBtnsWrapperRight.children().length==1){
					this.timeTotal.hide();
					this.videoTrack.hide();
				}
				else if(this.parent.width()<328 && this.controlsBtnsWrapperRight.children().length==0){
					this.timeTotal.hide();
					this.videoTrack.hide();
				}
				else{
					this.timeTotal.show();
					this.videoTrack.show();
				}

				this.volumeTrack.show();
				
				if(this.mainContainer.height()<313 )
				{
					this.scaleElements();
                    
					if(!this.options.playlistShowOnlyThumbnails){
					$(this._playlist.playlist).css({
						height:127
					})
					}
					this._playlist.playlistH = $(this._playlist.playlist).height()
					
						if(this.mainContainer.height()<230 )
						{
							$(this._playlist.playlist).css({
								height:92
							})
							this._playlist.playlistH = $(this._playlist.playlist).height()
							this.mainContainer.find(".elite_vp_itemRight_bottom").hide();
							this.mainContainer.find(".elite_vp_nowPlayingThumbnail").css({
								opacity: 0
							});
							this.mainContainer.find(".elite_vp_itemSelected").css({
								width: 40,
								height:40
							});
							this.mainContainer.find(".elite_vp_itemUnselected").css({
								width: 40,
								height:40
							});
							this.mainContainer.find(".elite_vp_itemLeft").css({
								width: 35,
								height: 35
							});
						}
						else{
							this.mainContainer.find(".elite_vp_itemRight_bottom").show();
							this.mainContainer.find(".elite_vp_nowPlayingThumbnail").css({
								opacity: 1
							});
							this.mainContainer.find(".elite_vp_itemSelected").css({
								width: 245,
								height:76
							});
							this.mainContainer.find(".elite_vp_itemUnselected").css({
								width: 245,
								height:76
							});
							this.mainContainer.find(".elite_vp_itemLeft").css({
								width: 70,
								height: 70
							});
						}
				}
				else
				{
					this.revertOriginalScale();
                    
					$(this._playlist.playlist).css({
						height:plH
					})
					this._playlist.playlistH = $(this._playlist.playlist).height()
					
					this.mainContainer.find(".elite_vp_itemRight_bottom").show();
					this.mainContainer.find(".elite_vp_nowPlayingThumbnail").css({
						opacity: 1
					});
					this.mainContainer.find(".elite_vp_itemSelected").css({
						width: 245,
						height:76
					});
					this.mainContainer.find(".elite_vp_itemUnselected").css({
						width: 245,
						height:76
					});
					this.mainContainer.find(".elite_vp_itemLeft").css({
						width: 70,
						height: 70
					});
				}
				
				if(self.options.infoShow=="Yes"){
					if(this.mainContainer.height()<270)
						this.infoBtn.hide();
					else
						this.infoBtn.show();
				}
				if(self.options.embedShow=="Yes"){
					if(this.mainContainer.height()<330)
						this.embedBtn.hide();
					else
						this.embedBtn.show();
				}
				if(self.options.shareShow=="Yes"){
					if(this.mainContainer.height()<194)
						this.shareBtn.hide();
					else
						this.shareBtn.show();
				}
				
            case "Off":
				if(this.parent.width()<440 && this.controlsBtnsWrapperRight.children().length==4){
					this.timeTotal.hide();
					this.videoTrack.hide();
				}else if(this.parent.width()<412 && this.controlsBtnsWrapperRight.children().length==3){
					this.timeTotal.hide();
					this.videoTrack.hide();
				}else if(this.parent.width()<384 && this.controlsBtnsWrapperRight.children().length==2){
					this.timeTotal.hide();
					this.videoTrack.hide();
				}else if(this.parent.width()<356 && this.controlsBtnsWrapperRight.children().length==1){
					this.timeTotal.hide();
					this.videoTrack.hide();
				}
				else if(this.parent.width()<328 && this.controlsBtnsWrapperRight.children().length==0){
					this.timeTotal.hide();
					this.videoTrack.hide();
				}
				else{
					this.timeTotal.show();
					this.videoTrack.show();
				}
				
				if(this.options.qualityShow){
					if(this.parent.width()<320)
						this.qualityBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
					else
						this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
				}
				if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes"){
					if(this.parent.width()<378)
						this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
					else
						this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
				}
				if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
				{
					if(this.options.ccShowOnHTML5Videos){
						if(this.parent.width()<350)
							this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
						else
							this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
					}
				}
				if(this.parent.width()<290)
					this.rewindBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
				else
					this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
				if(this.parent.width()<262)
					this.unmuteBtnWrapper.hide();
				else
					this.unmuteBtnWrapper.show();
				if(this.parent.width()<235)
					this.volumeTrack.hide();
				else
					this.volumeTrack.show();
				if(self.options.embedShow=="Yes"){
					if(this.parent.width() < 560)
					self.embedBtn.hide();
					else
					self.embedBtn.show();
				}
				
                break;

        }
		
        if(this.stretching){
            if(self.options.playlist=="Right playlist"){
                self.element.width(self.parent.parent().width());
                self.element.height(self._playlist.playlist.height());
            }
            else if(self.options.playlist=="Bottom playlist"){
                self.element.width(self.parent.parent().width());
				self.element.height(height);
            }
            else if(self.options.playlist=="Off"){
                self.element.width(self.parent.parent().width());
                self.element.height(self.parent.parent().height());
            }
        }
        else{
            if(self.options.playlist=="Right playlist"){
                self.element.width(self.parent.parent().width()-self._playlist.playlist.width());
                self.element.height(self._playlist.playlist.height());
            }
            else if(self.options.playlist=="Bottom playlist"){
                self.element.width(self.parent.parent().width());
                self.element.height(height-self._playlist.playlist.height());
            }
            else if(self.options.playlist=="Off"){
                self.element.width(self.parent.parent().width());
                self.element.height(self.parent.height());
            }
        }
		if (self.agentID && (self._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"))
		{
			if(!self.options.showAllControls){
				self.videoElement.width(self.element.width());
				self.videoElement.height(self.element.height());
				self.videoElementAD.width(self.element.width());
				self.videoElementAD.height(self.element.height());
			}
		}
        self._playlist.resizePlaylist();
        self.elementAD.width(self.element.width());
        self.elementAD.height(self.element.height());
		self.positionControlsBtnsWrapperRight();
		self.positionTimeTotal();
        self.resizeVideoTrack();
        self.positionOverScreenButtons();
		self.positionShareWindowFromTop();
		self.positionQualityWindow();
        self.resizeBars();
        self.positionLogo();
        self.positionPopup();
        if(this.options.floatPlayerOutsideViewport){
            self.resizeStickyBG()   
        }
    }

    else if(self.options.playerLayout == "fixedSize"){

        self.newPlayerWidth = $(window).width() - self.mainContainer.position().left -48;
        self.newPlayerHeight = self.newPlayerWidth/(self.options.videoPlayerWidth/self.options.videoPlayerHeight);

    if ( self.newPlayerWidth < self.options.videoPlayerWidth )
    { 
		if(this.options.lightBox){
			$(self.mainContainer).css({
				position: 'absolute',
				left: 24,
				top: window.innerHeight/2 - (self.newPlayerHeight/2) - 10
			})
		}
        switch(self.options.playlist){
            case "Right playlist":

                    if(this.stretching){
						if(self.newPlayerWidth<380)
							this.videoTrack.hide();
						else
							this.videoTrack.show();
						if(self.newPlayerWidth<438)
							this.timeTotal.hide();
						else
							this.timeTotal.show();
						if(this.options.qualityShow){
							if(self.newPlayerWidth<320)
								this.qualityBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
							else
								this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
						}
						if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes"){
							if(self.newPlayerWidth<375)
								this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
							else
								this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
						}
						if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
						{
							if(this.options.ccShowOnHTML5Videos){
								if(self.newPlayerWidth<350)
									this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
								else
									this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							}
						}
						if(self.newPlayerWidth<290)
							this.rewindBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
						else
							this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
						if(self.newPlayerWidth<262)
							this.unmuteBtnWrapper.hide();
						else
							this.unmuteBtnWrapper.show();
						this.volumeTrack.show();
						if(self.options.embedShow=="Yes"){
							if(self.newPlayerWidth < 560)
							self.embedBtn.hide();
							else
							self.embedBtn.show();
						}
                        if(self.newPlayerWidth<236)
							this.volumeTrack.hide();
						else
							this.volumeTrack.show();
                        if(self.newPlayerWidth<522){
							this._playlist.playlist.css({width:90});
                        }
                        else{
                            this._playlist.playlist.css({width:plW});
                        }
                    }
                    else{
						if(self.newPlayerWidth<640)
							this.videoTrack.hide();
						else
							this.videoTrack.show();
						if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes"){
							if(self.newPlayerWidth < 635)
								self.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
							else
								self.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
						}
						if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
						{
							if(this.options.ccShowOnHTML5Videos){
								if(self.newPlayerWidth < 610)
									self.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
								else
									self.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							}
						}
						if(self.newPlayerWidth < 700)
                            self.timeTotal.hide();
                        else
                            self.timeTotal.show();
						if(self.options.embedShow=="Yes"){
							if(self.newPlayerWidth < 655)
								self.embedBtn.hide();
							else
								self.embedBtn.show();
						}
						if(this.options.qualityShow){
							if(self.newPlayerWidth < 580)
								self.qualityBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
							else
								self.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
						}
                        if(self.newPlayerWidth < 550)
                            self.rewindBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
                        else
                            self.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
                        if(self.newPlayerWidth < 525)
                            self.unmuteBtnWrapper.hide();
                        else
                            self.unmuteBtnWrapper.show();
						if(self.newPlayerWidth<522){
							this.mainContainer.find(".elite_vp_playlistBarBtn").css({
								width:"20px"
							});
							this._playlist.lastBtn.hide();
							this._playlist.firstBtn.hide();
							this._playlist.playlist.css({width:90});
							this.mainContainer.find(".elite_vp_itemRight").hide();
							
							this.videoTrack.show();
							this.timeElapsed.show();
							if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes")
								this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
							this.timeTotal.show();
							this.volumeTrack.show();
							this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							if(this.options.qualityShow)
								this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							this.unmuteBtnWrapper.show();
							if(self.newPlayerWidth<470)
								this.videoTrack.hide();
							else
								this.videoTrack.show();
							if(self.newPlayerWidth<500)
								this.timeTotal.hide();
							else
								this.timeTotal.show();	
							if(this.options.qualityShow){
								if(self.newPlayerWidth<410)
									this.qualityBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
								else
									this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							}
							if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes"){
								if(self.newPlayerWidth<440)
									this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
								else
									this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
							}
							if(self.newPlayerWidth<380)
								this.rewindBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
							else
								this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
							if(self.newPlayerWidth<353)
								this.unmuteBtnWrapper.hide();
							else
								this.unmuteBtnWrapper.show();
							if(self.newPlayerWidth<322)
								this.volumeTrack.hide();
							else
								this.volumeTrack.show();
						}
						else{
							self._playlist.playlist.css({width:plW});
							self.mainContainer.find(".elite_vp_itemRight").show();
							this.mainContainer.find(".elite_vp_playlistBarBtn").css({
								width:"30px"
							});
							this._playlist.lastBtn.show();
							this._playlist.firstBtn.show();
						}
                    }
					if(this.newPlayerHeight<190 )
					{
						this.scaleElements()
					}
					else
					{
						this.revertOriginalScale();
					}
					if(self.options.infoShow=="Yes"){
						if(self.newPlayerHeight<198)
							this.infoBtn.hide();
						else
							this.infoBtn.show();
					}
					if(self.options.embedShow=="Yes"){
						if(self.newPlayerHeight<159)
							this.embedBtn.hide();
						else
							this.embedBtn.show();
					}
					if(self.options.shareShow=="Yes"){
						if(self.newPlayerHeight<123)
							this.shareBtn.hide();
						else
							this.shareBtn.show();
					}
            break;

            case "Bottom playlist":
                if(this.stretching){
                    if(self.options.infoShow=="Yes"){
                        if(self.newPlayerWidth<438)
                            this.infoBtn.hide();
                        else
                            this.infoBtn.show();
                    }
                    if(self.options.embedShow=="Yes"){
                        if(self.newPlayerWidth<350)
                            this.embedBtn.hide();
                        else
                            this.embedBtn.show();
                    }
                    if(self.options.shareShow=="Yes"){
                        if(self.newPlayerWidth<plW)
                            this.shareBtn.hide();
                        else
                            this.shareBtn.show();
                    }
                }
                else{
                    if(self.options.infoShow=="Yes"){
                        if(self.newPlayerWidth<815)
                            this.infoBtn.hide();
                        else
                            this.infoBtn.show();
                    }
                    if(self.options.embedShow=="Yes"){
                        if(self.newPlayerWidth<655)
                            this.embedBtn.hide();
                        else
                            this.embedBtn.show();
                    }
                    if(self.options.shareShow=="Yes"){
                        if(self.newPlayerWidth<565)
                            this.shareBtn.hide();
                        else
                            this.shareBtn.show();
                    }
                }
				if(self.newPlayerWidth<380)
					this.videoTrack.hide();
				else
					this.videoTrack.show();
				if(self.newPlayerWidth<361)
					this.timeTotal.hide();
				else
					this.timeTotal.show();
				if(this.options.qualityShow){
					if(self.newPlayerWidth<320)
						this.qualityBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
					else
						this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
				}
                if(self.newPlayerWidth<438)
						this.timeTotal.hide();
					else
						this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
				if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes"){
					if(self.newPlayerWidth<375)
						this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
					else
						this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
				}
				if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
				{
					if(this.options.ccShowOnHTML5Videos){
						if(self.newPlayerWidth<347)
							this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
						else
							this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
					}
				}
				if(self.newPlayerWidth<290)
					this.rewindBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
				else
					this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
				if(self.newPlayerWidth<262)
					this.unmuteBtnWrapper.hide();
				else
					this.unmuteBtnWrapper.show();
                if(self.newPlayerWidth<235)
					this.volumeTrack.hide();
				else
					this.volumeTrack.show();
				
				if(this.newPlayerHeight<313 )
				{
					this.scaleElements();
                    
					$(this._playlist.playlist).css({
						height:127
					})
					this._playlist.playlistH = $(this._playlist.playlist).height()
					
						if(this.newPlayerHeight<230 )
						{
							$(this._playlist.playlist).css({
								height:92
							})
							this._playlist.playlistH = $(this._playlist.playlist).height()
							this.mainContainer.find(".elite_vp_itemRight_bottom").hide();
							this.mainContainer.find(".elite_vp_nowPlayingThumbnail").css({
								opacity: 0
							});
							this.mainContainer.find(".elite_vp_itemSelected").css({
								width: 40,
								height:40
							});
							this.mainContainer.find(".elite_vp_itemUnselected").css({
								width: 40,
								height:40
							});
							this.mainContainer.find(".elite_vp_itemLeft").css({
								width: 35,
								height: 35
							});
						}
						else{
							this.mainContainer.find(".elite_vp_itemRight_bottom").show();
							this.mainContainer.find(".elite_vp_nowPlayingThumbnail").css({
								opacity: 1
							});
							this.mainContainer.find(".elite_vp_itemSelected").css({
								width: 245,
								height:76
							});
							this.mainContainer.find(".elite_vp_itemUnselected").css({
								width: 245,
								height:76
							});
							this.mainContainer.find(".elite_vp_itemLeft").css({
								width: 70,
								height: 70
							});
						}
				}
				else
				{
					this.revertOriginalScale();
                    
					$(this._playlist.playlist).css({
						height:plH
					})
					this._playlist.playlistH = $(this._playlist.playlist).height()
				}
            break;

            case "Off":
                if(self.options.infoShow=="Yes"){
                    if(self.newPlayerWidth<350)
                        this.infoBtn.hide();
                    else
                        this.infoBtn.show();
                }
                if(self.options.embedShow=="Yes"){
                    if(self.newPlayerWidth<plW)
                        this.embedBtn.hide();
                    else
                        this.embedBtn.show();
                }
                if(self.options.shareShow=="Yes"){
                    if(self.newPlayerWidth<170)
                        this.shareBtn.hide();
                    else
                        this.shareBtn.show();
                }
				if(self.newPlayerWidth<380)
					this.videoTrack.hide();
				else
					this.videoTrack.show();
				if(self.newPlayerWidth<361)
					this.timeTotal.hide();
				else
					this.timeTotal.show();
				if(this.options.qualityShow){
					if(self.newPlayerWidth<320)
						this.qualityBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
					else
						this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
				}
                if(self.newPlayerWidth<438)
						this.timeTotal.hide();
					else
						this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
				if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes"){
					if(self.newPlayerWidth<375)
						this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
					else
						this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
				}
				if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
				{
					if(this.options.ccShowOnHTML5Videos){
						if(self.newPlayerWidth<347)
							this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
						else
							this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
					}
				}
				if(self.newPlayerWidth<290)
					this.rewindBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
				else
					this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
				if(self.newPlayerWidth<262)
					this.unmuteBtnWrapper.hide();
				else
					this.unmuteBtnWrapper.show();
                if(self.newPlayerWidth<235)
					this.volumeTrack.hide();
				else
					this.volumeTrack.show();
				if(this.newPlayerHeight<190 )
				{
					this.scaleElements();
				}
				else
				{
					this.revertOriginalScale()
				}
            break;
            }
    }
    else
    {
		if(this.options.lightBox){
			$(self.mainContainer).css({
				position: 'absolute',
				left: window.innerWidth/2 - (self.options.videoPlayerWidth/2),
				top: window.innerHeight/2 - (self.options.videoPlayerHeight/2) - 10
			})
		}
        self.newPlayerWidth = self.options.videoPlayerWidth;
		self.newPlayerHeight = self.options.videoPlayerHeight;
		this.videoTrack.show();
		this.timeElapsed.show();
		this.timeTotal.show();
		this.volumeTrack.show();
		this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
		if(this.options.qualityShow)
			this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
		this.unmuteBtnWrapper.show();self._playlist.playlist.css({width:plW});
		this.mainContainer.find(".elite_vp_itemRight").show();
		this.mainContainer.find(".elite_vp_playlistBarBtn").css({
			width:"30px"
		});
		this._playlist.lastBtn.show();
		this._playlist.firstBtn.show();
    }

    if(self.options.playlist=="Right playlist"){
		if (self.agentID && (self._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"))
		{
			if(!self.options.showAllControls){
				self.videoElement.height(self.newPlayerHeight-50);
				self.videoElementAD.height(self.newPlayerHeight-50);
			}
		}
        self.element.css({width:self.newPlayerWidth, height:self.newPlayerHeight});
        self.mainContainer.css({width:self.newPlayerWidth, height:self.newPlayerHeight});
    }
    else if(self.options.playlist=="Bottom playlist"){
        self.element.width(self.newPlayerWidth);
        self.mainContainer.css({width:self.newPlayerWidth, height:self.newPlayerHeight});
    }
    else if(self.options.playlist=="Off"){
		if (self.agentID && (self._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"))
		{
			if(!self.options.showAllControls){
				self.videoElement.height(self.newPlayerHeight-50);
				self.videoElementAD.height(self.newPlayerHeight-50);
			}
		}
        self.element.css({width:self.newPlayerWidth, height:self.newPlayerHeight});
        self.mainContainer.css({width:self.newPlayerWidth, height:self.newPlayerHeight});
    }
    if(this.stretching)
    {
        if(self.options.playlist=="Right playlist")
        {
			if (self.agentID && (self._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"))
			{
				if(!self.options.showAllControls){
					self.videoElement.width(self.newPlayerWidth-32);
					self.videoElementAD.width(self.newPlayerWidth-32);
				}
			}
			self.element.width($(self.mainContainer).width());
        }
        else if(self.options.playlist=="Bottom playlist")
        {           
            self.element.height(self.newPlayerHeight);
        }
        else if(self.options.playlist=="Off")
        {
			if (self.agentID && (self._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"))
			{
				self.videoElement.width(self.newPlayerWidth-32);
				self.videoElementAD.width(self.newPlayerWidth-32);
			}
			self.element.width($(self.mainContainer).width());
        }
    }
    else
    {
        if(self.options.playlist=="Right playlist")
        {
			if (self.agentID && (self._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"))
			{
				if(!self.options.showAllControls){
					self.videoElement.width(self.newPlayerWidth- self._playlist.playlist.width()-32);
					self.videoElementAD.width(self.newPlayerWidth- self._playlist.playlist.width()-32);
				}
			}
			self.element.width($(self.mainContainer).width()- self._playlist.playlist.width());
            self._playlist.resizePlaylist(self.newPlayerWidth, self.newPlayerHeight);
        }
        else if(self.options.playlist=="Bottom playlist")
        {
            self.element.height(self.newPlayerHeight - self._playlist.playlistH);
            self._playlist.resizePlaylist(self.newPlayerWidth, self.newPlayerHeight);

        }
        else if(self.options.playlist=="Off")
        {
			if (self.agentID && (self._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"))
			{
				if(!self.options.showAllControls){
					self.videoElement.width(self.newPlayerWidth-32);
					self.videoElementAD.width(self.newPlayerWidth-32);
				}
			}
			self.element.width($(self.mainContainer).width());
        }
    }

    self.elementAD.width(self.element.width());
    self.elementAD.height(self.element.height());

	if (self.agentID && (self._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")) {
		if(self.playBtnScreen)
		self.playBtnScreen.hide();
	}
	if(self.youtubePlayer!= undefined)
	{
		if(self.realFullscreenActive)
		{
			self.element.width($(document).width());
			self.element.height($(document).height());
		}
		self.youtubePlayer.setSize("100%","100%" );
	}
	if(this.options.lightBox){
		$(this.mainContainerBG).css({
			width: $(self.mainContainer).width() + 20,
			height: $(self.mainContainer).height() + 20
		})	
	}
    self._playlist.resizePlaylist();
	self.positionControlsBtnsWrapperRight();
	self.positionTimeTotal();
    self.resizeVideoTrack();
    self.positionOverScreenButtons();
	self.positionShareWindowFromTop();
    self.positionQualityWindow();
    self.resizeBars();
    self.positionLogo();
    self.positionPopup();
    if(this.options.floatPlayerOutsideViewport)
        self.resizeStickyBG()  
	}
    
    this.setMaxHeightInfoEmbed();
    
    this.embedCodeReady();
};
Video.fn.revertOriginalScale = function(){
    
    $(this.playButtonScreen).css({
        '-webkit-transform' : 'scale(' + 1 + ')',
        '-moz-transform'    : 'scale(' + 1 + ')',
        '-ms-transform'     : 'scale(' + 1 + ')',
        '-o-transform'      : 'scale(' + 1 + ')',
        'transform'         : 'scale(' + 1 + ')'
    });
    $(this.toggleAdPlayBox).css({
        '-webkit-transform' : 'scale(' + 1 + ')',
        '-moz-transform'    : 'scale(' + 1 + ')',
        '-ms-transform'     : 'scale(' + 1 + ')',
        '-o-transform'      : 'scale(' + 1 + ')',
        'transform'         : 'scale(' + 1 + ')'
    });
    $(this.skipAdCount).css({
        '-webkit-transform' : 'scale(' + 1 + ')',
        '-moz-transform'    : 'scale(' + 1 + ')',
        '-ms-transform'     : 'scale(' + 1 + ')',
        '-o-transform'      : 'scale(' + 1 + ')',
        'transform'         : 'scale(' + 1 + ')',
        'transform-origin'  : 'bottom right'
    });
    $(this.skipAdBox).css({
        '-webkit-transform' : 'scale(' + 1 + ')',
        '-moz-transform'    : 'scale(' + 1 + ')',
        '-ms-transform'     : 'scale(' + 1 + ')',
        '-o-transform'      : 'scale(' + 1 + ')',
        'transform'         : 'scale(' + 1 + ')',
        'transform-origin'  : 'bottom right'
    });
    $(this.logoImg).css({
        '-webkit-transform' : 'scale(' + 1 + ')',
        '-moz-transform'    : 'scale(' + 1 + ')',
        '-ms-transform'     : 'scale(' + 1 + ')',
        '-o-transform'      : 'scale(' + 1 + ')',
        'transform'         : 'scale(' + 1 + ')',
        'transform-origin'  : 'bottom left'
    });
    $(this.controls).css({
        height:50
    })
    $(this._playlist.playlistBar).css({
        height:50
    })   
}
Video.fn.scaleElements = function(){
    
    $(this.playButtonScreen).css({
        '-webkit-transform' : 'scale(' + .6 + ')',
        '-moz-transform'    : 'scale(' + .6 + ')',
        '-ms-transform'     : 'scale(' + .6 + ')',
        '-o-transform'      : 'scale(' + .6 + ')',
        'transform'         : 'scale(' + .6 + ')'
    });
    $(this.toggleAdPlayBox).css({
        '-webkit-transform' : 'scale(' + .6 + ')',
        '-moz-transform'    : 'scale(' + .6 + ')',
        '-ms-transform'     : 'scale(' + .6 + ')',
        '-o-transform'      : 'scale(' + .6 + ')',
        'transform'         : 'scale(' + .6 + ')'
    });
    $(this.skipAdCount).css({
        '-webkit-transform' : 'scale(' + .6 + ')',
        '-moz-transform'    : 'scale(' + .6 + ')',
        '-ms-transform'     : 'scale(' + .6 + ')',
        '-o-transform'      : 'scale(' + .6 + ')',
        'transform'         : 'scale(' + .6 + ')',
        'transform-origin'  : 'bottom right'
    });
    $(this.skipAdBox).css({
        '-webkit-transform' : 'scale(' + .6 + ')',
        '-moz-transform'    : 'scale(' + .6 + ')',
        '-ms-transform'     : 'scale(' + .6 + ')',
        '-o-transform'      : 'scale(' + .6 + ')',
        'transform'         : 'scale(' + .6 + ')',
        'transform-origin'  : 'bottom right'
    });
    $(this.logoImg).css({
        '-webkit-transform' : 'scale(' + .6 + ')',
        '-moz-transform'    : 'scale(' + .6 + ')',
        '-ms-transform'     : 'scale(' + .6 + ')',
        '-o-transform'      : 'scale(' + .6 + ')',
        'transform'         : 'scale(' + .6 + ')',
        'transform-origin'  : 'bottom left'
    });
    $(this.controls).css({
        height:35
    })
    $(this._playlist.playlistBar).css({
        height:35
    })
}
Video.fn.getPlaylistTitleH = function(i){
    return $(this._playlist.item_array)[i].find('.elite_vp_title').height()
}
Video.fn.removeHClasses = function(i){
    $(this._playlist.item_array)[i].find('.elite_vp_description').removeClass("elite_vp_playlist_height55Description elite_vp_playlist_height41Description elite_vp_playlist_height27Description")
}
Video.fn.embedCodeReady = function(){
    if(this.options.lightBox){
        this.w = parseInt(this.options.lightBoxThumbnailWidth);
        this.h = parseInt(this.options.lightBoxThumbnailHeight);
    }
    else{
        this.w = this.mainContainer.outerWidth();
        this.h = this.mainContainer.outerHeight();
    }
    this.saveEmbed = "<iframe src='"+this.s+"' width='"+this.w+"' height='"+this.h+"' frameborder=0 webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>"    
}
Video.fn.setMaxHeightInfoEmbed = function(){
    this.infoWindow.css("max-height", (this.mainContainer.height()- this.controls.height()) + "px")
    this.embedWindow.css("max-height", (this.mainContainer.height()) + "px")
}
Video.fn.autohideControls = function(){
    var element  = this.element;
    var idle     = false;
    var timeout  = this.options.autohideControls*1000;
    var interval = 1000;
    var timeFromLastEvent = 0;

    var reset = function()
    {
        if (idle)
            element.trigger("idle", false);
        idle = false;
        timeFromLastEvent = 0;
    };

    var check = function()
    {
        if (timeFromLastEvent >= timeout) {
            reset();
            idle = true;
            element.trigger("idle", true);
        }
        else
        {
            timeFromLastEvent += interval;
        }
    };

    element.bind(idleEvents, reset);

    var loop = setInterval(check, interval);

    element.on("unload",function()
    {
        clearInterval(loop);
    });
};
Video.fn.resizeBars = function(){

	if(this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube")
	{
		if(this.youtubePlayer!= undefined && this._playlist.youtubeSTARTED){
			
			this.progressWidth = (this.youtubePlayer.getCurrentTime()/this.youtubePlayer.getDuration() )*this.videoTrack.width();
			this.videoTrackProgress.css("width", this.progressWidth);
			this.progressIdleWidth = (this.youtubePlayer.getCurrentTime()/this.youtubePlayer.getDuration() )*this.progressIdleTrack.width();
			this.progressIdle.css("width", this.progressIdleWidth);
			
			this.buffered = this.youtubePlayer.getVideoLoadedFraction();
			this.downloadWidth = (this.buffered )*this.videoTrack.width();
			this.videoTrackDownload.css("width", this.downloadWidth);
			this.progressIdleDownloadWidth = (this.buffered)*this.progressIdleTrack.width();
			this.progressIdleDownload.css("width", this.progressIdleDownloadWidth);
		}
	}
	else if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
    {
		this.downloadWidth = (this.buffered/this.video.duration )*this.videoTrack.width();
		this.videoTrackDownload.css("width", this.downloadWidth);

		this.progressWidth = (this.video.currentTime/this.video.duration )*this.videoTrack.width();
		this.videoTrackProgress.css("width", this.progressWidth);
		
		this.progressIdleDownloadWidth = (this.buffered/this.video.duration )*this.progressIdleTrack.width();
		this.progressIdleDownload.css("width", this.progressIdleDownloadWidth);
		
		this.progressIdleWidth = (this.video.currentTime/this.video.duration )*this.progressIdleTrack.width();
		this.progressIdle.css("width", this.progressIdleWidth);

		this.progressWidthAD = (this.videoAD.currentTime/this.videoAD.duration )*this.elementAD.width();
		this.progressAD.css("width", this.progressWidthAD);
	}
	this.checkForPoints();
};

Video.fn.checkForPoints = function(){
	if(this.options.vastUrl && this.options.vastUrl != ''){
		if(!$.isEmptyObject(this._vast.allVastMIDROLLS)){
			this.positionVideoTrackPoints("linear");
		}
		if(!$.isEmptyObject(this._vast.allVastNONLINEARS)){
			this.positionVideoTrackPoints("nonlinear");
		}
	}
}
Video.fn.createPopup = function(){
	var self = this;
    this.adImg = $("<div/>");
    this.adImg.addClass("elite_vp_popup");

    this.image = new Image();
	if(this._playlist.videos_array[this._playlist.videoid].popupImg !== "popupImg" && this._playlist.videos_array[this._playlist.videoid].popupImg !== undefined)
    this.image.src = this._playlist.videos_array[this._playlist.videoid].popupImg;

    $(this.image).on("load",function() {
        self.adImg.append(self.image);
        self.positionPopup();
        self.adImg.append(self.adClose);
    });
    this.element.append(this.adImg);
    this.adImg.hide();
    this.adImg.css({opacity:0});
	this.popupBtnClose = $("<div />");
    this.popupBtnClose.addClass("elite_vp_btnClose elite_vp_themeColorText");
    this.infoWindow.append(this.popupBtnClose);
    this.popupBtnClose.css({bottom:0});
	this.adImg.append(this.popupBtnClose);

    this.popupBtnCloseIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("fa-elite-close")
		.addClass("elite_vp_themeColor");
    this.popupBtnClose.append(this.popupBtnCloseIcon);

    this.popupBtnClose.bind(this.CLICK_EV,$.proxy(function()
    {
		self.adOn=true;
        self.togglePopup();
		self.POPUP_CLOSED = true;
    }, this));

    this.popupBtnClose.mouseover(function(){
        $(this).stop().animate({
            opacity:0.7
        },200);
    });
    this.popupBtnClose.mouseout(function(){
        $(this).stop().animate({
            opacity:1
        },200);
    });
}
Video.fn.positionPopup = function(){
	
    var self=this;
	
    this.adImg.css({
        bottom: self.controls.height() + 20,
        left: self.element.width()/2 - this.adImg.width()/2
    });
};
Video.fn.newAd = function(){
	
    var self = this;
	
    this.adImg.hide();
    this.image.src="";
	
	if(this.options.vastUrl && this.options.vastUrl != ''){
		if(!$.isEmptyObject(this._vast.allVastNONLINEARS)){
			this.image.src = this._vast.allVastNONLINEARS[this.NONLINEARS_INDEX]['staticResource']
		}
	} else {
		this.image.src=this._playlist.videos_array[this._playlist.videoid].popupImg;
	}
    

	if(this.adOn)
		return
	
    $(this.image).bind(this.START_EV, function(){
		
		if(self.options.vastUrl && self.options.vastUrl != ''){
			if(!$.isEmptyObject(self._vast.allVastNONLINEARS)){
				window.open(self._vast.allVastNONLINEARS[self.NONLINEARS_INDEX]['nonLinearClickThrough'])
			}
		} else{
		
			window.open(self._playlist.videos_array[self._playlist.videoid].popupAdGoToLink);
			
			if(self._playlist.videos_array[self._playlist.videoid].videoType == "youtube" || self.options.videoType=="YouTube"){
				self.youtubePlayer.pauseVideo();
			}
			if(self._playlist.videos_array[self._playlist.videoid].videoType == "HTML5" || self.options.videoType=="HTML5 (self-hosted)"){
				self.pause();
			}
			if(self._playlist.videos_array[self._playlist.videoid].videoType == "vimeo" || self.options.videoType=="Vimeo"){
				self._playlist.vimeoPlayer.pause();
			}
		}
	})
};
Video.fn.createLogo = function(){
        var self=this;
        this.logoImg = $("<div/>");
        this.logoImg.addClass("elite_vp_logo");
		
		if(this.options.logoShow=="No")
			return;
        this.img = new Image();
        this.img.src = self.options.logoPath;
		
		// if(this.img.width == 0) this.img.src = "";
		
        $(this.img).on("load",function() {
            self.logoImg.append(self.img);
            self.positionLogo();
        });

        if(self.options.logoShow=="Yes")
        {
            this.element.append(this.logoImg);
        }

        if(self.options.logoClickable=="Yes")
        {
            this.logoImg.bind(this.CLICK_EV,$.proxy(function(){
                window.open(self.options.logoGoToLink);
            }, this));

            this.logoImg.mouseover(function(){
                $(this).stop().animate({opacity:0.8},200);
            });
            this.logoImg.mouseout(function(){
                $(this).stop().animate({opacity:1},200);
            });
            $('.elite_vp_logo').css('cursor', 'pointer');
        }
};
Video.fn.positionLogo = function(){
    var self=this;
	var bottomMargin;
	
	if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
	bottomMargin=self.controls.height()+10;
	else if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
	bottomMargin=self.controls.height()+10;
	else if(self._playlist.videos_array[self._playlist.videoid].videoType=="vimeo" || self.options.videoType=="Vimeo")
	bottomMargin=55;
	
    if(self.options.logoPosition == "bottom-right")
    {
        this.logoImg.css({
            bottom:  bottomMargin,
            right: this.buttonsMargin
        });
    }
    else if(self.options.logoPosition == "bottom-left")
    {
        this.logoImg.css({
            bottom:  bottomMargin,
            left: this.buttonsMargin
        });
    }
};
Video.fn.showVideoElements = function()
{
    this.videoElement.show();
    this.videoElementAD.show();
};
Video.fn.hideVideoElements = function(){
    this.videoElement.hide();
    this.videoElementAD.hide();
};
Video.fn.createAds = function(){
    var self=this;
    adsImg = $("<div/>");
    adsImg.addClass("ads");

    image = new Image();
    image.src = self._playlist.videos_array[0].adsPath;

    $(image).on("load",function() {
        adsImg.append(image);
        self.positionAds();
    });
    this.element.append(adsImg);
    adsImg.hide();
};
Video.fn.positionAds = function(){
    var self=this;
    adsImg.css({
        bottom: self.controls.height()+5,
        left: self.element.width()/2-adsImg.width()/2
    });
};
Video.fn.setupAutoplay = function()
{
   var self=this;
	if(this.options.lightBox)
		return
	
    if(this.options.autoplay)
    {
		this.video.muted = true;
		this.videoAD.muted = true;
		this.muted = true;
	
        if(this.isMobile.iOS() && (this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube")) return;
			// self.playButtonScreen.show();
		// else{
            if(self.getViewportStatus())
                self.play();
        // }
    }
    else if(!self.options.autoplay)
    {
        this.pause();
        this.preloader.hide();
    }
}
Video.fn.getViewportStatus = function(){
    var self = this;
    if($(self.mainContainer.parent()).isInViewport())
        return true
    else
        return false
}
Video.fn.createNowPlayingText = function()
{
	var self=this;
	
	if(self.options.loadRandomVideoOnStart=="Yes")
        this.nowPlayingTitle.append('<p class="elite_vp_nowPlayingText elite_vp_nowPlayingText'+" "+"elite_vp_"+this.options.instanceTheme+'">' + this._playlist.videos_array[self._playlist.rand].title + '</p>');
    else
        this.nowPlayingTitle.append('<p class="elite_vp_nowPlayingText elite_vp_nowPlayingText'+" "+"elite_vp_"+this.options.instanceTheme+'">' + this._playlist.videos_array[0].title + '</p>');
	
    if(this.options.nowPlayingText=="No")
        this.nowPlayingTitle.hide();
};
Video.fn.createInfoWindowContent = function()
{
	var self=this;
	if(self.options.loadRandomVideoOnStart=="Yes"){
        this.infoWindow.append('<p class="elite_vp_infoTitle elite_vp_themeColorText elite_vp_titles">' + this._playlist.videos_array[self._playlist.rand].title + '</p>');
        this.infoWindow.append('<p class="elite_vp_infoText elite_vp_infoText'+" "+"elite_vp_"+this.options.instanceTheme+'">' + this._playlist.videos_array[self._playlist.rand].info_text + '</p>');
    }
    else{
        this.infoWindow.append('<p class="elite_vp_infoTitle elite_vp_themeColorText elite_vp_titles">' + this._playlist.videos_array[0].title + '</p>');
        this.infoWindow.append('<p class="elite_vp_infoText elite_vp_infoText'+" "+"elite_vp_"+this.options.instanceTheme+'">' + this._playlist.videos_array[0].info_text + '</p>');
    }
	
	this.infoWindow.css({
		top:-(this.infoWindow.height())
	}).hide();
};
Video.fn.createMutedBox = function(){
    var self=this;

    this.mutedBox_mask = $("<div />");
	this.mutedBox_mask.addClass("elite_vp_mutedBox_mask");
	if(this.element){
		this.mainContainer.append(this.mutedBox_mask);
	}

    this.mutedBox = $("<div />")
        .addClass("elite_vp_mutedBox")
        .bind(self.CLICK_EV, function(){
            self.globalUnmuteHTML5();
            self.hideMutedBox();
        });
    
    if(this.options.autoplay && (this._playlist.videos_array[this._playlist.videoid].prerollAD=="yes" || this.options.showGlobalPrerollAds))
        this.mutedBox.show();
    
	if(this.options.autoplay && this.isMobile.any() && (this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube")){
        this.mutedBox.hide();
        this.globalUnmuteHTML5();
    }
    if(this.options.autoplay && !this.isMobile.any() && (this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube")){
        this.mutedBox.hide();
        this.globalUnmuteHTML5();
    }
	
	if(!this.options.autoplay) 
        this.mutedBox.hide();
    
    this.mutedBox_mask.append(this.mutedBox);
	
	this.mutedBoxContent = $("<div />")
        .addClass("elite_vp_mutedBoxContent");
	this.mutedBox.append(this.mutedBoxContent);
    
    this.mutedBoxClickableArea = $("<div />")
        .addClass("elite_vp_mutedBoxClickableArea");
    if(this.isMobile.any())
        this.mutedBox.append(this.mutedBoxClickableArea);
	
    this.mutedBoxContent.append('<p class="elite_vp_mutedBoxTitle">' + this.options.mutedNotificationText + '</p>');
	
    this.mutedBoxIconWrapp = $("<div />")
        .addClass("elite_vp_mutedBoxIcon")
        
	this.mutedBoxIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("fa-elite-volume-up-ad")
    this.mutedBoxIconWrapp.append(this.mutedBoxIcon);
    this.mutedBox.append(this.mutedBoxIconWrapp);

};
Video.fn.createSkipAd = function(){
    var self=this;

    this.skipAdBox = $("<div />")
        .addClass("elite_vp_skipAdBox")
        .bind(self.CLICK_EV, function(){
			self.gotoNextAdIfAvailable("gaVideoSkippedAD");
        })
        .hide();
    this.elementAD.append(this.skipAdBox);
	
	this.skipAdBoxContentLeft = $("<div />")
        .addClass("elite_vp_skipAdBoxContentLeft");
	this.skipAdBox.append(this.skipAdBoxContentLeft);
	
    this.skipAdBoxContentLeft.append('<p class="elite_vp_skipAdTitle">' + this.options.skipAdvertisementText + '</p>');
	
	this.skipAdBoxIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("fa-elite-step-forward-ad")
    this.skipAdBox.append(this.skipAdBoxIcon);
};
Video.fn.createSkipAdCount = function(){
    var self=this;
	
	this.skipAdCount = $("<div />")
        .addClass("elite_vp_skipAdCount")
		.hide();
    this.elementAD.append(this.skipAdCount);
	
	this.i = document.createElement('img');
	this.i.src = self._playlist.videos_array[self._playlist.videoid].thumbnail_image;
	if(this.i.width == 0) this.i.src = "";
	
	this.skipAdCount.append(this.i);
	this.skipAdCount.find('img').addClass('elite_vp_skipAdCountImage elite_vp_themeColorThumbBorder');
	
	this.skipAdCountContentLeft = $("<div />")
        .addClass("elite_vp_skipAdCountContentLeft");
	this.skipAdCount.append(this.skipAdCountContentLeft);
		
	this.skipAdCountContentLeft.append('<p class="elite_vp_skipAdCountTitle">' + "" + '</p>');
	
	this.skipAdCount.css({
		right:-(this.skipAdCount.width()),
		bottom:28
	}).hide();
    
    if(self._playlist.videos_array[self._playlist.videoid].thumbnail_image == '' || self._playlist.videos_array[self._playlist.videoid].thumbnail_image.thumbnail_image == 'thumbImg'){
        self.skipAdCount.find('.elite_vp_skipAdCountImage').hide();
        self.skipAdCount.find('.elite_vp_skipAdCountContentLeft').css({
            width: '100%'
        })
    }
};
Video.fn.createAdTogglePlay = function(){
    var self=this;

    this.toggleAdPlayBox = $("<div />")
        .addClass("elite_vp_toggleAdPlayBox")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("fa-elite-playScreen"+" "+"elite_vp_"+this.options.instanceTheme)
        .bind(self.CLICK_EV, function(){
            self.togglePlayAD();
        })
        .hide()
    this.elementAD.append(this.toggleAdPlayBox);
};
Video.fn.createVideoAdTitleInsideAD = function(){
    var self=this;
    this.videoAdBoxInside = $("<div />");
    this.videoAdBoxInside.addClass("elite_vp_videoAdBoxInside");
    this.elementAD.append(this.videoAdBoxInside);
    
    this.visitWrapp = $("<div />");
    this.visitWrapp.addClass("elite_vp_visitWrapp");
    this.elementAD.append(this.visitWrapp);

    this.videoAdBoxInside.append('<div class="elite_vp_adsTitleInside">' + this.options.advertisementTitle + " "  + '</div>');
    this.videoAdBoxInside.append(this.timeLeftInside);
    
    if(self.options.showAdvertiserName){
        this.visitAdvertiser = $("<div />");
        this.visitAdvertiser.addClass("elite_vp_visitAdvertiser");
        this.visitAdvertiser.text(this.options.advertiserName);
        
        this.visitBox = $("<div />")
            .addClass("elite_vp_visitBox")
        this.visitBoxIcon = $("<span />")
            .attr("aria-hidden","true")
            .addClass("fa-elite")
            .addClass("fa-elite-external-link")
            .addClass("elite_vp_visitBtn")
        this.visitBox.append(this.visitBoxIcon);
        this.visitWrapp.append(this.visitBox);
        this.visitWrapp.append(this.visitAdvertiser);
        
        this.visitAdvertiser.bind(self.CLICK_EV, function(){
			if(self.options.vastUrl && self.options.vastUrl != '')
				window.open(self.CURRENT_ACTIVE_VAST.clickThrough);
			else{
				if(self.prerollActive)
					window.open(self._playlist.videos_array[self._playlist.videoid].prerollGotoLink, '_blank');
				if(self.midrollActive)
					window.open(self._playlist.videos_array[self._playlist.videoid].midrollGotoLink, '_blank');
				if(self.postrollActive)
					window.open(self._playlist.videos_array[self._playlist.videoid].postrollGotoLink, '_blank');
			}
            self.videoPlayingAD=true;
            self.togglePlayAD();
        })
    }
    
    this.videoAdBoxInside.hide();
    this.visitWrapp.hide();
};
Video.fn.gotoNextAdIfAvailable = function(eventToTrack){
	
	if(this.options.vastUrl != ''){
		
		if(this.PREROLLS_INDEX < Object.keys(this._vast.allVastPREROLLS).length) {
			this.videoAdStarted=false;
			
			if(!this.videoAdStarted){
				if(this.myVideo.canPlayType && this.myVideo.canPlayType('video/mp4').replace(/no/, ''))
				{
					this.canPlay = true;



					this.video_pathAD = this._vast.allVastPREROLLS[this.PREROLLS_INDEX].mediaFile;
					this.CURRENT_ACTIVE_VAST = this._vast.allVastPREROLLS[this.PREROLLS_INDEX]
					this.PREROLLS_INDEX++
				}
				this.loadAD(this.video_pathAD);
				this.openAD();
			}
			this.videoAdStarted=true;
		} 
		else if((this.POSTROLLS_INDEX < Object.keys(this._vast.allVastPOSTROLLS).length) && this.IS_POSTROLLS_ACTIVE) {
			this.videoAdStarted=false;
			
			if(!this.videoAdStarted){
				if(this.myVideo.canPlayType && this.myVideo.canPlayType('video/mp4').replace(/no/, ''))
				{
					this.canPlay = true;



					this.video_pathAD = this._vast.allVastPOSTROLLS[this.POSTROLLS_INDEX].mediaFile;
					this.CURRENT_ACTIVE_VAST = this._vast.allVastPOSTROLLS[this.POSTROLLS_INDEX]
					this.POSTROLLS_INDEX++
				}
				this.loadAD(this.video_pathAD);
				this.openAD();
			}
			this.videoAdStarted=true;
		}
		else if((this.MIDROLLS_INDEX < Object.keys(this._vast.allVastMIDROLLS).length) && this.IS_MIDROLLS_ACTIVE) {
			this.videoAdStarted=false;
			
			if(!this.videoAdStarted){
				if(this.myVideo.canPlayType && this.myVideo.canPlayType('video/mp4').replace(/no/, ''))
				{
					this.canPlay = true;

					this.video_pathAD = this._vast.allVastMIDROLLS[this.MIDROLLS_INDEX].mediaFile;
					this.CURRENT_ACTIVE_VAST = this._vast.allVastMIDROLLS[this.MIDROLLS_INDEX]
					this.MIDROLLS_INDEX++
				}
				this.loadAD(this.video_pathAD);
				this.openAD();
			}
			this.videoAdStarted=true;
		}
		else {
			this.closeAD();
			this._playlist.videoAdPlayed=true;
			if(eventToTrack == "gaVideoSkippedAD") 	this.gaVideoSkippedAD();
			if(eventToTrack == "gaVideoEndedAD") 	this.gaVideoEndedAD();
		}
	
	} else {
		this.closeAD();
		this._playlist.videoAdPlayed=true;
		if(eventToTrack == "gaVideoSkippedAD") 	this.gaVideoSkippedAD();
		if(eventToTrack == "gaVideoEndedAD") 	this.gaVideoEndedAD();
	}
}
Video.fn.createEmbedWindowContent = function()
{
    var self=this;
    $(this.embedWindow).append('<p class="elite_vp_embedTitle2 elite_vp_themeColorText elite_vp_titles">' + self.options.embedWindowTitle2 + '</p>');

    this.embedTxt = $("<p />")
        .addClass('elite_vp_embedText')
        .addClass("elite_vp_embedText"+" "+"elite_vp_"+this.options.instanceTheme);
    this.embedWindow.append(this.embedTxt);

    this.copy = $("<div />")
        .attr("title", "Copy to clipboard")
        .attr('id', 'elite_vp_copy')
        .addClass('copyBtn')
        .addClass("elite_vp_"+this.options.instanceTheme);
    this.embedWindow.append(this.copy);
    $(this.embedWindow).find("#elite_vp_copy").append('<p id="elite_vp_copyInside" class="elite_vp_copyInside'+" "+"elite_vp_"+this.options.instanceTheme+'">' + self.options.copyTxt + '</p>');

    $(this.embedWindow).append('<p class="elite_vp_embedTitle3 elite_vp_themeColorText elite_vp_titles">' + self.options.embedWindowTitle3 + '</p>');

    this.embedTxt2 = $("<p />")
        .addClass('elite_vp_embedText2')
        .addClass('elite_vp_embedText'+" "+"elite_vp_"+this.options.instanceTheme);
    this.embedWindow.append(this.embedTxt2);

    this.copy2 = $("<div />")
        .attr("title", "Copy to clipboard")
        .attr('id', 'elite_vp_copy2')
        .addClass('copyBtn')
		.addClass("elite_vp_"+this.options.instanceTheme);
    this.embedWindow.append(this.copy2);
    $(this.embedWindow).find("#elite_vp_copy2").append('<p id="elite_vp_copyInside" class="elite_vp_copyInside'+" "+"elite_vp_"+this.options.instanceTheme+'">' + self.options.copyTxt + '</p>');

	this.s = this.options.embedCodeSrc+"?embed=true";
    
    if(this.options.lightBox){
        this.w = parseInt(this.options.lightBoxThumbnailWidth);
        this.h = parseInt(this.options.lightBoxThumbnailHeight);
    }
    else{
        this.w = this.mainContainer.outerWidth();
        this.h = this.mainContainer.outerHeight();
    }

	$(this.embedWindow).find(".elite_vp_embedText").text("<iframe src='"+this.s+"' width='"+this.w+"' height='"+this.h+"' frameborder=0 webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>");
    
    this.generateEmbedCode()

	this.updateEmbedText2();

	this.copy.bind(this.CLICK_EV, function(){
		var $temp = $("<input>");
		$("body").append($temp);
        $temp.val(self.saveEmbed).select();
		document.execCommand("copy");
		$temp.remove();
		
		$(self.copy2).find('.elite_vp_copyInside').text(self.options.copyTxt)
		$(this).find('.elite_vp_copyInside').text(self.options.copiedTxt)
		$(self.embedTxt).addClass("elite_vp_highlightText")
		$(self.embedTxt2).removeClass("elite_vp_highlightText")
		
    });
	this.copy2.bind(this.CLICK_EV, function(){
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(self.embedTxt2.text()).select();
		document.execCommand("copy");
		$temp.remove();
		
		$(self.copy).find('.elite_vp_copyInside').text(self.options.copyTxt)
		$(this).find('.elite_vp_copyInside').text(self.options.copiedTxt)
		$(self.embedTxt2).addClass("elite_vp_highlightText")
		$(self.embedTxt).removeClass("elite_vp_highlightText")
    });
	
};
Video.fn.updateEmbedText2 = function(){
	
	var url = window.location.origin + window.location.pathname
	
	if (url.indexOf("?id=") >= 0){
		url = url.split('?')[0];
		$(this.embedWindow).find(".elite_vp_embedText2").text(url+"?id="+this._playlist.videoid);
	}
	else{
		$(this.embedWindow).find(".elite_vp_embedText2").text(url+"?id="+this._playlist.videoid);
	}

	$(this.copy).find('.elite_vp_copyInside').text(this.options.copyTxt)
	$(this.copy2).find('.elite_vp_copyInside').text(this.options.copyTxt)
	$(this.embedTxt).removeClass("elite_vp_highlightText")
	$(this.embedTxt2).removeClass("elite_vp_highlightText")
}
Video.fn.generateEmbedCode = function(){
    this.videoType_str = "";
    this.title_str = "";
    this.youtubeID_str = "";
    this.vimeoID_str = "";
    this.mp4HD_str = "";
    this.mp4SD_str = "";
    this.ccUrl_str = "";
    this.enable_mp4_download_str = "";
    this.imageUrl_str = "";
    this.imageTimer_str = "";
    this.prerollAD_str = "";
    this.prerollGotoLink_str = "";
    this.preroll_mp4_str = "";
    this.prerollSkipTimer_str = "";
    this.midrollAD_str = "";
    this.midrollAD_displayTime_str = "";
    this.midrollGotoLink_str = "";
    this.midroll_mp4_str = "";
    this.midrollSkipTimer_str = "";
    this.postrollAD_str = "";
    this.postrollGotoLink_str = "";
    this.postroll_mp4_str = "";
    this.postrollSkipTimer_str = "";
    this.popupImg_str = "";
    this.popupAdShow_str = "";
    this.popupAdStartTime_str = "";
    this.popupAdEndTime_str = "";
    this.popupAdGoToLink_str = "";
    this.description_str = "";
    this.thumbImg_str = "";
    this.info_str = "";

    for(var i=0; i <= this.options.videos.length-1; i++){
        this.videoType_str = this.videoType_str + this.options.videos[i].videoType + ","
        this.title_str = this.title_str + this.options.videos[i].title + ","
        this.youtubeID_str = this.youtubeID_str + this.options.videos[i].youtubeID + ","
        this.vimeoID_str = this.vimeoID_str + this.options.videos[i].vimeoID + ","
        this.mp4HD_str = this.mp4HD_str + this.options.videos[i].mp4HD + ","
        this.mp4SD_str = this.mp4SD_str + this.options.videos[i].mp4SD + ","
        this.ccUrl_str = this.ccUrl_str + this.options.videos[i].ccUrl + ","
        this.enable_mp4_download_str = this.enable_mp4_download_str + this.options.videos[i].enable_mp4_download + ","
        this.imageUrl_str = this.imageUrl_str + this.options.videos[i].imageUrl + ","
        this.imageTimer_str = this.imageTimer_str + this.options.videos[i].imageTimer + ","
        this.prerollAD_str = this.prerollAD_str + this.options.videos[i].prerollAD + ","
        this.prerollGotoLink_str = this.prerollGotoLink_str + this.options.videos[i].prerollGotoLink + ","
        this.preroll_mp4_str = this.preroll_mp4_str + this.options.videos[i].preroll_mp4 + ","
        this.prerollSkipTimer_str = this.prerollSkipTimer_str + this.options.videos[i].prerollSkipTimer + ","
        this.midrollAD_str = this.midrollAD_str + this.options.videos[i].midrollAD + ","
        this.midrollAD_displayTime_str = this.midrollAD_displayTime_str + this.options.videos[i].midrollAD_displayTime + ","
        this.midrollGotoLink_str = this.midrollGotoLink_str + this.options.videos[i].midrollGotoLink + ","
        this.midroll_mp4_str = this.midroll_mp4_str + this.options.videos[i].midroll_mp4 + ","
        this.midrollSkipTimer_str = this.midrollSkipTimer_str + this.options.videos[i].midrollSkipTimer + ","
        this.postrollAD_str = this.postrollAD_str + this.options.videos[i].postrollAD + ","
        this.postrollGotoLink_str = this.postrollGotoLink_str + this.options.videos[i].postrollGotoLink + ","
        this.postroll_mp4_str = this.postroll_mp4_str + this.options.videos[i].postroll_mp4 + ","
        this.postrollSkipTimer_str = this.postrollSkipTimer_str + this.options.videos[i].postrollSkipTimer + ","
        this.popupImg_str = this.popupImg_str + this.options.videos[i].popupImg + ","
        this.popupAdShow_str = this.popupAdShow_str + this.options.videos[i].popupAdShow + ","
        this.popupAdStartTime_str = this.popupAdStartTime_str + this.options.videos[i].popupAdStartTime + ","
        this.popupAdEndTime_str = this.popupAdEndTime_str + this.options.videos[i].popupAdEndTime + ","
        this.popupAdGoToLink_str = this.popupAdGoToLink_str + this.options.videos[i].popupAdGoToLink + ","
        this.description_str = this.description_str + this.options.videos[i].description + ","
        this.thumbImg_str = this.thumbImg_str + this.options.videos[i].thumbImg + ","
        this.info_str = this.info_str + this.options.videos[i].info + ","
    }
    
    this.videoType_str = this.videoType_str.slice(0, -1)
    this.title_str = this.title_str.slice(0, -1)
    this.youtubeID_str = this.youtubeID_str.slice(0, -1)
    this.vimeoID_str = this.vimeoID_str.slice(0, -1)
    this.mp4HD_str = this.mp4HD_str.slice(0, -1)
    this.mp4SD_str = this.mp4SD_str.slice(0, -1)
    this.ccUrl_str = this.ccUrl_str.slice(0, -1)
    this.enable_mp4_download_str = this.enable_mp4_download_str.slice(0, -1)
    this.imageUrl_str = this.imageUrl_str.slice(0, -1)
    this.imageTimer_str = this.imageTimer_str.slice(0, -1)
    this.prerollAD_str = this.prerollAD_str.slice(0, -1)
    this.prerollGotoLink_str = this.prerollGotoLink_str.slice(0, -1)
    this.preroll_mp4_str = this.preroll_mp4_str.slice(0, -1)
    this.prerollSkipTimer_str = this.prerollSkipTimer_str.slice(0, -1)
    this.midrollAD_str = this.midrollAD_str.slice(0, -1)
    this.midrollAD_displayTime_str = this.midrollAD_displayTime_str.slice(0, -1)
    this.midrollGotoLink_str = this.midrollGotoLink_str.slice(0, -1)
    this.midroll_mp4_str = this.midroll_mp4_str.slice(0, -1)
    this.midrollSkipTimer_str = this.midrollSkipTimer_str.slice(0, -1)
    this.postrollAD_str = this.postrollAD_str.slice(0, -1)
    this.postrollGotoLink_str = this.postrollGotoLink_str.slice(0, -1)
    this.postroll_mp4_str = this.postroll_mp4_str.slice(0, -1)
    this.postrollSkipTimer_str = this.postrollSkipTimer_str.slice(0, -1)
    this.popupImg_str = this.popupImg_str.slice(0, -1)
    this.popupAdShow_str = this.popupAdShow_str.slice(0, -1)
    this.popupAdStartTime_str = this.popupAdStartTime_str.slice(0, -1)
    this.popupAdEndTime_str = this.popupAdEndTime_str.slice(0, -1)
    this.popupAdGoToLink_str = this.popupAdGoToLink_str.slice(0, -1)
    this.description_str = this.description_str.slice(0, -1)
    this.thumbImg_str = this.thumbImg_str.slice(0, -1)
    this.info_str = this.info_str.slice(0, -1)
    
    this.s = this.options.embedCodeSrc+"?embed=true"
        +"&googleAnalyticsTrackingCode="+this.options.googleAnalyticsTrackingCode
        +"&instanceName="+this.options.instanceName
        +"&instanceTheme="+this.options.instanceTheme
        +"&autohideControls="+parseInt(this.options.autohideControls)
        +"&hideControlsOnMouseOut="+this.options.hideControlsOnMouseOut
        +"&playerLayout="+this.options.playerLayout
        +"&videoPlayerWidth="+parseInt(this.options.videoPlayerWidth)
        +"&videoPlayerHeight="+parseInt(this.options.videoPlayerHeight)
        +"&videoRatio="+parseFloat(this.options.videoRatio)
        +"&videoRatioMobile="+parseFloat(this.options.videoRatioMobile)
        +"&videoRatioStretch="+this.options.videoRatioStretch
        +"&iOSPlaysinline="+this.options.iOSPlaysinline
        +"&floatPlayerOutsideViewport="+this.options.floatPlayerOutsideViewport
        +"&pauseStickyOutsideViewport="+this.options.pauseStickyOutsideViewport
        +"&lightBox="+this.options.lightBox
        +"&lightBoxAutoplay="+this.options.lightBoxAutoplay
        +"&lightBoxThumbnail="+this.options.lightBoxThumbnail
        +"&lightBoxThumbnailWidth="+this.options.lightBoxThumbnailWidth
        +"&lightBoxThumbnailHeight="+this.options.lightBoxThumbnailHeight
        +"&lightBoxCloseOnOutsideClick="+this.options.lightBoxCloseOnOutsideClick
        +"&playlist="+this.options.playlist
        +"&playlistScrollType="+this.options.playlistScrollType
        +"&playlistBehaviourOnPageload="+this.options.playlistBehaviourOnPageload
        +"&autoplay="+this.options.autoplay
        +"&colorAccent="+this.options.colorAccent.replace("#","")
        +"&vimeoColor="+this.options.vimeoColor
        +"&youtubeControls="+this.options.youtubeControls
        +"&youtubeSkin="+this.options.youtubeSkin
        +"&youtubeColor="+this.options.youtubeColor
        +"&youtubeQuality="+this.options.youtubeQuality
        +"&youtubeShowRelatedVideos="+this.options.youtubeShowRelatedVideos
        +"&videoPlayerShadow="+this.options.videoPlayerShadow
        +"&loadRandomVideoOnStart="+this.options.loadRandomVideoOnStart
        +"&shuffle="+this.options.shuffle
        +"&posterImg="+this.options.posterImg
        +"&posterImgOnVideoFinish="+this.options.posterImgOnVideoFinish
        +"&onFinish="+this.options.onFinish
        +"&nowPlayingText="+this.options.nowPlayingText
        +"&HTML5VideoQuality="+this.options.HTML5VideoQuality
        +"&preloadSelfHosted="+this.options.preloadSelfHosted
        +"&rightClickMenu="+this.options.rightClickMenu
        +"&hideVideoSource="+this.options.hideVideoSource
        +"&showAllControls="+this.options.showAllControls
        +"&allowSkipAd="+this.options.allowSkipAd
        +"&rewindShow="+this.options.rewindShow
        +"&qualityShow="+this.options.qualityShow
        +"&fastForwardShow="+this.options.fastForwardShow
        +"&fastBackwardShow="+this.options.fastBackwardShow
        +"&stepFastForward="+this.options.stepFastForward
        +"&stepFastBackward="+this.options.stepFastBackward
        +"&infoShow="+this.options.infoShow
        +"&shareShow="+this.options.shareShow
        +"&facebookShow="+this.options.facebookShow
        +"&twitterShow="+this.options.twitterShow
        +"&facebookShareName="+this.options.facebookShareName
        +"&facebookShareLink="+this.options.facebookShareLink
        +"&facebookShareDescription="+this.options.facebookShareDescription
        +"&facebookSharePicture="+this.options.facebookSharePicture
        +"&twitterText="+this.options.twitterText
        +"&twitterHashtags="+this.options.twitterHashtags
        +"&twitterVia="+this.options.twitterVia
        +"&logoShow="+this.options.logoShow
        +"&logoClickable="+this.options.logoClickable
        +"&logoPath="+this.options.logoPath
        +"&logoGoToLink="+this.options.logoGoToLink
        +"&logoPosition="+this.options.logoPosition
        +"&embedShow="+this.options.embedShow
        +"&embedCodeSrc="+this.options.embedCodeSrc
        +"&embedCodeW="+this.options.embedCodeW
        +"&embedCodeH="+this.options.embedCodeH
        +"&embedShareLink="+this.options.embedShareLink
        +"&showGlobalPrerollAds="+this.options.showGlobalPrerollAds
        +"&globalPrerollAds="+this.options.globalPrerollAds
        +"&globalPrerollAdsSkipTimer="+this.options.globalPrerollAdsSkipTimer
        +"&globalPrerollAdsGotoLink="+this.options.globalPrerollAdsGotoLink
        +"&advertisementTitle="+this.options.advertisementTitle
        +"&skipAdvertisementText="+this.options.skipAdvertisementText
        +"&mutedNotificationText="+this.options.mutedNotificationText
        +"&playBtnTooltipTxt="+this.options.playBtnTooltipTxt
        +"&pauseBtnTooltipTxt="+this.options.pauseBtnTooltipTxt
        +"&rewindBtnTooltipTxt="+this.options.rewindBtnTooltipTxt
        +"&downloadVideoBtnTooltipTxt="+this.options.downloadVideoBtnTooltipTxt
        +"&qualityBtnOpenedTooltipTxt="+this.options.qualityBtnOpenedTooltipTxt
        +"&qualityBtnClosedTooltipTxt="+this.options.qualityBtnClosedTooltipTxt
        +"&ccShowOnHTML5Videos="+this.options.ccShowOnHTML5Videos
        +"&ccShowOnVideoLoad="+this.options.ccShowOnVideoLoad
        +"&ccBtnOpenedTooltipTxt="+this.options.ccBtnOpenedTooltipTxt
        +"&ccBtnClosedTooltipTxt="+this.options.ccBtnClosedTooltipTxt
        +"&muteBtnTooltipTxt="+this.options.muteBtnTooltipTxt
        +"&unmuteBtnTooltipTxt="+this.options.unmuteBtnTooltipTxt
        +"&fullscreenBtnTooltipTxt="+this.options.fullscreenBtnTooltipTxt
        +"&exitFullscreenBtnTooltipTxt="+this.options.exitFullscreenBtnTooltipTxt
        +"&infoBtnTooltipTxt="+this.options.infoBtnTooltipTxt
        +"&embedBtnTooltipTxt="+this.options.embedBtnTooltipTxt
        +"&shareBtnTooltipTxt="+this.options.shareBtnTooltipTxt
        +"&volumeTooltipTxt="+this.options.volumeTooltipTxt
        +"&fastForwardBtnTooltipTxt="+this.options.fastForwardBtnTooltipTxt
        +"&fastBackwardBtnTooltipTxt="+this.options.fastBackwardBtnTooltipTxt
        +"&playlistBtnClosedTooltipTxt="+this.options.playlistBtnClosedTooltipTxt
        +"&playlistBtnOpenedTooltipTxt="+this.options.playlistBtnOpenedTooltipTxt
        +"&facebookBtnTooltipTxt="+this.options.facebookBtnTooltipTxt
        +"&twitterBtnTooltipTxt="+this.options.twitterBtnTooltipTxt
        +"&lastBtnTooltipTxt="+this.options.lastBtnTooltipTxt
        +"&firstBtnTooltipTxt="+this.options.firstBtnTooltipTxt
        +"&nextBtnTooltipTxt="+this.options.nextBtnTooltipTxt
        +"&previousBtnTooltipTxt="+this.options.previousBtnTooltipTxt
        +"&shuffleBtnOnTooltipTxt="+this.options.shuffleBtnOnTooltipTxt
        +"&shuffleBtnOffTooltipTxt="+this.options.shuffleBtnOffTooltipTxt
        +"&nowPlayingTooltipTxt="+this.options.nowPlayingTooltipTxt
        +"&embedWindowTitle1="+this.options.embedWindowTitle1
        +"&embedWindowTitle2="+this.options.embedWindowTitle2
        +"&embedWindowTitle3="+this.options.embedWindowTitle3
        +"&copyTxt="+this.options.copyTxt
        +"&copiedTxt="+this.options.copiedTxt
        +"&youtubePlaylistID="+this.options.youtubePlaylistID
        +"&youtubeChannelID="+this.options.youtubeChannelID
        +"&youtubeChannelNumberOfVideos="+parseInt(this.options.youtubeChannelNumberOfVideos)
        
        +"&videosLength="+this.options.videos.length
        +"&videoType="+this.videoType_str
        +"&title="+this.title_str
        +"&youtubeID="+this.youtubeID_str
        +"&vimeoID="+this.vimeoID_str
        +"&mp4HD="+this.mp4HD_str
        +"&mp4SD="+this.mp4SD_str
        +"&ccUrl="+this.ccUrl_str
        +"&enable_mp4_download="+this.enable_mp4_download_str
        +"&imageUrl="+this.imageUrl_str
        +"&imageTimer="+this.imageTimer_str
        +"&prerollAD="+this.prerollAD_str
        +"&prerollGotoLink="+this.prerollGotoLink_str
        +"&preroll_mp4="+this.preroll_mp4_str
        +"&prerollSkipTimer="+this.prerollSkipTimer_str
        +"&midrollAD="+this.midrollAD_str
        +"&midrollAD_displayTime="+this.midrollAD_displayTime_str
        +"&midrollGotoLink="+this.midrollGotoLink_str
        +"&midroll_mp4="+this.midroll_mp4_str
        +"&midrollSkipTimer="+this.midrollSkipTimer_str
        +"&postrollAD="+this.postrollAD_str
        +"&postrollGotoLink="+this.postrollGotoLink_str
        +"&postroll_mp4="+this.postroll_mp4_str
        +"&postrollSkipTimer="+this.postrollSkipTimer_str
        +"&popupImg="+this.popupImg_str
        +"&popupAdShow="+this.popupAdShow_str
        +"&popupAdStartTime="+this.popupAdStartTime_str
        +"&popupAdEndTime="+this.popupAdEndTime_str
        +"&popupAdGoToLink="+this.popupAdGoToLink_str
        +"&description="+this.description_str
        +"&thumbImg="+this.thumbImg_str
        +"&info="+this.info_str
}
Video.fn.globalUnmuteHTML5 = function()
{
    var self = this;
    
    this.video.muted = false;
    this.videoAD.muted = false;
    this.muted = false;
    
    $(this.mainContainer).find(".fa-elite-volume-off").removeClass("fa-elite-volume-off").addClass("fa-elite-volume-up");
    this.volumeTrackProgress.stop().animate({width:this.savedVolumeBarWidth},200);
    this.volRatio = this.savedVolumeBarWidth/this.volumeTrack.width();
    if(this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube"){
        if(this.youtubePlayer!= undefined)
            this.youtubePlayer.setVolume(this.volRatio*100);
    } 
    else if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)"){
        this.video.setVolume(this.volRatio);
    }
	else if(this._playlist.videos_array[this._playlist.videoid].videoType=="vimeo" || this.options.videoType=="Vimeo"){
		if(self._playlist.vimeoPlayer){
			self._playlist.vimeoPlayer.pause();
			self._playlist.vimeoPlayer.setVolume(this.volRatio);
			self._playlist.vimeoMuted = false;
			self.vimeoPlay();
		}
	}
    this.videoAD.setVolume(this.volRatio);
}
Video.fn.ready = function(callback)
{
  this.readyList.push(callback);  
  if (this.loaded)
      callback.call(this);
};

Video.fn.load = function(srcs)
{
	this._onloaded = false;
	var self = this;
	if (srcs)
		this.sources = srcs;

	if (typeof this.sources == "string")
		this.sources = {src:this.sources};

	if (!$.isArray(this.sources))
		this.sources = [this.sources];

	this.ready(function()
	{
		this.change("loading");
		if(self._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
		{
			this.video.loadSources(this.sources);
		}      
	});
};
Video.fn.closeAD = function()
{
    var self=this;
	
	self.hideMutedBox();
	if(self.volPerc > 0){
		self.globalUnmuteHTML5();
	}

	clearInterval(self.myInterval);

    self.videoPlayingAD=true;
    self.togglePlayAD();

    self._playlist.videoAdPlayed=true;

    self.resetPlayerAD();
    self.elementAD.css({zIndex:1});
	self.videoElementAD.empty();
    self.videoAdBoxInside.hide();
	self.removeListenerProgressAD();
	if(self.options.allowSkipAd)
	{
		self.skipAdBox.hide();
		self.skipAdCount.hide();
	}
    self.fsEnterADBox.hide();
    self.toggleAdPlayBox.hide();
    self.progressADBg.hide();
	if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
	{
		self.ytWrapper.css({visibility:"visible"});
		self.hideVideoElements();
		if(self.youtubePlayer!= undefined)
			this.youtubePlayer.playVideo();
	}
	else if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
	{
		self.showVideoElements();
		self.togglePlay();
		self.video.play();
	}
	else if(self._playlist.videos_array[self._playlist.videoid].videoType=="vimeo" || self.options.videoType=="Vimeo")
	{
		self.hideVideoElements();
		if(self._playlist.vimeoPlayer!= undefined)
			self.vimeoPlay();
	}    
};
Video.fn.openAD = function()
{
    var self=this;
    
    if(self.volPerc == 0){
        self.showMutedBox();
    }
    if(self.options.autoplay && !self.videoAdStarted && !self.isMobile.any() && (self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")){
        self.showMutedBox();
    }
	if(self.volPerc > 0 && self.isMobile.any() && (self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")){
		self.globalUnmuteHTML5();
	}
    
    self.showVideoElements();
    self.progressADBg.show();
    self.elementAD.css({zIndex:555559});
	self.ytWrapper.css({visibility:"hidden"});
    self.videoAdBoxInside.show();
    if(self.options.showAdvertiserName)
        self.visitWrapp.show();

	if(!$.isEmptyObject(this.CURRENT_ACTIVE_VAST)){
		if(self.CURRENT_ACTIVE_VAST.skipoffset != undefined){
			self.skipBoxOn = true;
			self.toggleSkipAdBox();
			self.skipCountOn=false;
			self.toggleSkipAdCount();
		}else{
			self.skipAdBox.hide();
			self.skipAdCount.hide();
			self.skipBoxOn = true;
			self.toggleSkipAdBox();
			self.skipCountOn=true;
			self.toggleSkipAdCount();
		}
	}else{
		if(self.options.allowSkipAd)
		{
			self.skipBoxOn = true;
			self.toggleSkipAdBox();
			self.skipCountOn=false;
			self.toggleSkipAdCount();
		}
	}
	
    self.fsEnterADBox.show();
    
    if(!self.realFullscreenActive)
    self.resizeAll();

    self.toggleAdPlayBox.hide();	
	
	if(this.options.allowSkipAd)
	{
		this.setSkipTimer();
		$(".elite_vp_skipAdCountTitle").text(this.options.skipAdText + " " + self.counter + " s");
		this.i.src = self._playlist.videos_array[self._playlist.videoid].thumbnail_image;
		
		if(this._playlist.videos_array[this._playlist.videoid].thumbnail_image == "thumbImg" || 
			this._playlist.videos_array[this._playlist.videoid].thumbnail_image == "undefined" || 
			this._playlist.videos_array[this._playlist.videoid].thumbnail_image == ""){
			this.skipAdCount.find('.elite_vp_skipAdCountImage').hide();
			$(this.skipAdCountContentLeft).addClass("elite_vp_skipAdCountContentLeftFullWidth")
		} else {
			this.skipAdCount.find('.elite_vp_skipAdCountImage').show();
			$(this.skipAdCountContentLeft).removeClass("elite_vp_skipAdCountContentLeftFullWidth")
		}
	}
};
Video.fn.loadAD = function(srcs, active)
{
	this.preloaderAD.stop().animate({opacity:1},0,function(){$(this).show()});
    if (srcs)
        this.sourcesAD = srcs;

    if (typeof this.sourcesAD == "string")
        this.sourcesAD = {src:this.sourcesAD};

    if (!$.isArray(this.sourcesAD))
        this.sourcesAD = [this.sourcesAD];

    this.ready(function()
    {
        this.change("loading");
        this.videoAD.loadSources(this.sourcesAD);
    });
	
	switch(active){
		
		case "prerollActive":
			this.prerollActive = true;
			this.midrollActive = false;
			this.postrollActive = false;
		break;
		case "midrollActive":
			this.prerollActive = false;
			this.midrollActive = true;
			this.postrollActive = false;
		
		break;
		case "postrollActive":
			this.prerollActive = false;
			this.midrollActive = false;
			this.postrollActive = true;
		break;
	}
};
Video.fn.play = function()
{
	var self = this;

	if(!this.PLAY_CLICKED_INIT){
		this.PLAY_CLICKED_INIT = true;
		this.checkForPoints();
	}
	
	this.playButtonScreen.hide();
    this.playBtn.removeClass("fa-elite-play").addClass("fa-elite-pause");
	
	if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"){
		self.video.play();
		
		if(!this._onloaded)
			this.preloader.stop().animate({opacity:1},0,function(){$(this).show()});
	}
	else if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
	self.video.pause();

	if(self._playlist.videos_array[self._playlist.videoid].prerollAD=="yes" && self.videoAdStarted==false &&!self.options.showGlobalPrerollAds)
	{
		self.video.pause();
		if(!self.videoAdStarted && self._playlist.videos_array[self._playlist.videoid].prerollAD){
			if(self.myVideo.canPlayType && self.myVideo.canPlayType('video/mp4').replace(/no/, ''))
			{
				self.canPlay = true;
				self.video_pathAD = self._playlist.videos_array[self._playlist.videoid].preroll_mp4;
			}
			self.loadAD(self.video_pathAD, "prerollActive");
			self.openAD();
		}
		self.videoAdStarted=true;
	}
	if(this.options.showGlobalPrerollAds && self.videoAdStarted==false){
		self.video.pause();
		if(!self.videoAdStarted && self.options.showGlobalPrerollAds){
			if(self.myVideo.canPlayType && self.myVideo.canPlayType('video/mp4').replace(/no/, ''))
			{
				self.canPlay = true;
				self.video_pathAD = this.globalPrerollAds_arr[this.getGlobalPrerollRandomNumber()];
			}
			self.loadAD(self.video_pathAD);
			self.openAD();
		}
		self.videoAdStarted=true;
	}
	if(this.options.vastUrl && this.options.vastUrl != '' && !$.isEmptyObject(this._vast.allVastPREROLLS) && self._vast.linear != '' && self.videoAdStarted==false){
		if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (this-hosted)"){
			this.video.pause();
			if(!this.videoAdStarted){
				this.playVAST("preroll");
			}
			this.videoAdStarted=true;
		}
	}
	this.handleFastForwardAndBackwardBtnsInit();
};
Video.fn.pause = function()
{
    var self = this;
	if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")
	{
		if(this.html5STARTED || this.options.posterImg=="")
				this.playButtonScreen.show();
		else
			this.playButtonScreen.hide();
	}
	else if(this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube")
	{
		if(self._playlist.youtubeSTARTED || this.options.posterImg=="")
		{
			this.playButtonScreen.show();
		}
		else
			this.playButtonScreen.hide();
	}
	
    this.playBtn.removeClass("fa-elite-pause").addClass("fa-elite-play");
    self.video.pause();
};
Video.fn.stop = function()
{
  this.seek(0);
  this.pause();
};
Video.fn.playVAST = function(roll){
	
	if(roll !== "nonlinear"){
		
		if(this.myVideo.canPlayType && this.myVideo.canPlayType('video/mp4').replace(/no/, ''))
		{
			this.canPlay = true;
			
			if(roll == "preroll"){
				this.video_pathAD = this._vast.allVastPREROLLS[this.PREROLLS_INDEX].mediaFile;
				this.CURRENT_ACTIVE_VAST = this._vast.allVastPREROLLS[this.PREROLLS_INDEX]
				this.PREROLLS_INDEX++;
			}
			if(roll == "midroll"){
				this.video_pathAD = this._vast.allVastMIDROLLS[this.MIDROLLS_INDEX].mediaFile;
				this.CURRENT_ACTIVE_VAST = this._vast.allVastMIDROLLS[this.MIDROLLS_INDEX]
				this.MIDROLLS_INDEX++;
			}
			if(roll == "postroll"){
				this.video_pathAD = this._vast.allVastPOSTROLLS[this.POSTROLLS_INDEX].mediaFile;
				this.CURRENT_ACTIVE_VAST = this._vast.allVastPOSTROLLS[this.POSTROLLS_INDEX]
				this.POSTROLLS_INDEX++;
			}
		}
		this.loadAD(this.video_pathAD);
		this.openAD();
		
	} else if(roll === "nonlinear"){
		this.newAd();
		this.adOn=false;
		this.togglePopup();
		this.CURRENT_ACTIVE_VAST = this._vast.allVastNONLINEARS[this.NONLINEARS_INDEX]
		this.NONLINEARS_INDEX++;
		if(this.NONLINEARS_INDEX > (Object.keys(this._vast.allVastNONLINEARS).length-1))
			this.NONLINEARS_INDEX--
	}
}
Video.fn.handleFastForwardAndBackwardBtnsInit = function(){
	if(!this.initializedPlay){
		if(this.options.fastForwardShow == "Yes")
			this.fastForwardBtnWrapper.show();
		if(this.options.fastBackwardShow == "Yes")
			this.fastBackwardBtnWrapper.show();
		
		this.initializedPlay = true;
	}
};
Video.fn.hideOverlay = function(){
    var self = this;
    if(self.overlay==undefined)
        return;

    self.overlay.hide();
	self.poster2Showing = false;
    self.playButtonPoster.hide();

	if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
	{
		self.youtubePlayer.playVideo();
		if(self.options.youtubeControls=="default controls")
			self.element.css("visibility","hidden");
	}
	else if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
	{
		self.togglePlay();
	}
	else if(self._playlist.videos_array[self._playlist.videoid].videoType=="vimeo" || self.options.videoType=="Vimeo")
	{
		self.hideCustomControls();
		self.hideVideoElements();
		if(self._playlist.vimeoPlayer!= undefined)
			self.vimeoPlay();
	}    
};
Video.fn.vimeoPlay = function(){
	
	this._playlist.vimeoPlayer.play().then(function() {
		//video is playing
		}).catch(function(error) {
			switch (error.name) {
				case 'PasswordError':// The video is password-protected
				break;
				case 'PrivacyError':// The video is private
				break;
				default:// Some other error occurred
				break;
			}
		});
	this.handleFastForwardAndBackwardBtnsInit();
}
Video.fn.togglePlay = function(){
	
  if (this.state == "elite_vp_playing")
  {
    this.pause();
	if(this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube")
		this.youtubePlayer.pauseVideo();
  }
  else
  {
    this.play();
	if(this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube")
		this.youtubePlayer.playVideo();
  }
};
Video.fn.toggleSkipAdBox = function()
{
    var self = this;

    if(this.skipBoxOn)
    {
        this.skipAdBox.stop().animate({
			right:-(this.skipAdBox.width()-2),
			bottom:28
			},200,function() {
            $(this).hide();
       });
       this.skipBoxOn=false;
    }
    else
    {
        this.skipAdBox.show();
		this.addListenerProgressAD();
        this.skipAdBox.stop().animate({
			right:10,
			bottom:28
		},500);
        this.skipBoxOn=true;
    }
};
Video.fn.toggleSkipAdCount = function()
{
    var self = this;

    if(this.skipCountOn)
    {
        this.skipAdCount.stop().animate({
			right:-(this.skipAdCount.width()-2),
			bottom:28
			},200,function() {
            $(this).hide();
       });
       this.skipCountOn=false;
    }
    else
    {
        this.skipAdCount.show();
        this.skipAdCount.stop().animate({
			right:10,
			bottom:28
		},500);
        this.skipCountOn=true;
    }
};
Video.fn.hideMutedBox = function(delay)
{
    var self = this;

    if(!this.mutedBoxOn) 
        return;
    
	if(!delay)
        delay = 0
    
    this.mutedBox.stop().delay(delay).animate({ 
        left:-(this.mutedBox.width()) - 10
    },300,
        function() { 
            $(this).hide();
            self.mutedBoxOn = false;
            self.mutedBox_mask.hide();
        }
    );
};
Video.fn.showMutedBox = function(delay)
{
    var self = this;

    if(!delay)
        delay = 0
    
    this.mutedBox_mask.show();
    this.mutedBox.show();
    this.mutedBox.stop().delay(delay).animate({ 
        left: 0
    },300,
        function() { 
            self.mutedBoxOn = true;
        }
    );
};
Video.fn.toggleInfoWindow = function()
{
    var self = this;

    if(this.infoOn)
    {
        this.infoWindow.stop().animate({
			top:-(this.infoWindow.height())
			},200,function() {
            $(this).hide();
       });
	   this.nowPlayingTitle.show();
       this.infoOn=false;
    }
    else
    {
        this.infoWindow.show();
        this.infoWindow.stop().animate({
			top:0
		},500);
		this.nowPlayingTitle.hide();
        this.infoOn=true;
    }
};
Video.fn.toggleLightBox = function()
{
    var self = this;
	
    if(this.lightBoxOn)
    {
        this.lightBoxOverlay.stop().animate({
			opacity:0
			},300,function() {
            $(this).hide();
		});
		this.lightBoxOn=false;
		
		this.pause();
		if(this.YTAPIReady)
			this.youtubePlayer.pauseVideo();
		
		if(this._playlist.vimeoPlayer)
			this._playlist.vimeoPlayer.pause();
	
		this.videoPlayingAD=true;
		this.togglePlayAD();
		
		$('.elite_vp_lightBoxThumbnailWrap').each(function(i, obj) {
			$(this).find(".elite_vp_playButtonScreen").css({
				zIndex: 2147483647
			})
		});
    }
    else
    {
        this.lightBoxOverlay.show();
        this.lightBoxOverlay.stop().animate({
			opacity:1
		},300);
        this.lightBoxOn=true;
		
		if(this.options.lightBoxAutoplay){
			
			if(!this.lightBoxInitiated){
				this.playVideoById(this._playlist.videoid);
				this.lightBoxInitiated = true;
			}
			else{
				if(this._playlist.videos_array[this._playlist.videoid].prerollAD=="yes" || this.options.showGlobalPrerollAds){
					if(!this._playlist.videoAdPlayed){
						this.videoPlayingAD=false;
						this.togglePlayAD();
					}
					else{
						this.play();
						if(this.YTAPIReady)
							this.youtubePlayer.playVideo();
						if(this._playlist.vimeoPlayer)
							this.vimeoPlay();
					}
				}
				else{
					this.play();
					if(this.YTAPIReady)
						this.youtubePlayer.playVideo();
					if(this._playlist.vimeoPlayer)
						this.vimeoPlay();
				}
				
			}
			
		}
		$('.elite_vp_lightBoxThumbnailWrap').each(function(i, obj) {
			$(this).find(".elite_vp_playButtonScreen").css({
				zIndex: 2147483646
			})
		});
    }
	this.resizeAll();
};
Video.fn.toggleQualityWindow = function(val)
{
    var self = this;
	
	var delay;
	if(val)
		delay = val
	else
		delay = 0
    if(this.qualityOn)
    {
        this.qualityWindow.stop().delay(delay).animate({
			top:200
			},200,function() {
            $(self.qualityWindow_mask).hide();
       });
       this.qualityOn=false;
    }
    else
    {
        this.qualityWindow_mask.show();
        this.qualityWindow.stop().delay(delay).animate({
			top: 0
		},500);
        this.qualityOn=true;
    }
};
Video.fn.toggleCCWindow = function(val)
{return;
    var self = this;
	
	var delay;
	if(val)
		delay = val
	else
		delay = 0
    if(this.ccOn)
    {
        this.ccWindow.stop().delay(delay).animate({
			top:200
			},200,function() {
            $(self.ccWindow_mask).hide();
       });
       this.ccOn=false;
    }
    else
    {
        this.ccWindow_mask.show();
        this.ccWindow.stop().delay(delay).animate({
			top: 0
		},500);
        this.ccOn=true;
    }
};
Video.fn.togglePopup = function()
{
	if(this.POPUP_CLOSED)
		return;
    if(this.adOn)
    {
        this.adImg.stop().animate({opacity:0},300,function() {
            $(this).hide();
        });
        this.adOn=false;
    }
    else 
    {
        this.adImg.show();
        this.adImg.stop().animate({opacity:1},300);
        this.adOn=true;

    }
};
Video.fn.toggleShuffleBtn = function()
{
    var self = this;
    if(this.shuffleBtnEnabled)
    {
	   this.removeColorAccent($("#elite_vp_shuffleBtn"));
	   this._playlist.shuffleBtnIcon.removeClass("elite_vp_enabled_shuffle")
       this.shuffleBtnEnabled=false;
    }
    else
    {
        $(this.mainContainer).find(".fa-elite-random").addClass("elite_vp_themeColorButton");
		this._playlist.shuffleBtnIcon.addClass("elite_vp_enabled_shuffle")
        this.shuffleBtnEnabled=true;
		this.setColorAccent($(".elite_vp_Progress").css("backgroundColor"), $("#elite_vp_shuffleBtn"));
    }
};
Video.fn.toggleQualityBtn = function()
{
    var self = this;
    if(this.qualityBtnEnabled)
    {
	   this.removeColorAccent($("#elite_vp_qualityBtn"));
	   this.qualityBtn.removeClass("elite_vp_enabled_quality");
       this.qualityBtnEnabled=false;
    }
    else
    {
        $(this.mainContainer).find(".fa-elite-cog").addClass("elite_vp_themeColorButton");
		this.qualityBtn.addClass("elite_vp_enabled_quality");
        this.qualityBtnEnabled=true;
		this.setColorAccent($(".elite_vp_Progress").css("backgroundColor"), $("#elite_vp_qualityBtn"));
    }
};
Video.fn.toggleCCBtn = function()
{
    var self = this;
    if(this.ccBtnEnabled)
    {
	   this.removeColorAccent($("#elite_vp_ccBtn"));
	   this.ccBtn.removeClass("elite_vp_enabled_cc");
       this.ccBtnEnabled=false;
       for (var i = 0; i < this.videoElement[0].textTracks.length; i++) {
           if(this.videoElement[0].textTracks[i].kind == 'subtitles'){
                this.videoElement[0].textTracks[0].mode = "hidden";
           }
       }
    }
    else
    {
        $(this.mainContainer).find(".fa-elite-cc").addClass("elite_vp_themeColorButton");
		this.ccBtn.addClass("elite_vp_enabled_cc");
        this.ccBtnEnabled=true;
		this.setColorAccent($(".elite_vp_Progress").css("backgroundColor"), $("#elite_vp_ccBtn"));
        for (var i = 0; i < this.videoElement[0].textTracks.length; i++) {
            if(this.videoElement[0].textTracks[i].kind == 'subtitles'){
                this.videoElement[0].textTracks[0].mode = "showing";
            }
        }
    }
};
Video.fn.toggleShareWindow = function()
{
    var self = this;

    if(this.shareOn)
    {
		this.shareOn=false;
        $(this.shareWindow).stop().animate({
			right:-(self.shareWindow.width())
		},300,function() {
            $(this).hide();
       });
    }
    else
    {
        this.shareWindow.show();
        $(this.shareWindow).stop().animate({
			right: self.screenBtnsWindow.width()
		},300);
		this.shareOn=true;
    }
};
Video.fn.togglePlayAD = function()
{
    var self = this;

    if(this.videoPlayingAD)
    {
        this.videoAD.pause();
        this.videoPlayingAD=false;
        this.toggleAdPlayBox.show();
    }
    else
    {
        this.videoAD.play();
        this.videoPlayingAD=true;
        this.toggleAdPlayBox.hide();
    }
};
Video.fn.toggleEmbedWindow = function()
{
    var self = this;
    if(this.embedOn)
    {
        $(this.embedWindow).stop().animate({
				top:-(this.embedWindow.height())
			},200,function() {
            $(this).hide();
        });
        this.embedOn=false;
    }
    else
    {
        $(this.embedWindow).show();
        $(this.embedWindow).stop().animate({top:0},500,function(){

		});
        this.embedOn=true;
    }
};
Video.fn.fullScreen = function(state)
{
    var self = this;
	
	if (typeof state == "undefined") state = true;
    this.inFullScreen = state;
	
    if(state)
    {
		this._playlist.hidePlaylist();
		this.element.addClass("elite_vp_fullScreen");
		this.elementAD.addClass("elite_vp_fullScreen");
		$(this.mainContainer).find(".fa-elite-expand").removeClass("fa-elite-expand").addClass("fa-elite-compress");
		$(this.fsEnterADBox).find(".fa-elite-expandAD").removeClass("fa-elite-expandAD").addClass("fa-elite-compressAD");
		self.element.width("100%");
		self.element.height("100%");
		self.elementAD.width("100%");
		self.elementAD.height("100%");
		self.mainContainer.width("100%");
		self.mainContainer.height("100%");
		self.mainContainer.css("position","fixed");
		self.mainContainer.css("left",0);
		self.mainContainer.css("top",0);
		this.timeElapsed.show();
		this.timeTotal.show();
		this.volumeTrack.show();
		if(this.options.rewindShow) this.rewindBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
		if(this.options.ccShowOnHTML5Videos) this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
		if(this.options.qualityShow) this.qualityBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
		if((this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")&&this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes")
			this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
		this.unmuteBtnWrapper.show();
		this.videoTrack.show();
		
		if(self.parent.width()<450)
			self.videoTrack.hide();
		if(this.parent.width()<438) 
			this.timeTotal.hide();
		if(this.parent.width()<375)
			this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
		if(this.parent.width()<350)
			this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
		
		this.positionTimeTotal();
		this.resizeVideoTrack();
		if(this.options.infoShow=="Yes")
			this.infoBtn.show();
		if(self.options.embedShow=="Yes")
			this.embedBtn.show();
		if(self.options.shareShow=="Yes")
			this.shareBtn.show();
		this.revertOriginalScale();
		this.setMaxHeightInfoEmbed();
		self.realFullscreenActive=true;
		
		if(this.options.lightBox){
			this.lightBoxThumbnailWrap.parent().hide();
		}
    }
    else
    {
		this._playlist.showPlaylist();
		this.element.removeClass("elite_vp_fullScreen");
		this.elementAD.removeClass("elite_vp_fullScreen");
		$(this.mainContainer).find(".fa-elite-compress").removeClass("fa-elite-compress").addClass("fa-elite-expand");
		$(this.fsEnterADBox). find(".fa-elite-compressAD").removeClass("fa-elite-compressAD").addClass("fa-elite-expandAD");
		self.element.width(self.playerWidth);
		self.element.height(self.playerHeight);

		self.elementAD.width(self.playerWidth);
		self.elementAD.height(self.playerHeight);
		
		self.mainContainer.css("left","");
		self.mainContainer.css("top","");
		if(self.options.playerLayout == "fitToContainer"  || self.options.playerLayout == "fitToBrowser")
		{
			self.mainContainer.width(self.mainContainer.parent().width());
			self.mainContainer.height("100%");
		}
		else if (self.options.playerLayout == "fixedSize"){
			self.mainContainer.width(self.options.videoPlayerWidth);
			self.mainContainer.height(self.options.videoPlayerHeight);
		}
		
		self.mainContainer.css("position","absolute");
		
		if(this.stretching){
			this.stretching=false;
			this.toggleStretch();
		}

		self.element.css({zIndex:455558 });

		self.mainContainer.parent().css("zIndex",1);
		self.mainContainer.css("zIndex",999999);
		self.realFullscreenActive=false;
		self.resizeAll();
		
		$('html, body').animate({
			'scrollTop' : self.savePageOffsetY
		}, 0);
		
		if(this.options.lightBox){
			this.lightBoxThumbnailWrap.parent().show();
		}
    }
	this.positionControlsBtnsWrapperRight();
	this.positionTimeTotal();
	this.resizeVideoTrack();
	this.positionOverScreenButtons();
	this.positionShareWindowFromTop();
	this.positionQualityWindow();
	this.positionLogo();
	this.positionPopup();
	this.resizeBars();
	if(self.options.hideControlsOnMouseOut=="Yes")
		this.hideControls();
	
	if(this.options.ccShowOnHTML5Videos){
		this.initialCCState()
		this.updateCCState()
	}
};
Video.fn.toggleFullScreen = function()
{
    var self = this;
	var url;
	if(window.location.ancestorOrigins !== undefined)
		url = window.location.ancestorOrigins[0] 
	else
		url = window.location.href;
	
	var demo = (url !== undefined && url.indexOf("preview.codecanyon.net") >= 0);
	
    if(THREEx.FullScreen.available())
    {
        if(THREEx.FullScreen.activated() || this.inFullScreen)
        {
			if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
				self.element.css({zIndex:455558 });
			else
				self.element.css({zIndex:455556});            
			
			self.mainContainer.css("zIndex",999999);
			
			if (demo) self.fullScreen(false);
			else THREEx.FullScreen.cancel();
        }
        else
        {
            self.savePageOffsetY = $(window).scrollTop();
            
			if (demo) self.fullScreen(true);
			else THREEx.FullScreen.request(this.parent[0]);
            
            self.mainContainer.parent().css("zIndex",999999);
            self.mainContainer.css("zIndex",2147483647);
            
            if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
                self.element.css({zIndex:555558 });
            if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
                self.element.css({zIndex:555558 });
            else if(self._playlist.videos_array[self._playlist.videoid].videoType=="vimeo" || self.options.videoType=="Vimeo")
                self.element.css({zIndex:555556});
            
            if(self._playlist.videos_array[self._playlist.videoid].prerollAD=="yes" || self.options.showGlobalPrerollAds){
                if(!self.videoAdStarted) return;
            }
        }
    }
    else if(!THREEx.FullScreen.available())
    {
        this.fullScreen(!this.inFullScreen);
    }
};

Video.fn.seek = function(offset)
{
  this.video.setCurrentTime(offset);
};

Video.fn.setVolume = function(num)
{
  this.video.setVolume(num);
  this.videoAD.setVolume(num);
};

Video.fn.getVolume = function()
{
  return this.video.getVolume();
};

Video.fn.mute = function(state)
{
  if (typeof state == "undefined") state = true;
  this.setVolume(state ? 1 : 0);
};

Video.fn.remove = function()
{
  this.element.remove();
};

Video.fn.bind = function()
{
  this.videoElement.bind.apply(this.videoElement, arguments);
};

Video.fn.one = function()
{
  this.videoElement.one.apply(this.videoElement, arguments);
};

Video.fn.trigger = function()
{
  this.videoElement.trigger.apply(this.videoElement, arguments);
};
var events = [
               "click",
               "dblclick",
               "onerror",
               "onloadeddata",
               "oncanplay",
               "ondurationchange",
               "ontimeupdate",
               "onprogress",
               "onpause",
               "onplay",
               "onended",
               "onvolumechange"
             ];

for (var i=0; i < events.length; i++)
{
  (function()
  {
    var functName = events[i];
    var eventName = functName.replace(/^(on)/, "");
    Video.fn[functName] = function()
    {
      var args = $.makeArray(arguments);
      args.unshift(eventName);
      this.bind.apply(this, args);
    };
  }
  )();
}
Video.fn.triggerReady = function()
{
	this.loaded = true;
};
Video.fn.setupElement = function()
{
    var self=this;
    this.mainContainer=$("<div />");
    this.mainContainer.addClass("elite_vp_mainContainer");
    if(this.options.playerLayout == "fitToContainer" || this.options.playerLayout == "fitToBrowser"){
        this.mainContainer.css({
            width:"100%",
            height:"100%",
            position:"absolute",
            background:"#000000",
			zIndex:999999
        });
    }
    else if(this.options.playerLayout == "fixedSize"){
        this.mainContainer.css({
            width:this.options.videoPlayerWidth,
            height:this.options.videoPlayerHeight,
            position:"absolute",
            background:"#000000",
			zIndex:999999
        });
    }
    switch( this.options.videoPlayerShadow ) {
        case 'effect1':
            this.mainContainer.addClass("elite_vp_effect1");
            break;
        case 'effect2':
            this.mainContainer.addClass("elite_vp_effect2");
            break;
        case 'effect3':
            this.mainContainer.addClass("elite_vp_effect3");
            break;
        case 'effect4':
            this.mainContainer.addClass("elite_vp_effect4");
            break;
        case 'effect5':
            this.mainContainer.addClass("elite_vp_effect5");
            break;
        case 'effect6':
            this.mainContainer.addClass("elite_vp_effect6");
            break;
        case 'off':
            break;
    }
    this.parent.append(this.mainContainer);

	if(this.options.lightBox){
		this.mainContainerBG=$("<div />");
		this.mainContainerBG.addClass("elite_vp_mainContainerBG");
		this.mainContainer.append(this.mainContainerBG)
	}
    if(this.options.floatPlayerOutsideViewport){
		this.mainContainerStickyBG=$("<div />");
		this.mainContainerStickyBG.addClass("elite_vp_mainContainerStickyBG");
        this.mainContainerStickyBG.hide();
		this.mainContainer.append(this.mainContainerStickyBG)
        
        this.stickyControlsWrapp=$("<div />");
		this.stickyControlsWrapp.addClass("elite_vp_stickyControlsWrapp");
        this.mainContainerStickyBG.append(this.stickyControlsWrapp)
        
        this.stickyCloseBtnWrapper = $("<div />")
		.addClass("elite_vp_stickyCloseBtnWrapper")
		.addClass("elite_vp_stickyElement")
		.addClass("elite_vp_playerElement")
		.bind(self.CLICK_EV, function(){
            $(self.mainContainer).removeClass("elite_vp_sticky")
            self.mainContainerStickyBG.hide()
            self.stickyClosedOnButton = true;
            self.pause();
            if(self.YTAPIReady)
                self.youtubePlayer.pauseVideo();
            if(self._playlist.vimeoPlayer)
                self._playlist.vimeoPlayer.pause();
        });
        this.stickyControlsWrapp.append(this.stickyCloseBtnWrapper)
        
        this.stickyCloseBtn = $("<span />")
            .attr("aria-hidden","true")
            .attr("id", "elite_vp_stickyCloseBtn")
            .addClass("fa-elite")
            .addClass("elite-icon-general")
            .addClass("fa-elite-times-sticky")
            
        this.stickyUpBtnWrapper = $("<div />")
		.addClass("elite_vp_stickyUpBtnWrapper")
        .addClass("elite_vp_stickyElement")
		.addClass("elite_vp_playerElement")
		.bind(self.CLICK_EV, function(){
            $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
        });
        this.stickyControlsWrapp.append(this.stickyUpBtnWrapper)
            
        this.stickyUpBtn = $("<span />")
            .attr("aria-hidden","true")
            .attr("id", "elite_vp_stickyUpBtn")
            .addClass("fa-elite")
            .addClass("elite-icon-general")
            .addClass("fa-elite-arrow-circle-up")
            
        this.stickySeekBtnWrapper = $("<div />")
		.addClass("elite_vp_stickySeekBtnWrapper")
        .addClass("elite_vp_stickyElement")
		.addClass("elite_vp_playerElement")
		.bind(self.CLICK_EV, function(){
            if($(".Elite_video_player").length)
                $(".Elite_video_player").get(0).scrollIntoView({behavior: 'smooth'});
            if($("#Elite_video_player").length)
                $("#Elite_video_player").get(0).scrollIntoView({behavior: 'smooth'});
        });
        this.stickyControlsWrapp.append(this.stickySeekBtnWrapper)
            
        this.stickySeekBtn = $("<span />")
            .attr("aria-hidden","true")
            .attr("id", "elite_vp_stickySeekBtn")
            .addClass("fa-elite")
            .addClass("elite-icon-general")
            .addClass("fa-elite-play-circle-o")
            
        this.stickyUpBtnWrapper.append(this.stickyUpBtn);
        this.stickySeekBtnWrapper.append(this.stickySeekBtn);
        this.stickyCloseBtnWrapper.append(this.stickyCloseBtn);
	}
	
	this.element = $("<div />");
	this.element.addClass("elite_vp_videoPlayer");
	this.mainContainer.append(this.element);
  
	this.ytWrapper = $('<div></div>');
	this.ytWrapper.addClass('elite_vp_ytWrapper');
	this.element.append(this.ytWrapper);
    
	this.ytPlayer = $('<div></div>');
	this.ytPlayer.attr("id", self.options.instanceName + "youtube");
	this.ytWrapper.append(this.ytPlayer);
	
	this.imageWrapper = $('<div></div>');
	this.imageWrapper.addClass('elite_vp_imageWrapper');
	this.element.append(this.imageWrapper);
	
	this.imageDisplayed = document.createElement('img');
    this.imageWrapper.append(this.imageDisplayed);
	$('.elite_vp_imageWrapper img').attr('id','elite_vp_imageDisplayed');
};
Video.fn.setupElementAD = function()
{
    this.elementAD = $("<div />");
    this.elementAD.addClass("elite_vp_videoPlayerAD");
    this.mainContainer.append(this.elementAD);
};
Video.fn.idle = function(e, toggle){
    var self=this;
  if (toggle)
  {
    if (this.state == "elite_vp_playing")
    {
		if(!this.options.showAllControls)
			this.controls.hide();
		this.controls.stop().animate({bottom:-50} , 300);
		self.progressIdleTrack.stop().delay(800).animate({bottom:0} , 300);
        this.screenBtnsWindow.stop().animate({right:-44} , 300); 
        this.logoImg.stop().animate({
			opacity:0
		} , 300); 
		
        $(self.nowPlayingTitle).find(".elite_vp_nowPlayingText ").addClass("elite_vp_nowrap")
        self.nowPlayingTitle.stop().animate({
			left:-(self.nowPlayingTitle.width())
		} , 300);
		self.shareOn=true;
		self.toggleShareWindow();
		self.qualityOn=true;
		self.toggleQualityWindow();
		self.qualityBtnEnabled=true;
		self.toggleQualityBtn();
        self.ccOn=true;
		self.toggleCCWindow();
		$(self.toolTip).stop().animate({opacity:0},50,function(){
			self.toolTip.hide()
		});
		self.fastForwardBtnWrapper.stop().animate({opacity: 0} , 100);
		self.fastBackwardBtnWrapper.stop().animate({opacity: 0} , 100);
		self.invisibleWrapper.show();
    }
  }
  else
  {
	  this.progressIdleTrack.stop().animate({bottom:-6},100,function(){
		  if(!self.options.showAllControls)
			self.controls.hide();
		  self.controls.stop().animate({bottom:0} , 300);
	  });
	  this.screenBtnsWindow.stop().animate({right:0} , 400);
      this.logoImg.stop().animate({
		opacity:1
	  } , 400);
      $(self.nowPlayingTitle).find(".elite_vp_nowPlayingText ").removeClass("elite_vp_nowrap")
      self.nowPlayingTitle.stop().animate({
		left:0
	  } , 400);
	  // self.fastForwardBtnWrapper.stop().animate({opacity: 1} , 100);
	  // self.fastBackwardBtnWrapper.stop().animate({opacity:1 } , 100);
	  self.invisibleWrapper.hide();
  }
};
Video.fn.change = function(state)
{
  this.state = state;
    if(this.element){
        this.element.attr("data-state", this.state);
        this.element.trigger("state.videoPlayer", this.state);
    }
}
Video.fn.setupHTML5Video = function()
  {
      if(this.element)
      {
          this.element.append(this.videoElement);
      }
      this.video = this.videoElement[0];
      if(this.options.HTML5videoThumbnails == "live") this.videoClone = this.videoElementClone[0];
      if(this.element)
      {
          this.element.width(this.playerWidth);
          this.element.height(this.playerHeight);
      }
      var self = this;

      this.video.loadSources = function(srcs)
      {
        for (var i in srcs)
        {
		  // if(srcs[i].src.indexOf('m3u8') != -1){
			  
			if(Hls.isSupported()) {
				var hls = new Hls();
				hls.loadSource(srcs[i].src);
				hls.attachMedia(self.video);
			}
            else
                self.videoElement.attr('src', srcs[i].src)
		  // }
		  // else
			// self.videoElement.attr('src', srcs[i].src)
            // if(self.options.HTML5videoThumbnails == "live") 
              // self.videoElementClone.attr('src', srcs[i].src)
        }
        self.video.load();
        if(self.options.HTML5videoThumbnails == "live") 
            self.videoClone.load();                            
      };

      this.video.getStartTime = function()
      {
          return(this.startTime || 0);
      };
      this.video.getEndTime = function()
      {
        if (this.duration == Infinity && this.buffered)
        {
          return(this.buffered.end(this.buffered.length-1));
        }
        else
        {
          return((this.startTime || 0) + this.duration);
        }
      };

      this.video.getCurrentTime = function(){
        try
        {
          return this.currentTime;
        }
        catch(e)
        {
          return 0;
        }
      };


      var self = this;

      this.video.setCurrentTime = function(val)
      {
          this.currentTime = val;
      };
      this.video.getVolume = function()
      {
          return this.volume;
      };
      this.video.setVolume = function(val)
      {
		  if(val>1)
			  val = 1;
          if(self.options.showAllControls)
			this.volume = val;
		  else
			this.volume = 1;
      };

      this.videoElement.dblclick($.proxy(function()
      {
        this.toggleFullScreen();
      }, this));
      this.videoElement.bind(this.CLICK_EV, $.proxy(function()
      {
        this.togglePlay();
		
      }, this));

      this.triggerReady();
	  
    $(this.videoElement).bind("ended", function() {
        self.gaVideoEnded();
    }) 
	
	$(this.videoElement).bind("error", function() {
		
		self._playlist.videoid = self._playlist.videoid +1;
		
		if(self.videoHasError)
			return;
		if (self._playlist.videos_array.length == self._playlist.videoid){
			self._playlist.videoid = 0;
			self.setPlaylistItem(0)
			self.videoHasError = true;
			return;
		}
		
		if(self.myVideo.canPlayType && self.myVideo.canPlayType('video/mp4').replace(/no/, ''))
		{
			self.canPlay = true;
			if(self.options.loadRandomVideoOnStart=="Yes"){
				switch(self.options.HTML5VideoQuality){
					case "HD":
						self.video_path = self._playlist.videos_array[self.rand].video_path_mp4HD;
					break;
					case "SD":
						self.video_path = self._playlist.videos_array[self.rand].video_path_mp4SD;
					break;	
				}
			}
			else if(self.options.loadRandomVideoOnStart=="No"){
				switch(self.options.HTML5VideoQuality){
					case "HD":
						self.video_path = self._playlist.videos_array[self._playlist.videoid].video_path_mp4HD;
					break;
					case "SD":
						self.video_path = self._playlist.videos_array[self._playlist.videoid].video_path_mp4SD;
					break;	
				}
			}
		}
		self.load(self.video_path, self._playlist.videoid);
		self.setPlaylistItem(self._playlist.videoid)
    })
    
    if(this.options.ccShowOnHTML5Videos){
        this.trackElement = $("<track />")
            .addClass("elite_vp_captions")
        this.trackElement.attr({
            src:"",
            kind:"subtitles",
            srclang:"en",
            label:"English"
        });
        this.videoElement.append(this.trackElement);
    }
    if(this.options.HTML5videoThumbnails == "vtt"){
        this.trackElement_videoThumbnails = $("<track />")
            .addClass("elite_vp_videoThumbnails")
        this.trackElement_videoThumbnails.attr({
            src:"",
            kind:"metadata"
        });
        this.videoElement.append(this.trackElement_videoThumbnails);
        
        this.updateVtt();
        
        for (var i = 0; i < this.videoElement[0].textTracks.length; i++) {
            if(this.videoElement[0].textTracks[i].kind == 'metadata')
                this.videoElement[0].textTracks[i].mode = "showing"; 
        }
    }
};
Video.fn.setupHTML5VideoAD = function()
{
    if(this.elementAD)
    {
        this.elementAD.append(this.videoElementAD);
    }
    this.videoAD = this.videoElementAD[0];

    if(this.elementAD)
    {
        this.elementAD.width(0);
        this.elementAD.height(0);
    }
    var self = this;
    this.videoAD.loadSources = function(srcs)
    {
        self.videoElementAD.empty();
        for (var i in srcs)
        {
			if(srcs[i].src.indexOf('m3u8') != -1){
				if(Hls.isSupported()) {
					var hls = new Hls();
					hls.loadSource(srcs[i].src);
					hls.attachMedia(self.videoAD);
				}
			  }
			  else
				self.videoElementAD.attr('src', srcs[i].src)
        }
        self.videoAD.load();

		self.videoPlayingAD=false;
        self.togglePlayAD();
    };

    this.videoAD.getStartTime = function()
    {
        return(this.startTime || 0);
    };
    this.videoAD.getEndTime = function()
    {
        if(isNaN(this.duration))
        {
            
        }
        else
        {
            if (this.duration == Infinity && this.buffered)
            {
                return(this.buffered.end(this.buffered.length-1));
            }
            else
            {
                return((this.startTime || 0) + this.duration);
            }
        }

    };
    this.videoAD.getCurrentTime = function(){
        try
        {
            return this.currentTime;
        }
        catch(e)
        {
            return 0;
        }
    };
    this.videoAD.setCurrentTime = function(val)
    {
        this.currentTime = val;
    }
    this.videoAD.getVolume = function()
    {
        return this.volume;
    };
    this.videoAD.setVolume = function(val)
      {
		  if(val>1)
			  val = 1;
          if(self.options.showAllControls)
			this.volume = val;
		  else
			this.volume = 1;
      };
    this.videoElementAD.dblclick($.proxy(function()
    {
        this.toggleFullScreen();
    }, this));
    this.triggerReady();
    this.videoElementAD.bind(this.CLICK_EV, $.proxy(function()
    {
		if(this.options.vastUrl && this.options.vastUrl != ''){
			
			window.open(this.CURRENT_ACTIVE_VAST.clickThrough);
			this.videoPlayingAD=true;
			this.togglePlayAD();
			
			return;
		}
		
        self.gaVideoClickedAD();
		if(this.options.showGlobalPrerollAds){
			if((this.options.globalPrerollAdsGotoLink != "") && (this.options.globalPrerollAdsGotoLink != "globalPrerollAdsGotoLink")){
				window.open(this.options.globalPrerollAdsGotoLink);
				this.videoPlayingAD=true;
				this.togglePlayAD();
			}
		}
		else{
			if((this._playlist.videos_array[this._playlist.videoid].prerollGotoLink !="") &&  (this._playlist.videos_array[this._playlist.videoid].prerollGotoLink !="prerollGotoLink") && (this._playlist.videos_array[this._playlist.videoid].prerollAD == "yes"))
			{
				if(this.prerollActive)
					window.open(this._playlist.videos_array[this._playlist.videoid].prerollGotoLink);
				this.videoPlayingAD=true;
				this.togglePlayAD();
			}
			if((this._playlist.videos_array[this._playlist.videoid].midrollGotoLink !="") &&  (this._playlist.videos_array[this._playlist.videoid].midrollGotoLink !="midrollGotoLink") && (this._playlist.videos_array[this._playlist.videoid].midrollAD == "yes"))
			{
				if(this.midrollActive)
					window.open(this._playlist.videos_array[this._playlist.videoid].midrollGotoLink);
				this.videoPlayingAD=true;
				this.togglePlayAD();
			}
			if((this._playlist.videos_array[this._playlist.videoid].postrollGotoLink !="") &&  (this._playlist.videos_array[this._playlist.videoid].postrollGotoLink !="postrollGotoLink") && (this._playlist.videos_array[this._playlist.videoid].postrollAD == "yes"))
			{
				if(this.postrollActive)
					window.open(this._playlist.videos_array[this._playlist.videoid].postrollGotoLink);
				this.videoPlayingAD=true;
				this.togglePlayAD();
			}
		}
    }, this));
};
Video.fn.gaVideoEnded = function(){
    var self = this;
    
    if(!self.options.googleAnalyticsTrackingCode || self.options.googleAnalyticsTrackingCode == '') return
    
    ga('send', {
        hitType: 'event',
        eventCategory: 'Video player: '+self.options.instanceName,
        eventAction: 'Video watched',
        eventLabel: 'Video title: '+self._playlist.videos_array[self._playlist.videoid].title,
        nonInteraction: true
    });
}
Video.fn.gaVideoEndedAD = function(){
    var self = this;
    
    if(!self.options.googleAnalyticsTrackingCode || self.options.googleAnalyticsTrackingCode == '') return
    
    ga('send', {
        hitType: 'event',
        eventCategory: 'Video player: '+self.options.instanceName,
        eventAction: 'AD watched',
        eventLabel: 'AD: '+self.video_pathAD,
        nonInteraction: true
    });
}
Video.fn.gaVideoClickedAD = function(){
    var self = this;
    
    if(!self.options.googleAnalyticsTrackingCode || self.options.googleAnalyticsTrackingCode == '') return
    
    ga('send', {
        hitType: 'event',
        eventCategory: 'Video player: '+self.options.instanceName,
        eventAction: 'AD clicked on',
        eventLabel: 'AD: '+self.video_pathAD,
        nonInteraction: true
    });
}
Video.fn.gaVideoSkippedAD = function(){
    var self = this;
    
    if(!self.options.googleAnalyticsTrackingCode || self.options.googleAnalyticsTrackingCode == '') return
    
    ga('send', {
        hitType: 'event',
        eventCategory: 'Video player: '+self.options.instanceName,
        eventAction: 'AD skipped after '+self.secondsFormat(self.videoAD.getCurrentTime())+' seconds',
        eventLabel: 'AD: '+self.video_pathAD,
        nonInteraction: true
    });
}
Video.fn.gaVideoDownloaded = function(){
    var self = this;
    
    if(!self.options.googleAnalyticsTrackingCode || self.options.googleAnalyticsTrackingCode == '') return
    
    ga('send', {
        hitType: 'event',
        eventCategory: 'Video player: '+self.options.instanceName,
        eventAction: 'Video downloaded',
        eventLabel: 'Video title: '+self._playlist.videos_array[self._playlist.videoid].title,
        nonInteraction: true
    });
}
Video.fn.updateVtt = function(){
    this.trackElement_videoThumbnails.attr({
        src:this._playlist.videos_array[this._playlist.videoid].mp4VideoThumbnails_vtt,
    })
    
}
Video.fn.updateCCState = function(){
    var self = this;

    if(this._playlist.videos_array[this._playlist.videoid].ccUrl == undefined || 
	   this._playlist.videos_array[this._playlist.videoid].ccUrl == "" || 
	   this._playlist.videos_array[this._playlist.videoid].ccUrl == "ccUrl" || 
	   this._playlist.videos_array[this._playlist.videoid].ccUrl.toString().indexOf('.vtt') == -1)
	{
        this.ccBtnEnabled=true;
		this.toggleCCBtn();
		this.ccBtnWrapper.addClass("elite_vp_disabledElement")
		
		if(self._playlist.videos_array[self._playlist.videoid].videoType!="HTML5" && self.options.videoType!="HTML5 (self-hosted)"){
			this.ccBtnWrapper.detach();
		}
		return
	}
	else
		this.ccBtnWrapper.removeClass("elite_vp_disabledElement")
    
    this.trackElement.attr({
        src:this._playlist.videos_array[this._playlist.videoid].ccUrl,
    })
    
    if(this.options.ccShowOnVideoLoad){
        this.ccBtnEnabled=false;
		this.toggleCCBtn();
    }
}
Video.fn.initialCCState = function(){
    var self = this;

    if(this.options.ccShowOnVideoLoad){
        this.ccBtnEnabled=false;
		this.toggleCCBtn();
    }
}
Video.fn.setupButtonsOnScreen = function(){

    var self = this;
    this.screenBtnsWindow = $("<div></div>");
    this.screenBtnsWindow.addClass("elite_vp_screenBtnsWindow");
    if(this.element)
    this.element.append(this.screenBtnsWindow);
	if(!this.options.showAllControls)
		this.screenBtnsWindow.hide();
    this.playlistBtn = $("<div />")
        .addClass("elite_vp_playlistBtn")
		.addClass("elite_vp_playerElement")
        .addClass("elite_vp_btnOverScreen")
    if(this.element)
        this.screenBtnsWindow.append(this.playlistBtn);
    
    this.playlistBtnIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-overScreen") 
        .addClass("elite-icon-overScreen"+" "+"elite_vp_"+this.options.instanceTheme) 
        .addClass("fa-elite-indent");
    this.playlistBtn.append(this.playlistBtnIcon);

    this.shareBtn = $("<div />")
        .addClass("elite_vp_shareBtn")
		.addClass("elite_vp_playerElement")
        .addClass("elite_vp_btnOverScreen")
    if(this.element)
        this.screenBtnsWindow.append(this.shareBtn);
    
    this.shareBtnIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-overScreen")
        .addClass("elite-icon-overScreen"+" "+"elite_vp_"+this.options.instanceTheme)
		.addClass("elite_vp_controlsColor")
		.addClass("fa-elite-share-square-o")
    this.shareBtn.append(this.shareBtnIcon);

    this.embedBtn = $("<div />")
        .addClass("elite_vp_embedBtn")
		.addClass("elite_vp_playerElement")
        .addClass("elite_vp_btnOverScreen")
    if(this.element){
        this.screenBtnsWindow.append(this.embedBtn);
    }
    this.embedBtnIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-overScreen")
        .addClass("elite-icon-overScreen"+" "+"elite_vp_"+this.options.instanceTheme)
		.addClass("fa-elite-chain");
    this.embedBtn.append(this.embedBtnIcon);

    this.infoBtn = $("<div />")
        .addClass("elite_vp_infoBtn")
		.addClass("elite_vp_playerElement")
        .addClass("elite_vp_btnOverScreen")
		
	this.playlistBtn.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme)
	this.shareBtn.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme)
	this.embedBtn.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme)
	this.infoBtn.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme)

		
    if(this.element){
        this.screenBtnsWindow.append(this.infoBtn);
    }
    this.infoBtnIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-overScreen")
        .addClass("elite-icon-overScreen"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-info");
    this.infoBtn.append(this.infoBtnIcon);
	
	this.createFastForwardAndFastBackwardButtons();
	
    this.fsEnterADBox = $("<div />")
        .addClass("elite_vp_fsEnterADBox")
		.addClass("elite_vp_playerElement")
		.addClass("elite_vp_btnOverScreen")
		.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme)
        .hide();
    this.elementAD.append(this.fsEnterADBox);

    this.fsEnterADIcon = $("<span />");
    this.fsEnterADIcon.attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("fa-elite-expandAD")
		.addClass("elite-icon-overScreen")
        .addClass("elite-icon-overScreen"+" "+"elite_vp_"+this.options.instanceTheme)
        .bind(this.CLICK_EV,$.proxy(function()
        {
            this.toggleFullScreen();
        }, this))
    this.fsEnterADBox.append(this.fsEnterADIcon);
	
	

    this.shareWindow = $("<div></div>");
    this.shareWindow.addClass("elite_vp_shareWindow");

    if(this.element)
        this.element.append(this.shareWindow);

    this.shareBtn.bind(this.CLICK_EV,$.proxy(function()
    {
        this.toggleShareWindow();
    }, this));

    this.facebookBtn = $("<div />")
        .addClass("elite_vp_facebookBtn")
        .addClass("elite_vp_playerElement")
        .addClass("elite_vp_socialBtn")
		.addClass("elite_vp_bg");
    if(this.element){
        this.shareWindow.append(this.facebookBtn);
    }
    this.facebookBtnIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-overScreen")
        .addClass("fa-elite-facebook");
    this.facebookBtn.append(this.facebookBtnIcon);

    this.twitterBtn = $("<div />")
        .addClass("elite_vp_twitterBtn")
		.addClass("elite_vp_playerElement")
        .addClass("elite_vp_socialBtn")
		.addClass("elite_vp_bg");
    if(this.element){
        this.shareWindow.append(this.twitterBtn);
    }
    this.twitterBtnIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-overScreen")
        .addClass("fa-elite-twitter");
    this.twitterBtn.append(this.twitterBtnIcon);

	this.shareWindow.hide();
	this.shareWindow.css({
		right:-(this.shareWindow.width())
	});
	this.positionShareWindowFromTop();
	
    this.facebookBtn.bind(this.CLICK_EV,$.proxy(function(){
        self.pause();
		if(self.YTAPIReady)
			self.youtubePlayer.pauseVideo();

		var left  = ($(window).width()/2)-(600/2),
			top   = ($(window).height()/2)-(400/2),
			popup = window.open ("https://www.facebook.com/dialog/feed?app_id=787376644686729"
			+"&display=popup"
			+"&name="+self.options.facebookShareName
			+"&link="+self.options.facebookShareLink
			+"&redirect_uri=https://facebook.com"
			+"&description="+self.options.facebookShareDescription
			+"&picture="+self.options.facebookSharePicture
			, "popup", "width=600, height=400, top="+top+", left="+left);
		if (window.focus)
		{
		  popup.focus();
		}
    }, this));
	
    this.twitterBtn.bind(this.CLICK_EV,$.proxy(function(){
        self.pause();
		if(self.YTAPIReady)
			self.youtubePlayer.pauseVideo();
		
		var left  = ($(window).width()/2)-(600/2),
			top   = ($(window).height()/2)-(400/2),
			popup = window.open ("https://twitter.com/intent/tweet"
			+"?text="+self.options.twitterText
			+"&url="+self.options.twitterLink
			+"&hashtags="+self.options.twitterHashtags
			+"&via="+self.options.twitterVia
			, "popup", "width=600, height=400, top="+top+", left="+left);
		if (window.focus)
		{
		  popup.focus();
		}
    }, this));
    $(".elite_vp_shareBtn, .elite_vp_embedBtn, .elite_vp_playlistBtn, .elite_vp_infoBtn, .elite_vp_facebookBtn, .elite_vp_twitterBtn, .elite_vp_fsEnterADBox, .elite_vp_fastForwardBtnWrapper").mouseover(function(){
        $(this).find(".elite-icon-overScreen").removeClass("elite-icon-overScreen").addClass("elite-icon-overScreen-hover");
    });
    $(".elite_vp_shareBtn, .elite_vp_embedBtn, .elite_vp_playlistBtn, .elite_vp_infoBtn, .elite_vp_facebookBtn, .elite_vp_twitterBtn, .elite_vp_fsEnterADBox, .elite_vp_fastForwardBtnWrapper").mouseout(function(){
        $(this).find(".elite-icon-overScreen-hover").removeClass("elite-icon-overScreen-hover").addClass("elite-icon-overScreen");
    });
	
	this.mainContainer.find(".elite_vp_btnOverScreen").mouseover(function(){
        $(this).css("background",self.options.colorAccent);
    });
    this.mainContainer.find(".elite_vp_btnOverScreen").mouseout(function(){
        $(this).css("background","");
    });
    if(self.options.shareShow=="No")
        this.shareBtn.hide();
    if(self.options.embedShow=="No")
        this.embedBtn.hide();
    if(self.options.infoShow=="No")
        this.infoBtn.hide();
    
    if(self.options.facebookShow=="No")
        this.facebookBtn.hide();
    if(self.options.twitterShow=="No")
        this.twitterBtn.hide();

    this.buttonsMargin = 5;

    this.positionOverScreenButtons();
	this.positionShareWindowFromTop();

    this.playlistBtn.bind(this.CLICK_EV, function(){
        self.toggleStretch();
        self.resizeAll();
    });
};
Video.fn.createFastForwardAndFastBackwardButtons = function(){
	var self = this;
	this.fastForwardBtnWrapper = $("<div />")
		.addClass("elite_vp_fastForwardBtnWrapper")
		.addClass("elite_vp_playerElement")
        .addClass("elite_vp_btnOverScreen")
		.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme)
		.bind(this.CLICK_EV, function(){
			self.fastForward();
        })
		.hide();
    this.fastForwardBtnIcon = $("<span />")
        .attr("aria-hidden","true")
		.attr("id", "elite_vp_fastForwardBtn")
        .addClass("fa-elite")
		.addClass("elite-icon-overScreen")
        .addClass("elite-icon-overScreen"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-fast-forward")
    this.fastForwardBtnWrapper.append(this.fastForwardBtnIcon);
	
	this.fastBackwardBtnWrapper = $("<div />")
		.addClass("elite_vp_fastBackwardBtnWrapper")
		.addClass("elite_vp_playerElement")
        .addClass("elite_vp_btnOverScreen")
		.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme)
		.bind(this.CLICK_EV, function(){
			self.fastBackward();
        })
		.hide();
    this.fastBackwardBtnIcon = $("<span />")
        .attr("aria-hidden","true")
		.attr("id", "elite_vp_fastBackwardBtn")
        .addClass("fa-elite")
		.addClass("elite-icon-overScreen")
        .addClass("elite-icon-overScreen"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-fast-backward")
    this.fastBackwardBtnWrapper.append(this.fastBackwardBtnIcon);

	if(this.options.fastForwardShow == "Yes"){
		this.element.append(this.fastForwardBtnWrapper)
		document.addEventListener("keydown", function(e) {
			if (e.keyCode == 39)
				self.fastForward();
		});
	}
	if(this.options.fastBackwardShow == "Yes"){
		this.element.append(this.fastBackwardBtnWrapper)
		document.addEventListener("keydown", function(e) {
			if (e.keyCode == 37)
				self.fastBackward();
		});
	}
}
Video.fn.toggleStretch = function(){
    var self=this;
    if(this.stretching)
    {
        self.shrinkPlayer();
        this.stretching = false;
		this.playlistBtnIcon.removeClass("fa-elite-dedent").addClass("fa-elite-indent");
    }
    else
    {
        self.stretchPlayer();
        this.stretching = true;
		this.playlistBtnIcon.removeClass("fa-elite-indent").addClass("fa-elite-dedent");
    }
	this.positionControlsBtnsWrapperRight();
	this.positionTimeTotal();
    this.resizeVideoTrack();
    this.positionOverScreenButtons();
	this.positionShareWindowFromTop();
    this.positionQualityWindow();
    this.positionLogo();
    this.positionPopup();
    this.resizeBars();
    this.resizeAll();
};
Video.fn.stretchPlayer = function(){
    this.element.width(this.options.videoPlayerWidth);
};
Video.fn.shrinkPlayer = function(){
    this.element.width(this.playerWidth);
};
Video.fn.positionOverScreenButtons = function(){
    if(this.element){

		if(document.webkitIsFullScreen || document.fullscreenElement || document.mozFullScreen || this.inFullScreen)
		{
			this.playlistBtn.hide();
		}
		else
		{
			if(this.options.playlist=="Right playlist" || this.options.playlist=="Bottom playlist")
				this.playlistBtn.show();
			else
				this.playlistBtn.hide();
		}
    }
};
Video.fn.positionShareWindowFromTop = function(){
	this.shareWindow.css({
		top:this.shareBtn.position().top + 5
	});
}
Video.fn.positionQualityWindow = function(){
	var self = this;

	var posFromRight = parseInt(self.controlsBtnsWrapperRight.css("right").replace(/[^-\d\.]/g, ''))
	
	if(this.options.rewindShow == "Yes") posFromRight = posFromRight - 10
	else posFromRight = posFromRight - 37
	self.qualityWindow_mask.css({
		right: posFromRight,
		bottom: self.controls.height() + 2
	})
};
Video.fn.hideControls = function(){
    var self = this;

    $(this.element).hover(function(){
		if(!self.options.showAllControls)
			self.controls.hide();
		self.controls.stop().animate({bottom:0} , 300);
		self.progressIdleTrack.stop().animate({bottom:-6} , 100);
		self.screenBtnsWindow.stop().animate({right:0} , 300);
		self.logoImg.stop().animate({
			opacity:1
		} , 300);
        $(self.nowPlayingTitle).find(".elite_vp_nowPlayingText ").removeClass("elite_vp_nowrap")
		self.nowPlayingTitle.stop().animate({
			left:0
		} , 300);
		self.fastForwardBtnWrapper.stop().animate({opacity: 1} , 100);
		self.fastBackwardBtnWrapper.stop().animate({opacity: 1} , 100);
    },function(){
		if(!self.options.showAllControls)
			self.controls.hide();
		self.controls.stop().animate({bottom:-50} , 300);
		self.progressIdleTrack.stop().delay(800).animate({bottom:0} , 100);
        self.screenBtnsWindow.stop().animate({right:-44} , 300); 
        self.logoImg.stop().animate({
			opacity:0
		} , 300);
        $(self.nowPlayingTitle).find(".elite_vp_nowPlayingText ").addClass("elite_vp_nowrap")
        self.nowPlayingTitle.stop().animate({
			left:-(self.nowPlayingTitle.width())
		} , 300);
		self.fastForwardBtnWrapper.stop().animate({opacity: 0} , 100);
		self.fastBackwardBtnWrapper.stop().animate({opacity: 0} , 100);
    });
};
Video.fn.setupButtons = function(){
  var self = this;

    this.controlsBtnsWrapperRight = $("<div></div>");
    this.controlsBtnsWrapperRight.addClass("elite_vp_controlsBtnsWrapperRight");
	this.controls.append(this.controlsBtnsWrapperRight);
    
    if(this.options.youtubeControls=="default controls")
        this.controlsBtnsWrapperRight.hide();

    this.playBtn = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-overScreen")
        .addClass("fa-elite-play")
        .addClass("elite_vp_playerElement")
        .addClass("elite_vp_themeColor")
		.attr("id", "elite_vp_playBtn")
	this.playBtnBg = $("<div />")
		.addClass("elite_vp_playBtnBg")
		.addClass("elite_vp_playerElement")
		.bind(self.CLICK_EV, function(){
            self.togglePlay();
        });
	this.controls.append(this.playBtnBg);
	this.playBtnBg.append(this.playBtn);
    
    //for iOS user interaction
    if(isMobile.iOS()){
        this.ytOverlay = $('<div />');
        this.ytOverlay.addClass('elite_vp_ytOverlay');
        this.ytWrapper.append(this.ytOverlay);
		this.ytOverlay.bind(self.CLICK_EV, function(){
            self.togglePlay();
			self.ytOverlay.hide();
        });
    }
    
	this.rewindBtnWrapper = $("<div />")
		.addClass("elite_vp_controlsBtn")
		.addClass("elite_vp_playerElement")
		.addClass("elite_vp_rewindBtnWrapper")
		.bind(self.CLICK_EV, function(){
            self.seek(0);
            self.play();
			
			if(self.youtubePlayer!= undefined){
			self.youtubePlayer.seekTo(0);
            self.youtubePlayer.playVideo();
			}
        });
	
    this.rewindBtn = $("<span />")
        .attr("aria-hidden","true")
		.attr("id", "elite_vp_rewindBtn")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-repeat")
    this.rewindBtnWrapper.append(this.rewindBtn);
	
	this.qualityBtnWrapper = $("<div />")
		.addClass("elite_vp_controlsBtn")
		.addClass("elite_vp_playerElement")
		.addClass("elite_vp_qualityBtnWrapper")
		.bind(self.CLICK_EV, function(){
			self.toggleQualityBtn();
			self.toggleQualityWindow();
			$(this).children(":first").toggleClass("fa-elite-rotate-90")
        })
		.css("visibility","hidden");
	if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
		this.qualityBtnWrapper.css("visibility","visible");
	
	this.qualityBtn = $("<span />")
        .attr("aria-hidden","true")
        .attr("id", "elite_vp_qualityBtn")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-cog")
    this.qualityBtnWrapper.append(this.qualityBtn);
	
	this.HD_indicator = $("<div />")
		.addClass("elite_vp_HD_indicator")
		.addClass("elite-icon-general")
		.addClass("elite_vp_qualityWindowText")
		.text("HD")
		.hide();
	this.qualityBtnWrapper.append(this.HD_indicator)
    
    this.ccBtnWrapper = $("<div />")
		.addClass("elite_vp_controlsBtn")
		.addClass("elite_vp_playerElement")
		.addClass("elite_vp_ccBtnWrapper")
		.bind(self.CLICK_EV, function(){
			self.toggleCCBtn();
			self.toggleCCWindow();
        })
		.css("visibility","hidden");
	if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
		this.ccBtnWrapper.css("visibility","visible");
	
	this.ccBtn = $("<span />")
        .attr("aria-hidden","true")
        .attr("id", "elite_vp_ccBtn")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-cc")
    this.ccBtnWrapper.append(this.ccBtn);
	
	this.downloadBtnLink = $("<a />")
		.attr('href', this._playlist.videos_array[this._playlist.videoid].video_path_mp4HD)
		.attr('download', '')
		.hide()
	this.downloadBtnWrapper = $("<div />")
		.addClass("elite_vp_controlsBtn")
		.addClass("elite_vp_playerElement")
		.addClass("elite_vp_downloadBtnWrapper")
		.bind(self.CLICK_EV, function(){
            self.gaVideoDownloaded();
        });
	this.downloadBtnLink.append(this.downloadBtnWrapper)	
	this.downloadBtn = $("<span />")
        .attr("aria-hidden","true")
        .attr("id", "elite_vp_downloadBtn")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-download")
    this.downloadBtnWrapper.append(this.downloadBtn);
	if((this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)")&&this._playlist.videos_array[this._playlist.videoid].enable_mp4_download =="yes")
		this.downloadBtnLink.css("visibility","visible").show();
    
	

	if(self.options.shuffle=="Yes"){
		this.shuffleBtnEnabled=false;
		this.toggleShuffleBtn();
	}
	else
		this.shuffleBtnEnabled=false;
		
	this.playButtonScreen = $("<div />");
	this.playButtonScreen.addClass("elite_vp_playButtonScreen")
	  .attr("aria-hidden","true")
	  .addClass("fa-elite")
	  .addClass("fa-elite-playScreen"+" "+"elite_vp_"+this.options.instanceTheme)
	  .hide();
	this.playButtonScreen.bind(this.CLICK_EV,$.proxy(function()
	{
		this.togglePlay();
	}, this))
	
	if(this.element){
	  this.element.append(this.playButtonScreen);
	}

	this.fsBtnWrapper = $("<div />")
		.addClass("elite_vp_fsBtnWrapper")
		.addClass("elite_vp_playerElement")
		.bind(this.CLICK_EV,$.proxy(function()
        {
            this.toggleFullScreen();
        }, this));
	this.controls.append(this.fsBtnWrapper)
  
    this.fsEnter = $("<span />");
    this.fsEnter.attr("aria-hidden","true")
		.attr("id", "elite_vp_fsBtn")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-expand")
    this.fsBtnWrapper.append(this.fsEnter);

    if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download==true || this._playlist.videos_array[this._playlist.videoid].enable_mp4_download=="yes")
        this.controlsBtnsWrapperRight.append(this.downloadBtnLink)
    if(self.options.ccShowOnHTML5Videos)
        this.controlsBtnsWrapperRight.append(this.ccBtnWrapper)
	if(this.options.qualityShow == "Yes")
		this.controlsBtnsWrapperRight.append(this.qualityBtnWrapper)
	if(this.options.rewindShow == "Yes")
		this.controlsBtnsWrapperRight.append(this.rewindBtnWrapper)
    this.qualityBtnWrapper.css("visibility","visible");

    this.playButtonScreen.mouseover(function(){
        $(this).stop().animate({
            opacity: 0.85
        }, 200 );
    });
    this.playButtonScreen.mouseout(function(){
            $(this).stop().animate({
                opacity: 1
            }, 200 );
        }
    );
	
	this.positionControlsBtnsWrapperRight();
};
Video.fn.positionControlsBtnsWrapperRight = function(){
	this.controlsBtnsWrapperRight.css({
        right: 153
	});
}
Video.fn.positionTimeTotal = function(){
		this.timeTotal.css({
			right: 153 + this.controlsBtnsWrapperRight.width() +35 -7,
		});
}
Video.fn.createInfoWindow = function(){
    this.infoWindow = $("<div />");
    this.infoWindow.addClass("elite_vp_infoWindow");
    this.infoWindow.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme);
    if(this.element){
        this.element.append(this.infoWindow);
    }


    this.infoBtnClose = $("<div />");
    this.infoBtnClose.addClass("elite_vp_btnClose elite_vp_themeColorText");
    this.infoWindow.append(this.infoBtnClose);
    this.infoBtnClose.css({bottom:0});

    this.infoBtnCloseIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("fa-elite-close")
		.addClass("elite_vp_themeColor");
    this.infoBtnClose.append(this.infoBtnCloseIcon);

    this.infoBtn.bind(this.CLICK_EV,$.proxy(function()
    {
        this.toggleInfoWindow();
    }, this));

    this.infoBtnClose.bind(this.CLICK_EV,$.proxy(function()
    {
        this.toggleInfoWindow();
    }, this));

    this.infoBtnClose.mouseover(function(){
        $(this).stop().animate({
            opacity:0.7
        },200);
    });
    this.infoBtnClose.mouseout(function(){
        $(this).stop().animate({
            opacity:1
        },200);
    });
};
Video.fn.createQualityWindow = function(){
	var self = this;
	this.qualityWindow_mask = $("<div />");
	this.qualityWindow_mask.addClass("elite_vp_qualityWindowMask");
	if(this.element){
		this.element.append(this.qualityWindow_mask);
	}
	
	this.qualityWindow = $("<div />");
    this.qualityWindow.addClass("elite_vp_qualityWindow");
    this.qualityWindow.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme);
    if(this.element){
        this.qualityWindow_mask.append(this.qualityWindow);
    }
	var posFromRight = parseInt(self.controlsBtnsWrapperRight.css("right").replace(/[^-\d\.]/g, ''))
	self.qualityWindow_mask.css({
		right: posFromRight+self.qualityBtnWrapper.position().left+self.qualityBtnWrapper.width()/2-self.qualityWindow_mask.width()/2,
		bottom: self.controls.height() + 2
	}).hide();
	
	this.qualityWindow.css({
		top: 200
    });
    this.createQualityWindowByType();
}
Video.fn.initStateYTQualityMenu = function(){
	switch(this.options.youtubeQuality){
		case "hd1080":
			$(".hd1080").append(this.qualityCheck);
			this.HD_indicator.show();
		break;
		case "hd720":
			$(".hd720").append(this.qualityCheck);
			this.HD_indicator.show();
		break;
		case "large":
			$(".large").append(this.qualityCheck);
		break;
		case "medium":
			$(".medium").append(this.qualityCheck);
		break;
		case "small":
			$(".small").append(this.qualityCheck);
		break;
		case "tiny":
			$(".default").append(this.qualityCheck);
		break;
		case "default":
			$(".default").append(this.qualityCheck);
		break;
	}
}
Video.fn.initStateHTML5QualityMenu = function(){
	
	var q = this.selectedHTML5Quality || this.options.HTML5VideoQuality
	
	switch(q){
		case "HD":
			$(".HD").append(this.qualityCheck);
			this.HD_indicator.show();
		break;
		case "SD":
			$(".SD").append(this.qualityCheck);
			this.HD_indicator.hide();
		break;
	}
}
Video.fn.updateYoutubeQuality = function(selected){
	
	if(this.youtubePlayer.getPlaybackQuality() == selected)
		return
	if(this.youtubePlayer.getPlaybackQuality() == 'unknown')
	{
		this.youtubePlayer.setPlaybackQuality(selected);
		return
	}
	
	var saveYoutubeCurrentTime = this.youtubePlayer.getCurrentTime();
	
	this.youtubePlayer.stopVideo();
	this.youtubePlayer.setPlaybackQuality(selected);
	this.youtubePlayer.playVideo();
	this.youtubePlayer.seekTo(saveYoutubeCurrentTime);
}
Video.fn.updateHTML5Quality = function(selected){

	var saveHTML5CurrentTime = this.video.getCurrentTime();

	this.pause();
	
	if(this.myVideo.canPlayType && this.myVideo.canPlayType('video/mp4').replace(/no/, ''))
	{
		this.canPlay = true;
		switch(selected){
			case "HD":
				this.video_path = this._playlist.videos_array[this._playlist.videoid].video_path_mp4HD;
			break;
			case "SD":
				this.video_path = this._playlist.videos_array[this._playlist.videoid].video_path_mp4SD;
			break;	
		}
	}
	
	this.load(this.video_path, this._playlist.videoid);
	this.video.setCurrentTime(saveHTML5CurrentTime)
    this.play()
}
Video.fn.createQualityWindowByType = function(){
    
    var self = this;
	this.qualityWindow.html('')
    
    if(this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube"){
        this.qualityWindow.append('<div class="elite_vp_list">'
										+'<div class="elite_vp_qualityListItem elite_vp_playerElement hd1080">'
											+'<p class="elite_vp_qualityNum elite-icon-general elite_vp_controlsColor elite_vp_qualityWindowText '+"elite_vp_"+this.options.instanceTheme+'">1080p</p>'
											+'<p class="elite_vp_qualityHD elite-icon-general elite_vp_qualityWindowText">HD</p>'
										+'</div>'
										+'<div class="elite_vp_qualityListItem elite_vp_playerElement hd720">'
											+'<p class="elite_vp_qualityNum elite-icon-general elite_vp_controlsColor elite_vp_qualityWindowText '+"elite_vp_"+this.options.instanceTheme+'">720p</p>'
											+'<p class="elite_vp_qualityHD elite-icon-general elite_vp_qualityWindowText">HD</p>'
										+'</div>'
										+'<div class="elite_vp_qualityListItem elite_vp_playerElement large">'
											+'<p class="elite_vp_qualityNum elite-icon-general elite_vp_controlsColor elite_vp_qualityWindowText '+"elite_vp_"+this.options.instanceTheme+'">480p</p>'
										+'</div>'
										+'<div class="elite_vp_qualityListItem elite_vp_playerElement medium">'
											+'<p class="elite_vp_qualityNum elite-icon-general elite_vp_controlsColor elite_vp_qualityWindowText '+"elite_vp_"+this.options.instanceTheme+'">360p</p>'
										+'</div>'
										+'<div class="elite_vp_qualityListItem elite_vp_playerElement small">'
											+'<p class="elite_vp_qualityNum elite-icon-general elite_vp_controlsColor elite_vp_qualityWindowText '+"elite_vp_"+this.options.instanceTheme+'">240p</p>'
										+'</div>'
										+'<div class="elite_vp_qualityListItem elite_vp_playerElement tiny">'
											+'<p class="elite_vp_qualityNum elite-icon-general elite_vp_controlsColor elite_vp_qualityWindowText '+"elite_vp_"+this.options.instanceTheme+'">144p</p>'
										+'</div>'
										+'<div class="elite_vp_qualityListItem elite_vp_playerElement default">'
											+'<p class="elite_vp_qualityNum elite-icon-general elite_vp_controlsColor elite_vp_qualityWindowText '+"elite_vp_"+this.options.instanceTheme+'">auto</p>'
										+'</div>'
								+'</div>');
                                this.qualityWindow_mask.css("height","170px")
    }
    
    if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)"){
		this.qualityWindow.append('<div class="elite_vp_list">'
										+'<div class="elite_vp_qualityListItem elite_vp_playerElement HD">'
											+'<p class="elite_vp_qualityNum elite-icon-general elite_vp_controlsColor elite_vp_qualityWindowText '+"elite_vp_"+this.options.instanceTheme+'">HD</p>'
											+'<p class="elite_vp_qualityHD elite-icon-general elite_vp_qualityWindowText">HD</p>'
										+'</div>'
										+'<div class="elite_vp_qualityListItem elite_vp_playerElement SD">'
											+'<p class="elite_vp_qualityNum elite-icon-general elite_vp_controlsColor elite_vp_qualityWindowText '+"elite_vp_"+this.options.instanceTheme+'">SD</p>'
										+'</div>'
								+'</div>');
		this.qualityWindow_mask.css("height","50px")
	}
    
	this.qualityCheck = $("<span />")
        .attr("aria-hidden","true")
        .attr("id", "qualityCheck")
        .addClass("fa-elite")
        .addClass("fa-elite-check")
        .addClass("elite_vp_qualityCheck")
        .addClass("elite_vp_qualityListItem_activeColor"+" "+"elite_vp_"+this.options.instanceTheme);
	
	this.qualityListItem = $(".elite_vp_qualityListItem");
    
	$(this.qualityListItem).click(function(){
		$(".elite_vp_qualityWindow").find(".elite_vp_qualityListItem_activeColor"+" "+"elite_vp_"+self.options.instanceTheme).removeClass("elite_vp_qualityListItem_activeColor"+" "+"elite_vp_"+self.options.instanceTheme)
		$(this).addClass('elite_vp_qualityListItem_activeColor'+" "+"elite_vp_"+self.options.instanceTheme);
		$(this).append(self.qualityCheck);
		
		if($(this).hasClass("hd1080")){
			self.selectedYoutubeQuality = "hd1080";
			self.HD_indicator.show();
		}
		if($(this).hasClass("hd720")){
			self.selectedYoutubeQuality = "hd720";
			self.HD_indicator.show();
		}
		if($(this).hasClass("large")){
			self.selectedYoutubeQuality = "large";
			self.HD_indicator.hide();
		}
		if($(this).hasClass("medium")){
			self.selectedYoutubeQuality = "medium";
			self.HD_indicator.hide();
		}
		if($(this).hasClass("small")){
			self.selectedYoutubeQuality = "small";
			self.HD_indicator.hide();
		}
		if($(this).hasClass("tiny")){
			self.selectedYoutubeQuality = "tiny";
			self.HD_indicator.hide();
		}
		if($(this).hasClass("default")){
			self.selectedYoutubeQuality = "default";
		}
        if($(this).hasClass("HD")){
			self.selectedHTML5Quality = "HD";
			self.HD_indicator.show();
		}
		if($(this).hasClass("SD")){
			self.selectedHTML5Quality = "SD";
			self.HD_indicator.hide();
		}
		self.qualityOn=true;
		self.toggleQualityWindow(350);
		self.toggleQualityBtn();
        
        if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
			self.updateHTML5Quality(self.selectedHTML5Quality);
		else if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
			self.updateYoutubeQuality(self.selectedYoutubeQuality);
	});
    
	if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
		self.initStateHTML5QualityMenu();
	else if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
		self.initStateYTQualityMenu();
}
Video.fn.onPlayerPlaybackQualityChange = function(){}
Video.fn.createCaptionsWindow = function(){
	var self = this;
	this.ccWindow_mask = $("<div />");
	this.ccWindow_mask.addClass("elite_vp_ccWindowMask");
	if(this.element){
		this.element.append(this.ccWindow_mask);
	}
	
	this.ccWindow = $("<div />");
    this.ccWindow.addClass("elite_vp_ccWindow");
    this.ccWindow.addClass("elite_vp_bg"+" "+this.options.instanceTheme);
    if(this.element){
        this.ccWindow_mask.append(this.ccWindow);
    }
	this.ccWindow_mask.css({
		right:144,
		bottom: this.controls.height() + 2
	}).hide();
	this.ccWindow.css({
		top: 200
    });
	

	this.ccWindow.append('<div class="elite_vp_list">'
										+'<div class="elite_vp_captionsListItem elite_vp_playerElement hd1080">'
											+'<p class="elite_vp_captionsNum elite-icon-general elite_vp_controlsColor elite_vp_ccWindowText '+this.options.instanceTheme+'">1080p</p>'
											+'<p class="elite_vp_captionsHD elite-icon-general elite_vp_ccWindowText">HD</p>'
										+'</div>'
										+'<div class="elite_vp_captionsListItem elite_vp_playerElement hd720">'
											+'<p class="elite_vp_captionsNum elite-icon-general elite_vp_controlsColor elite_vp_ccWindowText '+this.options.instanceTheme+'">720p</p>'
											+'<p class="elite_vp_captionsHD elite-icon-general elite_vp_ccWindowText">HD</p>'
										+'</div>'
								+'</div>');
								
	this.captionsCheck = $("<span />")
        .attr("aria-hidden","true")
        .attr("id", "captionsCheck")
        .addClass("fa-elite")
        .addClass("fa-elite-check")
        .addClass("elite_vp_captionsCheck")
        .addClass("elite_vp_captionsListItem_activeColor"+" "+this.options.instanceTheme);
	
	this.captionsListItem = $(".elite_vp_captionsListItem");
	$(this.captionsListItem).click(function(){
		$(".elite_vp_captionsWindow").find(".elite_vp_captionsListItem_activeColor"+" "+self.options.instanceTheme).removeClass("elite_vp_captionsListItem_activeColor"+" "+self.options.instanceTheme)
		$(this).addClass('elite_vp_captionsListItem_activeColor'+" "+self.options.instanceTheme);
		$(this).append(self.captionsCheck);
	
		self.ccOn=true;
		self.toggleCCWindow(350);
		self.toggleCCBtn();
	});
}
Video.fn.createEmbedWindow = function(){
    this.embedWindow = $("<div />");
    this.embedWindow.addClass("elite_vp_embedWindow elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme);
    if(this.element)
        this.element.append(this.embedWindow);
    
    this.embedBtnClose = $("<div />");
    this.embedBtnClose.addClass("elite_vp_btnClose elite_vp_themeColorText");
    this.embedWindow.append(this.embedBtnClose);
    this.embedBtnClose.css({bottom:0});
	
	this.embedWindow.css({
		top:-(this.embedWindow.height())
		});
	this.embedWindow.hide();

    this.embedBtnCloseIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("fa-elite-close")
		.addClass("elite_vp_themeColor");;
    this.embedBtnClose.append(this.embedBtnCloseIcon);

    this.embedBtn.bind(this.CLICK_EV,$.proxy(function()
    {
        this.toggleEmbedWindow();
    }, this));

    this.embedBtnClose.bind(this.CLICK_EV,$.proxy(function()
    {
        this.toggleEmbedWindow();
    }, this));

    this.embedBtnClose.mouseover(function(){
        $(this).stop().animate({
                opacity:0.7
        },200);
    });
    this.embedBtnClose.mouseout(function(){
        $(this).stop().animate({
                opacity:1
        },200);
    });
};
Video.fn.setupVideoTrack = function(){
    var self=this;

    this.videoTrack = $("<div />");
    this.videoTrack.addClass("elite_vp_videoTrack")
				   .addClass("elite_vp_videoTrack"+" "+"elite_vp_"+this.options.instanceTheme)
                   .addClass("elite_vp_playerElement");
    this.controls.append(this.videoTrack);

	this.progressIdleTrack = $("<div />");
    this.progressIdleTrack.addClass("elite_vp_progressIdleTrack")
	                      .addClass("elite_vp_progressIdleTrack"+" "+"elite_vp_"+this.options.instanceTheme)
	if(!this.options.showAllControls)
		this.progressIdleTrack.hide();
	this.progressIdleTrack.css({bottom:-6});
    this.element.append(this.progressIdleTrack);
	
	this.progressIdleDownload = $("<div />");
    this.progressIdleDownload.addClass("elite_vp_progressIdleDownload")
                             .addClass("elite_vp_progressIdleDownload"+" "+"elite_vp_"+this.options.instanceTheme);
	this.progressIdleDownload.css("width",0);
    this.progressIdleTrack.append(this.progressIdleDownload);
	
    this.progressIdle = $("<div />");
    this.progressIdle.addClass("elite_vp_progressIdle elite_vp_themeColor");
    this.progressIdleTrack.append(this.progressIdle);
	this.progressIdle.css("width",0);

	
    this.progressADBg = $("<div />");
    this.progressADBg.addClass("elite_vp_progressADBg").hide();
    this.elementAD.append(this.progressADBg);
	
    this.progressAD = $("<div />");
    this.progressAD.addClass("elite_vp_progressAD");
    this.progressADBg.append(this.progressAD);

        this.videoTrackDownload = $("<div />");
        this.videoTrackDownload.addClass("elite_vp_videoTrackDownload")
							   .addClass("elite_vp_videoTrackDownload"+" "+"elite_vp_"+this.options.instanceTheme);
        this.videoTrackDownload.css("width",0);
        this.videoTrack.append(this.videoTrackDownload);

        this.videoTrackProgress = $("<div />");
        this.videoTrackProgress.addClass("elite_vp_Progress elite_vp_themeColor");
        this.videoTrackProgress.css("width",0);
        this.videoTrack.append(this.videoTrackProgress);

        this.toolTip = $("<div />");
        this.toolTip.addClass("elite_vp_toolTip elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme);
        this.toolTip.addClass("elite_vp_bg"+" "+"elite_vp_"+this.options.instanceTheme);
        this.toolTip.hide();
        this.toolTip.css({
            opacity:0 ,
			top: self.controls.position().top - self.toolTip.outerHeight() - 2
        });
        this.mainContainer.append(this.toolTip);

		$(this.mainContainer).find(".elite_vp_playerElement").bind("mousemove mouseenter click", function(e){
			self.toolTip.css("left", "");
			self.toolTip.css("right", "");
			self.toolTip.css("bottom", "");
			self.toolTip.css("top", "");

			var x = e.pageX - $(this).offset().left -self.toolTip.outerWidth()/2;
            var xc = e.pageX - $(this).offset().left -$(self.canvasWrap).outerWidth()/2;

			if ($(this).hasClass("elite_vp_videoTrack")){
				var xPos = e.pageX - self.videoTrack.offset().left;
				var perc = xPos / self.videoTrack.width();
				if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
				{
					self.toolTip.text(self.secondsFormat(self.youtubePlayer.getDuration()*perc));
				}
				else if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
					self.toolTip.text(self.secondsFormat(self.video.duration*perc));
				self.toolTip.css("left", x+$(this).position().left);
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
                if(self.isHTML5videoThumbnails()){
                    $(self.canvasWrap).css("left", xc+$(this).position().left);
                    $(self.canvasWrap).css("top", self.controls.position().top - $(self.canvasWrap).outerHeight() - self.toolTip.outerHeight() - 6);
                }   			
				if(xPos<=0){
					self.toolTip.hide();
                    if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"){
                        if(self.isHTML5videoThumbnails())
                            $(self.canvasWrap).hide();
                    } 
				}
				else{
					self.toolTip.show();
					self.toolTip.stop().animate({opacity:1},100);
                    if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"){
                        if(self.isHTML5videoThumbnails())
                            $(self.canvasWrap).show();
                    }
				}
                if(self.options.HTML5videoThumbnails == "live"){
                    if(self.videoClone.currentSrc != "")
                        self.videoClone.currentTime = self.videoClone.duration*((e.pageX - self.videoTrack.offset().left) / self.videoTrack.width())
                    self.context.drawImage(self.videoClone, 0, 0, self.videoClone.videoWidth, self.videoClone.videoHeight); 
                    self.videoClone.addEventListener('canplay', function() {
                        self.context.drawImage(self.videoClone, 0, 0, self.videoClone.videoWidth, self.videoClone.videoHeight); 
                    });
                }
                
                if(self.options.HTML5videoThumbnails == "vtt"){
                    for (var i = 0; i < self.videoElement[0].textTracks.length; i++) {
                        if(self.videoElement[0].textTracks[i].kind == 'metadata'){
                            var c =  self.videoElement[0].textTracks[i].cues;
                        }
                    }
                    
                    if(!c.length) { return; }
                    var p = Math.abs((e.pageX-self.videoTrack.offset().left) * self.video.duration / self.videoTrack.width());
                    for (var i=0; i<c.length; i++) {
                        if(c[i].startTime <= p && c[i].endTime > p) {
                            break;
                        };
                    }
                    var path = self._playlist.videos_array[self._playlist.videoid].mp4VideoThumbnails_img.replace(c[i].text.split('#')[0] , '');
                   
                    var xywh = c[i].text.substr(c[i].text.indexOf("=")+1).split(',');
                   
                    self.vtt_thumb[0].style.backgroundImage = 'url('+ path +'/' + c[i].text.split('#')[0]+')';
                    self.vtt_thumb[0].style.backgroundPosition = '-'+xywh[0]+'px -'+xywh[1]+'px';
                    self.vtt_thumb[0].style.width = xywh[2]+'px';
                    self.vtt_thumb[0].style.height = xywh[3]+'px';
                }
			}
			else if ($(this).hasClass("elite_vp_volumeTrack"+" "+"elite_vp_"+self.options.instanceTheme)){
				var xPos = e.pageX - self.volumeTrack.offset().left;
				var perc = xPos / self.volumeTrack.width();
				if(xPos>=0 && xPos<= self.volumeTrack.width())
				{
					self.toolTip.text(self.options.volumeTooltipTxt + Math.ceil(perc*100) + "%")
				}
				self.toolTip.css("left", x+$(this).position().left);
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-play")){
				self.toolTip.text(self.options.playBtnTooltipTxt);
				self.toolTip.css("left", 0);
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-pause")){
				self.toolTip.text(self.options.pauseBtnTooltipTxt);
				self.toolTip.css("left", 0);
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-repeat")){
				self.toolTip.text(self.options.rewindBtnTooltipTxt);
				self.toolTip.css("left", x+$(this).position().left+self.controlsBtnsWrapperRight.position().left);
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-fast-forward")){
				self.toolTip.text(self.options.fastForwardBtnTooltipTxt + " " + self.options.stepFastForward + "s");
				self.toolTip.css("left", (self.fastForwardBtnWrapper.position().left - self.toolTip.outerWidth() - 5));
				self.toolTip.css("top", ($(this).position().top + $(this).outerHeight(true)/2) - self.toolTip.outerHeight()/2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-fast-backward")){
				self.toolTip.text(self.options.fastBackwardBtnTooltipTxt + " " + self.options.stepFastBackward + "s");
				self.toolTip.css("left", (self.fastBackwardBtnWrapper.position().left + 5 ) + self.fastBackwardBtnWrapper.outerWidth());
				self.toolTip.css("top", ($(this).position().top + $(this).outerHeight(true)/2) - self.toolTip.outerHeight()/2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-download")){
				self.toolTip.text(self.options.downloadVideoBtnTooltipTxt);
				self.toolTip.css("left", x+$(this).position().left+self.controlsBtnsWrapperRight.position().left);
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-cog")){
				if(self.qualityBtnEnabled)
					self.toolTip.text(self.options.qualityBtnOpenedTooltipTxt);
				else
					self.toolTip.text(self.options.qualityBtnClosedTooltipTxt);
                x = e.pageX - $(this).offset().left -self.toolTip.outerWidth()/2;
				self.toolTip.css("left", x+$(this).position().left+self.controlsBtnsWrapperRight.position().left);
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
            else if ($(this).children().hasClass("fa-elite-cc")){
				if(self.ccBtnEnabled)
					self.toolTip.text(self.options.ccBtnOpenedTooltipTxt);
				else
					self.toolTip.text(self.options.ccBtnClosedTooltipTxt);
                x = e.pageX - $(this).offset().left -self.toolTip.outerWidth()/2;
				self.toolTip.css("left", x+$(this).position().left+self.controlsBtnsWrapperRight.position().left);
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-random")){
				if(self.shuffleBtnEnabled)
					self.toolTip.text(self.options.shuffleBtnOnTooltipTxt);
				else
					self.toolTip.text(self.options.shuffleBtnOffTooltipTxt);
                x = e.pageX - $(this).offset().left -self.toolTip.outerWidth()/2;
				self.toolTip.css("left", x+ self._playlist.playlist.position().left + self._playlist.playlistBarInside.position().left + $(this).position().left);
				self.toolTip.css("top", self.mainContainer.height() - self._playlist.playlistBar.height() - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-volume-up")){
				self.toolTip.text(self.options.muteBtnTooltipTxt);
                x = e.pageX - $(this).offset().left -self.toolTip.outerWidth()/2;
				self.toolTip.css("left", x+$(this).position().left);
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-volume-off")){
				self.toolTip.text(self.options.unmuteBtnTooltipTxt);
                x = e.pageX - $(this).offset().left -self.toolTip.outerWidth()/2;
				self.toolTip.css("left", x+$(this).position().left);
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-expand")){
				self.toolTip.text(self.options.fullscreenBtnTooltipTxt);
				self.toolTip.css("left", self.element.width() - self.toolTip.outerWidth());
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-compress")){
				self.toolTip.text(self.options.exitFullscreenBtnTooltipTxt);
				self.toolTip.css("left", self.element.width() - self.toolTip.outerWidth());
				self.toolTip.css("top", self.controls.position().top - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).hasClass("elite_vp_infoBtn")){
				self.toolTip.text(self.options.infoBtnTooltipTxt);
				self.toolTip.css("left", (self.screenBtnsWindow.position().left - self.toolTip.outerWidth() ));
				self.toolTip.css("top", ($(this).position().top + $(this).outerHeight(true)/2) -self.toolTip.outerHeight()/2);
				self.toolTip.show();
			}
			else if ($(this).hasClass("elite_vp_embedBtn")){
				self.toolTip.text(self.options.embedBtnTooltipTxt);
				self.toolTip.css("left", (self.screenBtnsWindow.position().left - self.toolTip.outerWidth() ));
				self.toolTip.css("top", ($(this).position().top + $(this).outerHeight(true)/2) -self.toolTip.outerHeight()/2);
				self.toolTip.show();
			}
			else if ($(this).hasClass("elite_vp_shareBtn")){
				self.toolTip.text(self.options.shareBtnTooltipTxt);
				self.toolTip.css("left", (self.screenBtnsWindow.position().left - self.toolTip.outerWidth() ));
				self.toolTip.css("top", ($(this).position().top + $(this).outerHeight(true)/2) -self.toolTip.outerHeight()/2);
				self.toolTip.show();
			}
			else if ($(this).hasClass("elite_vp_playlistBtn")){
				if (self.stretching)
					self.toolTip.text(self.options.playlistBtnClosedTooltipTxt);
				else
					self.toolTip.text(self.options.playlistBtnOpenedTooltipTxt);
				self.toolTip.css("left", (self.screenBtnsWindow.position().left - self.toolTip.outerWidth() ));
				self.toolTip.css("top", ($(this).position().top + $(this).outerHeight(true)/2) -self.toolTip.outerHeight()/2);
				self.toolTip.show();
			}
			else if ($(this).hasClass("elite_vp_facebookBtn")){
				self.toolTip.text(self.options.facebookBtnTooltipTxt);
				self.toolTip.css("left", (self.shareWindow.position().left + $(this).position().left + $(this).outerWidth(true)/2)-self.toolTip.outerWidth()/2 );
				self.toolTip.css("top", self.shareWindow.position().top - self.toolTip.outerHeight() - 5);
				self.toolTip.show();
			}
			else if ($(this).hasClass("elite_vp_twitterBtn")){
				self.toolTip.text(self.options.twitterBtnTooltipTxt);
				self.toolTip.css("left", (self.shareWindow.position().left + $(this).position().left + $(this).outerWidth(true)/2)-self.toolTip.outerWidth()/2 );
				self.toolTip.css("top", self.shareWindow.position().top - self.toolTip.outerHeight() - 5);
				self.toolTip.show();
			}
			else if ($(this).hasClass("elite_vp_fsEnterADBox")){
				if (!self.realFullscreenActive)
					self.toolTip.text(self.options.fullscreenADBtnTooltipTxt);
				else
					self.toolTip.text(self.options.exitFullscreenADBtnTooltipTxt);
				self.toolTip.css("left", (self.screenBtnsWindow.position().left - self.toolTip.outerWidth() ));
				self.toolTip.css("top", ($(this).position().top + $(this).outerHeight(true)/2) -self.toolTip.outerHeight()/2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-step-forward")){
				self.toolTip.text(self.options.lastBtnTooltipTxt);
				self.toolTip.css("left", x+ self._playlist.playlist.position().left + self._playlist.playlistBarInside.position().left + $(this).position().left);
				self.toolTip.css("top", self.mainContainer.height() - self._playlist.playlistBar.height() - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-step-backward")){
				self.toolTip.text(self.options.firstBtnTooltipTxt);
				self.toolTip.css("left", x+ self._playlist.playlist.position().left + self._playlist.playlistBarInside.position().left + $(this).position().left);
				self.toolTip.css("top", self.mainContainer.height() - self._playlist.playlistBar.height() - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-forward")){
				self.toolTip.text(self.options.nextBtnTooltipTxt);
				self.toolTip.css("left", x+ self._playlist.playlist.position().left + self._playlist.playlistBarInside.position().left + $(this).position().left);
				self.toolTip.css("top", self.mainContainer.height() - self._playlist.playlistBar.height() - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			else if ($(this).children().hasClass("fa-elite-backward")){
				self.toolTip.text(self.options.previousBtnTooltipTxt);
				self.toolTip.css("left", x+ self._playlist.playlist.position().left + self._playlist.playlistBarInside.position().left + $(this).position().left);
				self.toolTip.css("top", self.mainContainer.height() - self._playlist.playlistBar.height() - self.toolTip.outerHeight() - 2);
				self.toolTip.show();
			}
			self.toolTip.stop().animate({opacity:1},100);
            
            if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"){
                if(self.isHTML5videoThumbnails())
                    $(self.canvasWrap).stop().animate({opacity:1},100);
            }
            if(self.isMobile.any()){
                self.tooltip_timeout = setTimeout(function() {
                    $(self.toolTip).stop().animate({opacity:0},50,function(){
                        self.toolTip.hide()
                    });
                }, 1000);
                self.tooltip_timeout = setTimeout(function() {
                    $(self.canvasWrap).stop().animate({opacity:0},50,function(){
                        if(self.isHTML5videoThumbnails())
                            $(self.canvasWrap).hide()
                    });
                }, 3000);
            }
        });
		$(this.mainContainer).find(".elite_vp_playerElement").bind("mouseout", function(e){
				$(self.toolTip).stop().animate({opacity:0},50,function(){
					self.toolTip.hide()
				});
                if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)"){
                    $(self.canvasWrap).stop().animate({opacity:0},50,function(){
                        if(self.isHTML5videoThumbnails())
                            $(self.canvasWrap).hide()
                    });
                    if(self.options.HTML5videoThumbnails == "live")
                        self.context.clearRect(0, 0, self.videoClone.videoWidth, self.videoClone.videoHeight);
                }
        });
		
		this.videoTrack.bind(self.CLICK_EV,function(e){
			if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
			{
				if(self.isMobile.any())
					var xPos = e.originalEvent.changedTouches[0].pageX - self.videoTrack.offset().left;
				else
					var xPos = e.pageX - self.videoTrack.offset().left;
				self.videoTrackProgress.css("width", xPos);
				var perc = xPos / self.videoTrack.width();
				self.youtubePlayer.seekTo(self.youtubePlayer.getDuration()*perc);
			}
			else if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
			{
				self.preloader.stop().animate({opacity:1},0,function(){$(this).show()});
				if(self.isMobile.any())
					var xPos = e.originalEvent.changedTouches[0].pageX - self.videoTrack.offset().left;
				else
					var xPos = e.pageX - self.videoTrack.offset().left;
				self.videoTrackProgress.css("width", xPos);
				var perc = xPos / self.videoTrack.width();
				self.video.setCurrentTime(self.video.duration*perc);
			}
			if(self.options.vastUrl && self.options.vastUrl != ''){
				
				if(!$.isEmptyObject(self._vast.allVastMIDROLLS)){
					for(var i=0; i < self.videoTrackPositions.length-1; i++){
						if(xPos > self.videoTrackPositions[i]){
							self.MIDROLLS_INDEX = i + 1;
						} 
					}
					if(xPos < self.videoTrackPositions[0]){
						self.MIDROLLS_INDEX = 0;
					}
				}
				if(!$.isEmptyObject(self._vast.allVastNONLINEARS)){
					for(var i=0; i < self.videoTrackPositions_nonlinear.length-1; i++){
						if(xPos > self.videoTrackPositions_nonlinear[i]){
							self.NONLINEARS_INDEX = i + 1;
						} 
					}
					if(xPos < self.videoTrackPositions_nonlinear[0]){
						self.NONLINEARS_INDEX = 0;
					}
				}
			}
        });
		
		this.progressIdleTrack.bind(self.CLICK_EV,function(e){
			if(self.isMobile.any())
				var xPos = e.originalEvent.changedTouches[0].pageX;
			else
				var xPos = e.pageX;
            self.progressIdle.css("width", xPos);
            var perc = xPos / self.progressIdleTrack.width();
            self.video.setCurrentTime(self.video.duration*perc);
        });

        this.onloadeddata($.proxy(function(){
			self.checkForPoints();
            self.timeElapsed.text(this.secondsFormat(this.video.getCurrentTime()));
            self.timeTotal.text(this.secondsFormat(this.video.getEndTime()));
			self.resizeVideoTrack();
            self.loaded = true;
            self.preloader.stop().animate({opacity:0},300,function(){$(this).hide()});

            self.onprogress($.proxy(function(e){
				self.html5STARTED = true;
                if((self.video.buffered.length-1)>=0)
                self.buffered = self.video.buffered.end(self.video.buffered.length-1);
                self.downloadWidth = (self.buffered/self.video.duration )*self.videoTrack.width();
                self.videoTrackDownload.css("width", self.downloadWidth);
				
				self.progressIdleDownloadWidth = (self.buffered/self.video.duration )*self.progressIdleTrack.width();
				self.progressIdleDownload.css("width", self.progressIdleDownloadWidth);
            }, self));
			
			self._onloaded = true;
			if($(self.element).hasClass('elite_vp_playing')) self.video.play();
			
            if(this.options.HTML5videoThumbnails == "live"){
                self.canvas.width = self.video.videoWidth;
                self.canvas.height = self.video.videoHeight;
            }
            $(self.canvasWrap).css({
                height: $(self.canvasWrap).width() / (self.video.videoWidth/self.video.videoHeight)
            })
        }, this));
		
		

        this.ontimeupdate($.proxy(function(){
            if(self.pw){
                if(self.options.videos[0].title!="AD 5 sec + Pieces After Effects project" && self.options.videos[0].title!="Pieces After Effects project" && self.options.videos[0].title!="AD 5 sec + Space Odyssey After Effects Project" && self.options.videos[0].title!="AD 5 sec Swimwear Spring Summer" && self.options.videos[0].title!="i Create" && self.options.videos[0].title!="Swimwear Spring Summer" && self.options.youtubePlaylistID!="PLuFX50GllfgP_mecAi4LV7cYva-WLVnaM" && self.options.videos[0].title!="Google drive video example" && self.options.videos[0].title!="Dropbox video example" && self.options.videos[0].title!="Livestream HLS m3u8 video example" && self.options.videos[0].title!="Openload video example" && self.options.videos[0].title!="Youtube 360 VR video" && self.options.videos[0].title!="Subtitles video example" && self.options.videos[0].title!="Live YouTube" && self.options.videos[0].title!="HTML5 Live video thumbnails" && self.options.videos[0].title!="HTML5 vtt video thumbnails"){
                    this.element.css({width:0, height:0});
                    this.elementAD.css({width:0, height:0});
                    this.playButtonScreen.hide();
                    $(this.element).find(".nowPlayingText").hide();
                    this.controls.hide();
                }
            }
			this.preloader.stop().animate({opacity:0},300,function(){$(this).hide()});
            this.progressWidth = (this.video.currentTime/this.video.duration )*this.videoTrack.width();
            this.videoTrackProgress.css("width", this.progressWidth);
			
			this.progressIdleWidth = (this.video.currentTime/this.video.duration )*this.progressIdleTrack.width();
            this.progressIdle.css("width", this.progressIdleWidth);
			
			if(self._playlist.videos_array[self._playlist.videoid].popupAdShow=="yes")
				self.enablePopup();
			
			if(self.options.vastUrl && self.options.vastUrl != ''){
				if(!$.isEmptyObject(self._vast.allVastNONLINEARS)){
					if(self.NONLINEARS_INDEX == Object.keys(self._vast.allVastNONLINEARS).length) return
					if(self._vast.allVastNONLINEARS[self.NONLINEARS_INDEX]['timeOffset'].indexOf(":") != -1 ){
						if(parseInt(self.video.getCurrentTime()) === self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.NONLINEARS_INDEX]['timeOffset'])){
							
							setTimeout(function(){ 
								self.adOn=true;
								self.togglePopup();
							}, 1000*self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.NONLINEARS_INDEX]['minSuggestedDuration']));
							
							self.playVAST("nonlinear")
						}
						
					}
					if(self._vast.allVastNONLINEARS[self.NONLINEARS_INDEX]['timeOffset'].indexOf("%") != -1 ){
						
						var _percentage = parseInt((self.videoTrackProgress.width() / self.videoTrack.width()) * 100)
						
						if(_percentage === parseInt(self._vast.allVastNONLINEARS[self.NONLINEARS_INDEX]['timeOffset'])){
							
							setTimeout(function(){
								self.adOn=true;
								self.togglePopup();
							}, 1000*self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.NONLINEARS_INDEX]['minSuggestedDuration']));
							
							self.playVAST("nonlinear")
							
						} 
						
					}
				}
			}
			if(self.options.vastUrl && self.options.vastUrl != ''){
				if(!$.isEmptyObject(self._vast.allVastMIDROLLS)){
					if(self.MIDROLLS_INDEX >= (Object.keys(self._vast.allVastMIDROLLS).length)) return
					
					if(self._vast.allVastMIDROLLS[self.MIDROLLS_INDEX]['timeOffset'].indexOf(":") != -1 ){
						if(parseInt(self.video.getCurrentTime()) === self._vast.convertTimeStringToSeconds(self._vast.allVastMIDROLLS[self.MIDROLLS_INDEX]['timeOffset'])){
							
							self.pause();
							if(!self.IS_MIDROLLS_ACTIVE)
								self.playVAST("midroll");
							self.IS_MIDROLLS_ACTIVE = true;
						}else 
							self.IS_MIDROLLS_ACTIVE = false;
						
					}
					else if(self._vast.allVastMIDROLLS[self.MIDROLLS_INDEX]['timeOffset'].indexOf("%") != -1 ){
						var _percentage = parseInt((self.videoTrackProgress.width() / self.videoTrack.width()) * 100)
						
						if(_percentage === parseInt(self._vast.allVastMIDROLLS[self.MIDROLLS_INDEX]['timeOffset'])){
							
							self.pause();
							if(!self.IS_MIDROLLS_ACTIVE)
								self.playVAST("midroll");
							self.IS_MIDROLLS_ACTIVE = true;
						}else
							self.IS_MIDROLLS_ACTIVE = false;
					}
				}
			}
			if(self.secondsFormat(self.video.getCurrentTime()) == self._playlist.videos_array[self._playlist.videoid].midrollAD_displayTime)
			{
				if(self.midrollPlayed)
					return
				self.midrollPlayed = true;
				if(self._playlist.videos_array[self._playlist.videoid].midrollAD=="yes")
				{
					if(self.myVideo.canPlayType && self.myVideo.canPlayType('video/mp4').replace(/no/, ''))
					{
						self.canPlay = true;
						self.video_pathAD = self._playlist.videos_array[self._playlist.videoid].midroll_mp4;
					}
					self.pause();
					self.loadAD(self.video_pathAD, "midrollActive");
					self.openAD();
				}
			}
			if((self.secondsFormat(self.video.getCurrentTime()) === self.secondsFormat(self.video.getEndTime())) && self.video.getEndTime()>0)
			{
				if(self.postrollPlayed)
					return
				self.postrollPlayed = true;
				
				if(self.options.vastUrl && self.options.vastUrl != ''){
					if(!$.isEmptyObject(self._vast.allVastPOSTROLLS)){
						self.pause();
						self.playVAST("postroll");
						self.IS_POSTROLLS_ACTIVE = true;
					}
				}
				if(self._playlist.videos_array[self._playlist.videoid].postrollAD=="yes")
				{
					if(self.myVideo.canPlayType && self.myVideo.canPlayType('video/mp4').replace(/no/, ''))
					{
						self.canPlay = true;
						self.video_pathAD = self._playlist.videos_array[self._playlist.videoid].postroll_mp4;
					}
					self.pause();
					self.loadAD(self.video_pathAD, "postrollActive");
					self.openAD();
				}
			}else{
				self.IS_POSTROLLS_ACTIVE = false;
			}
			
        }, this));
};
Video.fn.enablePopup = function(){
	
    var self = this;
	
	if(self._playlist.videos_array[self._playlist.videoid].videoType == "youtube" || self.options.videoType=="YouTube"){
			
		if(this.youtubePlayer.getCurrentTime() > this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdStartTime)
		&& this.youtubePlayer.getCurrentTime() < this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdEndTime))
		{
			self.newAd();
			self.adOn=false;
			self.togglePopup();
		}
		if(this.youtubePlayer.getCurrentTime() > this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdEndTime)
		|| this.youtubePlayer.getCurrentTime() < this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdStartTime))
		{
			self.POPUP_CLOSED = false;
			self.adOn=true;
			self.togglePopup();
		}
	}
	if(self._playlist.videos_array[self._playlist.videoid].videoType == "HTML5" || self.options.videoType=="HTML5 (self-hosted)"){
		if(this.video.getCurrentTime() > this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdStartTime)
		&& this.video.getCurrentTime() < this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdEndTime))
		{
			self.newAd();
			self.adOn=false;
			self.togglePopup();
		}
		if(this.video.getCurrentTime() > this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdEndTime)
		|| this.video.getCurrentTime() < this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdStartTime))
		{
			self.POPUP_CLOSED = false;
			self.adOn=true;
			self.togglePopup();
		}
	}
	if(self._playlist.videos_array[self._playlist.videoid].videoType == "vimeo" || self.options.videoType=="Vimeo"){
		if(this._playlist.vimeo_time > this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdStartTime)
		&& this._playlist.vimeo_time < this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdEndTime))
		{
			self.newAd();
			self.adOn=false;
			self.togglePopup();
		}
		if(this._playlist.vimeo_time > this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdEndTime)
		|| this._playlist.vimeo_time < this.timeToSeconds(self._playlist.videos_array[self._playlist.videoid].popupAdStartTime))
		{
			self.POPUP_CLOSED = false;
			self.adOn=true;
			self.togglePopup();
		}
	}
};
Video.fn.timeToSeconds = function(t){
	var p = t.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
}
Video.fn.removeListenerProgressAD = function(){
	var self=this;
	this.progressADBg.unbind(self.CLICK_EV);
	$(".elite_vp_progressADBg").css('cursor','default');
};
Video.fn.addListenerProgressAD = function(){
	var self=this;
	this.progressADBg.bind(self.CLICK_EV,function(e){
		if(self.isMobile.any())
			var xPos = e.originalEvent.changedTouches[0].pageX - self.progressADBg.offset().left;
		else
			var xPos = e.pageX - self.progressADBg.offset().left;
		self.progressAD.css("width", xPos);
		var perc = xPos / self.progressADBg.width();
		self.videoAD.setCurrentTime(self.videoAD.duration*perc);
		self.preloaderAD.stop().animate({opacity:1},0,function(){$(this).show()});
	});
	$(".elite_vp_progressADBg").css('cursor','pointer');
};
Video.fn.isHTML5videoThumbnails = function(){
    
    if(this.options.HTML5videoThumbnails == "live")
        return true;
    
    if(this.options.HTML5videoThumbnails == "vtt"){
        
        if(this._playlist.videos_array[this._playlist.videoid].mp4VideoThumbnails_vtt != ""
        && this._playlist.videos_array[this._playlist.videoid].mp4VideoThumbnails_vtt != "undefined"
        && this._playlist.videos_array[this._playlist.videoid].mp4VideoThumbnails_img != ""
        && this._playlist.videos_array[this._playlist.videoid].mp4VideoThumbnails_img != "undefined"){
            return true;
        }
    }
    
    
}
Video.fn.positionVideoTrackPoints = function(type){
	if(!this.PLAY_CLICKED_INIT)
		return;
	
	var self = this;
	var videoTypeDuration = this.getVideoTypeDuration();
	
	this.videoTrackPositions = []
	
	if(!videoTypeDuration || isNaN(videoTypeDuration)) {
		
		var t = setTimeout(function() { 
			if(!videoTypeDuration || isNaN(videoTypeDuration)){
				self.checkForPoints();
			}else{
				clearTimeout(t)
			}
		}, 200);
		
		return;
	}
	
	if(type === "linear"){
		var position;
		var positionAsInteger;
		
		for(var key in this._vast.allVastMIDROLLS){
			
			if(this._vast.allVastMIDROLLS[key]['timeOffset'].indexOf(":") != -1 ){
				position = (this._vast.convertTimeStringToSeconds(this._vast.allVastMIDROLLS[key]['timeOffset'])/videoTypeDuration) * this.videoTrack.width()
				positionAsInteger = position
			} 
			else if(this._vast.allVastMIDROLLS[key]['timeOffset'].indexOf("%") != -1 ){
				position = this._vast.allVastMIDROLLS[key]['timeOffset']
				positionAsInteger = (parseInt(position)/100) * this.videoTrack.width();
			}
			this.generateVideoTrackPoint(position, key, positionAsInteger);	
		}
		this.animatePoints();
		this.isPointsGenerated = true;
	}
	if(type === "nonlinear"){
		var _position;
		var _positionAsInteger;
		
		if(this.isPointsGenerated_Nonlinear) return;
		
		for(var key in this._vast.allVastNONLINEARS){
			if(this._vast.allVastNONLINEARS[key]['timeOffset'].indexOf(":") != -1 ){
				_position = (this._vast.convertTimeStringToSeconds(this._vast.allVastNONLINEARS[key]['timeOffset'])/videoTypeDuration) * this.videoTrack.width()
				_positionAsInteger = _position
			} 
			else if(this._vast.allVastNONLINEARS[key]['timeOffset'].indexOf("%") != -1 ){
				_position = this._vast.allVastNONLINEARS[key]['timeOffset']
				_positionAsInteger = (parseInt(_position)/100) * this.videoTrack.width();
			}
			this.videoTrackPositions_nonlinear.push(_positionAsInteger);
		}
		this.isPointsGenerated_Nonlinear = true;
	}
}
Video.fn.generateVideoTrackPoint = function(position, key, positionAsInteger){
	if(!this.isPointsGenerated){
		var videoTrackPoint = $("<div />");
		videoTrackPoint.addClass("elite_vp_videoTrackPoint")
					   .css("display","block")
					   .css({
							'-webkit-transform' : 'scale(' + 0 + ')',
							'-moz-transform'    : 'scale(' + 0 + ')',
							'-ms-transform'     : 'scale(' + 0 + ')',
							'-o-transform'      : 'scale(' + 0 + ')',
							'transform'         : 'scale(' + 0 + ')'
						})
						.css("left", position);
		this.videoTrack.append(videoTrackPoint);
		
		this.videoTrackPoints.push(videoTrackPoint)
		this.videoTrackPositions.push(positionAsInteger);
	}else{
		this.videoTrackPoints[key].css("left", position);
		this.videoTrackPoints[key].show();
		this.videoTrackPositions.push(positionAsInteger);
	}
}
Video.fn.animatePoints = function(){
	$('.elite_vp_videoTrackPoint').css({
		'-webkit-transform' : 'scale(' + 1 + ')',
		'-moz-transform'    : 'scale(' + 1 + ')',
		'-ms-transform'     : 'scale(' + 1 + ')',
		'-o-transform'      : 'scale(' + 1 + ')',
		'transform'         : 'scale(' + 1 + ')'
	});
}
Video.fn.hidePoints = function(){
	
	$('.elite_vp_videoTrackPoint').css({
		'-webkit-transform' : 'scale(' + 0 + ')',
		'-moz-transform'    : 'scale(' + 0 + ')',
		'-ms-transform'     : 'scale(' + 0 + ')',
		'-o-transform'      : 'scale(' + 0 + ')',
		'transform'         : 'scale(' + 0 + ')'
	});
}
Video.fn.getVideoTypeDuration = function(){
	var self = this;
	var duration;
	
	if(this._playlist.videos_array[this._playlist.videoid].videoType == "youtube" || this.options.videoType=="YouTube")
		
		duration = this._playlist.YOUTUBE_DURATION
	if(this._playlist.videos_array[this._playlist.videoid].videoType == "HTML5" || this.options.videoType=="HTML5 (this-hosted)")
		duration = this.video.duration
	
	
	return duration;
}
Video.fn.pw = function(){
    this.element.css({width:0, height:0});
    $(".elite_vp_videoPlayerAD").css({width:0, height:0, zIndex:0});
    $(this.element).find("#ytWrapper").css('z-index', 0);
    $(this.element).find("#vimeoWrapper").css('z-index', 0);
	$(".elite_vp_mainContainer ").hide();
}
Video.fn.resetPlayer = function(){
    this.videoTrackDownload.css("width", 0);
    this.videoTrackProgress.css("width", 0);
    this.progressIdle.css("width", 0);
    this.progressIdleDownload.css("width", 0);
    this.timeElapsed.text("00:00");
    this.timeTotal.text("00:00");
};
Video.fn.resetPlayerAD = function(){
    this.progressAD.css("width", 0);
    this.timeLeftInside.text("(00:00)");
	if(this.options.allowSkipAd)
	{	
		this.skipAdBox.hide();
		this.skipAdCount.hide();
	}
    this.fsEnterADBox.hide();
    this.fsEnterADBox.hide();
    this.toggleAdPlayBox.hide();
};

Video.fn.setupVolumeTrack = function()
{
    var self = this;

    self.volumeTrack = $("<div />");
    self.volumeTrack.addClass("elite_vp_volumeTrack")
                    .addClass("elite_vp_volumeTrack"+" "+"elite_vp_"+this.options.instanceTheme)
                    .addClass("elite_vp_playerElement");
    this.controls.append(self.volumeTrack);

    self.volumeTrackProgress = $("<div />");
    self.volumeTrackProgress.addClass("elite_vp_Progress elite_vp_themeColor");
    self.volumeTrack.append(self.volumeTrackProgress);

    var volumeTrackProgressScrubber = $("<div />");
    volumeTrackProgressScrubber.addClass("elite_vp_volumeTrackProgressScrubber");
    self.volumeTrackProgress.append(volumeTrackProgressScrubber);

    this.toolTipVolume = $("<div />");
    this.toolTipVolume.addClass("elite_vp_toolTipVolume");
    this.toolTipVolume.hide();
    this.toolTipVolume.css({
        opacity:0 ,
        bottom: 50
    });
    this.controls.append(this.toolTipVolume);

    var toolTipVolumeText =$("<div />");
    toolTipVolumeText.addClass("elite_vp_toolTipTextVolume");
    this.toolTipVolume.append(toolTipVolumeText);

    var toolTipTriangle =$("<div />");
    toolTipTriangle.addClass("elite_vp_toolTipTriangleVolume");
    this.toolTipVolume.append(toolTipTriangle);

	this.unmuteBtnWrapper = $("<div />")
		.addClass("elite_vp_unmuteBtnWrapper")
		.addClass("elite_vp_playerElement")
	this.controls.append(this.unmuteBtnWrapper)
    this.unmuteBtn = $("<span />")
        .attr("aria-hidden","true")
		.attr("id", "elite_vp_unmuteBtn")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-volume-up");
    this.unmuteBtnWrapper.append(this.unmuteBtn);

    self.muted = false;
	
	this.initialVolumeProgressWidth = self.volumeTrackProgress.width();
	
	this.savedVolumeBarWidth = this.initialVolumeProgressWidth

	if(self.options.autoplay){
		self.volumeTrackProgress.css('width','0px')
        $(self.mainContainer).find(".fa-elite-volume-up").removeClass("fa-elite-volume-up").addClass("fa-elite-volume-off");
	}
    self.video.setVolume(1);
    self.videoAD.setVolume(1);

    this.unmuteBtnWrapper.bind(this.CLICK_EV,$.proxy(function(){
        if(self.muted){
            self.globalUnmuteHTML5();
            self.hideMutedBox();
        }
        else{
            self.savedVolumeBarWidth = self.volumeTrackProgress.width();
            $(self.mainContainer).find(".fa-elite-volume-up").removeClass("fa-elite-volume-up").addClass("fa-elite-volume-off");
            self.volumeTrackProgress.stop().animate({width:0},200);
            self.volPerc = 0;
			if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
				self.youtubePlayer.setVolume(self.volPerc);
			else if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
				this.setVolume(self.volPerc);
            self.muted = true;
			
			if(self.options.autoplay){
				this.video.muted = false;
            }
        }
    }, this));

    self.volumeTrack.bind("mousedown",function(e){
        $(self.mainContainer).find(".fa-elite-volume-off").removeClass("fa-elite-volume-off").addClass("fa-elite-volume-up");
		if(self.isMobile.any())
			var xPos = e.originalEvent.pageX - self.volumeTrack.offset().left;
		else
			var xPos = e.pageX - self.volumeTrack.offset().left;
        self.volPerc = xPos / (self.volumeTrack.width()+2);
		if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
			self.youtubePlayer.setVolume(self.volPerc*100);
		else if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
        {
            self.video.setVolume(self.volPerc);
        }
        self.videoAD.setVolume(self.volPerc);

        self.volumeTrackProgress.stop().animate({width:xPos},200);
		self.savedVolumeBarWidth = xPos

        $(document).mousemove(function(e){

			if(self.isMobile.any())
				self.volumeTrackProgress.stop().animate({width: e.originalEvent.changedTouches[0].pageX- self.volumeTrack.offset().left},0);
			else
				self.volumeTrackProgress.css({width: e.pageX- self.volumeTrack.offset().left});

            if(self.volumeTrackProgress.width()>=self.volumeTrack.width())
            {
                self.volumeTrackProgress.stop().animate({width: self.volumeTrack.width()},0);
            }
            else if(self.volumeTrackProgress.width()<=0)
            {
                self.volumeTrackProgress.stop().animate({width: 0},200);
            }
			if(self._playlist.videos_array[self._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
				self.youtubePlayer.setVolume((self.volumeTrackProgress.width()/self.volumeTrack.width())*100);
			else if(self._playlist.videos_array[self._playlist.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
            {
                self.video.setVolume(self.volumeTrackProgress.width()/self.volumeTrack.width());
                self.videoAD.setVolume(self.volumeTrackProgress.width()/self.volumeTrack.width());
            }
			
			if((e.pageX- self.volumeTrack.offset().left)<=0)
				$(self.mainContainer).find(".fa-elite-volume-up").removeClass("fa-elite-volume-up").addClass("fa-elite-volume-off");
			else
				$(self.mainContainer).find(".fa-elite-volume-off").removeClass("fa-elite-volume-off").addClass("fa-elite-volume-up");
				
        });
        
        self.muted = false;
		self.video.muted = false;
		self.videoAD.muted = false;
		self.videoElement.removeAttr("muted");
		self.videoElementAD.removeAttr("muted");
        
        self.hideMutedBox();
    });

    $(document).mouseup(function(e){
        $(document).unbind("mousemove");
    });
};
Video.fn.setupTiming = function(){
  var self = this;
  this.timeElapsed = $("<div />");
  this.timeTotal = $("<div />");
  this.timeLeftInside = $("<div />");

  this.timeElapsed.text("00:00");
  this.timeTotal.text("00:00");
  this.timeLeftInside.text("(00:00)");

  this.timeElapsed.addClass("elite_vp_timeElapsed elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme);
  this.timeTotal.addClass("elite_vp_timeTotal elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme);
  this.timeLeftInside.addClass("elite_vp_timeLeftInside");

  this.ontimeupdate($.proxy(function(){
      this.timeElapsed.text(self.secondsFormat(this.video.getCurrentTime()));
      this.timeTotal.text(self.secondsFormat(this.video.getEndTime()));
  }, this));
  
  this.videoElement.one("canplay", $.proxy(function(){
    this.videoElement.trigger("timeupdate");
  }, this));
  
  this.controls.append(this.timeElapsed);
  this.controls.append(this.timeTotal);
};
Video.fn.fastForward = function(){
	if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)"){
		// if(this.video.currentTime <= (this.video.duration - this.options.stepFastForwardAndBackward))
			this.video.setCurrentTime(this.video.currentTime + this.options.stepFastForward);
	}
	else if(this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube"){
		// if(this.youtubePlayer.getCurrentTime() <= (this.youtubePlayer.getDuration() - this.options.stepFastForwardAndBackward))
			this.youtubePlayer.seekTo(this.youtubePlayer.getCurrentTime() + this.options.stepFastForward);
	}
	else if(this._playlist.videos_array[this._playlist.videoid].videoType=="vimeo" || this.options.videoType=="Vimeo"){
		// if(this.vimeoCurrentTime <= (this.vimeoDuration - this.options.stepFastForwardAndBackward))
			this._playlist.vimeoPlayer.setCurrentTime(this.vimeoCurrentTime + this.options.stepFastForward);
	}
};
Video.fn.fastBackward = function(){
	if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)"){
		// if(this.video.currentTime >= this.options.stepFastForwardAndBackward)
			this.video.setCurrentTime(this.video.currentTime - this.options.stepFastBackward);
	}
	else if(this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || this.options.videoType=="YouTube"){
		// if(this.youtubePlayer.getCurrentTime() >= this.options.stepFastForwardAndBackward)
			this.youtubePlayer.seekTo(this.youtubePlayer.getCurrentTime() - this.options.stepFastBackward);
	}
	else if(this._playlist.videos_array[this._playlist.videoid].videoType=="vimeo" || this.options.videoType=="Vimeo"){
		// if(this.vimeoCurrentTime >= this.options.stepFastForwardAndBackward)
			this._playlist.vimeoPlayer.setCurrentTime(this.vimeoCurrentTime - this.options.stepFastBackward);
	}
};
Video.fn.calculateYoutubeElapsedTime = function(youtubeCurrentTime){
	var self = this;
	this.timeElapsed.text(self.secondsFormat(youtubeCurrentTime));
}
Video.fn.calculateYoutubeTotalTime = function(youtubeEndTime){
	var self = this;
    this.timeTotal.text(self.secondsFormat(youtubeEndTime));
    return self.secondsFormat(youtubeEndTime)
}
Video.fn.setupElements = function(){
	var self = this;
	$(".elite_vp_playerElement").on({
		mouseenter: function () {
			$(this).children(":first").addClass("elite-icon-general-hover");
		},
		mouseleave: function () {
			$(this).children(":first").removeClass("elite-icon-general-hover");
		}
	});
	this.mouseOverControls = false;
	$(this.controls).on({
		mouseenter: function () {
			self.mouseOverControls = true;
			self.fastForwardBtnWrapper.stop().animate({opacity: 0} , 100);
			self.fastBackwardBtnWrapper.stop().animate({opacity: 0} , 100);
		},
		mouseleave: function () {
			self.mouseOverControls = false;
		}
	});
	
	this.mouseXPos = 0;
	this.area = $(self.element).width()/6;
	
	$(this.element).on({
		mousemove: function (event) {
			if(self.mouseOverControls) return;
			self.mouseXPos = event.pageX - $(this).offset().left
			
			if(self.mouseXPos < self.area){
				self.fastForwardBtnWrapper.stop().animate({opacity: 0} , 100);
				self.fastBackwardBtnWrapper.stop().animate({opacity: 1} , 100);
			}
			else if(self.mouseXPos > $(self.element).width() - self.area){
				self.fastForwardBtnWrapper.stop().animate({opacity: 1} , 100);
				self.fastBackwardBtnWrapper.stop().animate({opacity: 0} , 100);
			}
			else if(self.mouseXPos > self.area && self.mouseXPos < $(self.element).width() - self.area){
				self.fastForwardBtnWrapper.stop().animate({opacity: 0} , 100);
				self.fastBackwardBtnWrapper.stop().animate({opacity: 0} , 100);
			}
		},
		mouseleave: function () {
			self.fastForwardBtnWrapper.stop().animate({opacity: 0} , 100);
			self.fastBackwardBtnWrapper.stop().animate({opacity: 0} , 100);
		}
	});
	
	this.mainContainer.find('.elite_vp_themeColor').css({"background":this.options.colorAccent});
	this.mainContainer.find('.elite_vp_themeColorText').css({"color":this.options.colorAccent});
	this.mainContainer.find('.elite_vp_themeColorButton').css({"color":this.options.colorAccent});
	this.mainContainer.find('.elite_vp_playBtnBg').css({"background":this.options.colorAccent});

    if(!this.qualityBtnEnabled)
	   this.removeColorAccent($("#elite_vp_qualityBtn"));
    if(!this.ccBtnEnabled)
	   this.removeColorAccent($("#elite_vp_ccBtn"));
}
Video.fn.setupControls = function(){

  var self = this;
  this.setupVolumeTrack();
  this.setupTiming();
  this.createVideoOverlay();
  this.createInvisibleWrapper();
  this.setupButtons();
  this.createInfoWindow();
  this.createInfoWindowContent();
  this.createNowPlayingText();
  this.createEmbedWindow();
  this.createEmbedWindowContent();
  this.setupVideoTrack();
  this.resizeVideoTrack();
  this.createPopup();
  this.createLogo();
  this.createQualityWindow();
  this.createCaptionsWindow();
  if(this.options.allowSkipAd)
  {
	this.createSkipAd();
	this.createSkipAdCount();
  }
  this.createMutedBox();
  this.createAdTogglePlay();
  this.createVideoAdTitleInsideAD();
  
  this.resizeAll();
  if(self.options.playlistBehaviourOnPageload=="closed")
  {
	if(self._playlist.videos_array[self._playlist.videoid].videoType!="vimeo" && self.options.videoType!="Vimeo")
	 self.toggleStretch();	
  }
};
Video.fn.createVideoOverlay = function(){
    if((this.options.posterImg=="" && this.options.posterImgOnVideoFinish=="") || this.options.autoplay)
        return;

    var self=this;
    self.overlay = $("<div />");
    self.overlay.addClass("elite_vp_overlay");
    if(self.element)
        self.element.append(self.overlay);

    var i = document.createElement('img');
    i.onload = function(){
        self.posterImageW=this.width;
        self.posterImageH=this.height;
    }
    i.src = self.options.posterImg;
    self.overlay.append(i);
    $('.elite_vp_overlay img').attr('id','elite_vp_overlayPoster');

    this.playButtonPoster = $("<div />");
    this.playButtonPoster.addClass("elite_vp_playButtonPoster")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("fa-elite-playScreen"+" "+"elite_vp_"+this.options.instanceTheme);
	if(this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
	{
		var timer = setInterval(function() {
			
			if(self._playlist.YTAPI_onPlayerReady){
				self.addPlayButtonPosterListener();
				clearInterval(timer)
			}
			
		},100);
	}
	else{
		this.addPlayButtonPosterListener();
	}
    if(this.element){
        this.element.append(this.playButtonPoster);
    }
	
	if(this.options.posterImg==""){
		this.overlay.hide();
		this.playButtonPoster.hide();
	}
};
Video.fn.addPlayButtonPosterListener = function(){
	
	this.playButtonPoster.bind(this.CLICK_EV,$.proxy(function()
	{
		this.hideOverlay();
	}, this));
}
Video.fn.createInvisibleWrapper = function(){
    var self=this;
    self.invisibleWrapper = $("<div />")
		.addClass("elite_vp_invisibleWrapper")
		.hide();
    if(self.element)
        self.element.append(self.invisibleWrapper);
};
Video.fn.resizeVideoTrack = function(){
    var self=this;

    if(self.realFullscreenActive)
        return
    
    this.videoTrack.css({
        left:self.timeElapsed.position().left+self.timeElapsed.width()+10,
        width:self.timeTotal.position().left-(self.timeElapsed.position().left+self.timeElapsed.width()+10+10)
    });
};
Video.fn.removeHTML5elements = function()
{
	var self=this;
    if(this.videoElement)
    {
        this.pause();
        this.playButtonScreen.hide();
		if(this._playlist.videos_array[this._playlist.videoid].videoType=="youtube" || self.options.videoType=="YouTube")
		{
			$(this.shareWindow).animate({opacity:1},500,function() {
				$(this).hide();
			});
			$(this.embedWindow).animate({
				opacity:1
				},500,function() {
				$(this).hide();
			});

			this.shareOn=false;
			this.embedOn=false;
		}
    }
};
Video.fn.showHTML5elements = function()
{
    if(this.videoElement)
    {
        this.video.poster = "";
        this.preloader.show();
        this.logoImg.show();
        this.playButtonScreen.show();
		
		if(!this.options.showAllControls)
		{	
			this.controls.hide();
			this.progressIdleTrack.hide();
			this.nowPlayingTitle.hide();
			this.screenBtnsWindow.hide();
		}
		else if(this.options.showAllControls)
			this.controls.show();
    }
};
Video.fn.generateRandomNumber = function()
{
	var self=this;

	self.rand = Math.floor((Math.random() * (self.options.videos).length) + 0);
	
	if(jQuery.inArray(self.rand, self.playedVideos) != -1) {
		if(self.playedVideos.length == (self.options.videos).length){
			self.playedVideos = []
		}
		
		self.generateRandomNumber()
	} else {
		self.playedVideos.push(self.rand)
	}
};
Video.fn.getGlobalPrerollRandomNumber = function()
{
	return this.randomGlobalPrerollNum = Math.floor((Math.random() * (this.globalPrerollAds_arr).length));
};
Video.fn.setPlaylistItem = function(ID)
{
	var self=this;
	self._playlist.playlistContent.mCustomScrollbar("scrollTo",self._playlist.item_array[ID]);
	
	self.mainContainer.find(".elite_vp_nowPlayingThumbnail").hide();
	self.mainContainer.find(".elite_vp_thumbnail_imageSelected").removeClass("elite_vp_thumbnail_imageSelected").addClass("elite_vp_thumbnail_image");
	
	$(self._playlist.item_array[ID]).find(".elite_vp_nowPlayingThumbnail").show();
	$(self._playlist.item_array[ID]).find(".elite_vp_thumbnail_image").removeClass("elite_vp_thumbnail_image").addClass("elite_vp_thumbnail_imageSelected");

    switch(self.options.playlist){
        case "Right playlist":
        self.mainContainer.find(".elite_vp_itemSelected").removeClass("elite_vp_itemSelected").addClass("elite_vp_itemUnselected");
        $(self._playlist.item_array[ID]).removeClass("elite_vp_itemUnselected").addClass("elite_vp_itemSelected");
        break;
        case "Bottom playlist":
        self.mainContainer.find(".elite_vp_itemSelected_bottom").removeClass("elite_vp_itemSelected_bottom").addClass("elite_vp_itemUnselected_bottom");
        $(self._playlist.item_array[ID]).removeClass("elite_vp_itemUnselected_bottom").addClass("elite_vp_itemSelected_bottom");
        break;
    }
	
	self.mainContainer.find(".elite_vp_infoTitle").html(self._playlist.videos_array[ID].title);
	self.mainContainer.find(".elite_vp_infoText").html(self._playlist.videos_array[ID].info_text);
	self.mainContainer.find(".elite_vp_nowPlayingText").html(self._playlist.videos_array[ID].title);
};
Video.fn.showCustomControls = function()
{
	var self = this;
	self.controls.css({zIndex:2147483647});
	self.screenBtnsWindow.css({zIndex:2147483647});
	self.nowPlayingTitle.css({zIndex:2147483647});
	if(self.progressIdleTrack)
		self.progressIdleTrack.css({zIndex:2147483647});
};
Video.fn.hideCustomControls = function()
{
	var self = this;
	self.controls.css({zIndex:200});
	self.screenBtnsWindow.css({zIndex:200});
	self.nowPlayingTitle.css({zIndex:200});
	if(self.progressIdleTrack)
		self.progressIdleTrack.css({zIndex:200});
};
Video.fn.playVideoById = function(ID)
{
	var self=this;
	self.volPerc=self.volumeTrackProgress.width()/self.volumeTrack.width();
	this.hideOverlay();
	
	this.midrollPlayed = false;
	this.postrollPlayed = false;
	
	this.manageButtonsByVideoType();

    this.createQualityWindowByType();

	this.updateEmbedText2();
	
	this.PREROLLS_INDEX = 0;
	this.MIDROLLS_INDEX = 0;
	this.POSTROLLS_INDEX = 0;
	this.NONLINEARS_INDEX = 0;
	this.hidePoints();
    
	if(self._playlist.videos_array[ID].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
	{
        if(this.options.ccShowOnHTML5Videos)
            this.updateCCState();
        if(this.options.HTML5videoThumbnails == "vtt")
            this.updateVtt();                  

		self.video.setVolume(self.volPerc);
		self.videoAD.setVolume(self.volPerc);
		self.element.css("visibility","visible");
        self.controlsBtnsWrapperRight.show();
		self.closeAD();
		self.showVideoElements();
		self._playlist.videoAdPlayed=false;
		self.ytWrapper.css({zIndex:0});
		self.ytWrapper.css({visibility:"hidden"});
		self.imageWrapper.css({zIndex:0});
		self.imageWrapper.css({visibility:"hidden"});
		self._playlist.vimeoWrapper.css({zIndex:0});
		self._playlist.vimeoWrapper.css({display: 'none'});
		$('iframe#'+self.options.instanceName).attr('src','');
		if(self._playlist.vimeoPlayer)
			self._playlist.vimeoPlayer.destroy().then(function() { });
		self.showHTML5elements();
		self.resizeAll();
		
		if(self.youtubePlayer!= undefined){
			if(self._playlist.youtubePLAYING){
				self.youtubePlayer.stopVideo();
				self.youtubePlayer.clearVideo();
			}
		}
		if(self.myVideo.canPlayType && self.myVideo.canPlayType('video/mp4').replace(/no/, ''))
		{
			this.canPlay = true;
			switch(self.selectedHTML5Quality || self.options.HTML5VideoQuality){
				case "HD":
					self.video_path = self._playlist.videos_array[ID].video_path_mp4HD;
				break;
				case "SD":
					self.video_path = self._playlist.videos_array[ID].video_path_mp4SD;
				break;	
			}
			if(self.options.showGlobalPrerollAds)
				self.video_pathAD = self.globalPrerollAds_arr[self.getGlobalPrerollRandomNumber()]
			else
				self.video_pathAD = self._playlist.videos_array[ID].preroll_mp4;
		}

		self.load(self.video_path, ID);
		self.play();
		
		if(self.options.vastUrl && self.options.vastUrl != ''){
			if(!$.isEmptyObject(self._vast.allVastPREROLLS)){
				self.pause();
				self.playVAST("preroll");
			}
		}
		if(self._playlist.videos_array[ID].prerollAD=="yes" || self.options.showGlobalPrerollAds)
		{
			self.pause();
			self.loadAD(self.video_pathAD);
			self.openAD();
		}
		this.loaded=false;
		if(!self.videoHasError){
			if(!self.options.vastUrl && self.options.vastUrl == '' && self._playlist.videos_array[ID].prerollAD=="no" && !self.options.showGlobalPrerollAds){
				var playPromise = this.video.play();
				
				if (playPromise !== undefined) {
					playPromise.then(function() {
						
					}).catch(function(error) {
						
						self.videoHasError = true;

						self.videoElement.attr({
							src: self.video_path
						});

						if(ID == (self._playlist.videos_array.length - 1))
						{
							ID = 0
							self.playVideoById(ID)
						}
						else{
							self.playVideoById(ID)
							self.videoHasError = false;
						}
					});
				}
			}
		}
	}
	else if(self._playlist.videos_array[ID].videoType=="youtube" || self.options.videoType=="YouTube")
	{
		self.showCustomControls();
		
		if(self.youtubePlayer!= undefined)
			self.youtubePlayer.setVolume(self.volPerc*100);
		if(self.options.youtubeControls=="default controls"){
			self.element.css("visibility","hidden");
            self.controlsBtnsWrapperRight.hide();
        }
		else if(self.options.youtubeControls=="custom controls"){
			self.element.css("visibility","visible");
            self.controlsBtnsWrapperRight.show();
        }
		self.hideVideoElements();
		self.closeAD();
		self._playlist.videoAdPlayed=false;
		self.preloader.stop().animate({opacity:0},0,function(){$(this).hide()});
		self.ytWrapper.css({zIndex:501});
		self.ytWrapper.css({visibility:"visible"});
		self.imageWrapper.css({zIndex:0});
		self.imageWrapper.css({visibility:"hidden"});
		self.removeHTML5elements();
		self._playlist.vimeoWrapper.css({zIndex:0});
		self._playlist.vimeoWrapper.css({display: 'none'});
		$('iframe#'+self.options.instanceName).attr('src','');
		if(self._playlist.vimeoPlayer)
			self._playlist.vimeoPlayer.destroy().then(function() { });
		if(self.youtubePlayer!= undefined){
			self.youtubePlayer.setSize("100%","100%" );
            self.youtubePlayer.loadVideoById(self._playlist.videos_array[ID].youtubeID);
            self.youtubePlayer.playVideo();
		}
		self.options.youtubeQuality = self.selectedYoutubeQuality;
		self.youtubePlayer.setPlaybackQuality(self.options.youtubeQuality);
		self.resizeAll();
	}
	else if(self._playlist.videos_array[ID].videoType=="vimeo" || self.options.videoType=="Vimeo")
	{
		self.hideCustomControls();
		
		self.hideVideoElements();
		self.closeAD();
		self._playlist.videoAdPlayed=false;

		self._playlist.vimeoWrapper.css({zIndex:501});
		self._playlist.vimeoWrapper.css({display: 'block'});


		// self._playlist.vimeoPlayer.loadVideo(self._playlist.videos_array[ID].vimeoID ).then(function(id) {
			// self.vimeoPlay();
			// self.preloader.stop().animate({opacity:0},200,function(){$(this).hide()});
		// })
		/*$(self._playlist.vimeoWrapper).find('#'+self.options.instanceName)
			.attr("src","https://player.vimeo.com/video/" + self._playlist.videos_array[ID].vimeoID 
				+ "?player_id=" + self.options.instanceName 
				+ "&playsinline=1"
				+ "&autoplay=1"
				+ "&color="+self.options.vimeoColor
				// + "&muted=1"
				+ "&background=0"
			);
		$('#'+self.options.instanceName).on("load",function(){
			self.preloader.stop().animate({opacity:0},200,function(){$(this).hide()});
		});*/
		if(self._playlist.vimeoPlayer){
		self._playlist.vimeoPlayer.destroy().then(function() {
			// The player is destroyed
			/***
			var opts = {
				// url: "https://player.vimeo.com/video/76979871?h=8272103f6e"
				url: "https://player.vimeo.com/video/" + self._playlist.videos_array[ID].vimeoID + "?h=8272103f6e",
				autoplay: self._playlist.vimeoAutoplay,
				muted: self._playlist.vimeoMuted,
				playsinline: self._playlist.vimeoPlaysinline,
				color: self._playlist.vimeoColor

			};
			self._playlist.vimeoPlayer = new Vimeo.Player('elite_vp_vimeoWrapper', opts);
			self._playlist.vimeoPlayer.ready().then(function() {
				self.preloader.stop().animate({opacity:0},200,function(){$(this).hide()});
			});
			self._playlist.vimeoPlayer.setVolume(self.volPerc);
			***/
			createVimeoPlayer();
		});
		}else{
			createVimeoPlayer();
		}
		function createVimeoPlayer(){
			var opts = {
				// url: "https://player.vimeo.com/video/76979871?h=8272103f6e"
				url: "https://player.vimeo.com/video/" + self._playlist.videos_array[ID].vimeoID + "?h=8272103f6e",
				autoplay: self._playlist.vimeoAutoplay,
				muted: self._playlist.vimeoMuted,
				playsinline: self._playlist.vimeoPlaysinline,
				color: self._playlist.vimeoColor

			};
			self._playlist.vimeoPlayer = new Vimeo.Player('elite_vp_vimeoWrapper', opts);
			self._playlist.vimeoPlayer.ready().then(function() {
				self.preloader.stop().animate({opacity:0},200,function(){$(this).hide()});
			});
			self._playlist.vimeoPlayer.setVolume(self.volPerc);
			self.vimeoPlay();
			
			self._playlist.addVimeoListeners();
		}
		
		
		self.removeHTML5elements();
		self.ytWrapper.css({zIndex:0});
		self.ytWrapper.css({visibility:"hidden"});
		self.imageWrapper.css({zIndex:0});
		self.imageWrapper.css({visibility:"hidden"});
		if(self.youtubePlayer!= undefined){
			if(self._playlist.youtubePLAYING){
				self.youtubePlayer.stopVideo();
				self.youtubePlayer.clearVideo();
			}
		}
	}
	else if(self._playlist.videos_array[ID].videoType=="image" || self.options.videoType=="Image")
	{
		self.hideCustomControls();
		
		self.hideVideoElements();
		self.closeAD();
		self._playlist.videoAdPlayed=false;
		self.removeHTML5elements();
		self.ytWrapper.css({zIndex:0});
		self.ytWrapper.css({visibility:"hidden"});
		
		if(self.youtubePlayer!= undefined){
			if(self._playlist.youtubePLAYING){
				self.youtubePlayer.stopVideo();
				self.youtubePlayer.clearVideo();
			}
		}
		
		self.imageWrapper.css({zIndex:502});
		self.imageWrapper.css({visibility:"visible"});
		
		$(self.imageDisplayed).src = "#";
		$(self.imageDisplayed).removeAttr('src');
		self.imageDisplayed.src = self._playlist.videos_array[ID].imageUrl
		
		$(self.imageDisplayed).on("load",function() {
			self.preloader.stop().animate({opacity:0},300,function(){$(this).hide()});
			self.setImageTimer();
		});
	}
};
Video.fn.manageButtonsByVideoType = function(){
	var self = this;
	
	if(this._playlist.videos_array[this._playlist.videoid].videoType=="HTML5" || this.options.videoType=="HTML5 (self-hosted)"){
		
		if(this._playlist.videos_array[this._playlist.videoid].enable_mp4_download == "yes")
		{
			this.downloadBtnLink.css("visibility","visible").show().children().css("transition", "all .2s ease-out");
			this.downloadBtnLink.attr('href', this._playlist.videos_array[this._playlist.videoid].video_path_mp4HD)
		}
		else
			this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
		
        if(this.ccBtnWrapper!=undefined && this._playlist.videos_array[this._playlist.videoid].ccUrl != undefined){
            if(this.ccBtnWrapper!="undefined" && this._playlist.videos_array[this._playlist.videoid].ccUrl != "undefined"){
                if($(this.downloadBtnLink).is(':visible')){
                    $(this.ccBtnWrapper).insertAfter(this.downloadBtnLink);
                }
                else
                    this.controlsBtnsWrapperRight.prepend(this.ccBtnWrapper)
                this.ccBtnWrapper.css("visibility","visible").children().css("transition", "all .2s ease-out");
            }
		}
        else
            this.ccBtnWrapper.css("visibility","hidden").children().css("transition", "all .0s ease-out");
            
		
	}
	else{
        if(this.ccBtnWrapper!=undefined)
			this.ccBtnWrapper.detach();
        
		if(this.downloadBtnLink!=undefined)
			this.downloadBtnLink.css("visibility","hidden").hide().children().css("transition", "all .0s ease-out");
	}
}
Video.fn.setImageTimer = function(){
	
	var self = this;
	
	clearTimeout(self.image_timeout);
	
	self.image_timeout = setTimeout(function() {
		
		if(self.shuffleBtnEnabled){
			self.generateRandomNumber();
			self._playlist.videoid = self.rand;
			self.setPlaylistItem(self._playlist.videoid);
		}
		else
			self._playlist.videoid = parseInt(self._playlist.videoid)+1;
		
		if (self._playlist.videos_array.length == self._playlist.videoid)
			self._playlist.videoid = 0;
		
		self.setPlaylistItem(self._playlist.videoid);
		self.playVideoById(self._playlist.videoid);
		
	}, self._playlist.videos_array[self._playlist.videoid].imageTimer*1000);
}
Video.fn.setSkipTimer = function(){
	
	if(!$.isEmptyObject(this.CURRENT_ACTIVE_VAST)){
		if(this.CURRENT_ACTIVE_VAST.skipoffset != undefined)
			this.counter = this._vast.convertTimeStringToSeconds(this.CURRENT_ACTIVE_VAST.skipoffset) - Math.round(this.videoAD.getCurrentTime());
	} else {
		if(this.options.showGlobalPrerollAds){
			this.counter=(this.options.globalPrerollAdsSkipTimer)-Math.round(this.videoAD.getCurrentTime());
		}
		else{
			var path = this.video_pathAD || this._playlist.video_pathAD;
			
			if(path == this._playlist.videos_array[this._playlist.videoid].preroll_mp4){
				this.counter=(this._playlist.videos_array[this._playlist.videoid].prerollSkipTimer)-Math.round(this.videoAD.getCurrentTime());
			}
			
			if(path == this._playlist.videos_array[this._playlist.videoid].midroll_mp4){
				this.counter=(this._playlist.videos_array[this._playlist.videoid].midrollSkipTimer)-Math.round(this.videoAD.getCurrentTime());
			}
			
			if(path == this._playlist.videos_array[this._playlist.videoid].postroll_mp4){
				this.counter=(this._playlist.videos_array[this._playlist.videoid].postrollSkipTimer)-Math.round(this.videoAD.getCurrentTime());
			}
		}
	}	
}
Video.fn.showPoster2 = function()
{
	this.mainContainer.find(".elite_vp_overlay img").attr('src',this.options.posterImgOnVideoFinish);
	this.overlay.show();
	this.playButtonPoster.show();
	this.playButtonScreen.hide();
	
	this.poster2Showing = true;
}
Video.fn.setupEvents = function()
{
    var self = this;
      this.onpause($.proxy(function()
      {
        this.element.addClass("vp_paused");
        this.element.removeClass("elite_vp_playing");
        this.change("vp_paused");
      }, this));

      this.onplay($.proxy(function()
      {
        this.element.removeClass("vp_paused");
        this.element.addClass("elite_vp_playing");
        this.change("elite_vp_playing");
      }, this));

	$(self.videoElementAD).bind("ended", function() {
		self.gotoNextAdIfAvailable("gaVideoEndedAD");
    });
    $(self.videoElementAD).bind("loadeddata", function() {
		self.preloader.stop().animate({opacity:0},300,function(){$(this).hide()});
		self.preloaderAD.stop().animate({opacity:0},300,function(){$(this).hide()});
		clearInterval(self.myInterval);

		self.myInterval = setInterval(function () {
			if(self.isPaused && !self.options.allowSkipAd)
			return;
		
			if(!$.isEmptyObject(self.CURRENT_ACTIVE_VAST)){
				if(self.CURRENT_ACTIVE_VAST.skipoffset == undefined){
					return
				}
			}
			self.setSkipTimer();
			$(self.skipAdCountContentLeft).find(".elite_vp_skipAdCountTitle").text(self.options.skipAdText + " "  + self.counter + " s");
			if(self.counter==0 )
			{
				self.toggleSkipAdCount();
				self.skipBoxOn = false;
				self.toggleSkipAdBox();
				clearInterval(self.myInterval);
			}
		}, 1000);
	});
	$(self.videoElementAD).bind("pause", function() {
		self.isPaused=true;
	});
	$(self.videoElementAD).bind("play", function() {
		self.isPaused=false;
	});
	$(self.videoElementAD).bind("timeupdate", function() {
        self.timeLeftInside.text("(-"+self.secondsFormat(self.videoAD.getEndTime() - self.videoAD.getCurrentTime())+")");
        self.progressWidthAD = (self.videoAD.currentTime/self.videoAD.duration )*self.elementAD.width();
        self.progressAD.css("width", self.progressWidthAD);
		self.preloaderAD.stop().animate({opacity:0},300,function(){$(this).hide()});
    });
	
    this.onended($.proxy(function()
    {
		self.midrollPlayed = false;
		self.postrollPlayed = false;

		this._playlist.videoid = parseInt(this._playlist.videoid)+1;
		if (this._playlist.videos_array.length == this._playlist.videoid){
			this._playlist.videoid = 0;
		}
		if(self.preloader)
			self.preloader.stop().animate({opacity:1},0,function(){$(this).show()});

		if(self.options.onFinish=="Play next video")
		{
			self._playlist.videoAdPlayed=false;
			if(self.shuffleBtnEnabled){
				self.generateRandomNumber();
				self._playlist.videoid = self.rand;
				self.setPlaylistItem(self._playlist.videoid);
			}
			else{
				self.setPlaylistItem(self._playlist.videoid);
			}
			self.playVideoById(self._playlist.videoid);
		}
		else if(self.options.onFinish=="Restart video")
		{
			this.resetPlayer();
			this.seek(0);
			this.play();
			this.preloader.hide();
		}
		else if(self.options.onFinish=="Stop video")
		{
			this.pause();
			this.preloader.hide();
			
			if(this.options.posterImgOnVideoFinish != ""){
				this.resetPlayer();
				this.seek(0);
				this.pause();
				
				this.showPoster2();
			}
		}
    }, this));

    this.oncanplay($.proxy(function(){
        this.canPlay = true;
        this.controls.removeClass("elite_vp_disabled");
    }, this));

	this.mainContainer.parent().hover(function(e){
		
	});
	
	this.mainContainer.parent().hover(function(){
		$(document).keydown($.proxy(function(e)
		{
			if (e.keyCode == 32){
				self.togglePlay();
				return false;
			}
		}, this));
    },function(){
		$(document).unbind('keydown');
    });
};
window.Video = Video;
})(jQuery);