(function(window) {
	var svgSprite = '<svg><symbol id="icon-xingtaiduICON_sousuo--" viewBox="0 0 1024 1024"><path d="M222.6944 222.7968A323.1488 323.1488 0 0 0 133.6832 512c19.2512-87.3728 64.512-172.7488 135.0144-243.3024C339.2512 198.1184 424.6272 152.8832 512 133.632c-101.632-19.1488-210.688 10.5216-289.3056 89.1648z" fill="#e24615" ></path><path d="M989.44 822.1184l-121.7024-121.7024a118.016 118.016 0 0 0-92.8-34.1248c114.4576-165.5552 97.92-394.3936-49.4848-541.824-165.9392-165.9904-435.0464-165.9904-601.0368 0-165.9392 165.9904-165.9392 435.1232 0 601.1136 147.4048 147.4304 376.064 163.84 541.7216 49.3824-2.56 33.28 8.8576 67.5328 34.1248 92.8l121.7024 121.728c46.08 45.9776 121.3696 45.9776 167.3472 0 46.208-45.9776 46.208-121.2928 0.128-167.3728zM676.096 676.096c-138.6752 138.6752-363.392 138.6752-502.016 0-138.6752-138.6752-138.6752-363.4432 0-502.1184 138.624-138.6752 363.3408-138.6752 502.016 0 138.6496 138.5728 138.6496 363.4432 0 502.1184z" fill="#e24615" ></path></symbol><symbol id="icon-sousuo" viewBox="0 0 1024 1024"><path d="M845.027556 861.696l-129.706667-129.479111A339.342222 339.342222 0 0 0 796.444444 511.658667 341.162667 341.162667 0 0 0 455.111111 170.666667C266.581333 170.666667 113.777778 323.356444 113.777778 511.658667a341.162667 341.162667 0 0 0 341.333333 340.992 340.024889 340.024889 0 0 0 219.989333-80.327111l129.706667 129.592888a28.444444 28.444444 0 0 0 40.220445-40.220444zM455.111111 795.875556c-157.070222 0-284.444444-127.203556-284.444444-284.16a284.273778 284.273778 0 0 1 284.444444-284.16c157.127111 0 284.444444 127.203556 284.444445 284.16a284.273778 284.273778 0 0 1-284.444445 284.16z" fill="#80848F" ></path></symbol></svg>';
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