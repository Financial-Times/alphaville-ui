/**
 * Converts a plain HTML string into a DOM object.
 * @param  {String} htmlString Plain HTML in a string format.
 * @return {DOMObject} DOM Object
 */
exports.toDOM = function(htmlString) {
	const d = document;
	let i;
	const a = d.createElement("div");
	const b = d.createDocumentFragment();

	a.innerHTML = htmlString;

	while (a.firstChild) {
		i = a.firstChild;
		b.appendChild(i);
	}

	return b;
};

/**
 * getComputedStyle polyfill for IE. If native function is available, that one is used.
 * @param  {DOMObject} el     The Element for which to get the computed style.
 * @param {DOMObject} pseudoElement Optional. A string specifying the pseudo-element to match. Must be omitted (or null) for regular elements.
 * @return {Object}            Object that has a getPropertyValue function which gets a property name as parameter.
 */
exports.getComputedStyle = function(el, pseudoElement) {
	if (!window.getComputedStyle) {
		return {
			getPropertyValue: function(prop) {
				const re = /(\-([a-zA-Z]){1})/g;
				if (prop === 'float') {
					prop = 'styleFloat';
				}

				if (re.test(prop)) {
					prop = prop.replace(re, function() {
						return arguments[2].toUpperCase();
					});
				}
				return el.currentStyle[prop] ? el.currentStyle[prop] : null;
			}
		};
	} else {
		pseudoElement = (typeof pseudoElement === 'boolean' ? pseudoElement : false);
		return window.getComputedStyle(el, pseudoElement);
	}
};

/**
 * Computes the window's size.
 * @return {Object} {width: XX, height: YY}
 */
exports.windowSize = function() {
	const w = window;
	const d = document;
	const e = d.documentElement;
	const g = d.getElementsByTagName('body')[0];
	const x = w.innerWidth || g.clientWidth || e.clientWidth;
	const y = w.innerHeight || g.clientHeight || e.clientHeight;

	return {
		width: x,
		height: y
	};
};

exports.offset = function(el) {
	let left = 0;
	let top = 0;

	let obj = el;
	if (obj.offsetParent) {
		do {
			left += obj.offsetLeft;
			top += obj.offsetTop;

			obj = obj.offsetParent;
		} while (obj);

		return {
			left: left,
			top: top
		};
	} else {
		return {
			top: el.offsetTop,
			left: el.offsetLeft
		};
	}
};

/**
 * Get all DOM element up the tree that contain a class, ID, or data attribute
 * @param  {Node} elem The base element
 * @param  {String} selector The class, id, data attribute, or tag to look for
 * @return {Array} Null if no match
 */
/**
 * Get all DOM element up the tree that contain a class, ID, or data attribute
 * @param  {Node} elem The base element
 * @param  {String} selector The class, id, data attribute, or tag to look for
 * @return {Array} Null if no match
 */
exports.getParents = function(elem, selector) {
	let firstChar;
	const parents = [];

	if (selector) {
		firstChar = selector.charAt(0);
	}

	// Get matches
	for (; elem && elem !== document; elem = elem.parentNode) {
		if (selector) {
			// If selector is a class
			if (firstChar === '.') {
				if (elem.classList.contains(selector.substr(1))) {
					parents.push(elem);
				}
			}

			// If selector is an ID
			if (firstChar === '#') {
				if (elem.id === selector.substr(1)) {
					parents.push(elem);
				}
			}

			// If selector is a data attribute
			if (firstChar === '[') {
				if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
					parents.push(elem);
				}
			}

			// If selector is a tag
			if (elem.tagName.toLowerCase() === selector) {
				parents.push(elem);
			}
		} else {
			parents.push(elem);
		}
	}

	// Return parents if any exist
	if (parents.length === 0) {
		return null;
	} else {
		return parents;
	}

};

exports.sanitizeHtml = function (str) {
	const div = document.createElement("div");
	div.textContent = str;
	return div.innerHTML;
};

exports.sanitizeHtmlId = function (str) {
	let strSanitized = exports.sanitizeHtml(str);
	strSanitized = strSanitized.replace(/[^a-zA-Z0-9_-]/g, '');
	return strSanitized;
};

exports.addScript = function (baseurl, params) {
	return new Promise((resolve) => {
		let fullUrl;
		let script;
		let key;

		script = document.createElement("script");
		script.async = true;


		script.onload = script.onreadystatechange = function() {
			if (!script.readyState || /loaded|complete/.test( script.readyState )) {

				// Handle memory leak in IE
				script.onload = script.onreadystatechange = null;

				// Remove the script
				if (script.parentNode) {
					script.parentNode.removeChild( script );
				}

				// Dereference the script
				script = null;

				resolve();
			}
		};

		let queryString = "";
		if (typeof params !== "undefined") {
			for (key in params) {
				if (params.hasOwnProperty(key)) {
					queryString += ((queryString === "") ? "?" : "&");
					queryString += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
				}
			}
		}

		fullUrl = baseurl + queryString;

		script.src = fullUrl;
		document.getElementsByTagName('head')[0].appendChild(script);
	});
};
