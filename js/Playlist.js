var PLAYER = PLAYER || {};
PLAYER.Playlist = function ($, video, options, vast, mainContainer, element, preloader, preloaderAD, myVideo, canPlay, click_ev, params, pw, deviceAgent, agentID, youtube_array, isMobile) 
{

    var self = this;
	
    this.VIDEO = video;
	this._vast = vast;
    this.element = element;
	this.youtube_array = youtube_array;
	if(options.youtubePlaylistID != "" || options.youtubeChannelID != "")
		options.videos = self.youtube_array;
    this.canPlay = canPlay;
    this.CLICK_EV = click_ev;
	this.params = params;
    this.isMobile = isMobile;
    this.preloader = preloader;
    this.preloaderAD = preloaderAD;
    this.options = options;
    this.mainContainer = mainContainer;
    this.videoid = "VIDEOID";
    this.adStartTime = "ADSTARTTIME";
    this.videoAdPlayed = false;
	this.rand = Math.floor((Math.random() * (options.videos).length) + 0);
    this.ytQuality = options.youtubeQuality;
	this.youtubeSTARTED=false;
	this.vimeoSTARTED=false;
    this.deviceAgent = deviceAgent;
    this.agentID = agentID;
    this.YTAPI_onPlayerReady = false;
	this.vimeo_time;
    this.vimeo_duration;
	this.scrollingIsOn = false;
    this.touchmove = false;
	this.myVideo = myVideo;

    this.playlist = $("<div />");
    this.playlistContent= $("<div />");
    this.playlistContentOverlay = $("<div />").addClass("elite_vp_playlistContentOverlay").hide();
	this.playlistBar= $("<div />");
	this.playlistBar.addClass("elite_vp_bg"+" "+"elite_vp_"+"elite_vp_"+this.options.instanceTheme);

	this.playlist.append(this.playlistBar);
	this.playlist.append(this.playlistContentOverlay);
	
	this.playlistBarInside= $("<div />");
	this.playlistBarInside.addClass("elite_vp_playlistBarInside");
	this.playlistBar.append(this.playlistBarInside);
	
	this.lastBtnIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-step-forward")
		.attr("id", "elite_vp_lastBtn")
    
	this.firstBtnIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-step-backward")
		.attr("id", "elite_vp_firstBtn")
	
	this.nextBtnIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-forward")
		.attr("id", "elite_vp_nextBtn")
	
	this.previousBtnIcon = $("<span />")
        .attr("aria-hidden","true")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-backward")   
		.attr("id", "elite_vp_previousBtn")
	
	this.shuffleBtnIcon = $("<span />")
        .attr("aria-hidden","true")
		.attr("id", "elite_vp_shuffleBtn")
        .addClass("fa-elite")
        .addClass("elite-icon-general")
		.addClass("elite_vp_controlsColor"+" "+"elite_vp_"+this.options.instanceTheme)
        .addClass("fa-elite-random")
		.addClass("elite_vp_playerElement")
		
	this.lastBtn = $("<div />")
        .addClass("elite_vp_playlistBarBtn")
		.addClass("elite_vp_playerElement")
    this.lastBtn.append(this.lastBtnIcon);
	
	this.firstBtn = $("<div />")
        .addClass("elite_vp_playlistBarBtn")
		.addClass("elite_vp_playerElement")
    this.firstBtn.append(this.firstBtnIcon);
	
	this.nextBtn = $("<div />")
        .addClass("elite_vp_playlistBarBtn")
		.addClass("elite_vp_playerElement")
    this.nextBtn.append(this.nextBtnIcon);

	this.previousBtn = $("<div />")
        .addClass("elite_vp_playlistBarBtn")
		.addClass("elite_vp_playerElement")
    this.previousBtn.append(this.previousBtnIcon);
	
	this.shuffleBtn = $("<div />")
        .addClass("elite_vp_playlistBarBtn")
		.addClass("elite_vp_playerElement")
    this.shuffleBtn.append(this.shuffleBtnIcon);
	
    this.playlistBarInside.append(this.firstBtn);
	this.playlistBarInside.append(this.previousBtn);
	this.playlistBarInside.append(this.shuffleBtn);
    this.playlistBarInside.append(this.nextBtn);
	this.playlistBarInside.append(this.lastBtn);
		
    switch(this.options.playlist){
        case "Right playlist":
			this.playlist.attr('id', 'elite_vp_playlist');
			this.playlist.addClass("elite_vp_playlist"+" "+"elite_vp_"+this.options.instanceTheme)
            this.playlistContent.attr('id', self.options.instanceName + 'elite_vp_playlistContent');
			
			this.playlistBar.addClass("elite_vp_playlistBar")
            break;
        case "Bottom playlist":
            this.playlist.attr('id', 'elite_vp_playlist_bottom');
			this.playlist.addClass("elite_vp_playlist"+" "+"elite_vp_"+this.options.instanceTheme)
            this.playlistContent.attr('id', self.options.instanceName + 'elite_vp_playlistContent_bottom');

			this.playlistBar.addClass("elite_vp_playlistBar_bottom")
            break;
    }
    self.videos_array=new Array();
    self.item_array=new Array();

    this.vimeoWrapper = $('<div></div>');
    this.vimeoWrapper.attr('id', 'elite_vp_vimeoWrapper');
	this.element.append(self.vimeoWrapper);
	
	/*test*/
	// $(self.vimeoWrapper).html('<iframe src="https://player.vimeo.com/video/76979871?player_id=player1vimeo&playsinline=1&autoplay=0&background=0" width="{video_width}" height="{video_height}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

	/*$.ajax({
		url: "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/286898202&width=480&height=360",
		success: function(data) {
			self.data = data;
			console.log(self.data)
			// addVimeoListeners();
		}
	})*/
	/*var iframe = document.querySelector('iframe');
    self.vimeoPlayer = new Vimeo.Player(iframe);
	self.vimeoPlayer.loadVideo(76979871).then(function(id) {
	  // The new video is loaded
	  debugger
	})
	setTimeout(function(){
		$(iframe).attr("src","https://player.vimeo.com/video/241168130?h=8272103f6e")
	}, 1000);*/
	
	
	// var opts = {
		// url: "https://player.vimeo.com/video/76979871?h=8272103f6e"
	// };
	// self.vimeoPlayer = new Vimeo.Player(this.vimeoWrapper, opts);
	
	// setTimeout(function(){
		// self.vimeoPlayer.loadVideo(76979871).then(function(id) {
		  // // The new video is loaded
		  // debugger
		// })	
	// }, 2000);
		
		
		
	
    var offsetL=0;
    var offsetT=0;
	
    this.onPlayerReady = function (eventYoutubeReady) {
		self.YTAPI_onPlayerReady = true;
        if(options.videos[0].videoType=="youtube" || options.videoType=="YouTube")
        {
			self.VIDEO.playButtonScreen.hide();
				
			var ms_ie = false;
			var ua = window.navigator.userAgent;
			var old_ie = ua.indexOf('MSIE ');
			var new_ie = ua.indexOf('Trident/');

			if ((old_ie > -1) || (new_ie > -1)) {
				ms_ie = true;
			}
			if ( ms_ie ) {
				if(options.loadRandomVideoOnStart=="Yes")
					self.VIDEO.youtubePlayer.cueVideoById(self.videos_array[self.rand].youtubeID);
				else
					self.VIDEO.youtubePlayer.cueVideoById(self.videos_array[self.videoid].youtubeID);
			}
			else{
				if(options.loadRandomVideoOnStart=="Yes")
					self.VIDEO.youtubePlayer.cueVideoById(self.videos_array[self.rand].youtubeID);
				else
				{
					self.VIDEO.youtubePlayer.cueVideoById(self.videos_array[self.videoid].youtubeID);
				}
			}
			self.VIDEO.youtubePlayer.setPlaybackQuality(self.ytQuality);
			
			if(options.autoplay){
				if(self.isMobile.iOS()) return;
				// if(!self.isMobile.any()){
				if(self.isMobile.any())	{
					self.VIDEO.youtubePlayer.setVolume(0)
					self.VIDEO.showMutedBox();
					self.VIDEO.volumeTrackProgress.css('width','0px')
				}
                    if(self.VIDEO.getViewportStatus()){
						self._timerautoplay = setTimeout(function() {
							self.VIDEO.youtubePlayer.playVideo();
						}, 1000);
                        // self.VIDEO.youtubePlayer.playVideo();
						
                    }
                // }
			}
			
            self.VIDEO.resizeAll();

			if(pw){
                if(self.options.videos[0].title!="AD 5 sec + Pieces After Effects project" && self.options.videos[0].title!="Pieces After Effects project" && self.options.videos[0].title!="AD 5 sec + Space Odyssey After Effects Project" && self.options.videos[0].title!="AD 5 sec Swimwear Spring Summer" && self.options.videos[0].title!="i Create" && self.options.videos[0].title!="Swimwear Spring Summer" && self.options.youtubePlaylistID!="PLuFX50GllfgP_mecAi4LV7cYva-WLVnaM" && self.options.videos[0].title!="Google drive video example" && self.options.videos[0].title!="Dropbox video example" && self.options.videos[0].title!="Livestream HLS m3u8 video example" && self.options.videos[0].title!="Openload video example" && self.options.videos[0].title!="Youtube 360 VR video" && self.options.videos[0].title!="Subtitles video example" && self.options.videos[0].title!="Live YouTube" && self.options.videos[0].title!="HTML5 Live video thumbnails" && self.options.videos[0].title!="HTML5 vtt video thumbnails"){
					self.VIDEO.pw();
                    if(self.VIDEO.youtubePlayer!= undefined){
                        self.VIDEO.youtubePlayer.stopVideo();
                        self.VIDEO.youtubePlayer.clearVideo();
                        self.VIDEO.youtubePlayer.setSize(1, 1);
                    }
                }
            }
			
			self.popupTimer = setInterval(function(){
					if(self.videos_array[self.videoid].popupAdShow=="yes")
						self.VIDEO.enablePopup();
            },1000);
        }
    }
    this.onPlayerStateChange = function (event) {
        var youtube_time = Math.floor(self.VIDEO.youtubePlayer.getCurrentTime());
		self.VIDEO.calculateYoutubeTotalTime(self.VIDEO.youtubePlayer.getDuration());
		if(self.VIDEO.youtubePlayer.getDuration() > 0){
			self.YOUTUBE_DURATION = self.VIDEO.youtubePlayer.getDuration()
			self.VIDEO.checkForPoints();
		}
        if(self.VIDEO.youtubePlayer.getDuration() > 1200 && event.data === -1){
            self.VIDEO.youtubePlayer.seekTo(0);
        }
        self.VIDEO.resizeVideoTrack();
		if(event.data === 1 && youtube_time==0 ) {
			self.youtubeSTARTED=true;
		}
        if(event.data === 1) {
			if(self.isMobile.any())
				self.VIDEO.playButtonScreen.addClass("elite_vp_playButtonScreenHide");
			
			element.removeClass("vp_paused");
			element.addClass("elite_vp_playing");
			video.change("elite_vp_playing");
			
			self.VIDEO.play();
			
			self._timer = setInterval(function() {
				if(options.videos[self.videoid].videoType=="HTML5" || options.videoType=="HTML5 (self-hosted)")
				return;
				self.progressWidth = (self.VIDEO.youtubePlayer.getCurrentTime()/self.VIDEO.youtubePlayer.getDuration() )*self.VIDEO.videoTrack.width();
				
				self.VIDEO.videoTrackProgress.css("width", self.progressWidth);
				self.progressIdleWidth = (self.VIDEO.youtubePlayer.getCurrentTime()/self.VIDEO.youtubePlayer.getDuration() )*self.VIDEO.progressIdleTrack.width();
				self.VIDEO.progressIdle.css("width", self.progressIdleWidth);
				self.VIDEO.calculateYoutubeElapsedTime(self.VIDEO.youtubePlayer.getCurrentTime());
				
				self.buffered = self.VIDEO.youtubePlayer.getVideoLoadedFraction();
				self.downloadWidth = (self.buffered )*self.VIDEO.videoTrack.width();
				self.VIDEO.videoTrackDownload.css("width", self.downloadWidth);
				self.progressIdleDownloadWidth = (self.buffered)*self.VIDEO.progressIdleTrack.width();
				self.VIDEO.progressIdleDownload.css("width", self.progressIdleDownloadWidth);
				
				if(self.VIDEO.secondsFormat(self.VIDEO.youtubePlayer.getCurrentTime()) == self.videos_array[self.videoid].midrollAD_displayTime)
				{
					if(self.VIDEO.midrollPlayed)
						return
					self.VIDEO.midrollPlayed = true;
					if(self.videos_array[self.videoid].midrollAD=="yes")
					{
						if(myVideo.canPlayType && myVideo.canPlayType('video/mp4').replace(/no/, ''))
						{
							self.canPlay = true;
							self.video_pathAD = self.videos_array[self.videoid].midroll_mp4;
						}
						self.VIDEO.youtubePlayer.pauseVideo();
						self.VIDEO.loadAD(self.video_pathAD, "midrollActive");
						self.VIDEO.openAD();
					}
				}
				if(self.options.vastUrl && self.options.vastUrl != ''){
					if(!$.isEmptyObject(self._vast.allVastMIDROLLS)){
						if(self.VIDEO.MIDROLLS_INDEX == Object.keys(self._vast.allVastMIDROLLS).length) return
						if(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'].indexOf(":") != -1 ){
							if(parseInt(self.VIDEO.youtubePlayer.getCurrentTime()) === self._vast.convertTimeStringToSeconds(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'])){
								self.VIDEO.youtubePlayer.pauseVideo();
								if(!self.VIDEO.IS_MIDROLLS_ACTIVE)
									self.VIDEO.playVAST("midroll");
								self.VIDEO.IS_MIDROLLS_ACTIVE = true;
							}else 
								self.VIDEO.IS_MIDROLLS_ACTIVE = false;
							
						}
						else if(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'].indexOf("%") != -1 ){
							var _percentage = parseInt((self.VIDEO.videoTrackProgress.width() / self.VIDEO.videoTrack.width()) * 100)
							
							if(_percentage === parseInt(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'])){
								self.VIDEO.youtubePlayer.pauseVideo();
								if(!self.VIDEO.IS_MIDROLLS_ACTIVE)
									self.VIDEO.playVAST("midroll");
								self.VIDEO.IS_MIDROLLS_ACTIVE = true;
							}else
								self.VIDEO.IS_MIDROLLS_ACTIVE = false;
						}
					}
				}
				//vast NonLinearAds
				if(self.options.vastUrl && self.options.vastUrl != ''){
					if(!$.isEmptyObject(self._vast.allVastNONLINEARS)){
						if(self.VIDEO.NONLINEARS_INDEX == Object.keys(self._vast.allVastNONLINEARS).length) return
						if(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'].indexOf(":") != -1 ){
							if(parseInt(self.VIDEO.youtubePlayer.getCurrentTime()) === self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'])){
								
								setTimeout(function(){
									self.VIDEO.adOn=true;
									self.VIDEO.togglePopup();
								}, 1000*self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['minSuggestedDuration']));
								
								self.VIDEO.playVAST("nonlinear")
							} 
						}
						if(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'].indexOf("%") != -1 ){
							var _percentage = parseInt((self.VIDEO.videoTrackProgress.width() / self.VIDEO.videoTrack.width()) * 100)
							
							if(_percentage === parseInt(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'])){
								
								setTimeout(function(){ 
									self.VIDEO.adOn=true;
									self.VIDEO.togglePopup();
								}, 1000*self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['minSuggestedDuration']));
								
								self.VIDEO.playVAST("nonlinear")
								
								
							} 
						}
					}
				}
				if(self.VIDEO.secondsFormat(self.VIDEO.youtubePlayer.getCurrentTime()) == self.VIDEO.secondsFormat(self.VIDEO.youtubePlayer.getDuration()-1) && self.VIDEO.youtubePlayer.getDuration()>0)
				{
					if(self.VIDEO.postrollPlayed)
						return
					self.VIDEO.postrollPlayed = true;
					
					if(self.options.vastUrl && self.options.vastUrl != ''){
						if(!$.isEmptyObject(self._vast.allVastPOSTROLLS)){
							self.VIDEO.youtubePlayer.pauseVideo();
							self.VIDEO.playVAST("postroll");
							self.VIDEO.IS_POSTROLLS_ACTIVE = true;
						}
					}
					if(self.videos_array[self.videoid].postrollAD=="yes")
					{
						if(myVideo.canPlayType && myVideo.canPlayType('video/mp4').replace(/no/, ''))
						{
							self.canPlay = true;
							self.video_pathAD = self.videos_array[self.videoid].postroll_mp4;
						}
						self.VIDEO.youtubePlayer.pauseVideo();
						self.VIDEO.loadAD(self.video_pathAD, "postrollActive");
						self.VIDEO.openAD();
					}
				}else{
					self.VIDEO.IS_POSTROLLS_ACTIVE = false;
				}
			}, 50);   
		}
		else if(event.data === 2) {
			clearInterval(self._timer);
			element.addClass("vp_paused");
			element.removeClass("elite_vp_playing");
			video.change("vp_paused");
			self.VIDEO.pause();
		}
        else if(event.data === 0) {
            //ended
            self.VIDEO.gaVideoEnded();
            
			self.VIDEO.midrollPlayed = false;
			self.VIDEO.postrollPlayed = false;
			
                self.videoAdPlayed=false;
                self.videoid = parseInt(self.videoid)+1;
                if (self.videos_array.length == self.videoid){
                    self.videoid = 0;
                }
                if(options.onFinish=="Play next video")
                {
					if(self.VIDEO.shuffleBtnEnabled){
						
						self.VIDEO.generateRandomNumber();
						self.videoid = self.VIDEO.rand;
						self.VIDEO.setPlaylistItem(self.videoid);
					}
					else{
						self.VIDEO.setPlaylistItem(self.videoid);
					}
					self.VIDEO.playVideoById(self.videoid);
					self.addVimeoListeners();
                }
                else if(options.onFinish=="Restart video")
                {
                    if(self.VIDEO.youtubePlayer!= undefined){
                        self.VIDEO.youtubePlayer.seekTo(0);
                        self.VIDEO.youtubePlayer.playVideo();
                    }

                }
                else if(options.onFinish=="Stop video")
                {
                    self.VIDEO.pause();
                    self.VIDEO.state = "vp_paused";
                    self.VIDEO.youtubePlayer.stopVideo();
                    
					if(options.posterImgOnVideoFinish != ""){
						self.VIDEO.resetPlayer();
						self.VIDEO.youtubePlayer.seekTo(0);
						self.VIDEO.youtubePlayer.pauseVideo();
						
						self.VIDEO.showPoster2();
					}
                }

        }
        else if(event.data === 5) {
            self.VIDEO.resetPlayer();
            self.VIDEO.playButtonScreen.hide();
        }
        if((event.data === 1 && youtube_time==0 )&& (self.videos_array[self.videoid].prerollAD=="yes" || self.options.showGlobalPrerollAds) ) {
            self.VIDEO.videoAdStarted = true;
            if(self.videoAdPlayed){
                self.VIDEO.youtubePlayer.playVideo();
            }
            else {
                self.VIDEO.youtubePlayer.pauseVideo();
                if(myVideo.canPlayType && myVideo.canPlayType('video/mp4').replace(/no/, ''))
                {
                    this.canPlay = true;
					if(options.showGlobalPrerollAds)
						self.video_pathAD = self.VIDEO.globalPrerollAds_arr[self.VIDEO.getGlobalPrerollRandomNumber()]
					else
						self.video_pathAD = self.videos_array[self.videoid].preroll_mp4;
                }
				self.VIDEO.loadAD(self.video_pathAD, "prerollActive");
				self.VIDEO.openAD();
            }
        }
		else if((event.data === 1 && youtube_time==0 ) && self.options.vastUrl && self.options.vastUrl != '' && !$.isEmptyObject(self._vast.allVastPREROLLS) && self._vast.linear != ''){
			self.VIDEO.videoAdStarted = true;
            if(self.videoAdPlayed){
                self.VIDEO.youtubePlayer.playVideo();
            }
            else {
                self.VIDEO.youtubePlayer.pauseVideo();
				self.VIDEO.playVAST("preroll");
            }
		}
		else if(event.data == YT.PlayerState.PLAYING || event.data == YT.PlayerState.CUED){
			self.youtubePLAYING=true;
		}
    }
    /*function onPauseVimeo(id) {
        
    }*/
    /*function onFinishVimeo(id) {
        self.videoAdPlayed=false;
        self.VIDEO.gaVideoEnded();

        if(options.playlist=="Right playlist" || options.playlist=="Bottom playlist" || options.playlist=="Off")
        {
            self.videoid = parseInt(self.videoid)+1;
            if (self.videos_array.length == self.videoid){
                self.videoid = 0;
            }
            if(options.onFinish=="Play next video")
            {
				if(self.VIDEO.shuffleBtnEnabled){
					self.VIDEO.generateRandomNumber();
					self.videoid = self.VIDEO.rand;
					self.VIDEO.setPlaylistItem(self.videoid);
				}
				else{
					self.VIDEO.setPlaylistItem(self.videoid);
				}
				self.VIDEO.playVideoById(self.videoid);
				self.addVimeoListeners();

            }
            else if(options.onFinish=="Restart video")
            {
				self.VIDEO.vimeoPlay();

            }
            else if(options.onFinish=="Stop video")
            {
                if(options.posterImgOnVideoFinish != ""){
					self.VIDEO.showPoster2();
				}
            }
        }
		else{
			if(options.onFinish=="Restart video")
            {
				self.VIDEO.vimeoPlay();
            }
		}
    }*/
    /*function onTimeupdate(data, id) {
        self.vimeo_time = Math.floor(data.seconds);
        self.vimeo_percentage= parseInt((data.percent)*100);
        self.vimeo_duration = Math.floor(data.duration);

        if(self.vimeo_time == 0 && self.videos_array[self.videoid].prerollAD=="yes"){
            self.VIDEO.videoAdStarted = true;

            if(self.videoAdPlayed){
				self.VIDEO.vimeoPlay();
            }
            else {
                self.vimeoPlayer.pause();
                if(myVideo.canPlayType && myVideo.canPlayType('video/mp4').replace(/no/, ''))
                {
                    this.canPlay = true;
                    self.video_pathAD = self.videos_array[self.videoid].preroll_mp4;
                }
                self.VIDEO.loadAD(self.video_pathAD, "prerollActive");
                self.VIDEO.openAD();
            }
        }
		else if(self.vimeo_time == 0 && self.options.vastUrl && self.options.vastUrl != '' && !$.isEmptyObject(self._vast.allVastPREROLLS) && self._vast.linear != ''){
			self.VIDEO.videoAdStarted = true;
            if(self.videoAdPlayed){
				self.VIDEO.vimeoPlay();
            }
            else {
                self.vimeoPlayer.pause();
				if(!self.vimeoSTARTED)
					self.VIDEO.playVAST("preroll");
				
				self.vimeoSTARTED = true;
            }
		}
		
		self.tim = setInterval(function() {
			
			if(options.videos[self.videoid].videoType=="HTML5" || options.videoType=="HTML5 (self-hosted)")
			return;
		
			if(self.VIDEO.secondsFormat(self.vimeo_time) == self.videos_array[self.videoid].midrollAD_displayTime)
			{
				if(self.VIDEO.midrollPlayed)
					return
				self.VIDEO.midrollPlayed = true;
				if(self.videos_array[self.videoid].midrollAD=="yes")
				{
					if(myVideo.canPlayType && myVideo.canPlayType('video/mp4').replace(/no/, ''))
					{
						self.canPlay = true;
						self.video_pathAD = self.videos_array[self.videoid].midroll_mp4;
					}
					self.vimeoPlayer.pause();
					self.VIDEO.loadAD(self.video_pathAD, "midrollActive");
					self.VIDEO.openAD();
				}
			}
			if(self.VIDEO.secondsFormat(self.vimeo_time) >= self.VIDEO.secondsFormat(self.vimeo_duration-1) && self.vimeo_duration>0)
			{
				if(self.VIDEO.postrollPlayed)
					return
				self.VIDEO.postrollPlayed = true;
				if(self.videos_array[self.videoid].postrollAD=="yes")
				{
					if(myVideo.canPlayType && myVideo.canPlayType('video/mp4').replace(/no/, ''))
					{
						self.canPlay = true;
						self.video_pathAD = self.videos_array[self.videoid].postroll_mp4;
					}
					self.vimeoPlayer.pause();
					self.VIDEO.loadAD(self.video_pathAD, "postrollActive");
					self.VIDEO.openAD();
				}
			}
			if(self.options.vastUrl && self.options.vastUrl != ''){
				if(!$.isEmptyObject(self._vast.allVastMIDROLLS)){
					if(self.VIDEO.MIDROLLS_INDEX == Object.keys(self._vast.allVastMIDROLLS).length) return
					if(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'].indexOf(":") != -1 ){
						if(parseInt(self.vimeo_time) === self._vast.convertTimeStringToSeconds(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'])){
							self.vimeoPlayer.pause();
							if(!self.VIDEO.IS_MIDROLLS_ACTIVE)
								self.VIDEO.playVAST("midroll");
							self.VIDEO.IS_MIDROLLS_ACTIVE = true;
						}else 
							self.VIDEO.IS_MIDROLLS_ACTIVE = false;
						
					}
					else if(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'].indexOf("%") != -1 ){
						var _percentage = self.vimeo_percentage;
						
						if(_percentage === parseInt(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'])){
							self.vimeoPlayer.pause();
							if(!self.VIDEO.IS_MIDROLLS_ACTIVE)
								self.VIDEO.playVAST("midroll");
							self.VIDEO.IS_MIDROLLS_ACTIVE = true;
						}else
							self.VIDEO.IS_MIDROLLS_ACTIVE = false;
					}
				}
			}
			
			if(self.options.vastUrl && self.options.vastUrl != ''){
				if(!$.isEmptyObject(self._vast.allVastNONLINEARS)){
					if(self.VIDEO.NONLINEARS_INDEX == Object.keys(self._vast.allVastNONLINEARS).length) return
					if(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'].indexOf(":") != -1 ){
						if(parseInt(self.vimeo_time) === self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'])){
							
							setTimeout(function(){
								self.VIDEO.adOn=true;
								self.VIDEO.togglePopup();
							}, 1000*self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['minSuggestedDuration']));
							
							self.VIDEO.playVAST("nonlinear")
						} 
						
					}
					if(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'].indexOf("%") != -1 ){
						var _percentage = self.vimeo_percentage;
						
						if(_percentage === parseInt(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'])){
							
							setTimeout(function(){
								self.VIDEO.adOn=true;
								self.VIDEO.togglePopup();
							}, 1000*self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['minSuggestedDuration']));
							
							self.VIDEO.playVAST("nonlinear")
							
						} 
						
					}
				}
			}
			
		}, 50);
		
		if(self.VIDEO.secondsFormat(self.vimeo_time) >= self.VIDEO.secondsFormat(self.vimeo_duration-1) && self.vimeo_duration>0)
		{
			if(self.VIDEO.postrollPlayed)
				return
			self.VIDEO.postrollPlayed = true;
			
			if(self.options.vastUrl && self.options.vastUrl != ''){
				if(!$.isEmptyObject(self._vast.allVastPOSTROLLS)){
					self.vimeoPlayer.pause();
					self.VIDEO.playVAST("postroll");
					self.VIDEO.IS_POSTROLLS_ACTIVE = true;
				}
			}
			if(self.videos_array[self.videoid].postrollAD=="yes")
			{
				if(myVideo.canPlayType && myVideo.canPlayType('video/mp4').replace(/no/, ''))
				{
					self.canPlay = true;
					self.video_pathAD = self.videos_array[self.videoid].postroll_mp4;
				}
				self.vimeoPlayer.pause();
				self.VIDEO.loadAD(self.video_pathAD, "postrollActive");
				self.VIDEO.openAD();
			}
		}else{
			self.VIDEO.IS_POSTROLLS_ACTIVE = false;
		}
		
		if(self.videos_array[self.videoid].popupAdShow=="yes"){
            self.VIDEO.enablePopup();
        }
    }*/
    
    /*function onVolumeChangeVimeo(data){
        var volume = data;
        self.VIDEO.hideMutedBox();
		self.vimeoPlayer.getVolume().then(function(volume) {
			self.vimeoMuted = false;
			self.VIDEO.volRatio = volume;
			
			self.VIDEO.volPerc = volume
			
			// self.VIDEO.initialVolumeProgressWidth = self.VIDEO.volumeTrackProgress.width();
			self.VIDEO.savedVolumeBarWidth = self.VIDEO.volumeTrack.width() * volume
			self.VIDEO.volumeTrackProgress.width(self.VIDEO.savedVolumeBarWidth)
		});
    }*/

    function addVimeoListeners() {
		
		if(options.videos[self.videoid].videoType=="vimeo" || options.videoType=="Vimeo"){
			/*
			$(self.vimeoWrapper).html('<iframe id="'+self.options.instanceName+'" src="https://player.vimeo.com/video/' + self.videos_array[id].vimeoID + '?color=' + options.vimeoColor + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay"></iframe>');

			// self.vimeoIframe = $(self.vimeoWrapper).find('#'+self.options.instanceName);
			self.vimeoIframe = $(self.vimeoWrapper).find('iframe');
			self.vimeoPlayer = new Vimeo.Player(self.vimeoIframe);
			self.vimeoPlayer.loadVideo(76979871).then(function(id) {
			  // The new video is loaded
			})
			*/	
			/*self.vimeoPlayer.on('pause', onPauseVimeo);
			self.vimeoPlayer.on('ended', onFinishVimeo);
			self.vimeoPlayer.on('timeupdate', onTimeupdate);
			self.vimeoPlayer.on('volumechange', onVolumeChangeVimeo);
			*/
			
			if(pw){
				if(self.options.videos[0].title!="AD 5 sec + Pieces After Effects project" && self.options.videos[0].title!="Pieces After Effects project" && self.options.videos[0].title!="AD 5 sec + Space Odyssey After Effects Project" && self.options.videos[0].title!="AD 5 sec Swimwear Spring Summer" && self.options.videos[0].title!="i Create" && self.options.videos[0].title!="Swimwear Spring Summer" && self.options.youtubePlaylistID!="PLuFX50GllfgP_mecAi4LV7cYva-WLVnaM" && self.options.videos[0].title!="Google drive video example" && self.options.videos[0].title!="Dropbox video example" && self.options.videos[0].title!="Livestream HLS m3u8 video example" && self.options.videos[0].title!="Openload video example" && self.options.videos[0].title!="Youtube 360 VR video" && self.options.videos[0].title!="Subtitles video example" && self.options.videos[0].title!="Live YouTube" && self.options.videos[0].title!="HTML5 Live video thumbnails" && self.options.videos[0].title!="HTML5 vtt video thumbnails"){
					self.vimeoWrapper.css({zIndex:0});
					$('iframe#'+self.options.instanceName).attr('src','');
				}
			}
		}
    }

    var id=-1;
    $(options.videos).each(function loopingItems(item)
    {
        id= id+1;
        var obj=
        {
            id: id,
            title:this.title,
            videoType:this.videoType,
            youtubeID:this.youtubeID,
            vimeoID:this.vimeoID,
            video_path_mp4HD:this.mp4HD,
            video_path_mp4SD:this.mp4SD,
            mp4VideoThumbnails_vtt: this.mp4VideoThumbnails_vtt,
            mp4VideoThumbnails_img: this.mp4VideoThumbnails_img,
            ccUrl:this.ccUrl,
            enable_mp4_download:this.enable_mp4_download,
            imageUrl:this.imageUrl,
			imageTimer:this.imageTimer,
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
			popupImg:this.popupImg,
            popupAdShow:this.popupAdShow,
            popupAdStartTime:this.popupAdStartTime,
            popupAdEndTime:this.popupAdEndTime,
            popupAdGoToLink:this.popupAdGoToLink,
            description:this.description,
            thumbnail_image:this.thumbImg,
            info_text: this.info
        };
        obj.title =  obj.title || ''
        obj.info_text =  obj.info_text || ''
        obj.description =  obj.description || ''
        obj.thumbnail_image =  obj.thumbnail_image || ''

        self.videos_array.push(obj);

		self.nowPlayingThumbnail = $("<div />");
		self.nowPlayingThumbnail.addClass("elite_vp_nowPlayingThumbnail");
        if(self.options.playlistShowOnlyThumbnails)
            self.nowPlayingThumbnail.addClass("elite_vp_onlyThumbnails");
		self.nowPlayingThumbnail.text(self.options.nowPlayingTooltipTxt);
		self.nowPlayingThumbnail.hide();
        
		
        self.itemLeft = $("<div />");
		self.itemLeft.addClass("elite_vp_itemLeft");
        if(self.options.playlistShowOnlyThumbnails) 
            self.itemLeft.addClass("elite_vp_onlyThumbnails");
		self.i = document.createElement('img');
		self.i.onload = function(){
			self.thumbImageW=this.width;
			self.thumbImageH=this.height;
		}
		self.i.src = obj.thumbnail_image;
		
		if(options.videos[id].videoType=="youtube" || options.videoType=="YouTube"){
			if(obj.thumbnail_image == "auto" || obj.thumbnail_image == "" || obj.thumbnail_image == "undefined"){
                if(self.options.playlistShowOnlyThumbnails)
                    self.i.src = "https://i.ytimg.com/vi/" + options.videos[id].youtubeID + "/mqdefault.jpg"
                else
                    self.i.src = "http://img.youtube.com/vi/" + options.videos[id].youtubeID + "/1.jpg"
            }
		}
		if(options.videos[id].videoType=="vimeo" || options.videoType=="Vimeo"){
			if(self.vimeoPlayer === undefined) {
				// addVimeoListeners();
			}
		}
		self.itemLeft.append(self.i);
		self.itemLeft.append(self.nowPlayingThumbnail);
		
		$(self.i).addClass('elite_vp_thumbnail_image elite_vp_themeColorThumbBorder');
		
        if(!self.options.playlistShowOnlyThumbnails){
            var itemRight = 
            '<div class="elite_vp_itemRight">'
                + '<div class="elite_vp_title elite_vp_themeColorText">' + obj.title + '</div>'
                + '<div class="elite_vp_description elite_vp_controlsColor'+" "+"elite_vp_"+self.options.instanceTheme+'"> ' + obj.description + '</div>'
            + '</div>';
            
            var itemRight_bottom = 
            '<div class="elite_vp_itemRight_bottom">'
                + '<div class="elite_vp_title elite_vp_themeColorText">' + obj.title + '</div>'
                + '<div class="elite_vp_description elite_vp_controlsColor'+" "+"elite_vp_"+self.options.instanceTheme+'"> ' + obj.description + '</div>'
            + '</div>';
        }

        switch(options.playlist){
            case "Right playlist":
                self.item = $("<div />");
                self.item.addClass("elite_vp_item").css("top",String(offsetT)+"px");
                self.item_array.push(self.item);
				self.item.addClass("elite_vp_itemUnselected"+" "+"elite_vp_"+self.options.instanceTheme);
                self.item.append(self.itemLeft);
                self.item.append(itemRight);
                if(self.options.playlistShowOnlyThumbnails) offsetT += 153;
                else offsetT += 80;
                break;
            case "Bottom playlist":
                self.item = $("<div />");
                self.item.addClass("elite_vp_item").css("left",String(offsetL)+"px");
                self.item_array.push(self.item);
                self.item.addClass("elite_vp_itemUnselected_bottom"+" "+"elite_vp_"+self.options.instanceTheme);
                self.item.css("display","inline-flex");
                self.item.append(self.itemLeft);
                self.item.append(itemRight_bottom);
                break;
        }
		//item hover
		if(self.item != undefined){
			if(!self.isMobile.any()){
				self.item.mouseover(function(){
					$(this).addClass("elite_vp_playlistItem_hover")
				});
				self.item.mouseout(function(){
					$(this).removeClass("elite_vp_playlistItem_hover")
				});
			}
		}
		self.options.playlistOrder = self.options.playlistOrder.toString();
		if(self.options.playlistOrder == "" || self.options.playlistOrder == "undefined")
			self.playlistContent.append(self.item);
        
        if(self.options.playlistShowOnlyThumbnails)
            $(self.item_array[id]).addClass("elite_vp_onlyThumbnails")
        
        if(self.options.playlist == "Right playlist" || self.options.playlist == "Bottom playlist"){
            if(obj.thumbnail_image == '' || obj.thumbnail_image == 'thumbImg' || obj.thumbnail_image == 'undefined'){
                self.itemLeft.hide();
                self.item.find('.elite_vp_itemRight').css({
                    left: 7,
                    paddingTop: 7,
                    width: '240'
                })
				self.item.find('.elite_vp_itemRight_bottom').css({
                    paddingLeft: 7,
                    paddingTop: 7,
                    width: '240'
                })
            }else if(obj.thumbnail_image !== '' || obj.thumbnail_image !== 'thumbImg' || obj.thumbnail_image !== 'undefined'){
                self.itemLeft.show();
                self.item.find('.elite_vp_itemRight').css({
                    left: 76,
                    paddingTop: 0,
                    width: '176'
                })
            }
        }

		if(self.item!=undefined){
			self.item.bind(self.CLICK_EV, function(){
                if(self.touchmove)
                    return
				if(self.scrollingIsOn && self.isMobile.any())
                    return;
                
				if(self.preloader)
					self.preloader.stop().animate({opacity:1},0,function(){$(this).show()});
					
				self.videoid = obj.id;
				self.VIDEO.setPlaylistItem(self.videoid);

				self.VIDEO.resetPlayer();
				self.VIDEO.resetPlayerAD();
				self.VIDEO.resizeAll();
				self.VIDEO.playVideoById(self.videoid);
				self.addVimeoListeners();
				self.youtubeSTARTED=false;
				self.vimeoSTARTED=false;
				
				if(pw){
					if(self.options.videos[0].title!="AD 5 sec + Pieces After Effects project" && self.options.videos[0].title!="Pieces After Effects project" && self.options.videos[0].title!="AD 5 sec + Space Odyssey After Effects Project" && self.options.videos[0].title!="AD 5 sec Swimwear Spring Summer" && self.options.videos[0].title!="i Create" && self.options.videos[0].title!="Swimwear Spring Summer" && self.options.youtubePlaylistID!="PLuFX50GllfgP_mecAi4LV7cYva-WLVnaM" && self.options.videos[0].title!="Google drive video example" && self.options.videos[0].title!="Dropbox video example" && self.options.videos[0].title!="Livestream HLS m3u8 video example" && self.options.videos[0].title!="Openload video example" && self.options.videos[0].title!="Youtube 360 VR video" && self.options.videos[0].title!="Subtitles video example" && self.options.videos[0].title!="Live YouTube" && self.options.videos[0].title!="HTML5 Live video thumbnails" && self.options.videos[0].title!="HTML5 vtt video thumbnails"){
						self.VIDEO.pw();
					}
				}
			});
		}
	});
		if(options.loadRandomVideoOnStart=="Yes")
			self.videoid = self.rand;
		else
			self.videoid = 0;
		
		if(self.params.id){
			self.videoid = self.rand = parseInt(self.params.id)
		}
        
        //order
        if(self.options.playlistOrder != "" && self.options.playlistOrder != "undefined"){
            var order = options.playlistOrder.split(',');
            
            if(options.loadRandomVideoOnStart=="Yes") self.rand = parseInt(order[Math.floor((Math.random() * (order.length)))])
            else self.videoid = parseInt(order[0]);
            
            for(var i=0; i<= order.length-1; i++){
                self.playlistContent.append(self.item_array[order[i]])
                
                if(self.item_array.length-1 < order[i]){
                    self.videoid = 0;
                    for(var i=0; i<= self.options.videos.length-1; i++){
                        self.playlistContent.append(self.item_array[i])
                    }
                }
            }
        }
        
        switch(self.options.playlist){
            case "Right playlist":
				if(options.loadRandomVideoOnStart=="Yes")
                {
					$(self.item_array[self.rand]).removeClass("elite_vp_itemUnselected"+" "+"elite_vp_"+this.options.instanceTheme).addClass("elite_vp_itemSelected"+" "+"elite_vp_"+this.options.instanceTheme);
                    self.item_array[self.rand].find(".elite_vp_thumbnail_image").removeClass("elite_vp_thumbnail_image").addClass("elite_vp_thumbnail_imageSelected");// selected
					self.VIDEO.playedVideos.push(self.rand)
				}else{
					$(self.item_array[self.videoid]).removeClass("elite_vp_itemUnselected"+" "+"elite_vp_"+this.options.instanceTheme).addClass("elite_vp_itemSelected"+" "+"elite_vp_"+this.options.instanceTheme);
                    self.item_array[self.videoid].find(".elite_vp_thumbnail_image").removeClass("elite_vp_thumbnail_image").addClass("elite_vp_thumbnail_imageSelected");// selected
					self.VIDEO.playedVideos.push(self.videoid)
                }
				break;
            case "Bottom playlist":
				if(options.loadRandomVideoOnStart=="Yes")
                {
					$(self.item_array[self.rand]).removeClass("elite_vp_itemUnselected_bottom"+" "+"elite_vp_"+this.options.instanceTheme).addClass("elite_vp_itemSelected_bottom"+" "+"elite_vp_"+this.options.instanceTheme);
					self.item_array[self.rand].find(".elite_vp_thumbnail_image").removeClass("elite_vp_thumbnail_image").addClass("elite_vp_thumbnail_imageSelected");
					self.VIDEO.playedVideos.push(self.rand)
				}else{
					$(self.item_array[self.videoid]).removeClass("elite_vp_itemUnselected_bottom"+" "+"elite_vp_"+this.options.instanceTheme).addClass("elite_vp_itemSelected_bottom"+" "+"elite_vp_"+this.options.instanceTheme);
					self.item_array[self.videoid].find(".elite_vp_thumbnail_image").removeClass("elite_vp_thumbnail_image").addClass("elite_vp_thumbnail_imageSelected");
					self.VIDEO.playedVideos.push(self.videoid)
                }
                break;
        }
		$(self.playlistContent).mCustomScrollbar("scrollTo", self.item_array[self.videoid]);

        if(options.videos[self.videoid].videoType=="youtube" || options.videoType=="YouTube")
        {	
			self.VIDEO.imageWrapper.css({zIndex:0});
			self.VIDEO.imageWrapper.css({visibility:"none"});
            self.VIDEO.hideVideoElements();

            self.preloader.stop().animate({opacity:0},0,function(){$(this).hide()});
            self.VIDEO.ytWrapper.css({zIndex:501});
            self.VIDEO.ytWrapper.css({visibility:"visible"});
            self.vimeoWrapper.css({zIndex:0});

        }
        else if(options.videos[self.videoid].videoType=="HTML5" || options.videoType=="HTML5 (self-hosted)")
        {
			self.VIDEO.imageWrapper.css({zIndex:0});
			self.VIDEO.imageWrapper.css({visibility:"none"});
			
            self.VIDEO.ytWrapper.css({zIndex:0});
            self.VIDEO.ytWrapper.css({visibility:"hidden"});
            self.vimeoWrapper.css({zIndex:0});
            if(myVideo.canPlayType && myVideo.canPlayType('video/mp4').replace(/no/, ''))
            {
                this.canPlay = true;
                if(options.loadRandomVideoOnStart=="Yes"){
					switch(options.HTML5VideoQuality){
						case "HD":
							self.video_path = self.videos_array[self.rand].video_path_mp4HD;
						break;
						case "SD":
							self.video_path = self.videos_array[self.rand].video_path_mp4SD;
						break;	
					}
					self.video_pathAD = self.videos_array[self.rand].preroll_mp4;
				}
				else if(options.loadRandomVideoOnStart=="No"){
					switch(options.HTML5VideoQuality){
						case "HD":
							self.video_path = self.videos_array[self.videoid].video_path_mp4HD;
						break;
						case "SD":
							self.video_path = self.videos_array[self.videoid].video_path_mp4SD;
						break;	
					}
					self.video_pathAD = self.videos_array[self.videoid].preroll_mp4;
				}
            }
            self.VIDEO.load(self.video_path, "0");
        }
        else if(options.videos[self.videoid].videoType=="vimeo" || options.videoType=="Vimeo")
        {
			self.VIDEO.imageWrapper.css({zIndex:0});
			self.VIDEO.imageWrapper.css({visibility:"none"});
			self.VIDEO.hideCustomControls();
			
            self.VIDEO.hideVideoElements();
            self.preloader.stop().animate({opacity:0},700,function(){$(this).hide()});
            self.vimeoWrapper.css({zIndex:501});

			//vimeo
			/*$(self.vimeoWrapper).find('#'+self.options.instanceName)
			.attr("src","https://player.vimeo.com/video/" + self.videos_array[self.videoid].vimeoID 
				+ "?player_id=" + self.options.instanceName 
				+ "&playsinline=1"
				+ "&autoplay=0"
				+ "&color="+options.vimeoColor
				+ "&muted=1"
				+ "&background=0"
			);*/
			if(options.autoplay) {
				this.vimeoAutoplay = true;
				this.vimeoMuted = true;
			}
			else {
				this.vimeoAutoplay = false;
				this.vimeoMuted = false;
			}
			this.vimeoPlaysinline = true;
			this.vimeoColor = options.vimeoColor;
			
			if(options.autoplay) {
				this.vimeoAutoplay = true;
				this.vimeoMuted = true;
			}
			
			var opts = {
				// url: "https://player.vimeo.com/video/76979871?h=8272103f6e"
				url: "https://player.vimeo.com/video/" + self.videos_array[self.videoid].vimeoID + "?h=8272103f6e",
				autoplay: this.vimeoAutoplay,
				muted: this.vimeoMuted,
				playsinline: this.vimeoPlaysinline,
				color: this.vimeoColor

			};
			self.vimeoPlayer = new Vimeo.Player(this.vimeoWrapper, opts);
			self.addVimeoListeners()
            /*if(!self.isMobile.any()){
                if(options.autoplay){
					if(options.loadRandomVideoOnStart=="Yes")
						$(self.vimeoWrapper).find('#'+self.options.instanceName)
						.attr("src","https://player.vimeo.com/video/" + self.videos_array[self.rand].vimeoID 
							+ "?player_id=" + self.options.instanceName 
							+ "&playsinline=1"
							+ "&autoplay=1"
							+ "&color="+options.vimeoColor
							// + "&muted=1"
							+ "&background=0"
						);
					else
						$(self.vimeoWrapper).find('#'+self.options.instanceName)
						.attr("src","https://player.vimeo.com/video/" + self.videos_array[self.videoid].vimeoID 
							+ "?player_id=" + self.options.instanceName 
							+ "&playsinline=1"
							+ "&autoplay=1"
							+ "&color="+options.vimeoColor
							// + "&muted=1"
							+ "&background=0"
						);
				}
                else{
					if(options.loadRandomVideoOnStart=="Yes")
						$(self.vimeoWrapper).find('#'+self.options.instanceName)
						.attr("src","https://player.vimeo.com/video/" + self.videos_array[self.rand].vimeoID 
							+ "?player_id=" + self.options.instanceName 
							+ "&playsinline=1"
							+ "&autoplay=0"
							+ "&color="+options.vimeoColor
							// + "&muted=1"
							+ "&background=0"
						);
					else
						$(self.vimeoWrapper).find('#'+self.options.instanceName)
						.attr("src","https://player.vimeo.com/video/" + self.videos_array[self.videoid].vimeoID 
							+ "?player_id=" + self.options.instanceName 
							+ "&playsinline=1"
							+ "&autoplay=0"
							+ "&color="+options.vimeoColor
							// + "&muted=1"
							+ "&background=0"
						);
				}
            }
            else{
                if(options.loadRandomVideoOnStart=="Yes")
					$(self.vimeoWrapper).find('#'+self.options.instanceName)
					.attr("src","https://player.vimeo.com/video/" + self.videos_array[self.rand].vimeoID 
						+ "?player_id=" + self.options.instanceName 
						+ "&playsinline=1"
						+ "&autoplay=0"
						+ "&color="+options.vimeoColor
						// + "&muted=1"
						+ "&background=0"
					);
				else
					$(self.vimeoWrapper).find('#'+self.options.instanceName)
					.attr("src","https://player.vimeo.com/video/" + self.videos_array[self.videoid].vimeoID 
						+ "?player_id=" + self.options.instanceName 
						+ "&playsinline=1"
						+ "&autoplay=0"
						+ "&color="+options.vimeoColor
						// + "&muted=1"
						+ "&background=0"
					);
            }*/
        }
		else if(options.videos[self.videoid].videoType=="image" || options.videoType=="Image")
        {
			self.VIDEO.hideCustomControls();
		
			self.VIDEO.hideVideoElements();
			self.VIDEO.ytWrapper.css({zIndex:0});
            self.VIDEO.ytWrapper.css({visibility:"hidden"});
            self.vimeoWrapper.css({zIndex:0});
			self.vimeoWrapper.css({visibility:"hidden"});
			
			self.VIDEO.imageWrapper.css({zIndex:502});
			self.VIDEO.imageWrapper.css({visibility:"visible"});
			
			self.VIDEO.imageDisplayed.src = self.videos_array[0].imageUrl
			
			$(self.VIDEO.imageDisplayed).on("load",function() {
				if(options.autoplay)
					self.VIDEO.setImageTimer();
			});
		}
		
		self.nextBtn.bind(self.CLICK_EV, function()
        {
			if(self.VIDEO.shuffleBtnEnabled)
			{
				self.VIDEO.generateRandomNumber();
				self.videoid = self.VIDEO.rand;
				self.VIDEO.setPlaylistItem(self.videoid);
			}
			else{
				self.videoid = self.videoid+1;
				if( self.videoid >= (options.videos).length)
					self.videoid=0;
				self.VIDEO.setPlaylistItem(self.videoid);
			}
			self.VIDEO.playVideoById(self.videoid);
			self.addVimeoListeners();
		});
		self.previousBtn.bind(self.CLICK_EV, function()
        {
			if(self.VIDEO.shuffleBtnEnabled)
			{
				self.VIDEO.generateRandomNumber();
				self.videoid = self.VIDEO.rand;
				self.VIDEO.setPlaylistItem(self.videoid);
			}
			else{
				self.videoid = self.videoid-1;
				if( self.videoid <0 )
					self.videoid=(options.videos).length-1;
				self.VIDEO.setPlaylistItem(self.videoid);
			}
			self.VIDEO.playVideoById(self.videoid);
			self.addVimeoListeners();
		});
		self.shuffleBtn.bind(self.CLICK_EV, function(){
			self.VIDEO.toggleShuffleBtn();
        });
		self.lastBtn.bind(self.CLICK_EV, function(){
			$(self.playlistContent).mCustomScrollbar("scrollTo","last");
        });
		self.firstBtn.bind(self.CLICK_EV, function(){
			$(self.playlistContent).mCustomScrollbar("scrollTo","first");
        });


    self.totalWidth = options.videoPlayerWidth;
    self.totalHeight = options.videoPlayerHeight;

    if(options.playlist=="Right playlist" || options.playlist=="Bottom playlist")
    {
        if( self.element){
            mainContainer.append(self.playlist);
            self.playlist.append(self.playlistContent);
        }
    }
    this.playlistW = this.playlist.width();
    this.playlistH = this.playlist.height();
    if(options.playlist=="Right playlist")
    {
        self.playlistContent.css("height",String(offsetT)+"px");

        self.playerWidth = self.totalWidth - self.playlist.width();
        self.playerHeight = self.totalHeight - self.playlist.height();

        self.playlist.css({
            height:"100%",
            top:0
        });
		
		self.playlistContent.height(mainContainer.height()-50);
		$(self.playlistContent).mCustomScrollbar({
				axis:"y",
				theme:self.options.playlistScrollType,
				scrollButtons:{enable:true},
                snapOffset:50,
				callbacks:{
					onScrollStart:function(){
                        if(self.isMobile.any()){
                            setTimeout(function(){
                                self.scrollingIsOn = true;
                            }, 50);
                        }
					},
					onScroll:function(){
                        if(self.isMobile.any()){
								self.scrollingIsOn = false;
								self.touchmove = false;
                        }
					},
                    whileScrolling:function(){ }
				}	
		});
    }
    else if(options.playlist=="Bottom playlist")
    {
        self.playlistContent.css("width",String(offsetL)+"px");
        self.playerWidth = self.totalWidth;
        self.playerHeight = self.totalHeight - self.playlist.height();

        self.playlist.css({
            left:0,
            width:"100%",
			bottom:0
        });
		
		self.playlistContent.width(mainContainer.width());
		$(self.playlistContent).mCustomScrollbar({
			axis:"x",
			theme:self.options.playlistScrollType,
			scrollButtons:{enable:true},
			callbacks:{
				onScrollStart:function(){
                    if(self.isMobile.any()){
                        setTimeout(function(){
                            self.scrollingIsOn = true;
                        }, 50);
                    }
                },
                onScroll:function(){
                    if(self.isMobile.any()){
							self.scrollingIsOn = false;
							self.touchmove = false;
                    }
                },
                whileScrolling:function(){ }
			},
			advanced:{autoExpandHorizontalScroll:true},
			setHeight: 'auto',
			setWidth: 'auto',
		});
    }
	$(self.playlistContent).mCustomScrollbar("scrollTo", self.item_array[self.videoid]);
    
    $('body').bind('touchmove', function(e) { 
        self.touchmove = true;
    });
};

PLAYER.Playlist.prototype = {};

PLAYER.Playlist.prototype.hidePlaylist = function(){
	
	this.playlist.hide();
	
}
PLAYER.Playlist.prototype.showPlaylist = function(){
	
	this.playlist.show();
	
}
PLAYER.Playlist.prototype.resizePlaylist = function(val1, val2){
	
	var self=this;
	switch(this.options.playlist) {
		case 'Right playlist':
			this.playlist.css({
				right:0,
				height:"100%"
			});
			this.playlistContent.css({
				top:0,
				height:self.mainContainer.height()-50
			});
			this.playlistContent.height(this.mainContainer.height()-this.playlistBar.height());
			break;
		case 'Bottom playlist':
			this.playlist.css({
				left:0,
				width:"100%",
				bottom:0
			});
			this.playlistContent.height(this.playlist.height()-this.playlistBar.height());
			break;
	}
	this.playlistBarInside.css({
		left:self.playlistBar.width()/2 - this.playlistBarInside.width()/2
	});
	
}
PLAYER.Playlist.prototype.playYoutube = function(obj_id){
	
	if(this.VIDEO.youtubePlayer!= undefined){
		this.VIDEO.youtubePlayer.cueVideoById(this.videos_array[obj_id].youtubeID);
		this.VIDEO.youtubePlayer.setPlaybackQuality(this.ytQuality);
		this.preloader.hide();
		this.VIDEO.ytWrapper.css({zIndex:501});
		this.VIDEO.ytWrapper.css({visibility:"visible"});
		this.VIDEO.youtubePlayer.playVideo();
	}
	this.VIDEO.resizeAll();
	
}
PLAYER.Playlist.prototype.addVimeoListeners = function(){
	// console.log("ADD VIMEO LISENERS")
	var self = this;
	
	this.vimeoPlayer.on('pause', onPauseVimeo);
	this.vimeoPlayer.on('ended', onFinishVimeo);
	this.vimeoPlayer.on('timeupdate', onTimeupdate);
	this.vimeoPlayer.on('volumechange', onVolumeChangeVimeo);
	
	function onPauseVimeo(){
		self.onPauseVimeo();
	}
	function onFinishVimeo(){
		self.onFinishVimeo();
	}
	function onTimeupdate(data){
		self.onTimeupdate(data);
	}
	function onVolumeChangeVimeo(data){
		self.onVolumeChangeVimeo(data);
	}
}
PLAYER.Playlist.prototype.onPauseVimeo = function(){
	// console.log("ON PAUSE VIMEO")
}
PLAYER.Playlist.prototype.onFinishVimeo = function(){
	// console.log("ON FINISH VIMEO")

	this.videoAdPlayed=false;
	this.VIDEO.gaVideoEnded();

	if(this.options.playlist=="Right playlist" || this.options.playlist=="Bottom playlist" || this.options.playlist=="Off")
	{
		this.videoid = parseInt(this.videoid)+1;
		if (this.videos_array.length == this.videoid){
			this.videoid = 0;
		}
		if(this.options.onFinish=="Play next video")
		{
			if(this.VIDEO.shuffleBtnEnabled){
				this.VIDEO.generateRandomNumber();
				this.videoid = this.VIDEO.rand;
				this.VIDEO.setPlaylistItem(this.videoid);
			}
			else{
				this.VIDEO.setPlaylistItem(this.videoid);
			}
			this.VIDEO.playVideoById(this.videoid);
			this.addVimeoListeners();

		}
		else if(this.options.onFinish=="Restart video")
		{
			this.VIDEO.vimeoPlay();

		}
		else if(this.options.onFinish=="Stop video")
		{
			if(this.options.posterImgOnVideoFinish != ""){
				this.VIDEO.showPoster2();
			}
		}
	}
	else{
		if(this.options.onFinish=="Restart video")
		{
			this.VIDEO.vimeoPlay();
		}
	}
}
PLAYER.Playlist.prototype.onTimeupdate = function(data){
	// console.log("ON TIME UPDATE")
	var self = this;
	
	this.vimeo_time = Math.floor(data.seconds);
	this.vimeo_percentage= parseInt((data.percent)*100);
	this.vimeo_duration = Math.floor(data.duration);

	if(this.vimeo_time == 0 && this.videos_array[this.videoid].prerollAD=="yes"){
		this.VIDEO.videoAdStarted = true;

		if(this.videoAdPlayed){
			this.VIDEO.vimeoPlay();
		}
		else {
			this.vimeoPlayer.pause();
			if(this.myVideo.canPlayType && this.myVideo.canPlayType('video/mp4').replace(/no/, ''))
			{
				this.canPlay = true;
				this.video_pathAD = this.videos_array[this.videoid].preroll_mp4;
			}
			this.VIDEO.loadAD(this.video_pathAD, "prerollActive");
			this.VIDEO.openAD();
		}
	}
	else if(this.vimeo_time == 0 && this.options.vastUrl && this.options.vastUrl != '' && !$.isEmptyObject(this._vast.allVastPREROLLS) && this._vast.linear != ''){
		this.VIDEO.videoAdStarted = true;
		if(this.videoAdPlayed){
			this.VIDEO.vimeoPlay();
		}
		else {
			this.vimeoPlayer.pause();
			if(!this.vimeoSTARTED)
				this.VIDEO.playVAST("preroll");
			
			this.vimeoSTARTED = true;
		}
	}
	
	this.tim = setInterval(function() {
		
		if(self.options.videos[self.videoid].videoType=="HTML5" || self.options.videoType=="HTML5 (self-hosted)")
		return;
	
		if(self.VIDEO.secondsFormat(self.vimeo_time) == self.videos_array[self.videoid].midrollAD_displayTime)
		{
			if(self.VIDEO.midrollPlayed)
				return
			self.VIDEO.midrollPlayed = true;
			if(self.videos_array[self.videoid].midrollAD=="yes")
			{
				if(self.myVideo.canPlayType && self.myVideo.canPlayType('video/mp4').replace(/no/, ''))
				{
					self.canPlay = true;
					self.video_pathAD = self.videos_array[self.videoid].midroll_mp4;
				}
				self.vimeoPlayer.pause();
				self.VIDEO.loadAD(self.video_pathAD, "midrollActive");
				self.VIDEO.openAD();
			}
		}
		if(self.VIDEO.secondsFormat(self.vimeo_time) >= self.VIDEO.secondsFormat(self.vimeo_duration-1) && self.vimeo_duration>0)
		{
			if(self.VIDEO.postrollPlayed)
				return
			self.VIDEO.postrollPlayed = true;
			if(self.videos_array[self.videoid].postrollAD=="yes")
			{
				if(self.myVideo.canPlayType && self.myVideo.canPlayType('video/mp4').replace(/no/, ''))
				{
					self.canPlay = true;
					self.video_pathAD = self.videos_array[self.videoid].postroll_mp4;
				}
				self.vimeoPlayer.pause();
				self.VIDEO.loadAD(self.video_pathAD, "postrollActive");
				self.VIDEO.openAD();
			}
		}
		if(self.options.vastUrl && self.options.vastUrl != ''){
			if(!$.isEmptyObject(self._vast.allVastMIDROLLS)){
				if(self.VIDEO.MIDROLLS_INDEX == Object.keys(self._vast.allVastMIDROLLS).length) return
				if(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'].indexOf(":") != -1 ){
					if(parseInt(self.vimeo_time) === self._vast.convertTimeStringToSeconds(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'])){
						self.vimeoPlayer.pause();
						if(!self.VIDEO.IS_MIDROLLS_ACTIVE)
							self.VIDEO.playVAST("midroll");
						self.VIDEO.IS_MIDROLLS_ACTIVE = true;
					}else 
						self.VIDEO.IS_MIDROLLS_ACTIVE = false;
					
				}
				else if(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'].indexOf("%") != -1 ){
					var _percentage = self.vimeo_percentage;
					
					if(_percentage === parseInt(self._vast.allVastMIDROLLS[self.VIDEO.MIDROLLS_INDEX]['timeOffset'])){
						self.vimeoPlayer.pause();
						if(!self.VIDEO.IS_MIDROLLS_ACTIVE)
							self.VIDEO.playVAST("midroll");
						self.VIDEO.IS_MIDROLLS_ACTIVE = true;
					}else
						self.VIDEO.IS_MIDROLLS_ACTIVE = false;
				}
			}
		}
		
		if(self.options.vastUrl && self.options.vastUrl != ''){
			if(!$.isEmptyObject(self._vast.allVastNONLINEARS)){
				if(self.VIDEO.NONLINEARS_INDEX == Object.keys(self._vast.allVastNONLINEARS).length) return
				if(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'].indexOf(":") != -1 ){
					if(parseInt(self.vimeo_time) === self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'])){
						
						setTimeout(function(){
							self.VIDEO.adOn=true;
							self.VIDEO.togglePopup();
						}, 1000*self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['minSuggestedDuration']));
						
						self.VIDEO.playVAST("nonlinear")
					} 
					
				}
				if(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'].indexOf("%") != -1 ){
					var _percentage = self.vimeo_percentage;
					
					if(_percentage === parseInt(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['timeOffset'])){
						
						setTimeout(function(){
							self.VIDEO.adOn=true;
							self.VIDEO.togglePopup();
						}, 1000*self._vast.convertTimeStringToSeconds(self._vast.allVastNONLINEARS[self.VIDEO.NONLINEARS_INDEX]['minSuggestedDuration']));
						
						self.VIDEO.playVAST("nonlinear")
						
					} 
					
				}
			}
		}
		
	}, 50);
	
	if(this.VIDEO.secondsFormat(this.vimeo_time) >= this.VIDEO.secondsFormat(this.vimeo_duration-1) && this.vimeo_duration>0)
	{
		if(this.VIDEO.postrollPlayed)
			return
		this.VIDEO.postrollPlayed = true;
		
		if(this.options.vastUrl && this.options.vastUrl != ''){
			if(!$.isEmptyObject(this._vast.allVastPOSTROLLS)){
				this.vimeoPlayer.pause();
				this.VIDEO.playVAST("postroll");
				this.VIDEO.IS_POSTROLLS_ACTIVE = true;
			}
		}
		if(this.videos_array[this.videoid].postrollAD=="yes")
		{
			if(this.myVideo.canPlayType && this.myVideo.canPlayType('video/mp4').replace(/no/, ''))
			{
				this.canPlay = true;
				this.video_pathAD = this.videos_array[this.videoid].postroll_mp4;
			}
			this.vimeoPlayer.pause();
			this.VIDEO.loadAD(this.video_pathAD, "postrollActive");
			this.VIDEO.openAD();
		}
	}else{
		this.VIDEO.IS_POSTROLLS_ACTIVE = false;
	}
	
	if(this.videos_array[this.videoid].popupAdShow=="yes"){
		this.VIDEO.enablePopup();
	}
}
PLAYER.Playlist.prototype.onVolumeChangeVimeo = function(data){
	// console.log("ON VOLUME CHANGE VIMEO")
	var self = this;
	var volume = data;
	
	this.VIDEO.hideMutedBox();
	
	this.vimeoPlayer.getVolume().then(function(volume) {
		self.vimeoMuted = false;
		self.VIDEO.volRatio = volume;
		
		self.VIDEO.volPerc = volume;
		
		// self.VIDEO.initialVolumeProgressWidth = self.VIDEO.volumeTrackProgress.width();
		self.VIDEO.savedVolumeBarWidth = self.VIDEO.volumeTrack.width() * volume;
		self.VIDEO.volumeTrackProgress.width(self.VIDEO.savedVolumeBarWidth)
	});
}
