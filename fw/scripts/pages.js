/*
	TODO: This is some really old code. Need to modernize this framework.
*/

var cache = [];
var originalPath = window.location.pathname;
var stateObj = {publicURL: originalPath};
var poppingState = false;
var pageHandler = function(){};
var baseTitle = "";
var titleSeparator = " - ";
var fadingEnabled = true;
var fadeSpeed = 150;
var pageURL = "/raw{url}";
var pathPrefix = "/";
var publicURLToPage = {};
var lastRequest = null;

var $container = null;
var $content = null;
var $navigation = null;
var $loadingAnimation = null;

// When document is ready
$(document).ready(function() {
	// Cache elements
	$container = $("#container");
	$content = $("#content");
	$navigation = $("#navigation");
	$loadingAnimation = $("#loading-animation");

	// Ajaxify all links
	ajaxifyLinks();

	// Mark active menu item
	markActiveMenuItem(originalPath);
});

$(window).load(function() {
	if(originalPath in publicURLToPage) {
		var page = publicURLToPage[originalPath];
		pageHandler(page.id);
	}
});

// Make page
function makePage(name, id, publicURL) {
	publicURL = pathPrefix + publicURL;
	var pageScriptPath = pageURL.replaceAll("{url}", publicURL);

	publicURLToPage[publicURL] = {
		"name" : name,
		"id" : id,
		"path" : pageScriptPath,
		"publicURL" : publicURL
	};
}

// Ajaxify links
function ajaxifyLinks() {
	$(".ajax").each(function() {
		$(this).removeClass("ajax");
	}).click(function(e) {
		e.preventDefault();

		// Scroll
		if($navigation.offset().top < 0)
			scrollToElement($navigation);
		
		// Load page
		var $this = $(this);
		var publicURL = $this.attr("href");
		//if(publicURL != window.location.pathname)
		loadURL(publicURL);
	});
	
	/*
	// Youtube
	$(".youtube-video").each(function() {
		var $this = $(this);
		var videoId = $this.attr("data-youtube-id");

		$.getJSON("https://gdata.youtube.com/feeds/api/videos/" + videoId + "?v=2&alt=jsonc", function(info) {
			var videoTitle = info.data.title;

			$this.css("background-image", "url(https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg)");
			$this.html("<div class='media-box-title video-title'>" + videoTitle + "</div>");
		});
	});

	// Soundcloud
	$(".soundcloud-track").each(function() {
		var $this = $(this);
		var trackURL = $this.attr("data-track-url");

		$.getJSON("https://api.soundcloud.com/resolve.json?url=https://soundcloud.com/" + trackURL + "&client_id=1244575aff0a98380289472fc718c020", function(data) {
			$this.html("<div class='media-box-title track-title'>" + data.title + "</div>");

			if(data.artwork_url) {
				var imageURL = data.artwork_url.replace("large", "t500x500");
				$this.css("background-image", "url(" + imageURL + ")");
			} else {
				$this.css("background-image", "url(/images/icons/soundcloud-large.png)");
			}
		});
	});

	// Posts
	$(".get-thread-title").each(function() {
		var $this = $(this);
		var threadId = $this.attr("data-id");

		$.getJSON("https://battleofmages.com/api/thread.php?id=" + threadId, function(data) {
			var threadTitle = data.title;
			$this.html(threadTitle);
		});
	});
	*/
}

function scrollToElement(element, time) {
	time = typeof(time) != 'undefined' ? time : 800;

	$container.animate({
		scrollTop: $container.scrollTop() + element.offset().top
	}, time);
}

// Load URL into content
function loadURL(publicURL) {
	var genericURL = publicURL;
	var params = "";
	
	if(publicURL.startsWith("/+")) {
		// TODO: Generic version
		genericURL = "/users";
		params = publicURL.substr(2);
	} else {
		var slashPos = publicURL.indexOf("/", 1);

		if(slashPos != -1) {
			genericURL = publicURL.substr(0, slashPos);
			params = publicURL.substr(slashPos + 1);
		}
	}

	markActiveMenuItem(publicURL);
	
	var page = publicURLToPage[genericURL];
	loadPage(page, publicURL, params);
}

