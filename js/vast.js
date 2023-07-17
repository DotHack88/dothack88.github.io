var PLAYER = PLAYER || {};
PLAYER.Vast = function (videoPlayer) 
{
    var self = this;
	
	this.videoPlayer = videoPlayer;
	this.options = this.videoPlayer.options;

	this.vastObj = {}
	this.objVMAP
	this.arrVAST = []
	this.countVasts = 0;

	this.countXMLS = 0;
	this.maxcountXMLS = 0;
	this.vastADCount = 0;

	this.allVastMediaFilesArr 	= [] 	
	this.allVastNonLinearArr 	= []	
	this.allVastCompanionArr 	= []	
	
	this.is_VAST = false; 
	this.is_VMAP = false;
	
	this.allVastPREROLLS 	= {}, this.prerollsCount = 0;
	this.allVastMIDROLLS 	= {}, this.midrollsCount = 0;
	this.allVastPOSTROLLS 	= {}, this.postrollsCount = 0;
	this.allVastNONLINEARS 	= {}, this.nonlinearsCount = 0;
	
	
	if(this.options.vastUrl != '')
		this.loadVastUrl(this.options.vastUrl);
}	
	
PLAYER.Vast.prototype = {};

PLAYER.Vast.prototype.loadVastUrl = function(url, timeOffset){
	
	var self=this;
	
	jQuery.ajax({
		type: "GET",
		url: url,
		dataType: "xml",
		success: function(xml)
		{
			self.linear = jQuery(xml).find("Linear").text()
			self.nonLinear = jQuery(xml).find("NonLinearAds").text()
			
			var obj = self.xmlToJson(xml);
			
			
			self.vast_array=new Array();

			jQuery(xml).find("Ad").each(function loopingAd(value)
			{
				var id = jQuery(this).attr("id")
				var offset = jQuery(this).attr("offset")
				
				jQuery(this).find("InLine").each(function()
				{
					var AdSystem = jQuery(this).find("AdSystem").text();
					var AdTitle = jQuery(this).find("AdTitle").text();
					var Description = jQuery(this).find("Description").text();
					var Error = jQuery(this).find("Error").text();
					var Impression = jQuery(this).find("Impression").text();
					var Creatives = jQuery(this).find("Creatives").text();
					
					self.creative = {}
					
					jQuery(this).find("Creatives").each(function(){
						jQuery(this).find("Creative").each(function(val){
							var id = jQuery(this).attr("id");
							var sequence = jQuery(this).attr("sequence");
							
							jQuery(this).find("Linear").each(function(){
								self.duration = {};
								self.trackingEvents = {};
								self.videoClicks = {};
								self.mediaFiles = {};
								
								jQuery(this).find("Duration").each(function(){
									self.duration = jQuery(this).text();
								})
								
								self.trackingEvents = {}
								
								jQuery(this).find("TrackingEvents").each(function(){
									self.tracking = {};
									jQuery(this).find("Tracking").each(function(){
										
										var event = jQuery(this).attr("event");
										var tracking = jQuery(this).text();
										
										self.tracking[event] = {
											event: event,
											tracking: tracking,
										};
									});
									self.trackingEvents = {
										tracking: self.tracking
									};
								})
								
								self.videoClicks = {}
							
								jQuery(this).find("VideoClicks").each(function(){
									jQuery(this).find("ClickThrough").each(function(){
										self.clickThrough = jQuery(this).text();
									});
									self.videoClicks = {
										clickThrough: self.clickThrough
									};
								})
								
								self.mediaFiles = {}
								
								jQuery(this).find("MediaFiles").each(function(){
									jQuery(this).find("MediaFile").each(function(){
										self.mediaFile = jQuery(this).text();
									});
									self.mediaFiles = {
										mediaFiles: self.mediaFile
									};
								})
								
								self.linear = {
									duration: self.duration,
									trackingEvents: self.trackingEvents,
									videoClicks: self.videoClicks,
									mediaFiles: self.mediaFiles
								}
							})
							
							jQuery(this).find("NonLinearAds").each(function(){
								self.trackingEvents = {};
								self.nonLinear = {};
								
								jQuery(this).find("TrackingEvents").each(function(){
									self.tracking = {};
									jQuery(this).find("Tracking").each(function(){
										
										var event = jQuery(this).attr("event");
										var tracking = jQuery(this).text();
										
										self.tracking[event] = {
											event: event,
											tracking: tracking,
										};
									});
									self.trackingEvents = {
										tracking: self.tracking
									};
								})
								
								jQuery(this).find("NonLinear").each(function(){
									self.staticResource = {};
									jQuery(this).find("StaticResource").each(function(){
										
										var creativeType = jQuery(this).attr("creativeType");
										var staticResource = jQuery(this).text();
										
										self.staticResource = {
											creativeType: creativeType,
											staticResource: staticResource,
										};
									});
									jQuery(this).find("NonLinearClickThrough").each(function(){
										self.nonLinearClickThrough = jQuery(this).text();
									})
									jQuery(this).find("NonLinearClickTracking").each(function(){
										self.nonLinearClickTracking = jQuery(this).text();
									})
									self.nonLinear = {
										staticResource: self.staticResource,
										nonLinearClickThrough: self.nonLinearClickThrough,
										nonLinearClickTracking: self.nonLinearClickTracking,
									};
								})
								
								self.nonLinearAds = {
									trackingEvents: self.trackingEvents,
									nonLinear: self.nonLinear,
								}
							})
							
							if(jQuery(this).find('Linear').length > 0){								
								self.creative[val] = {
									id: id,
									sequence: sequence,
									linear: self.linear
								}
							}
							if(jQuery(this).find('NonLinearAds').length > 0){
								self.creative[val] = {
									id: id,
									sequence: sequence,
									nonLinearAds: self.nonLinearAds
								}
							}							
						})
						
						self.Creatives = {
							Creative: self.creative
						}
					})

					self.InLine = {
						AdSystem: AdSystem,
						AdTitle: AdTitle,
						Description: Description,
						Error: Error,
						Impression: Impression,
						Creatives: self.Creatives,
					};
				});
				
				self.ad = {
					id: id,
					InLine: self.InLine
				}
				
				self.vast_array.push(self.ad);
			});
			self.handleLoadedXML(obj, timeOffset);
		}
	});
}
PLAYER.Vast.prototype.xmlToJson = function(xml){
	var obj = {};

	if (xml.nodeType == 1) { 
		
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { 
		obj = xml.nodeValue.trim(); 
	}
	else if (xml.nodeType == 4) { 
		obj = xml.nodeValue
	}

	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = this.xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].length) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				if (typeof(obj[nodeName]) === 'object') {
					obj[nodeName].push(this.xmlToJson(item));
				}
			}
		}
	}
	return obj;
}
PLAYER.Vast.prototype.convertTimeStringToSeconds = function(str){
	if (!(str && str.match(/^(\d){2}(:[0-5][0-9]){2}(.(\d){1,3})?$/))) {
		return false;
	}

	const timeParts = str.split(':');
	return ((parseInt(timeParts[0], 10)) * 3600) + ((parseInt(timeParts[1], 10)) * 60) + (parseInt(timeParts[2], 10));
};
PLAYER.Vast.prototype.handleLoadedXML = function(obj, timeOffset){
	var self = this;
	this.countXMLS++;
	
	if(typeof obj['vmap:VMAP'] !== 'undefined'){
		this.is_VMAP = true;
		
		this.objVMAP = obj;
		if(!obj['vmap:VMAP']['vmap:AdBreak'].length){
			obj['vmap:VMAP']['vmap:AdBreak'] = [obj['vmap:VMAP']['vmap:AdBreak']] //convert to Array
		}
		this.maxcountXMLS = 1;
		for(var i=0; i < obj['vmap:VMAP']['vmap:AdBreak'].length; i++){
			this.countVasts++;
			this.maxcountXMLS++;
			
			var VMAP_timeOffset = obj['vmap:VMAP']['vmap:AdBreak'][i]['@attributes']['timeOffset']

			this.loadVastUrl(obj['vmap:VMAP']['vmap:AdBreak'][i]['vmap:AdSource']['vmap:AdTagURI']['#cdata-section'] , VMAP_timeOffset)
		}
	}
	
	if(typeof obj['VAST'] !== 'undefined'){
		
		if(this.countVasts == 0){ 	
			this.vastObj[0] = obj;
			this.maxcountXMLS = 1;
			this.is_VAST = true;
		}
		else if(this.countVasts > 0){
			this.arrVAST.push(obj);
		}
		if(obj.VAST.Ad == undefined){
			alert("No <Ad> tag found in VAST url. Try refreshing the page.")
			return
		}
			
		if(!obj.VAST.Ad.length){
			obj.VAST.Ad = [obj.VAST.Ad] 
		}
			
		
		for(var i=0; i < obj.VAST.Ad.length; i++){
			
			if(timeOffset && this.is_VMAP){
				obj['VAST']['Ad'][i]['@attributes']['timeOffset'] = timeOffset
			}
			if(obj['VAST']['Ad'][i]['@attributes']['timeOffset'] !== undefined){
				timeOffset = obj['VAST']['Ad'][i]['@attributes']['timeOffset']
			}
			
			if(!obj.VAST.Ad[i].InLine.Creatives.Creative.length)//convert to Array
				obj.VAST.Ad[i].InLine.Creatives.Creative = [obj.VAST.Ad[i].InLine.Creatives.Creative]
				
			for(var j=0; j < obj.VAST.Ad[i].InLine.Creatives.Creative.length; j++){

				if(obj.VAST.Ad[i].InLine.Creatives.Creative[j].Linear){
					if(!obj.VAST.Ad[i].InLine.Creatives.Creative[j].Linear.MediaFiles.MediaFile.length)
						obj.VAST.Ad[i].InLine.Creatives.Creative[j].Linear.MediaFiles.MediaFile = [obj.VAST.Ad[i].InLine.Creatives.Creative[j].Linear.MediaFiles.MediaFile]
						
					this.allVastMediaFilesArr.push(obj.VAST.Ad[i].InLine.Creatives.Creative[j].Linear.MediaFiles.MediaFile[0]['#cdata-section'])
					
					this.clickThrough = obj.VAST.Ad[i].InLine.Creatives.Creative[j].Linear.VideoClicks.ClickThrough['#cdata-section']
					this.mediaFile = obj.VAST.Ad[i].InLine.Creatives.Creative[j].Linear.MediaFiles.MediaFile[0]['#cdata-section']
					if(obj.VAST.Ad[i].InLine.Creatives.Creative[j].Linear.hasOwnProperty('@attributes'))
						this.skipoffset = obj.VAST.Ad[i].InLine.Creatives.Creative[j].Linear['@attributes']['skipoffset']
					
					if(this.is_VMAP){
						this.handleROLLS(timeOffset, "linear");
					}else{
						if(obj['VAST']['Ad'][i]['@attributes']['timeOffset'] !== undefined){
							this.handleROLLS(timeOffset, "linear");
						}else{
							this.allVastPREROLLS[this.prerollsCount] = {
								mediaFile: this.mediaFile,
								clickThrough: this.clickThrough,
								skipoffset: this.skipoffset
							}
							this.prerollsCount++
						}
					}
				}
				if(obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds){
					if(!obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear.length)
						obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear = [obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear]
					
					for(var k=0; k < obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear.length; k++){
						
						if(!obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear[k].StaticResource.length)
							obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear[k].StaticResource = [obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear[k].StaticResource]
						
						this.minSuggestedDuration = obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear[k]['@attributes'].minSuggestedDuration;
						
						for(var l=0; l < obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear[k].StaticResource.length; l++){
							
							this.allVastNonLinearArr.push(obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear[k].StaticResource[l]['#cdata-section'])
						}
						this.nonLinearClickThrough = obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear[k].NonLinearClickThrough['#cdata-section'] 
						this.nonLinearClickTracking = obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear[k].NonLinearClickTracking['#cdata-section'] 
						this.staticResource = obj.VAST.Ad[i].InLine.Creatives.Creative[j].NonLinearAds.NonLinear[k].StaticResource[0]['#cdata-section'] 
						
						this.handleROLLS(timeOffset, "nonlinear");
					}
				}
				if(obj.VAST.Ad[i].InLine.Creatives.Creative[j].CompanionAds){
					if(!obj.VAST.Ad[i].InLine.Creatives.Creative[j].CompanionAds.Companion.length)
						obj.VAST.Ad[i].InLine.Creatives.Creative[j].CompanionAds.Companion = [obj.VAST.Ad[i].InLine.Creatives.Creative[j].CompanionAds.Companion]
					
					this.allVastCompanionArr.push(obj.VAST.Ad[i].InLine.Creatives.Creative[j].CompanionAds.Companion[0].StaticResource['#cdata-section'])
				}
			}
		}
		
	}
	if(this.countXMLS == this.maxcountXMLS){
		this.initData();
	}
}
PLAYER.Vast.prototype.handleROLLS = function(timeOffset, type){
	if(timeOffset == "start"){
		this.allVastPREROLLS[this.prerollsCount] = {
			mediaFile: this.mediaFile,
			clickThrough: this.clickThrough,
			skipoffset: this.skipoffset
		}
		this.prerollsCount++
	}
	if(timeOffset == "end"){
		this.allVastPOSTROLLS[this.postrollsCount] = {
			mediaFile: this.mediaFile,
			clickThrough: this.clickThrough,
			skipoffset: this.skipoffset
		}
		this.postrollsCount++
	}
	if(timeOffset !== "start" && timeOffset !== "end"){
		if(type === "linear"){
			this.allVastMIDROLLS[this.midrollsCount] = {
				mediaFile: this.mediaFile,
				clickThrough: this.clickThrough,
				skipoffset: this.skipoffset,
				timeOffset: timeOffset
			}
			this.midrollsCount++
		}
		if(type === "nonlinear"){
			this.allVastNONLINEARS[this.nonlinearsCount] = {
				staticResource: this.staticResource,
				nonLinearClickThrough: this.nonLinearClickThrough,
				nonLinearClickTracking: this.nonLinearClickTracking,
				minSuggestedDuration: this.minSuggestedDuration,
				timeOffset: timeOffset
			}
			this.nonlinearsCount++
		}
	}
}
PLAYER.Vast.prototype.initData = function(obj){
	if(this.arrVAST.length > 0){
		for(var i=0; i < this.arrVAST.length; i++){
			this.vastObj[i] = this.arrVAST[i];
		}
	}
	this.videoPlayer.checkForPoints();
}