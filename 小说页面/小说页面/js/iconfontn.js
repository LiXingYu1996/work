(function(window) {
	var svgSprite = '<svg><symbol id="icon-ziti" viewBox="0 0 1024 1024"><path d="M957.6 541.6H831.7v126.3h-63.2V541.6H642v-63.7h126.5V351h63.2v126.9h125.9v63.7zM581.5 766.3h-82L440.8 609H201.4l-55.3 157.4h-82l219-574.9h79.4l219 574.8zM417.8 544L331 305c-2.7-7.7-5.7-21-8.9-40.1h-1.9c-2.7 17.3-5.8 30.7-9.3 40.1l-86.1 239h193z"  ></path></symbol><symbol id="icon-ziti-" viewBox="0 0 1024 1024"><path d="M581.5 766.3h-82L440.8 609H201.4l-55.3 157.4h-82l219-574.9h79.4l219 574.8zM417.8 544L331 305c-2.7-7.7-5.7-21-8.9-40.1h-1.9c-2.7 17.3-5.8 30.7-9.3 40.1l-86.1 239h193zM642 477.9h315.6v63.7H642z"  ></path></symbol></svg>';
	var script = function() {
		var scripts = document.getElementsByTagName("script");
		return scripts[scripts.length - 1]
	}();
	var shouldInjectCss = script.getAttribute("data-injectcss");
	var ready = function(fn) {
		if(document.addEventListener) {
			if(~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
				setTimeout(fn, 0)
			} else {
				var loadFn = function() {
					document.removeEventListener("DOMContentLoaded", loadFn, false);
					fn()
				};
				document.addEventListener("DOMContentLoaded", loadFn, false)
			}
		} else if(document.attachEvent) {
			IEContentLoaded(window, fn)
		}

		function IEContentLoaded(w, fn) {
			var d = w.document,
				done = false,
				init = function() {
					if(!done) {
						done = true;
						fn()
					}
				};
			var polling = function() {
				try {
					d.documentElement.doScroll("left")
				} catch(e) {
					setTimeout(polling, 50);
					return
				}
				init()
			};
			polling();
			d.onreadystatechange = function() {
				if(d.readyState == "complete") {
					d.onreadystatechange = null;
					init()
				}
			}
		}
	};
	var before = function(el, target) {
		target.parentNode.insertBefore(el, target)
	};
	var prepend = function(el, target) {
		if(target.firstChild) {
			before(el, target.firstChild)
		} else {
			target.appendChild(el)
		}
	};

	function appendSvg() {
		var div, svg;
		div = document.createElement("div");
		div.innerHTML = svgSprite;
		svgSprite = null;
		svg = div.getElementsByTagName("svg")[0];
		if(svg) {
			svg.setAttribute("aria-hidden", "true");
			svg.style.position = "absolute";
			svg.style.width = 0;
			svg.style.height = 0;
			svg.style.overflow = "hidden";
			prepend(svg, document.body)
		}
	}
	if(shouldInjectCss && !window.__iconfont__svg__cssinject__) {
		window.__iconfont__svg__cssinject__ = true;
		try {
			document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
		} catch(e) {
			console && console.log(e)
		}
	}
	ready(appendSvg)
})(window)