function removeSlashPrefix(stri) {
	if(stri.indexOf("/") == 0)
		return stri.substr(1);

	return stri;
}

// Load URL
function loadPage(page, publicURL, params) {
	// Push history
	pushHistory(publicURL);

	// Change title
	if(page.name)
		document.title = page.name;
	else
		document.title = baseTitle;

	// Cached version
	var url = page.path + "?params=" + params;

	if(url in cache) {
		var data = cache[url];
		
		// Loading animation
		$loadingAnimation.stop().fadeIn(fadeSpeed);
		$content.stop().fadeOut(fadeSpeed, function() {
			$loadingAnimation.stop().fadeOut(fadeSpeed);
			
			$content.stop().html(data).fadeIn(fadeSpeed, function() {
				// Ajaxify links
				ajaxifyLinks();

				// DOM loaded event
				fireContentLoadedEvent();

				// Custom callback
				pageHandler(page.id);
			});
		});

		return;
	}
	
	// Stop old request
	if(lastRequest != null) {
		lastRequest.abort();
		lastRequest = null;
	}

	// Loading animation
	$loadingAnimation.fadeIn(fadeSpeed);
	$content.fadeOut(fadeSpeed);

	// Load content
	lastRequest = $.get(url, function(data) {
		$loadingAnimation.promise().done(function() {
			$loadingAnimation.fadeOut(fadeSpeed);
		});

		$content.promise().done(function() {
			
			$content.html(data).fadeIn(fadeSpeed, function() {
				// Cache the page
				cache[url] = data;
	
				// Ajaxify links
				ajaxifyLinks();
	
				// DOM loaded event
				fireContentLoadedEvent();
	
				// Custom callback
				pageHandler(page.id);
			});
		});
	});
}

function fireContentLoadedEvent() {
	var DOMContentLoadedEvent = document.createEvent("Event");
	DOMContentLoadedEvent.initEvent("DOMContentLoaded", true, true);
	window.document.dispatchEvent(DOMContentLoadedEvent);
}

// Push history
function pushHistory(publicURL) {
	stateObj.publicURL = publicURL;
	if(!poppingState) {
		history.pushState(stateObj, "", publicURL);
	}
}

// Pop state: Forward and backward buttons
$(window).bind('popstate', function(e) {
	poppingState = true;
	
	if(e.originalEvent.state) {
		stateObj = e.originalEvent.state;
		loadURL(stateObj.publicURL);
	} else if(stateObj.publicURL != originalPath) {
		loadURL(originalPath);
	}
	
	poppingState = false;
});

// prevOrLast
jQuery.fn.prevOrLast = function(selector) {
	var prev = this.prev(selector);
	return (prev.length) ? prev : this.nextAll(selector).last();
}

// nextOrFirst
jQuery.fn.nextOrFirst = function(selector) {
	var next = this.next(selector);
	return (next.length) ? next : this.prevAll(selector).last();
}

function markActiveMenuItem(url) {
	if(typeof url == 'undefined')
		url = window.location.pathname;

	var $navigationLinks = $(".navigation-link");

	$navigationLinks.each(function() {
		var $this = $(this);
		var href = $this.attr("href");

		if(href == url) {
			$this.addClass("active");
		} else {
			$this.removeClass("active");
		}
	});
}

function navigateLeft() {
	loadURL($(".active").prevOrLast(".navigation-link").attr("href"));
}

function navigateRight() {
	loadURL($(".active").nextOrFirst(".navigation-link").attr("href"));
}

/* String helper methods */

// Replace all
String.prototype.replaceAll = function(find, replace) {
	var str = this;
	return str.replace(new RegExp(find, 'g'), replace);
};

// Starts with
String.prototype.startsWith = function (str){
	return this.indexOf(str) == 0;
};

/* Helper functions */

// Set page handler
function setPageHandler(func) {
	pageHandler = func;
}

// Set page URL
function setPageURL(newUrl) {
	pageURL = newUrl;
}

// Set title
function setTitle(name) {
	baseTitle = name;
}

// Fade speed
function setFadeSpeed(newFadeSpeed) {
	fadeSpeed = newFadeSpeed;
}