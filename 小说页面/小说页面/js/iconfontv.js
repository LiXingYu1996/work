(function(window) {
	var svgSprite = '<svg><symbol id="icon-vip" viewBox="0 0 1024 1024"><path d="M386.954541 555.8763c-3.2623 8.698103-5.381567 17.21508-6.342452 25.558096l-0.906649 0c-1.212618-9.55461-3.080152-17.946744-5.616928-25.194822l-75.564-219.443921-40.24254 0 101.128235 280.684704 40.21491 0 97.071849-264.218684 0 14.157441 26.986631 0 0 219.451084-26.986631 0 0 30.610158 90.243327 0 0-30.610158-27.01426 0L559.926034 367.420137l27.01426 0 0-30.624485L463.967542 336.795653 386.954541 555.8763zM764.538155 358.722034c-16.740266-14.622022-40.270169-21.926382-70.574359-21.926382l-79.731926 0 0 280.684704 36.241412 0L650.473283 512.567935l36.409235 0c29.356608 0.961908 53.833069-7.095605 73.4038-24.198122 19.570731-17.090237 29.356608-39.406498 29.356608-66.949808C789.642926 394.238946 781.265118 373.344057 764.538155 358.722034zM734.359832 465.718931c-11.471262 9.965979-28.268834 14.956643-50.376341 14.956643l-33.510208 0L650.473283 368.688014l36.966936 0c42.766013 0 64.149019 18.058284 64.149019 54.180993C751.589238 441.47169 745.845421 455.759091 734.359832 465.718931zM941.454494 346.476129l-1.560542-6.307659c-19.961634-22.901593-142.095275-163.130358-189.335183-214.231199-14.58109-15.793708-25.411763-26.721595-47.714721-27.599591-22.301935-0.822738-381.807822 0-381.807822 0-12.279674 0-28.087709 2.87856-48.396243 26.721595-47.365774 55.672974-153.163355 172.121126-189.168384 215.109196-24.407899 28.366048-27.51568 72.664973 0 114.189715 58.531068 68.427462 218.775702 256.376065 380.763027 443.439508 23.013133 26.595728 37.468356 27.600615 47.713698 27.600615 10.007935 0 24.226774-0.473791 47.699372-27.600615 160.412456-185.30745 312.935222-364.794333 380.24728-443.439508C962.655352 426.813852 968.441125 379.128807 941.454494 346.476129zM925.619854 425.811012c-58.349943 71.647807-232.269018 273.423323-371.117342 442.491926-20.309558 24.671912-34.192753 28.547173-42.821271 28.547173-8.823969 0-22.88829-4.405333-42.821271-28.547173C328.674183 697.687096 148.412656 488.161059 97.74365 425.811012c-14.148231-15.256472-13.84124-35.154661 0-57.095369 31.111578-39.203884 144.423297-163.659407 185.55816-214.105333 30.540573-37.530778 46.431495-28.547173 57.094346-28.547173 0 0 323.208193 0 342.570169 0 39.683814 0 38.736233 6.342452 57.094346 28.547173 39.615253 48.033993 168.344103 193.239096 185.559183 214.105333C940.854836 391.659191 936.282704 407.620721 925.619854 425.811012z"  ></path></symbol></svg>';
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