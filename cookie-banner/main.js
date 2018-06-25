const oCookieMessage = require('o-cookie-message');

document.addEventListener("o.DOMContentLoaded", function() {
	const redirect = window.location.href;

	const cookieMessage = new oCookieMessage(null, {
		acceptUrl: `https://consent.ft.com/__consent/consent-record-cookie`,
		acceptUrlFallback: `https://consent.ft.com/__consent/consent-record-cookie?redirect=${redirect}&cookieDomain=.ft.com`,
	});
});
