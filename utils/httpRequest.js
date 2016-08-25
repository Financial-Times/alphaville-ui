"use strict";

function execute (config) {
	return new Promise((resolve, reject) => {
		const xhr = getXhrForUrl(config.url);
		let aborted = false;

		if (!xhr) {
			reject(new Error("No XML Http support"));
			return;
		}

		if (config.cache !== true) {
			const timestamp = new Date().getTime();
			if (config.url.indexOf('?') !== -1) {
				config.url += '&_=' + timestamp;
			} else {
				config.url += '?_=' + timestamp;
			}
		}

		if (config.query) {
			Object.keys(config.query).forEach((key) => {
				if (config.url.indexOf('?') !== -1) {
					config.url += '&';
				} else {
					config.url += '?';
				}

				config.url += encodeURIComponent(key) + '=' + encodeURIComponent(config.query[key]);
			});
		}

		if (xhr instanceof XMLHttpRequest) {
			xhr.open(config.type, config.url, true);

			if (typeof xhr.withCredentials !== 'undefined') {
				xhr.withCredentials = true;
			}
		} else {
			xhr.open(config.type, config.url);
			if (typeof xhr.hasOwnProperty !== 'function') {
				xhr.timeout = config.timeout || 15000;
			}
		}


		if (xhr.onload !== 'undefined') {
			xhr.onload = function () {
				if (!aborted) {
					let responseText = xhr.responseText || '';
					try {
						if (config.dataType === 'json') {
							responseText = JSON.parse(responseText);
						}
					} catch (e) {}

					if ((!xhr.status || (xhr.status >= 200 && xhr.status < 400))) {
						resolve(responseText);
					} else {
						if (responseText) {
							resolve(responseText);
						} else {
							reject(new Error("Failed response."));
						}
					}
				}
			};

			xhr.onerror = function (err) {
				if (!aborted) {
					reject(err);
				}
			};

			xhr.ontimeout = function () {
				if (!aborted) {
					aborted = true;
					try {
						xhr.abort();
					} catch (e) {}
					reject(new Error("Timeout."));
				}
			};

			xhr.onprogress = function () {}; // do nothing, we are not interested in the progress
		} else {
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.responseText) {
						let responseText = xhr.responseText;
						try {
							responseText = JSON.parse(responseText);
						} catch (e) {}

						resolve(responseText);
					} else {
						reject(new Error("Failed response."));
					}
				}
			};
		}

		setTimeout(function () {
			if (config.body) {
				let body = "";
				Object.keys(config.body).forEach((key) => {
					if (body !== "") {
						body += '&';
					}

					body += encodeURIComponent(key) + '=' + encodeURIComponent(config.body[key]);
				});

				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.send(body);
			} else {
				xhr.send();
			}
		}, 0);
	});
}

exports.get = function (config) {
	config.type = 'get';

	return execute(config);
};

exports.post = function (config) {
	config.type = 'post';

	return execute(config);
};


exports.hasSupportForCors = function () {
	const xhr = getXhrForUrl('http://example.com');

	if (xhr instanceof XMLHttpRequest) {
		return true;
	} else {
		return false;
	}
};

/**
 * Determine XHR.
 */

function getXhrForUrl (requestUrl) {
	let isXDomainRequest = false;

	if (typeof window.location !== 'undefined') {
		const hostnameMatch = requestUrl.match(/(http[s]?:)?\/\/([^\/]*)/);

		if (hostnameMatch && hostnameMatch[2] !== window.location.hostname) {
			isXDomainRequest = true;
		}
	}

	if (isXDomainRequest === true) {
		if (typeof new XMLHttpRequest().withCredentials !== 'undefined') {
			// Check if the XMLHttpRequest object has a "withCredentials" property.
			// "withCredentials" only exists on XMLHTTPRequest2 objects.

			return new XMLHttpRequest();
		} else if (typeof XDomainRequest !== "undefined") {
			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS requests.

			return new XDomainRequest();
		} else {
			return false;
		}
	} else {
		if (window.XMLHttpRequest && ('file:' !== window.location.protocol || !window.ActiveXObject)) {
			return new XMLHttpRequest();
		} else {
			try {
				return new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e) {}
			try {
				return new ActiveXObject('Msxml2.XMLHTTP.6.0');
			} catch (e) {}
			try {
				return new ActiveXObject('Msxml2.XMLHTTP.3.0');
			} catch (e) {}
			try {
				return new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {}
		}
	}

	return false;
}
