var THREEx		= THREEx 		|| {};
THREEx.FullScreen	= THREEx.FullScreen	|| {};

THREEx.FullScreen.available	= function()
{
	return this._hasWebkitFullScreen || this._hasMozFullScreen || this._hasMsFullScreen;
}
THREEx.FullScreen.activated	= function()
{
	if( this._hasWebkitFullScreen ){
		return document.webkitIsFullScreen;
	}else if( this._hasMozFullScreen ){
		return document.mozFullScreen;
	}else if( this._hasMsFullScreen ){
		return document.msFullscreenElement;
	}else{
		console.assert(false);
	}
}
THREEx.FullScreen.request	= function(element)
{
	element	= element	|| document.body;
	if( this._hasWebkitFullScreen ){
		element.webkitRequestFullScreen();
	}else if( this._hasMozFullScreen ){
		element.mozRequestFullScreen();
	}else if( this._hasMsFullScreen ){
		element.msRequestFullscreen();
	}else{
		console.assert(false);
	}
}
THREEx.FullScreen.cancel	= function()
{
	if( this._hasWebkitFullScreen ){
		document.webkitCancelFullScreen();
	}else if( this._hasMozFullScreen ){
		document.mozCancelFullScreen();
	}else if( this._hasMsFullScreen ){
		document.msExitFullscreen();
	}else{
		console.assert(false);
	}
}
THREEx.FullScreen._hasWebkitFullScreen	= 'webkitCancelFullScreen' in document	? true : false;	
THREEx.FullScreen._hasMozFullScreen	= 'mozCancelFullScreen' in document	? true : false;	
THREEx.FullScreen._hasMsFullScreen	= 'msExitFullscreen' in document	? true : false;	

