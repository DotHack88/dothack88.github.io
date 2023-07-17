(function ($) {
    $(document).ready(function () {

	var json_str = options.replace(/&quot;/g, '"');
	var selected;
	var btn1Selected=false;
	var btn2Selected=false;
	var postboxOn=true;
	var youtubePlaylistSelected=false;
	var youtubeChannelSelected=false;
	var countVideos;
	var feedTitle;
	var url;
	var nextPageToken;
	var videoItem;
	var video;
	var videosContainer;
	
	$form = $("#elite-options-form")

    $form.submit(function(e) {

        e.preventDefault();

        $form.find('.spinner').css('visibility', 'visible')

        $form.find('.save-button').prop('disabled', 'disabled').css('pointer-events', 'none')
		
        var data = $form.serialize() + '&action=elite_save&id=' + options.id + '&security=' + options.security + '&status=' + options.status

        $.ajax({

            type: "POST",

            url: $form.attr('action'),

            data: data,

            success: function(data, textStatus, jqXHR) {
				// console.log(data)
				
                $form.find('.spinner').css('visibility', 'hidden')
                $form.find('.save-button').prop('disabled', '').css('pointer-events', 'auto')
				
				o = $.parseJSON(data)
                convertStrings(o)

                // console.log(o)

                if (!checkResponseForVideos(o)) {
                    showNotification("update-nag");
                    e.preventDefault()
                    return false
                }

                showNotification("updated");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

                $form.find('.spinner').css('visibility', 'hidden')
                $form.find('.save-button').prop('disabled', '').css('pointer-events', 'auto')
				
				showNotification("error");
            }
        })

    })
	
	options = jQuery.parseJSON(json_str);
	
	function convertStrings(obj) {

        $.each(obj, function(key, value) {
            if (typeof(value) == 'object' || typeof(value) == 'array') {
                convertStrings(value)
            } else if (!isNaN(value)) {
                if (obj[key] == "")
                    delete obj[key]
                else
                    obj[key] = Number(value)
            } else if (value == "true") {
                obj[key] = true
            } else if (value == "false") {
                obj[key] = false
            }
        });

    }

    convertStrings(options)
	
	addOption("general", "instanceName", "text", "Player name","");
	addOption("general", "vastUrl", "text", "VAST / VMAP / IMA url","");
	addOption("general", "googleAnalyticsTrackingCode", "text", "Google Analytics tracking code","");
	addOption("general", "instanceTheme", "dropdown", "Select player theme","dark", ["dark", "light"]);
	addOption("general", "playerLayout", "dropdown", "Select player layout","fitToContainer", ["fitToContainer", "fixedSize", "fitToBrowser"]);
	addOption("general", "videoPlayerWidth", "text", "Total player width [px] (fixedSize)",1006);
	addOption("general", "videoPlayerHeight", "text", "Total player height [px] (fixedSize)",420);
	addOption("general", "videoRatio", "text", "Video ratio on desktop [video width/video height]", 16/9);
	addOption("general", "videoRatioMobile", "text", "Video ratio on mobile devices [video width/video height]", 16/9);
	addOption("general", "videoRatioStretch", "checkbox", "Video ratio stretch", false);
    addOption("general", "iOSPlaysinline", "checkbox", "Play video inline (default is automatically fullscreen) on iOS devices", true);
	addOption("general", "floatPlayerOutsideViewport", "checkbox", "Sticky player if not in viewport when scrolling through page", false);
	addOption("general", "pauseStickyOutsideViewport", "checkbox", "Pause sticky player if not in viewport", false);
	addOption("lightbox", "lightBox", "checkbox", "Lightbox mode", false);
	addOption("lightbox", "lightBoxAutoplay", "checkbox", "Lightbox autoplay video", false);
	addOption("lightbox", "lightBoxThumbnail", "selectImage", "Select lightbox thumbnail","");
	addOption("lightbox", "lightBoxThumbnailAutoSize", "checkbox", "Lightbox thumbnail auto size", false);
	addOption("lightbox", "lightBoxThumbnailWidth", "text", "Lightbox thumbnail width [px]", 400);
	addOption("lightbox", "lightBoxThumbnailHeight", "text", "Lightbox thumbnail height [px]", 220);
	addOption("lightbox", "lightBoxCloseOnOutsideClick", "checkbox", "Lightbox close on outside click", true);
	addOption("general", "videoPlayerShadow", "dropdown", "Select player shadow","effect1", ["effect1", "effect2", "effect3", "effect4", "effect5", "effect6", "off"]);
	addOption("playlist", "playlist", "dropdown", "Playlist show","Right playlist", ["Right playlist", "Bottom playlist", "Off"]);
    addOption("playlist", "playlistShowOnlyThumbnails", "checkbox", "Show only thumbnails", false);
    addOption("playlist", "playlistOrder", "textarea", "Playlist order [0,1,2...]","");
	addOption("playlist", "playlistBehaviourOnPageload", "dropdown", "Behaviour on page load [if showing]","opened (default)", ["closed", "opened (default)"]);
	addOption("youtube", "youtubeControls", "dropdown", "Select YouTube player controls","custom controls", ["custom controls", "default controls"]);
	addOption("youtube", "youtubeSkin", "dropdown", "Select YouTube skin","dark", ["dark", "light"]);
	addOption("youtube", "youtubeColor", "dropdown", "Select YouTube color","red", ["red", "white"]);
	addOption("youtube", "youtubeQuality", "dropdown", "Select YouTube quality","default", ["default", "small", "medium", "large", "hd720", "hd1080", "highres"]);
	addOption("youtube", "youtubeShowRelatedVideos", "dropdown", "Show YouTube related videos","Yes", ["Yes", "No"]);
	addOption("vimeo", "vimeoColor", "color", "Vimeo player color","#00adef");
	addOption("general", "colorAccent", "color", "Player color accent","#cc181e");
	addOption("behavior", "onFinish", "dropdown", "On video finish","playNextOnFinish", ["Play next video","Restart video", "Stop video"]);
	addOption("behavior", "autoplay", "checkbox", "Autoplay",false);
	addOption("behavior", "loadRandomVideoOnStart", "dropdown", "Random video on page load", "No", ["Yes","No"]);
	addOption("general", "posterImg", "selectImage", "Poster image","");
	addOption("general", "posterImgOnVideoFinish", "selectImage", "Poster image on video finish","");
	addOption("HTML5", "HTML5VideoQuality", "dropdown", "HTML5 video quality", "HD", ["HD","SD"]);
	addOption("HTML5", "HTML5videoThumbnails", "dropdown", "HTML5 video progress thumbnails", "live", ["live","vtt","none"]);
	addOption("HTML5", "preloadSelfHosted", "dropdown", "Preload Self-Hosted mp4 video", "none", ["none","auto"]);
	addOption("HTML5", "hideVideoSource", "checkbox", "Hide video source",false);
	addOption("controls", "showAllControls", "checkbox", "Show all controls",true);
	addOption("HTML5", "rightClickMenu", "checkbox", "Right-click menu",true);
	addOption("subtitles", "ccShowOnHTML5Videos", "checkbox", "Show HTML5 video subtitles",false);
	addOption("subtitles", "ccShowOnVideoLoad", "checkbox", "Display subtitles on video load",false);
	addOption("subtitles", "ccBtnOpenedTooltipTxt", "text", "CC button tooltip text [when enabled]", "Hide captions");
	addOption("subtitles", "ccBtnClosedTooltipTxt", "text", "CC button tooltip text [when disabled]", "Show captions");
	addOption("controls", "autohideControls", "text", "Auto hide controls (sec)",2);
	addOption("controls", "hideControlsOnMouseOut", "dropdown", "Hide controls on mouse rollout", "No", ["Yes","No"]);
	addOption("behavior", "shuffle", "dropdown", "Shuffle videos on finish", "No", ["Yes","No"]);
	addOption("playlist", "playlistScrollType", "dropdown", "Scrollbar design", "light", ["light","minimal","light-2","light-3","light-thick","light-thin","inset","inset-2","inset-3","rounded","rounded-dots","3d", "dark", "minimal-dark", "dark-2", "dark-3", "dark-thick", "dark-thin", "inset-dark", "inset-2-dark", "inset-3-dark", "rounded-dark", "rounded-dots-dark", "3d-dark", "3d-thick-dark"]);
	addOption("manageElements", "nowPlayingText", "dropdown", "Show now playing title","Yes", ["Yes","No"]);
	addOption("manageElements", "rewindShow", "dropdown", "Show rewind button","Yes", ["Yes","No"]);
	addOption("manageElements", "qualityShow", "dropdown", "Show quality button","Yes", ["Yes","No"]);
	addOption("manageElements", "infoShow", "dropdown", "Show info button","Yes", ["Yes","No"]);
	addOption("manageElements", "shareShow", "dropdown", "Show share button","Yes", ["Yes","No"]);
	addOption("manageElements", "facebookShow", "dropdown", "Show facebook button","Yes", ["Yes","No"]);
	addOption("manageElements", "twitterShow", "dropdown", "Show twitter button","Yes", ["Yes","No"]);
	addOption("manageElements", "fastForwardShow", "dropdown", "Fast forward button","No", ["Yes","No"]);
	addOption("manageElements", "fastBackwardShow", "dropdown", "Fast backward button","No", ["Yes","No"]);
	// addOption("manageElements", "stepFastForwardAndBackward", "text", "Fast forward / Fast backward step (seconds)", 5);
	addOption("manageElements", "stepFastForward", "text", "Fast forward step (seconds)", 5);
	addOption("manageElements", "stepFastBackward", "text", "Fast backward step (seconds)", 5);
	addOption("manageElements", "facebookShareName", "text", "Facebook share / Name","Elite video player");
	addOption("manageElements", "facebookShareLink", "text", "Facebook share / Link","http://codecanyon.net/item/elite-video-player-wordpress-plugin/10496434");
	addOption("manageElements", "facebookShareDescription", "textarea", "Facebook share / Description","Elite Video Player is stunning, modern, responsive, fully customisable high-end video player for WordPress that support advertising and the most popular video platforms like YouTube, Vimeo or self-hosting videos (mp4).");
	addOption("manageElements", "facebookSharePicture", "selectImage", "Facebook share / Picture","");
	addOption("manageElements", "twitterText", "text", "Twitter share / Text","Elite video player");
	addOption("manageElements", "twitterLink", "text", "Twitter share / Link","http://codecanyon.net/item/elite-video-player-wordpress-plugin/10496434");
	addOption("manageElements", "twitterHashtags", "text", "Twitter share / Hashtags","wordpressvideoplayer");
	addOption("manageElements", "twitterVia", "text", "Twitter share / Via","Creative media");
	addOption("logo", "logoShow", "dropdown", "Show logo","Yes", ["Yes","No"]);
	addOption("logo", "logoPath", "selectImage", "Select logo image","");
	addOption("logo", "logoPosition", "dropdown", "Logo position","bottom-right", ["bottom-right","bottom-left"]);
	addOption("logo", "logoClickable", "dropdown", "Logo clickable","Yes", ["Yes","No"]);
	addOption("logo", "logoGoToLink", "text", "Logo redirect URL on click","http://codecanyon.net/");
	addOption("general", "allowSkipAd", "checkbox", "Allow users to skip ad",true);
	addOption("general", "showAdvertiserName", "checkbox", "Show advertiser name",true);
    addOption("general", "advertiserName", "text", "Advertiser name/url", "visitAdvertiser.com");
	addOption("translate", "advertisementTitle", "text", "Advertisement title", "Advertisement");
	addOption("translate", "skipAdvertisementText", "text", "Advertisement skip text", "Skip advertisement");
	addOption("translate", "skipAdText", "text", "Advertisement skip counting text", "You can skip this ad in");
	addOption("translate", "playBtnTooltipTxt", "text", "Play button tooltip text", "Play");
	addOption("translate", "pauseBtnTooltipTxt", "text", "Pause button tooltip text", "Pause");
	addOption("translate", "rewindBtnTooltipTxt", "text", "Rewind button tooltip text", "Rewind");
	addOption("translate", "downloadVideoBtnTooltipTxt", "text", "Download button tooltip text", "Download video");
	addOption("translate", "qualityBtnOpenedTooltipTxt", "text", "Quality button tooltip text [when opened]", "Close settings");
	addOption("translate", "qualityBtnClosedTooltipTxt", "text", "Quality button tooltip text [when closed]", "Settings");
	addOption("translate", "muteBtnTooltipTxt", "text", "Mute button tooltip text", "Mute");
	addOption("translate", "unmuteBtnTooltipTxt", "text", "Unmute button tooltip text", "Unmute");
	addOption("translate", "mutedNotificationText", "text", "Video has no sound button tooltip text", "Video has no sound");
	addOption("translate", "fullscreenBtnTooltipTxt", "text", "Fullscreen button tooltip text", "Fullscreen");
	addOption("translate", "exitFullscreenBtnTooltipTxt", "text", "Exit fullscreen button tooltip text", "Exit fullscreen");
	addOption("translate", "fullscreenADBtnTooltipTxt", "text", "Advertisement fullscreen button tooltip text", "Watch advertisement in fullscreen");
	addOption("translate", "exitFullscreenADBtnTooltipTxt", "text", "Exit fullscreen button tooltip text", "Exit fullscreen");
	addOption("translate", "infoBtnTooltipTxt", "text", "Info button tooltip text", "Show info");
	addOption("translate", "embedBtnTooltipTxt", "text", "Embed button tooltip text", "Embed");
	addOption("translate", "shareBtnTooltipTxt", "text", "Share button tooltip text", "Share");
	addOption("translate", "volumeTooltipTxt", "text", "Volume tooltip text", "Volume");
	addOption("translate", "fastForwardBtnTooltipTxt", "text", "Fast forward tooltip text", "Fast forward");
	addOption("translate", "fastBackwardBtnTooltipTxt", "text", "Fast backward tooltip text", "Fast backward");
	addOption("translate", "playlistBtnClosedTooltipTxt", "text", "Playlist button tooltip text [closed]", "Show playlist");
	addOption("translate", "playlistBtnOpenedTooltipTxt", "text", "Playlist button tooltip text [opened]", "Hide playlist");
	addOption("translate", "facebookBtnTooltipTxt", "text", "Facebook button tooltip text", "Share on Facebook");
	addOption("translate", "twitterBtnTooltipTxt", "text", "Twitter button tooltip text", "Share on Twitter");
	addOption("translate", "lastBtnTooltipTxt", "text", "Go to last video button tooltip text", "Go to last video");
	addOption("translate", "firstBtnTooltipTxt", "text", "Go to first video button tooltip text", "Go to first video");
	addOption("translate", "nextBtnTooltipTxt", "text", "Play next video button tooltip text", "Play next video");
	addOption("translate", "previousBtnTooltipTxt", "text", "Play previous button tooltip text", "Play previous video");
	addOption("translate", "shuffleBtnOnTooltipTxt", "text", "Shuffle button tooltip text [when enabled]", "Shuffle on");
	addOption("translate", "shuffleBtnOffTooltipTxt", "text", "Shuffle button tooltip text [when disabled]", "Shuffle off");
	addOption("translate", "nowPlayingTooltipTxt", "text", "Now playing text", "NOW PLAYING");
	addOption("translate", "embedWindowTitle1", "text", "Embed window 1. title", "SHARE THIS PLAYER:");
	addOption("translate", "embedWindowTitle2", "text", "Embed window 2. title", "EMBED THIS VIDEO IN YOUR SITE:");
	addOption("translate", "embedWindowTitle3", "text", "Embed window 3. title", "SHARE LINK TO THIS PLAYER:");
	addOption("manageElements", "embedShow", "dropdown", "Show embed button","Yes", ["Yes","No"]);
	addOption("manageElements", "embedCodeSrc", "textarea", "Embed code iframe src","http://yourwebsite.com/embed/index.html");
	addOption("manageElements", "embedCodeW", "text", "Embed code iframe width","746");
	addOption("manageElements", "embedCodeH", "text", "Embed code iframe height","420");
	addOption("manageElements", "embedShareLink", "text", "Share your site URL","http://codecanyon.net/");
	addOption("main-ads", "showGlobalPrerollAds", "checkbox", "Enable Global Preroll Video Ads <br> (this option will overwrite each individual ad)",false);
	addOption("main-ads", "globalPrerollAds", "textarea", "Global Preroll Videos","url1;url2;url3;url4;url5");
	addOption("main-ads", "globalPrerollAdsSkipTimer", "text", "Global Preroll Videos Skip Timer (seconds)", 5);
	addOption("main-ads", "globalPrerollAdsGotoLink", "text", "Global Preroll Videos Goto Link", "http://codecanyon.net/");
	
	selectPlayerType("videoType", "dropdown", "Select video player type","- Select player type -", ["- Select player type -", "HTML5 (self-hosted)", "YouTube","YouTube playlist", "YouTube channel", "Vimeo", "Image", "Mixed videos"]);

	$('.postbox .hndle').click(function(e){
		$(this).parent().toggleClass("closed")
	});
	$('.postbox .handlediv').click(function(e){
		$(this).parent().toggleClass("closed")
	});
	
	$("#add-new-video-button.html5").hide();
	$("#add-new-video-button.youtube").hide();
	$("#add-new-video-button.vimeo").hide();
	$("#add-new-video-button.image").hide();
	
	btn1Selected=true;
	toggle_options();
	
	$('.btn1').click(function(e){
		btn1Selected=true;
		btn2Selected=false;
		toggle_options();
	});
	$('.btn2').click(function(e){
		btn1Selected=false;
		btn2Selected=true;
		toggle_options();
	});
	
	function toggle_options(){
		if(btn1Selected)
		{
			$('.options_general').show();
			$('.options_videos').hide();
			$('.btn1').css({
				background:"#2ea2cc",
				"border-color": "#2ea2cc", 
				"border-width":"1px", 
				"border-style":"solid"
			});
			$('#btn1-title').css({
				color:"#ffffff"
			});
			$('.btn2').css({
				background:"#f2f2f2",
				"border": ""
			});
			$('#btn2-title').css({
				color:"#2ea2cc"
			});
		}
		else if(btn2Selected)
		{
			$('.options_general').hide();
			$('.options_videos').show();
			$('.btn1').css({
				background:"#f2f2f2",
				"border": ""
			});
			$('#btn1-title').css({
				color:"#2ea2cc"
			});
			$('.btn2').css({
				background:"#2ea2cc",
				"border-color": "#2ea2cc", 
				"border-width":"1px", 
				"border-style":"solid"
			});
			$('#btn2-title').css({
				color:"#ffffff"
			});
		}
	}
	
	function addOption(section,name,type,desc,defaultValue,values){

		var table = $("#player-options-"+section+"");
		var tableBody = table.find('tbody');
		var row = $('<tr valign="top"  class="field-row"></tr>').appendTo(tableBody);
		var th = $('<th scope="row">'+desc+'</th>').appendTo(row);
		var td = $('<td></td>').appendTo(row);

		switch(type){
			case "text":
				var input = $('<input type="text" name="'+name+'"/>').appendTo(td);
				if(typeof(options[name]) != 'undefined'){
					input.attr("value",options[name]);
				}else {
					input.attr('value',defaultValue);
				}
				break;
			case "color":
				var input = $('<input type="text" name="' + name + '" data-alpha="true" class="color-picker"/>').appendTo(td);
				if (options[name] && typeof(options[name]) != 'undefined') {
					input.attr("value", options[name]);
				} else if (options[name.split("[")[0]] && name.indexOf("[") != -1 && typeof(options[name.split("[")[0]]) != 'undefined') {
					input.attr("value", options[name.split("[")[0]][name.split("[")[1].split("]")[0]]);
				} else {
					input.attr('value', defaultValue);
				}
				input.wpColorPicker();
				// input.change(unsaved)
				break;
			case "textarea":
				// var a = stripslashes(options[name]);
				// var b = stripslashes(defaultValue);
			    var textarea = $('<textarea type="text" name="'+name+'" cols=45" rows="1"></textarea>').appendTo(td);
				if(typeof(options[name]) != 'undefined'){
					textarea.attr("value",options[name]);
                    textarea.val(options[name]);
					// textarea.attr("value",a);
				}else {
					textarea.attr('value',defaultValue);
                    textarea.val(defaultValue);
					// textarea.attr('value',b);
				}
				break;
			case "checkbox":
				var inputHidden = $('<input type="hidden" name="'+name+'" value="false"/>').appendTo(td);
				var input = $('<input type="checkbox" name="'+name+'" value="true"/>').appendTo(td);
				if(typeof(options[name]) != 'undefined'){
					input.attr("checked",options[name]);
				}else {
					input.attr('checked',defaultValue);
				}
				break;
			case "selectImage":
				var input = $('<input type="text" name="'+name+'"/><a class="select-image-button button-secondary button80" href="#">Select image</a>').appendTo(td);
				if(typeof(options[name]) != 'undefined'){
					input.attr("value",options[name]);
				}else {
					input.attr('value',defaultValue);
				}
				break;
			case "dropdown":
				var select = $('<select name="'+name+'">').appendTo(td);
				for ( var i = 0; i < values.length; i++ )
				{
					var option = $('<option name="'+name+'" value="'+values[i]+'">'+values[i]+'</option>').appendTo(select);
					if(typeof(options[name]) != 'undefined')
					{
						if(options[name] == values[i])
						{
							option.attr('selected','true');
						}
					}
					else if(defaultValue == values[i])
					{
						option.attr('selected','true');
					}
				}
				break;
		}

	}
	function setColorOptionValue(optionName, value) {
            var $elem = $("input[name='" + optionName + "']").attr('value', value);
            $elem.wpColorPicker()
            return $elem
        }
	function selectPlayerType(name,type,desc,defaultValue,values){

		var table = $("#player-options-table-right");
		var tableBody = table.find('tbody');
		var row = $('<tr valign="top"  class="field-row"></tr>').appendTo(tableBody);
		var th = $('<th scope="row">'+desc+'</th>').appendTo(row);
		var td = $('<td></td>').appendTo(row);

		switch(type){
			case "dropdown":
				var select = $('<select id="type" name="'+name+'">').appendTo(td);
				for ( var i = 0; i < values.length; i++ )
				{
					var option = $('<option name="'+name+'" value="'+values[i]+'">'+values[i]+'</option>').appendTo(select);
					if(typeof(options[name]) != 'undefined')
					{
						if(options[name] == values[i])
						{
							option.attr('selected','true');
						}
					}
					else if(defaultValue == values[i])
					{
						option.attr('selected','true');
					}
				}
				break;
		}

	}
	function youtubePlaylistInput(name,type,desc,defaultValue,values){

		var table = $("#player-options-table-right");
		var tableBody = table.find('tbody');
		var row = $('<tr valign="top"  class="field-row youtube-playlist-field-row"></tr>').appendTo(tableBody);
		var th = $('<th scope="row">'+desc+'</th>').appendTo(row);
		var td = $('<td></td>').appendTo(row);

		switch(type){
			case "text":
				var input = $('<input id="youtubePlaylistInput" class="youtubePlaylist" type="text" name="'+name+'"/>').appendTo(td);
				if(typeof(options[name]) != 'undefined'){
					input.attr("value",options[name]);
				}else {
					input.attr('value',defaultValue);
				}
				break;
		}

	}
	function youtubeChannelInput(name,type,desc,defaultValue,values){

		var table = $("#player-options-table-right");
		var tableBody = table.find('tbody');
		var row = $('<tr valign="top"  class="field-row youtube-channel-field-row"></tr>').appendTo(tableBody);
		var th = $('<th scope="row">'+desc+'</th>').appendTo(row);
		var td = $('<td></td>').appendTo(row);
		switch(type){
			case "text":
				var input = $('<input id="'+name+'" class="youtubeChannel" type="text" name="'+name+'"/>').appendTo(td);
				if(typeof(options[name]) != 'undefined'){
					input.attr("value",options[name]);
				}else {
					input.attr('value',defaultValue);
				}
				break;
		}

	}

	$('#type').change(function() {
		removeVideos();
		selected = $('#type option:selected').val();
		
		if(selected=="YouTube playlist" && !youtubePlaylistSelected)
		{
			$(".youtube-channel-field-row").remove();
			youtubePlaylistSelected=true;
			youtubeChannelSelected=false;
            youtubePlaylistInput("youtubeAPIKey", "text", "YouTube API Key (required)","youtube API Key");
			youtubePlaylistInput("youtubePlaylistID", "text", "YouTube playlist ID","youtube playlist ID");
			
			$(".youtubePlaylist").change(function() {
				youtubePlaylistSelected=false;
				removeVideos();
				loadYoutubeData($("[name='youtubePlaylistID']").val(), $("[name='youtubeAPIKey']").val());
			});
			loadYoutubeData(options.youtubePlaylistID, options.youtubeAPIKey);
			$("#add-new-video-button.general").hide();
			$("#add-new-video-button.html5").hide();
			$("#add-new-video-button.youtube").hide();
			$("#add-new-video-button.vimeo").hide();
			$("#add-new-video-button.image").hide();
		}
		else if(selected=="YouTube channel" && !youtubeChannelSelected)
		{
			$(".youtube-playlist-field-row").remove();
			youtubeChannelSelected=true;
			youtubePlaylistSelected=false;
            youtubeChannelInput("youtubeAPIKey", "text", "YouTube API Key (required)","youtube API Key");
			youtubeChannelInput("youtubeChannelID", "text", "YouTube channel ID","youtube channel ID");
			youtubeChannelInput("youtubeChannelNumberOfVideos", "text", "YouTube channel number of videos", "");
			
			$(".youtubeChannel").change(function() {
				youtubeChannelSelected=false;
				removeVideos();
				loadYoutubeData($("[name='youtubeChannelID']").val(), $("[name='youtubeAPIKey']").val());
			});
            $('#youtubeChannelNumberOfVideos').change(function() {
				self.options.youtubeChannelNumberOfVideos = $(this).val();
                youtubeChannelSelected=false;
				removeVideos();
				loadYoutubeData($("[name='youtubeChannelID']").val(), $("[name='youtubeAPIKey']").val());
			});
			loadYoutubeData(options.youtubeChannelID, options.youtubeAPIKey);
			$("#add-new-video-button.general").hide();
			$("#add-new-video-button.html5").hide();
			$("#add-new-video-button.youtube").hide();
			$("#add-new-video-button.vimeo").hide();
			$("#add-new-video-button.image").hide();
		}
		else if(selected=="- Select player type -" || selected=="HTML5 (self-hosted)" || selected=="YouTube" || selected=="Vimeo" || selected=="Image")
		{
			$(".youtube-playlist-field-row").remove();
			$(".youtube-channel-field-row").remove();
			youtubePlaylistSelected=false;
			youtubeChannelSelected=false;
			self.options.youtubeChannelID = "";
			self.options.youtubePlaylistID = "";
			$("#add-new-video-button.general").show();
			$("#add-new-video-button.html5").hide();
			$("#add-new-video-button.youtube").hide();
			$("#add-new-video-button.vimeo").hide();
			$("#add-new-video-button.image").hide();
		}
		else if(selected == "Mixed videos"){
			$(".youtube-playlist-field-row").remove();
			$(".youtube-channel-field-row").remove();
			youtubePlaylistSelected=false;
			youtubeChannelSelected=false;
			self.options.youtubeChannelID = "";
			self.options.youtubePlaylistID = "";
			$("#add-new-video-button.general").hide();
			$("#add-new-video-button.html5").show();
			$("#add-new-video-button.youtube").show();
			$("#add-new-video-button.vimeo").show();
			$("#add-new-video-button.image").show();
		}
		addListeners();
	});
	selected = $('#type option:selected').val();
	
	//if playlist
	if(selected=="YouTube playlist")
	{
		$("#add-new-video-button.general").hide();
		$("#add-new-video-button.html5").hide();
		$("#add-new-video-button.youtube").hide();
		$("#add-new-video-button.vimeo").hide();
		$("#add-new-video-button.image").hide();
		youtubePlaylistSelected=true;
        youtubePlaylistInput("youtubeAPIKey", "text", "YouTube API Key (required)","youtube API Key");
		youtubePlaylistInput("youtubePlaylistID", "text", "YouTube playlist ID","youtube playlist ID");
		
		$(".youtubePlaylist").change(function() {
			youtubePlaylistSelected=false;
			removeVideos();
			loadYoutubeData($("[name='youtubePlaylistID']").val(), $("[name='youtubeAPIKey']").val());
		});
		loadYoutubeData(options.youtubePlaylistID, options.youtubeAPIKey);
	}//if channel
	else if(selected=="YouTube channel")
	{
		$("#add-new-video-button.general").hide();
		youtubeChannelSelected=true;
        youtubeChannelInput("youtubeAPIKey", "text", "YouTube API Key (required)","youtube API Key");
		youtubeChannelInput("youtubeChannelID", "text", "YouTube channel ID","youtube channel ID");
        youtubeChannelInput("youtubeChannelNumberOfVideos", "text", "YouTube channel number of videos");
		
		$(".youtubeChannel").change(function() {
			youtubeChannelSelected=false;
			removeVideos();
			loadYoutubeData($("[name='youtubeChannelID']").val(), $("[name='youtubeAPIKey']").val());
		});
        $('#youtubeChannelNumberOfVideos').change(function() {
            self.options.youtubeChannelNumberOfVideos = $(this).val();
            youtubeChannelSelected=false;
            removeVideos();
            loadYoutubeData($("[name='youtubeChannelID']").val(), $("[name='youtubeAPIKey']").val());
        });
		loadYoutubeData(options.youtubeChannelID, options.youtubeAPIKey);
	}
	else if(selected == "Mixed videos"){
		$("#add-new-video-button.general").hide();
		$("#add-new-video-button.html5").show();
		$("#add-new-video-button.youtube").show();
		$("#add-new-video-button.vimeo").show();
		$("#add-new-video-button.image").show();
	}
	
	// options

	//for all videos in  options.videos create video
	for(var i= 0; i < options.videos.length; i++){
		video = options.videos[i];
		videosContainer = $("#videos-container");

        options.videos[i].title =  options.videos[i].title || ''
        options.videos[i].info =  options.videos[i].info || ''
        options.videos[i].description =  options.videos[i].description || ''
        
		switch(options.videoType){
			case "HTML5 (self-hosted)":
			
                var videoItem = createVideoHtml_html5("videos["+i+"]", i, video.videoType, video.title, video.mp4HD, video.mp4SD, video.mp4VideoThumbnails_vtt, video.mp4VideoThumbnails_img, video.ccUrl, video.enable_mp4_download, video.prerollAD, video.prerollGotoLink, video.preroll_mp4,video.prerollSkipTimer, video.description, video.thumbImg, video.info, video.midrollAD, video.midrollAD_displayTime, video.midrollGotoLink, video.midroll_mp4, video.midrollSkipTimer, video.postrollAD, video.postrollGotoLink, video.postroll_mp4, video.postrollSkipTimer, video.popupAdShow, video.popupImg, video.popupAdStartTime, video.popupAdEndTime, video.popupAdGoToLink);
                videoItem.appendTo(videosContainer);
				break;
			case "YouTube":
                var videoItem = createVideoHtml_youtube("videos["+i+"]", i, video.videoType, video.title , video.youtubeID, video.mp4HD, video.prerollAD, video.prerollGotoLink,video.preroll_mp4,video.prerollSkipTimer, video.midrollAD, video.midrollAD_displayTime, video.midrollGotoLink, video.midroll_mp4, video.midrollSkipTimer, video.postrollAD, video.postrollGotoLink, video.postroll_mp4, video.postrollSkipTimer, video.popupAdShow, video.popupImg, video.popupAdStartTime, video.popupAdEndTime, video.popupAdGoToLink ,video.description, video.thumbImg,video.info);
                videoItem.appendTo(videosContainer);
				break;
			case "Vimeo":
                var videoItem = createVideoHtml_vimeo("videos["+i+"]", i, video.videoType, video.title , video.vimeoID, video.mp4HD,  video.prerollAD, video.prerollGotoLink,video.preroll_mp4,video.prerollSkipTimer, video.description, video.thumbImg, video.midrollAD, video.midrollAD_displayTime, video.midrollGotoLink, video.midroll_mp4, video.midrollSkipTimer, video.postrollAD, video.postrollGotoLink, video.postroll_mp4, video.postrollSkipTimer, video.popupAdShow, video.popupImg, video.popupAdStartTime, video.popupAdEndTime, video.popupAdGoToLink);
                videoItem.appendTo(videosContainer);
				break;
			case "Image":
                var videoItem = createVideoHtml_image("videos["+i+"]", i, video.videoType, video.title, video.description, video.thumbImg, video.imageUrl, video.imageTimer);
                videoItem.appendTo(videosContainer);
				break;
			case "Mixed videos":
				if(video.videoType=="HTML5"){
					var videoItem = createVideoHtml_html5("videos["+i+"]", i, video.videoType, video.title, video.mp4HD, video.mp4SD, video.mp4VideoThumbnails_vtt, video.mp4VideoThumbnails_img, video.ccUrl, video.enable_mp4_download, video.prerollAD, video.prerollGotoLink, video.preroll_mp4,video.prerollSkipTimer, video.description, video.thumbImg, video.info, video.midrollAD, video.midrollAD_displayTime, video.midrollGotoLink, video.midroll_mp4, video.midrollSkipTimer, video.postrollAD, video.postrollGotoLink, video.postroll_mp4, video.postrollSkipTimer, video.popupAdShow, video.popupImg, video.popupAdStartTime, video.popupAdEndTime, video.popupAdGoToLink);
					videoItem.appendTo(videosContainer);
				}
				if(video.videoType=="youtube"){
					var videoItem = createVideoHtml_youtube("videos["+i+"]", i, video.videoType, video.title , video.youtubeID, video.mp4HD, video.prerollAD, video.prerollGotoLink,video.preroll_mp4,video.prerollSkipTimer, video.midrollAD, video.midrollAD_displayTime, video.midrollGotoLink, video.midroll_mp4, video.midrollSkipTimer, video.postrollAD, video.postrollGotoLink, video.postroll_mp4, video.postrollSkipTimer, video.popupAdShow, video.popupImg, video.popupAdStartTime, video.popupAdEndTime, video.popupAdGoToLink ,video.description, video.thumbImg,video.info);
					videoItem.appendTo(videosContainer);
				}
				if(video.videoType=="vimeo"){
					var videoItem = createVideoHtml_vimeo("videos["+i+"]", i, video.videoType, video.title , video.vimeoID, video.mp4HD,  video.prerollAD, video.prerollGotoLink,video.preroll_mp4,video.prerollSkipTimer, video.description, video.thumbImg, video.midrollAD, video.midrollAD_displayTime, video.midrollGotoLink, video.midroll_mp4, video.mp4HD, video.postrollAD, video.postrollGotoLink, video.postroll_mp4, video.postrollSkipTimer, video.popupAdShow, video.popupImg, video.popupAdStartTime, video.popupAdEndTime, video.popupAdGoToLink);
					videoItem.appendTo(videosContainer);
				}
				if(video.videoType=="image"){
					var videoItem = createVideoHtml_image("videos["+i+"]", i, video.videoType, video.title, video.description, video.thumbImg, video.imageUrl, video.imageTimer);
					videoItem.appendTo(videosContainer);
				}
			break;
		}
	}
	
	function removeVideos(){
		
		options.videos = [];
		countVideos=-1;
		$(".videosToggle2").parent().animate({
				'opacity': 0
			}, 300).slideUp(300, function () {
					$(this).remove();
				});
	}
	function loadYoutubeData(inputVal, youtubeAPIKey){
		//load playlist data and create video preroll sections
		// var channelURL = 'http://gdata.youtube.com/feeds/api/users/'+inputVal+'/uploads?alt=json&orderby=published';
		// var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/'+inputVal+'?v=2&alt=json';
		var channelURL = 'https://www.googleapis.com/youtube/v3/search?order=date&maxResults=50&part=snippet&channelId='+inputVal+'&key='+youtubeAPIKey;
		var playListURL = 'https://www.googleapis.com/youtube/v3/playlistItems?&maxResults=50&part=snippet&playlistId='+inputVal+'&key='+youtubeAPIKey;
		
		if(selected=="YouTube playlist")
			url = playListURL;
		else if(selected=="YouTube channel")
			url = channelURL; 
		
		// if(inputVal != "" && inputVal != "enter youtube channel ID" && inputVal != "enter youtube playlist ID"){
		if( (inputVal != "" && inputVal != $(".youtubeChannelID").val() && inputVal != $(".youtubePlaylistInput").val()) && youtubeAPIKey != "" ){
			
			requestYTList();
		}
	}
	function requestYTList(){
		
		var _url;
		
		if (nextPageToken!=undefined)
			_url  = url + "&pageToken=" + nextPageToken
		else
			_url = url
		
		$.ajax({
			url: _url,
			success: function(data) {
				self.data = data;
				
				nextPageToken = data.nextPageToken;
				
				$.each(data.items, function(i, item) {
					
					countVideos=countVideos+1;
					feedTitle = item.snippet.title;
					
					// console.log(countVideos, feedTitle)
					if(self.options.youtubeChannelNumberOfVideos != "" && self.options.youtubeChannelNumberOfVideos != undefined){
                        if(countVideos >= parseInt(self.options.youtubeChannelNumberOfVideos))
                            return
                    }
                    else{
                        if(selected=="YouTube channel"){
                            if(countVideos >= data.items.length - 2)
                            return
                        }
                        
                    }
					//no videos
					if(jQuery.isEmptyObject(options.videos))
					{
						videoItem = createVideoHtml_youtubePlaylist("videos["+countVideos+"]", countVideos, "videoType", feedTitle, "prerollAD","prerollGotoLink","preroll_mp4","prerollSkipTimer","midrollAD","midrollAD_displayTime","midrollGotoLink","midroll_mp4","midrollSkipTimer","postrollAD","postrollGotoLink","postroll_mp4","postrollSkipTimer","popupAdShow", "popupImg", "popupAdStartTime", "popupAdEndTime", "popupAdGoToLink");
						
					}
					//videos exists
					else
					{
						video = options.videos[countVideos];
						videoItem = createVideoHtml_youtubePlaylist("videos["+countVideos+"]", countVideos, video.videoType, feedTitle,video.prerollAD,video.prerollGotoLink,video.preroll_mp4,video.prerollSkipTimer,video.midrollAD,video.midrollAD_displayTime,video.midrollGotoLink,video.midroll_mp4,video.midrollSkipTimer,video.postrollAD,video.postrollGotoLink,video.postroll_mp4,video.postrollSkipTimer,video.popupAdShow, video.popupImg, video.popupAdStartTime, video.popupAdEndTime, video.popupAdGoToLink);
						
					}
					
					
					videosContainer = $("#videos-container");
					videoItem.appendTo(videosContainer);
					
					addListeners();
				});
                
				
				if(data.nextPageToken!=undefined){
					requestYTList();
				}
			}
		});
	}

	$(".tabs").tabs();
	$(".ui-sortable").sortable();
	addListeners();

	// if ($('.video').length > 0) {
    if (videosContainer!= undefined && videosContainer.find(".video").length > 0) {
		// it exists
		countVideos=videosContainer.find(".video").length-1;
	}
	else{
		countVideos=-1;}

	$('#add-new-video-button.general').click(function (e) {

		e.preventDefault();
		
		if(selected=="- Select player type -")
			countVideos = -1;
		else
			countVideos=countVideos+1;

        switch(selected){
            case "HTML5 (self-hosted)":
                var videoItem = createVideoHtml_html5("videos["+countVideos+"]", countVideos, "videoType", "title", "mp4HD", "mp4SD", "mp4VideoThumbnails_vtt", "mp4VideoThumbnails_img", "ccUrl", "enable_mp4_download", "prerollAD","prerollGotoLink","preroll_mp4","prerollSkipTimer", "description", "thumbImg", "info", "midrollAD", "midrollAD_displayTime", "midrollGotoLink", "midroll_mp4", "midrollSkipTimer", "postrollAD", "postrollGotoLink", "postroll_mp4", "postrollSkipTimer", "popupAdShow", "popupImg", "popupAdStartTime", "popupAdEndTime", "popupAdGoToLink");
                var videosContainer = $("#videos-container");
                videoItem.appendTo(videosContainer);
                break;
            case "YouTube":
                var videoItem = createVideoHtml_youtube("videos["+countVideos+"]", countVideos, "videoType", "title", "youtubeID", "mp4HD", "prerollAD","prerollGotoLink","preroll_mp4","prerollSkipTimer", "midrollAD", "midrollAD_displayTime", "midrollGotoLink", "midroll_mp4", "midrollSkipTimer", "postrollAD", "postrollGotoLink", "postroll_mp4", "postrollSkipTimer", "popupAdShow", "popupImg", "popupAdStartTime", "popupAdEndTime", "popupAdGoToLink", "description", "thumbImg","info");
                var videosContainer = $("#videos-container");
                videoItem.appendTo(videosContainer);
                break;
            case "Vimeo":
                var videoItem = createVideoHtml_vimeo("videos["+countVideos+"]", countVideos, "videoType", "title", "vimeoID", "mp4HD", "prerollAD","prerollGotoLink","preroll_mp4","prerollSkipTimer", "description", "thumbImg", "midrollAD", "midrollAD_displayTime", "midrollGotoLink", "midroll_mp4", "midrollSkipTimer", "postrollAD", "postrollGotoLink", "postroll_mp4", "postrollSkipTimer", "popupAdShow", "popupImg", "popupAdStartTime", "popupAdEndTime", "popupAdGoToLink");
                var videosContainer = $("#videos-container");
                videoItem.appendTo(videosContainer);
                break;
			case "Image":
                var videoItem = createVideoHtml_image("videos["+countVideos+"]", countVideos, "videoType", "title", "description", "thumbImg", "imageUrl", "imageTimer");
                var videosContainer = $("#videos-container");
                videoItem.appendTo(videosContainer);
                break;
        }

		addListeners();

		return;
	});
	$('#add-new-video-button.html5').click(function (e) {

		e.preventDefault();
		
		if(selected=="- Select player type -")
			countVideos = -1;
		else
			countVideos=countVideos+1;

		var videoItem = createVideoHtml_html5("videos["+countVideos+"]", countVideos, "videoType", "title", "mp4HD", "mp4SD", "mp4VideoThumbnails_vtt", "mp4VideoThumbnails_img", "ccUrl", "enable_mp4_download", "prerollAD","prerollGotoLink","preroll_mp4","prerollSkipTimer", "description", "thumbImg", "info", "midrollAD", "midrollAD_displayTime", "midrollGotoLink", "midroll_mp4", "midrollSkipTimer", "postrollAD", "postrollGotoLink", "postroll_mp4", "postrollSkipTimer", "popupAdShow", "popupImg", "popupAdStartTime", "popupAdEndTime", "popupAdGoToLink");
		
		var videosContainer = $("#videos-container");
		videoItem.appendTo(videosContainer);
 
		addListeners();

		return;
	});
	
	$('#add-new-video-button.youtube').click(function (e) {

		e.preventDefault();
		
		if(selected=="- Select player type -")
			countVideos = -1;
		else
			countVideos=countVideos+1;

		var videoItem = createVideoHtml_youtube("videos["+countVideos+"]", countVideos, "videoType", "title", "youtubeID", "mp4HD", "prerollAD","prerollGotoLink","preroll_mp4","prerollSkipTimer", "midrollAD", "midrollAD_displayTime", "midrollGotoLink", "midroll_mp4", "midrollSkipTimer", "postrollAD", "postrollGotoLink", "postroll_mp4", "postrollSkipTimer", "popupAdShow", "popupImg", "popupAdStartTime", "popupAdEndTime", "popupAdGoToLink", "description", "thumbImg","info");
               
		var videosContainer = $("#videos-container");
        
		videoItem.appendTo(videosContainer);
 
		addListeners();

		return;
	});
	
	$('#add-new-video-button.vimeo').click(function (e) {

		e.preventDefault();
		
		if(selected=="- Select player type -")
			countVideos = -1;
		else
			countVideos=countVideos+1;

		var videoItem = createVideoHtml_vimeo("videos["+countVideos+"]", countVideos, "videoType", "title", "vimeoID", "mp4HD", "prerollAD","prerollGotoLink","preroll_mp4","prerollSkipTimer", "description", "thumbImg", "midrollAD", "midrollAD_displayTime", "midrollGotoLink", "midroll_mp4", "midrollSkipTimer", "postrollAD", "postrollGotoLink", "postroll_mp4", "postrollSkipTimer", "popupAdShow", "popupImg", "popupAdStartTime", "popupAdEndTime", "popupAdGoToLink");
                
		var videosContainer = $("#videos-container");
                
		videoItem.appendTo(videosContainer);
 
		addListeners();

		return;
	});
	
	$('#add-new-video-button.image').click(function (e) {

		e.preventDefault();
		
		if(selected=="- Select player type -")
			countVideos = -1;
		else
			countVideos=countVideos+1;

		var videoItem = createVideoHtml_image("videos["+countVideos+"]", countVideos, "videoType", "title", "description", "thumbImg", "imageUrl", "imageTimer");
        
		var videosContainer = $("#videos-container");
        
		videoItem.appendTo(videosContainer);
 
		addListeners();

		return;
	});

	function addListeners(){
		$('.submitdelete').click(function () {
		/* console.log("delete"); */
			$(this).parent().parent().parent().parent().animate({
				'opacity': 0
			}, 100).slideUp(100, function () {
					$(this).remove();
				});			
		});
		if(selected=="YouTube playlist")
			$('.submitdelete').parent().hide();
		else if(selected=="YouTube channel")
			$('.submitdelete').parent().hide();
		else
			$('.submitdelete').parent().show();
		
		$('.select-image-button').click(function(e) {
			e.preventDefault();
			
			var imageURLInput = $(this).parent().find("input");
			var custom_uploader = wp.media({
				title: 'Select image',
				button: {
					text: 'Select'
				},
				multiple: false  // Set this to true to allow multiple files to be selected
			})
			.on('select', function() {
				var arr = custom_uploader.state().get('selection');
				var url = arr.models[0].attributes.url;
				imageURLInput.val(url);
			})
			.open();
		});

		jQuery('.videosToggle1').each(function loopingItems()
		{
			jQuery(this).unbind('click');
		});
		
		jQuery('.videosToggle1').each(function loopingItems()
		{
			jQuery(this).click( function() 
			{
				jQuery(jQuery(this).parent().get(0)).toggleClass('closed');
			});
		});
		
		jQuery('.videosToggle2').each(function loopingItems()
		{
			jQuery(this).unbind('click');
		});
		
		jQuery('.videosToggle2').each(function loopingItems()
		{
			jQuery(this).click( function() 
			{
				jQuery(jQuery(this).parent().get(0)).toggleClass('closed');
			});
		});
	}
	
    function createVideoHtml_html5(prefix, id, videoType, title, mp4HD, mp4SD, mp4VideoThumbnails_vtt, mp4VideoThumbnails_img, ccUrl, enable_mp4_download, prerollAD, prerollGotoLink, preroll_mp4, prerollSkipTimer,  description, thumbImg, info, midrollAD, midrollAD_displayTime, midrollGotoLink, midroll_mp4, midrollSkipTimer, postrollAD, postrollGotoLink, postroll_mp4, postrollSkipTimer, popupAdShow, popupImg, popupAdStartTime, popupAdEndTime, popupAdGoToLink)
	{
		if (typeof(prerollAD) == 'undefined' || prerollAD != "yes") 
			prerollAD = "no";
		if (typeof(midrollAD) == 'undefined' || midrollAD != "yes") 
			midrollAD = "no";
		if (typeof(postrollAD) == 'undefined' || postrollAD != "yes") 
			postrollAD = "no";
		if (typeof(popupAdShow) == 'undefined' || popupAdShow != "yes") 
			popupAdShow = "no";
		if (typeof(enable_mp4_download) == 'undefined' || enable_mp4_download != "yes") 
			enable_mp4_download = "no";

			
		var markup = $(
		'<div class="videos">'
			+'<div class="postbox closed">'
				+'<div class="handlediv videosToggle2" title="Click to toggle"></div>'
				+'<h3 class="hndle videosToggle1">'
					+'<span id="sortable-title">Video Title '+id+' : '+title+'</span>'
				+'</h3>'
				+'<div class="inside postBoxInside">'
					
				+'<div id="'+id+'"class="video">'
					+'<text id="video-section-count">HTML5 video '+id+'</text>'
						+ '<table class="form-table" id="player-videos-table">'
							+'<tbody>'
								+'<tr valign="top" class="field-row" style="display:none;">'
									+'<th scope="row">Video type</th>'
									+'<td><input id="video-type" name="'+prefix+'[videoType]" type="text" placeholder="" value="HTML5" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Video title</th>'
									+'<td><input id="video-title" name="'+prefix+'[title]" type="text" placeholder="Enter video title" value="'+title+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Description</th>'
									+'<td><textarea id="video-description" name="'+prefix+'[description]" type="text" cols="30" rows="2" placeholder="Enter video description">'+description+'</textarea></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Info</th>'
									+'<td><textarea id="video-info" name="'+prefix+'[info]" type="text" cols="30" rows="2" placeholder="Enter video info">'+info+'</textarea></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Thumbnail image [playlist]</th>'
									+'<td><input id="image-path" name="'+prefix+'[thumbImg]" type="text" placeholder="Thumbnail URL" value="'+thumbImg+'" /><a class="select-image-button button-secondary button80" href="#">Select image</a></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">MP4 HD video URL</th>'
									+'<td><input id="video-mp4HD" name="'+prefix+'[mp4HD]" type="text" placeholder="Enter .mp4 HD video URL" value="'+mp4HD+'" /></td>'
								+'</tr>'
                                +'<tr valign="top" class="field-row">'
									+'<th scope="row">MP4 SD video URL</th>'
									+'<td><input id="video-mp4SD" name="'+prefix+'[mp4SD]" type="text" placeholder="Enter .mp4 SD video URL" value="'+mp4SD+'" /></td>'
								+'</tr>'
                                +'<tr valign="top" class="field-row">'
									+'<th scope="row">Video thumbnails .vtt [progress bar]</th>'
									+'<td><input id="video-thumbnails-vtt-path" name="'+prefix+'[mp4VideoThumbnails_vtt]" type="text" placeholder="Enter .vtt URL" value="'+mp4VideoThumbnails_vtt+'" /><a class="select-image-button button-secondary button80" href="#">Select .vtt file</a></td>'
								+'</tr>'
                                +'<tr valign="top" class="field-row">'
									+'<th scope="row">Video thumbnails .jpg [progress bar]</th>'
									+'<td><input id="video-thumbnails-jpg-path" name="'+prefix+'[mp4VideoThumbnails_img]" type="text" placeholder="Enter .jpg URL" value="'+mp4VideoThumbnails_img+'" /><a class="select-image-button button-secondary button80" href="#">Select image</a></td>'
								+'</tr>'
                                +'<tr valign="top" class="field-row">'
									+'<th scope="row">Subtitles url</th>'
									+'<td><input id="cc-path" name="'+prefix+'[ccUrl]" type="text" placeholder="Subtitles URL" value="'+ccUrl+'" /><a class="select-image-button button-secondary button80" href="#">Select subtitles</a></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Enable video download</th>'
									+'<td>'
									+ '<select id="enable-video-download" name="'+prefix+'[enable_mp4_download]">'
									+ '</select>'
									+'</td>'
								+'</tr>'

								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show PRE-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="preroll-show" name="'+prefix+'[prerollAD]">'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll redirect URL</th>'
									+'<td><input id="video-ad-goto" name="'+prefix+'[prerollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+prerollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll mp4 source</th>'
									+'<td><input id="video-mp4-ad" name="'+prefix+'[preroll_mp4]" type="text" placeholder="Enter .mp4 pre-roll URL" value="'+preroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll skip timer [seconds]</th>'
									+'<td><input id="video-mp4-skip-timer" name="'+prefix+'[prerollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+prerollSkipTimer+'" /></td>'
								+'</tr>'
								//============= mid roll =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show MID-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="midroll-show" name="'+prefix+'[midrollAD]">'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll display time [mm:ss]</th>'
									+'<td><input id="show-midroll-time" name="'+prefix+'[midrollAD_displayTime]" type="text" placeholder="minutes:seconds" value="'+midrollAD_displayTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll redirect URL</th>'
									+'<td><input id="midroll-video-ad-goto" name="'+prefix+'[midrollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+midrollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll mp4 source</th>'
									+'<td><input id="preroll-video-mp4-ad" name="'+prefix+'[midroll_mp4]" type="text" placeholder="Enter .mp4 mid-roll URL" value="'+midroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll skip timer [seconds]</th>'
									+'<td><input id="midroll-video-mp4-skip-timer" name="'+prefix+'[midrollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+midrollSkipTimer+'" /></td>'
								+'</tr>'
								//============= post roll =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show POST-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="postroll-show" name="'+prefix+'[postrollAD]">'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll redirect URL</th>'
									+'<td><input id="postroll-video-ad-goto" name="'+prefix+'[postrollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+postrollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll mp4 source</th>'
									+'<td><input id="preroll-video-mp4-ad" name="'+prefix+'[postroll_mp4]" type="text" placeholder="Enter .mp4 pre-roll URL" value="'+postroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll skip timer [seconds]</th>'
									+'<td><input id="postroll-video-mp4-skip-timer" name="'+prefix+'[postrollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+postrollSkipTimer+'" /></td>'
								+'</tr>'
								//============= pop up =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show POP-UP Ad?</th>'
									+'<td>'
									+ '<select id="popup-show-HTML5" name="'+prefix+'[popupAdShow]">'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad image source</th>'
									+'<td><input id="popup-image-path" name="'+prefix+'[popupImg]" type="text" placeholder="select image" value="'+popupImg+'" /><a class="select-image-button button-secondary button80" href="#">Select image</a></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad start time [mm:ss]</th>'
									+'<td><input id="popup-ad-start-time" name="'+prefix+'[popupAdStartTime]" type="text" placeholder="minutes:seconds" value="'+popupAdStartTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad end time [mm:ss]</th>'
									+'<td><input id="popup-ad-end-time" name="'+prefix+'[popupAdEndTime]" type="text" placeholder="minutes:seconds" value="'+popupAdEndTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up redirect URL</th>'
									+'<td><input id="popup-ad-goto-link" name="'+prefix+'[popupAdGoToLink]" type="text" placeholder="Go to link on pop-up click" value="'+popupAdGoToLink+'" /></td>'
								+'</tr>'
								+ '<div class="button-secondary submitbox deletediv"><a class="submitdelete deletion">Delete</a></div>'
							+'</tbody>'
						+'</table>'
					+ '<div class="sep"></div>'
				+ '</div>'
				
				
				
				+'</div>'
			+'</div>'
		+'</div>'
			);

			var values = ["no", "yes"];
			var select = markup.find('#preroll-show');
			for ( var i = 0; i < values.length; i++ ) {
				var option = $('<option name="'+prefix+'[prerollAD]" value="'+values[i]+'">'+values[i]+'</option>').appendTo(select);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["prerollAD"] == values[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values2 = ["no", "yes"];
			var select2 = markup.find('#midroll-show');
			for ( var i = 0; i < values2.length; i++ ) {
				var option = $('<option name="'+prefix+'[midrollAD]" value="'+values2[i]+'">'+values2[i]+'</option>').appendTo(select2);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["midrollAD"] == values2[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values3 = ["no", "yes"];
			var select3 = markup.find('#postroll-show');
			for ( var i = 0; i < values3.length; i++ ) {
				var option = $('<option name="'+prefix+'[postrollAD]" value="'+values3[i]+'">'+values3[i]+'</option>').appendTo(select3);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["postrollAD"] == values3[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values4 = ["no", "yes"];
			var select4 = markup.find('#popup-show-HTML5');
			for ( var i = 0; i < values4.length; i++ ) {
				var option = $('<option name="'+prefix+'[popupAdShow]" value="'+values4[i]+'">'+values4[i]+'</option>').appendTo(select4);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["popupAdShow"] == values4[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values5 = ["no", "yes"];
			var select5 = markup.find('#enable-video-download');
			for ( var i = 0; i < values5.length; i++ ) {
				var option = $('<option name="'+prefix+'[enable_mp4_download]" value="'+values5[i]+'">'+values5[i]+'</option>').appendTo(select5);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["enable_mp4_download"] == values5[i]){
						option.attr('selected','true');
					}
				}
			}
			
			return markup;
			
			
	}    
	
	function createVideoHtml_youtube(prefix,id, videoType, title,youtubeID,mp4HD,prerollAD,prerollGotoLink,preroll_mp4,prerollSkipTimer,midrollAD, midrollAD_displayTime, midrollGotoLink, midroll_mp4, midrollSkipTimer, postrollAD, postrollGotoLink, postroll_mp4, postrollSkipTimer,  popupAdShow, popupImg, popupAdStartTime, popupAdEndTime, popupAdGoToLink, description,thumbImg,info) 
	{
		if (typeof(prerollAD) == 'undefined' || prerollAD != "yes") 
			prerollAD = "no";
		if (typeof(midrollAD) == 'undefined' || midrollAD != "yes") 
			midrollAD = "no";
		if (typeof(postrollAD) == 'undefined' || postrollAD != "yes") 
			postrollAD = "no";
		if (typeof(popupAdShow) == 'undefined' || popupAdShow != "yes") 
			popupAdShow = "no";

		var markup = $(
		'<div class="videos">'
			+'<div class="postbox closed">'
				+'<div class="handlediv videosToggle2" title="Click to toggle"></div>'
				+'<h3 class="hndle videosToggle1">'
					+'<span id="sortable-title">Video Title '+id+' : '+title+'</span>'
				+'</h3>'
				+'<div class="inside postBoxInside">'
		
		
				+'<div id="'+id+'"class="video">'
					+'<text id="video-section-count"> YouTube video '+id+'</text>'
						+ '<table class="form-table" id="player-videos-table">'
							+'<tbody>'
								+'<tr valign="top" class="field-row" style="display:none;">'
									+'<th scope="row">Video type</th>'
									+'<td><input id="video-type" name="'+prefix+'[videoType]" type="text" placeholder="" value="youtube" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Video title</th>'
									+'<td><input id="video-title" name="'+prefix+'[title]" type="text" placeholder="Enter video title" value="'+title+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Description</th>'
									+'<td><textarea id="video-description" name="'+prefix+'[description]" type="text" cols="30" rows="2" placeholder="Enter video description">'+description+'</textarea></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Info</th>'
									+'<td><textarea id="video-description" name="'+prefix+'[info]" type="text" cols="30" rows="2" placeholder="Enter video info">'+info+'</textarea></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Thumbnail image [playlist]</th>'
									+'<td><input id="image-path" name="'+prefix+'[thumbImg]" type="text" placeholder="Thumbnail URL" value="'+thumbImg+'" /><a class="select-image-button button-secondary button80" href="#">Select image</a></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">YouTube ID</th>'
									+'<td><input id="youtube-id" name="'+prefix+'[youtubeID]" type="text" placeholder="Enter youtube ID" value="'+youtubeID+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show PRE-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="preroll-show" name="'+prefix+'[prerollAD]">'
                                    
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll redirect URL</th>'
									+'<td><input id="video-ad-goto" name="'+prefix+'[prerollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+prerollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll mp4 source</th>'
									+'<td><input id="video-mp4-ad" name="'+prefix+'[preroll_mp4]" type="text" placeholder="Enter .mp4 pre-roll URL" value="'+preroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll skip timer [seconds]</th>'
									+'<td><input id="video-mp4-skip-timer" name="'+prefix+'[prerollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+prerollSkipTimer+'" /></td>'
								+'</tr>'
								//============= mid roll =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show MID-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="midroll-show" name="'+prefix+'[midrollAD]">'
                                    
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll display time [mm:ss]</th>'
									+'<td><input id="show-midroll-time" name="'+prefix+'[midrollAD_displayTime]" type="text" placeholder="minutes:seconds" value="'+midrollAD_displayTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll redirect URL</th>'
									+'<td><input id="midroll-video-ad-goto" name="'+prefix+'[midrollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+midrollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll mp4 source</th>'
									+'<td><input id="preroll-video-mp4-ad" name="'+prefix+'[midroll_mp4]" type="text" placeholder="Enter .mp4 mid-roll URL" value="'+midroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll skip timer [seconds]</th>'
									+'<td><input id="midroll-video-mp4-skip-timer" name="'+prefix+'[midrollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+midrollSkipTimer+'" /></td>'
								+'</tr>'
								//============= post roll =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show POST-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="postroll-show" name="'+prefix+'[postrollAD]">'
                                    
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll redirect URL</th>'
									+'<td><input id="postroll-video-ad-goto" name="'+prefix+'[postrollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+postrollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll mp4 source</th>'
									+'<td><input id="preroll-video-mp4-ad" name="'+prefix+'[postroll_mp4]" type="text" placeholder="Enter .mp4 pre-roll URL" value="'+postroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll skip timer [seconds]</th>'
									+'<td><input id="postroll-video-mp4-skip-timer" name="'+prefix+'[postrollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+postrollSkipTimer+'" /></td>'
								+'</tr>'
								//============= pop up =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show POP-UP Ad?</th>'
									+'<td>'
									+ '<select id="popup-show-youtube" name="'+prefix+'[popupAdShow]">'
                                    
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad image source</th>'
									+'<td><input id="popup-image-path" name="'+prefix+'[popupImg]" type="text" placeholder="select image" value="'+popupImg+'" /><a class="select-image-button button-secondary button80" href="#">Select image</a></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad start time [mm:ss]</th>'
									+'<td><input id="popup-ad-start-time" name="'+prefix+'[popupAdStartTime]" type="text" placeholder="minutes:seconds" value="'+popupAdStartTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad end time [mm:ss]</th>'
									+'<td><input id="popup-ad-end-time" name="'+prefix+'[popupAdEndTime]" type="text" placeholder="minutes:seconds" value="'+popupAdEndTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up redirect URL</th>'
									+'<td><input id="popup-ad-goto-link" name="'+prefix+'[popupAdGoToLink]" type="text" placeholder="Go to link on pop-up click" value="'+popupAdGoToLink+'" /></td>'
								+'</tr>'
								+ '<div class="button-secondary submitbox deletediv"><a class="submitdelete deletion">Delete</a></div>'
							+'</tbody>'
						+'</table>'
					+ '<div class="sep"></div>'
				+ '</div>'
				
				
				+'</div>'
			+'</div>'
		+'</div>'
			);

			var values = ["no", "yes"];
			var select = markup.find('#preroll-show');
			for ( var i = 0; i < values.length; i++ ) {
				var option = $('<option name="'+prefix+'[prerollAD]" value="'+values[i]+'">'+values[i]+'</option>').appendTo(select);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["prerollAD"] == values[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values2 = ["no", "yes"];
			var select2 = markup.find('#midroll-show');
			for ( var i = 0; i < values2.length; i++ ) {
				var option = $('<option name="'+prefix+'[midrollAD]" value="'+values2[i]+'">'+values2[i]+'</option>').appendTo(select2);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["midrollAD"] == values2[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values3 = ["no", "yes"];
			var select3 = markup.find('#postroll-show');
			for ( var i = 0; i < values3.length; i++ ) {
				var option = $('<option name="'+prefix+'[postrollAD]" value="'+values3[i]+'">'+values3[i]+'</option>').appendTo(select3);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["postrollAD"] == values3[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values4 = ["no", "yes"];
			var select4 = markup.find('#popup-show-youtube');
			for ( var i = 0; i < values4.length; i++ ) {
				var option = $('<option name="'+prefix+'[popupAdShow]" value="'+values4[i]+'">'+values4[i]+'</option>').appendTo(select4);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["popupAdShow"] == values4[i]){
						option.attr('selected','true');
					}
				}
			}
			/*var values3 = ["yes", "no"];
			var select3 = markup.find('#popupText-show');
			for ( var i = 0; i < values3.length; i++ ) {
				var option = $('<option name="'+prefix+'[textAdShow]" value="'+values3[i]+'">'+values3[i]+'</option>').appendTo(select3);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["textAdShow"] == values3[i]){
						option.attr('selected','true');
					}
				}
			}*/
			
			return markup;
	}
	function createVideoHtml_youtubePlaylist(prefix,id,videoType,feedTitle,prerollAD,prerollGotoLink,preroll_mp4,prerollSkipTimer,midrollAD, midrollAD_displayTime, midrollGotoLink, midroll_mp4, midrollSkipTimer, postrollAD, postrollGotoLink, postroll_mp4, postrollSkipTimer,  popupAdShow, popupImg, popupAdStartTime, popupAdEndTime, popupAdGoToLink) 
	{
		if (typeof(prerollAD) == 'undefined' || prerollAD != "yes") 
			prerollAD = "no";
		if (typeof(midrollAD) == 'undefined' || midrollAD != "yes") 
			midrollAD = "no";
		if (typeof(postrollAD) == 'undefined' || postrollAD != "yes") 
			postrollAD = "no";
		if (typeof(popupAdShow) == 'undefined' || popupAdShow != "yes") 
			popupAdShow = "no";
		
		/*if (typeof(textAdShow) == 'undefined' || textAdShow != "yes") 
			textAdShow = "no";*/
			
		var markup = $(
		'<div class="videos">'
			+'<div class="postbox closed">'
				+'<div class="handlediv videosToggle2" title="Click to toggle"></div>'
				+'<h3 class="hndle videosToggle1">'
					+'<span id="sortable-title">Video Title '+id+' : '+feedTitle+'</span>'
				+'</h3>'
				+'<div class="inside postBoxInside">'
		
		
				+'<div id="'+id+'"class="video">'
					+'<text id="video-section-count"> YouTube playlist video '+id+'</text>'
						+ '<table class="form-table" id="player-videos-table">'
							+'<tbody>'
								+'<tr valign="top" class="field-row" style="display:none;">'
									+'<th scope="row">Video type</th>'
									+'<td><input id="video-type" name="'+prefix+'[videoType]" type="text" placeholder="" value="youtube" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show PRE-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="preroll-show" name="'+prefix+'[prerollAD]">'
										// + '<option name="'+prefix+'[prerollAD]" value="yes">yes</option>'
										// + '<option name="'+prefix+'[prerollAD]" value="no">no</option>'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll redirect URL</th>'
									+'<td><input id="video-ad-goto" name="'+prefix+'[prerollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+prerollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll mp4 source</th>'
									+'<td><input id="video-mp4-ad" name="'+prefix+'[preroll_mp4]" type="text" placeholder="Enter .mp4 pre-roll URL" value="'+preroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll skip timer [seconds]</th>'
									+'<td><input id="video-mp4-skip-timer" name="'+prefix+'[prerollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+prerollSkipTimer+'" /></td>'
								+'</tr>'
								//============= mid roll =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show MID-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="midroll-show" name="'+prefix+'[midrollAD]">'
										// + '<option name="'+prefix+'[midrollAD]" value="yes">yes</option>'
										// + '<option name="'+prefix+'[midrollAD]" value="no">no</option>'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll display time [mm:ss]</th>'
									+'<td><input id="show-midroll-time" name="'+prefix+'[midrollAD_displayTime]" type="text" placeholder="minutes:seconds" value="'+midrollAD_displayTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll redirect URL</th>'
									+'<td><input id="midroll-video-ad-goto" name="'+prefix+'[midrollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+midrollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll mp4 source</th>'
									+'<td><input id="preroll-video-mp4-ad" name="'+prefix+'[midroll_mp4]" type="text" placeholder="Enter .mp4 mid-roll URL" value="'+midroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll skip timer [seconds]</th>'
									+'<td><input id="midroll-video-mp4-skip-timer" name="'+prefix+'[midrollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+midrollSkipTimer+'" /></td>'
								+'</tr>'
								//============= post roll =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show POSTROLL Video ad?</th>'
									+'<td>'
									+ '<select id="postroll-show" name="'+prefix+'[postrollAD]">'
										// + '<option name="'+prefix+'[postrollAD]" value="yes">yes</option>'
										// + '<option name="'+prefix+'[postrollAD]" value="no">no</option>'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll redirect URL</th>'
									+'<td><input id="postroll-video-ad-goto" name="'+prefix+'[postrollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+postrollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll mp4 source</th>'
									+'<td><input id="preroll-video-mp4-ad" name="'+prefix+'[postroll_mp4]" type="text" placeholder="Enter .mp4 pre-roll URL" value="'+postroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll skip timer [seconds]</th>'
									+'<td><input id="postroll-video-mp4-skip-timer" name="'+prefix+'[postrollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+postrollSkipTimer+'" /></td>'
								+'</tr>'
								//============= pop up =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show POPUP Image Ad?</th>'
									+'<td>'
									+ '<select id="popup-show-youtube-playlist" name="'+prefix+'[popupAdShow]">'
										// + '<option name="'+prefix+'[popupAdShow]" value="yes">yes</option>'
										// + '<option name="'+prefix+'[popupAdShow]" value="no">no</option>'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad image source</th>'
									+'<td><input id="popup-image-path" name="'+prefix+'[popupImg]" type="text" placeholder="select image" value="'+popupImg+'" /><a class="select-image-button button-secondary button80" href="#">Select image</a></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad start time [mm:ss]</th>'
									+'<td><input id="popup-ad-start-time" name="'+prefix+'[popupAdStartTime]" type="text" placeholder="minutes:seconds" value="'+popupAdStartTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad end time [mm:ss]</th>'
									+'<td><input id="popup-ad-end-time" name="'+prefix+'[popupAdEndTime]" type="text" placeholder="minutes:seconds" value="'+popupAdEndTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up redirect URL</th>'
									+'<td><input id="popup-ad-goto-link" name="'+prefix+'[popupAdGoToLink]" type="text" placeholder="Go to link on pop-up click" value="'+popupAdGoToLink+'" /></td>'
								+'</tr>'
								+ '<div class="button-secondary submitbox deletediv"><a class="submitdelete deletion">Delete</a></div>'
							+'</tbody>'
						+'</table>'
					+ '<div class="sep"></div>'
				+ '</div>'
				
				
				+'</div>'
			+'</div>'
		+'</div>'
			);

			var values = ["no", "yes"];
			var select = markup.find('#preroll-show');
			for ( var i = 0; i < values.length; i++ ) {
				var option = $('<option name="'+prefix+'[prerollAD]" value="'+values[i]+'">'+values[i]+'</option>').appendTo(select);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["prerollAD"] == values[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values2 = ["no", "yes"];
			var select2 = markup.find('#midroll-show');
			for ( var i = 0; i < values2.length; i++ ) {
				var option = $('<option name="'+prefix+'[midrollAD]" value="'+values2[i]+'">'+values2[i]+'</option>').appendTo(select2);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["midrollAD"] == values2[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values3 = ["no", "yes"];
			var select3 = markup.find('#postroll-show');
			for ( var i = 0; i < values3.length; i++ ) {
				var option = $('<option name="'+prefix+'[postrollAD]" value="'+values3[i]+'">'+values3[i]+'</option>').appendTo(select3);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["postrollAD"] == values3[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values4 = ["no", "yes"];
			var select4 = markup.find('#popup-show-youtube-playlist');
			for ( var i = 0; i < values4.length; i++ ) {
				var option = $('<option name="'+prefix+'[popupAdShow]" value="'+values4[i]+'">'+values4[i]+'</option>').appendTo(select4);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["popupAdShow"] == values4[i]){
						option.attr('selected','true');
					}
				}
			}
			
			return markup;
	}
	
    function createVideoHtml_vimeo(prefix,id,videoType,title,vimeoID,mp4HD,prerollAD,prerollGotoLink,preroll_mp4,prerollSkipTimer,description,thumbImg,midrollAD, midrollAD_displayTime, midrollGotoLink, midroll_mp4, midrollSkipTimer, postrollAD, postrollGotoLink, postroll_mp4, postrollSkipTimer, popupAdShow, popupImg, popupAdStartTime, popupAdEndTime, popupAdGoToLink) 
	{
		if (typeof(prerollAD) == 'undefined' || prerollAD != "yes") 
			prerollAD = "no";
		if (typeof(midrollAD) == 'undefined' || midrollAD != "yes") 
			midrollAD = "no";
		if (typeof(postrollAD) == 'undefined' || postrollAD != "yes") 
			postrollAD = "no";
		if (typeof(popupAdShow) == 'undefined' || popupAdShow != "yes") 
			popupAdShow = "no";
		
		/*if (typeof(textAdShow) == 'undefined' || textAdShow != "yes") 
			textAdShow = "no";*/
			
		var markup = $(
		'<div class="videos">'
			+'<div class="postbox closed">'
				+'<div class="handlediv videosToggle2" title="Click to toggle"></div>'
				+'<h3 class="hndle videosToggle1">'
					+'<span id="sortable-title">Video Title '+id+' : '+title+'</span>'
				+'</h3>'
		+'<div class="inside postBoxInside">'
		
				+'<div id="'+id+'"class="video">'
					+'<text id="video-section-count"> Vimeo video '+id+'</text>'
						+ '<table class="form-table" id="player-videos-table">'
							+'<tbody>'
								+'<tr valign="top" class="field-row" style="display:none;">'
									+'<th scope="row">Video type</th>'
									+'<td><input id="video-type" name="'+prefix+'[videoType]" type="text" placeholder="" value="vimeo" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Video title</th>'
									+'<td><input id="video-title" name="'+prefix+'[title]" type="text" placeholder="Enter video title" value="'+title+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Description</th>'
									+'<td><textarea id="video-description" name="'+prefix+'[description]" type="text" cols="30" rows="2" placeholder="Enter video description">'+description+'</textarea></td>'
								+'</tr>'
//								+'<tr valign="top" class="field-row">'
//									+'<th scope="row">Info</th>'
//									+'<td><textarea id="video-info" name="'+prefix+'[info]" type="text" cols="30" rows="2" placeholder="Enter video info">'+info+'</textarea></td>'
//								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Thumbnail image [playlist]</th>'
									+'<td><input id="image-path" name="'+prefix+'[thumbImg]" type="text" placeholder="Thumbnail URL" value="'+thumbImg+'" /><a class="select-image-button button-secondary button80" href="#">Select image</a></td>'
								+'</tr>'
//								+'<tr valign="top" class="field-row">'
//									+'<th scope="row">YouTube ID</th>'
//									+'<td><input id="youtube-id" name="'+prefix+'[youtubeID]" type="text" placeholder="Enter youtube ID" value="'+youtubeID+'" /></td>'
//								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Vimeo ID</th>'
									+'<td><input id="youtube-id" name="'+prefix+'[vimeoID]" type="text" placeholder="Enter vimeo ID" value="'+vimeoID+'" /></td>'
								+'</tr>'
//								+'<tr valign="top" class="field-row">'
//									+'<th scope="row">Mp4 video URL</th>'
//									+'<td><input id="video-mp4" name="'+prefix+'[mp4]" type="text" placeholder="Enter .mp4 video URL" value="'+mp4+'" /></td>'
//								+'</tr>'
//								+'<tr valign="top" class="field-row">'
//									+'<th scope="row">Webm video URL</th>'
//									+'<td><input id="video-webm" name="'+prefix+'[webm]" type="text" placeholder="Enter .webm video URL" value="'+webm+'" /></td>'
//								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show PRE-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="preroll-show" name="'+prefix+'[prerollAD]">'
										// + '<option name="'+prefix+'[prerollAD]" value="yes">yes</option>'
										// + '<option name="'+prefix+'[prerollAD]" value="no">no</option>'
									+ '</select>'
									+'</td>'
									/******+'<td><input id="video-ad-show" name="'+prefix+'[prerollAD]" type="text" placeholder="yes / no" value="'+prerollAD+'" /></td>'*******/
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll redirect URL</th>'
									+'<td><input id="video-ad-goto" name="'+prefix+'[prerollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+prerollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll mp4 source</th>'
									+'<td><input id="video-mp4-ad" name="'+prefix+'[preroll_mp4]" type="text" placeholder="Enter .mp4 pre-roll URL" value="'+preroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pre-roll skip timer [seconds]</th>'
									+'<td><input id="video-mp4-skip-timer" name="'+prefix+'[prerollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+prerollSkipTimer+'" /></td>'
								+'</tr>'
								//============= mid roll =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show MID-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="midroll-show" name="'+prefix+'[midrollAD]">'
										// + '<option name="'+prefix+'[midrollAD]" value="yes">yes</option>'
										// + '<option name="'+prefix+'[midrollAD]" value="no">no</option>'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll display time [mm:ss]</th>'
									+'<td><input id="show-midroll-time" name="'+prefix+'[midrollAD_displayTime]" type="text" placeholder="minutes:seconds" value="'+midrollAD_displayTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll redirect URL</th>'
									+'<td><input id="midroll-video-ad-goto" name="'+prefix+'[midrollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+midrollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll mp4 source</th>'
									+'<td><input id="preroll-video-mp4-ad" name="'+prefix+'[midroll_mp4]" type="text" placeholder="Enter .mp4 mid-roll URL" value="'+midroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Mid-roll skip timer [seconds]</th>'
									+'<td><input id="midroll-video-mp4-skip-timer" name="'+prefix+'[midrollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+midrollSkipTimer+'" /></td>'
								+'</tr>'
								//============= post roll =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show POST-ROLL Video Ad?</th>'
									+'<td>'
									+ '<select id="postroll-show" name="'+prefix+'[postrollAD]">'
										// + '<option name="'+prefix+'[postrollAD]" value="yes">yes</option>'
										// + '<option name="'+prefix+'[postrollAD]" value="no">no</option>'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll redirect URL</th>'
									+'<td><input id="postroll-video-ad-goto" name="'+prefix+'[postrollGotoLink]" type="text" placeholder="Go to link on ad click" value="'+postrollGotoLink+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll mp4 source</th>'
									+'<td><input id="preroll-video-mp4-ad" name="'+prefix+'[postroll_mp4]" type="text" placeholder="Enter .mp4 pre-roll URL" value="'+postroll_mp4+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Post-roll skip timer [seconds]</th>'
									+'<td><input id="postroll-video-mp4-skip-timer" name="'+prefix+'[postrollSkipTimer]" type="text" placeholder="Enter sec when to skip ad" value="'+postrollSkipTimer+'" /></td>'
								+'</tr>'
								//============= pop up =============//
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Show POP-UP Ad?</th>'
									+'<td>'
									+ '<select id="popup-show-vimeo" name="'+prefix+'[popupAdShow]">'
										// + '<option name="'+prefix+'[popupAdShow]" value="yes">yes</option>'
										// + '<option name="'+prefix+'[popupAdShow]" value="no">no</option>'
									+ '</select>'
									+'</td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad image source</th>'
									+'<td><input id="popup-image-path" name="'+prefix+'[popupImg]" type="text" placeholder="select image" value="'+popupImg+'" /><a class="select-image-button button-secondary button80" href="#">Select image</a></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad start time [mm:ss]</th>'
									+'<td><input id="popup-ad-start-time" name="'+prefix+'[popupAdStartTime]" type="text" placeholder="minutes:seconds" value="'+popupAdStartTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up ad end time [mm:ss]</th>'
									+'<td><input id="popup-ad-end-time" name="'+prefix+'[popupAdEndTime]" type="text" placeholder="minutes:seconds" value="'+popupAdEndTime+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Pop-up redirect URL</th>'
									+'<td><input id="popup-ad-goto-link" name="'+prefix+'[popupAdGoToLink]" type="text" placeholder="Go to link on pop-up click" value="'+popupAdGoToLink+'" /></td>'
								+'</tr>'
								+ '<div class="button-secondary submitbox deletediv"><a class="submitdelete deletion">Delete</a></div>'
							+'</tbody>'
						+'</table>'
					+ '<div class="sep"></div>'
				+ '</div>'
				
				
				+'</div>'
			+'</div>'
		+'</div>'
			);
			
			var values = ["no", "yes"];
			var select = markup.find('#preroll-show');
			for ( var i = 0; i < values.length; i++ ) {
				var option = $('<option name="'+prefix+'[prerollAD]" value="'+values[i]+'">'+values[i]+'</option>').appendTo(select);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["prerollAD"] == values[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values2 = ["no", "yes"];
			var select2 = markup.find('#midroll-show');
			for ( var i = 0; i < values2.length; i++ ) {
				var option = $('<option name="'+prefix+'[midrollAD]" value="'+values2[i]+'">'+values2[i]+'</option>').appendTo(select2);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["midrollAD"] == values2[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values3 = ["no", "yes"];
			var select3 = markup.find('#postroll-show');
			for ( var i = 0; i < values3.length; i++ ) {
				var option = $('<option name="'+prefix+'[postrollAD]" value="'+values3[i]+'">'+values3[i]+'</option>').appendTo(select3);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["postrollAD"] == values3[i]){
						option.attr('selected','true');
					}
				}
			}
			
			var values4 = ["no", "yes"];
			var select4 = markup.find('#popup-show-vimeo');
			for ( var i = 0; i < values4.length; i++ ) {
				var option = $('<option name="'+prefix+'[popupAdShow]" value="'+values4[i]+'">'+values4[i]+'</option>').appendTo(select4);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["popupAdShow"] == values4[i]){
						option.attr('selected','true');
					}
				}
			}
			
			return markup;
			
	}
	
	function createVideoHtml_image(prefix,id,videoType,title,description,thumbImg,imageUrl,imageTimer) 
	{
		if (typeof(prerollAD) == 'undefined' || prerollAD != "yes") 
			prerollAD = "no";
		
		/*if (typeof(popupAdShow) == 'undefined' || popupAdShow != "yes") 
			popupAdShow = "no";*/
		
		/*if (typeof(textAdShow) == 'undefined' || textAdShow != "yes") 
			textAdShow = "no";*/
			
		var markup = $(
		'<div class="videos">'
			+'<div class="postbox closed">'
				+'<div class="handlediv videosToggle2" title="Click to toggle"></div>'
				+'<h3 class="hndle videosToggle1">'
					+'<span id="sortable-title">Image Banner Title '+id+' : '+title+'</span>'
				+'</h3>'
		+'<div class="inside postBoxInside">'
		
				+'<div id="'+id+'"class="video">'
					+'<text id="video-section-count"> Image banner '+id+'</text>'
						+ '<table class="form-table" id="player-videos-table">'
							+'<tbody>'
								+'<tr valign="top" class="field-row" style="display:none;">'
									+'<th scope="row">Video type</th>'
									+'<td><input id="video-type" name="'+prefix+'[videoType]" type="text" placeholder="" value="image" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Video title</th>'
									+'<td><input id="video-title" name="'+prefix+'[title]" type="text" placeholder="Enter video title" value="'+title+'" /></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Description</th>'
									+'<td><textarea id="video-description" name="'+prefix+'[description]" type="text" cols="30" rows="2" placeholder="Enter video description">'+description+'</textarea></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Thumbnail image [playlist]</th>'
									+'<td><input id="image-path" name="'+prefix+'[thumbImg]" type="text" placeholder="Thumbnail URL" value="'+thumbImg+'" /><a class="select-image-button button-secondary button80" href="#">Select image</a></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Display image</th>'
									+'<td><input id="display-image-path" name="'+prefix+'[imageUrl]" type="text" placeholder="Image URL" value="'+imageUrl+'" /><a class="select-image-button button-secondary button80" href="#">Select image</a></td>'
								+'</tr>'
								+'<tr valign="top" class="field-row">'
									+'<th scope="row">Display image timer (sec)</th>'
									+'<td><input id="display-image-timer" name="'+prefix+'[imageTimer]" type="text" placeholder="Seconds to skip image" value="'+imageTimer+'" /></td>'
								+'</tr>'
								+ '<div class="button-secondary submitbox deletediv"><a class="submitdelete deletion">Delete</a></div>'
							+'</tbody>'
						+'</table>'
					+ '<div class="sep"></div>'
				+ '</div>'
				
				
				+'</div>'
			+'</div>'
		+'</div>'
			);
			
			var values = ["no", "yes"];
			var select = markup.find('#preroll-show');
			for ( var i = 0; i < values.length; i++ ) {
				var option = $('<option name="'+prefix+'[prerollAD]" value="'+values[i]+'">'+values[i]+'</option>').appendTo(select);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["prerollAD"] == values[i]){
						option.attr('selected','true');
					}
				}
			}
			/*var values2 = ["yes", "no"];
			var select2 = markup.find('#popup-show');
			for ( var i = 0; i < values2.length; i++ ) {
				var option = $('<option name="'+prefix+'[popupAdShow]" value="'+values2[i]+'">'+values2[i]+'</option>').appendTo(select2);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["popupAdShow"] == values2[i]){
						option.attr('selected','true');
					}
				}
			}*/
			/*var values3 = ["yes", "no"];
			var select3 = markup.find('#popupText-show');
			for ( var i = 0; i < values3.length; i++ ) {
				var option = $('<option name="'+prefix+'[textAdShow]" value="'+values3[i]+'">'+values3[i]+'</option>').appendTo(select3);
				if(typeof(options["videos"][id]) != 'undefined'){
					if(options["videos"][id]["textAdShow"] == values3[i]){
						option.attr('selected','true');
					}
				}
			}*/
			
			return markup;
			
	}
	
	function showNotification(type){

		$(".notice"+"."+type).stop().slideDown( "fast", function() {
            $(this).delay(2000).slideUp(300);
        });
    }
	
	function checkResponseForVideos(o){
        return (!o.hasOwnProperty('videos') || o.videos.length === 0) ? false : true;
    }
	
	});
})(jQuery);

function stripslashes (str) {
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Ates Goral (http://magnetiq.com)
  // +      fixed by: Mick@el
  // +   improved by: marrtins
  // +   bugfixed by: Onno Marsman
  // +   improved by: rezna
  // +   input by: Rick Waldron
  // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Brant Messenger (http://www.brantmessenger.com/)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: stripslashes('Kevin\'s code');
  // *     returns 1: "Kevin's code"
  // *     example 2: stripslashes('Kevin\\\'s code');
  // *     returns 2: "Kevin\'s code"
  return (str + '').replace(/\\(.?)/g, function (s, n1) {
	switch (n1) {
	case '\\':
	  return '\\';
	case '0':
	  return '\u0000';
	case '':
	  return '';
	default:
	  return n1;
	}
  });
}