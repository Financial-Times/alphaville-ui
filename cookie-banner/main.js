const oCookieMessage = require('o-cookie-message');

document.addEventListener("o.DOMContentLoaded", function() {
	const redirect = window.location.href;
	const component = document.querySelector('[data-o-component="o-cookie-message"]');

	const cookieMessage = new oCookieMessage(component, {
		acceptUrl: `https://consent.ft.com/__consent/consent-record-cookie`,
		acceptUrlFallback: `https://consent.ft.com/__consent/consent-record-cookie?redirect=${redirect}&cookieDomain=.ft.com`,
	});
});
