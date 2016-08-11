document.addEventListener("o.DOMContentLoaded", function() {
	const navLinks = document.querySelectorAll('.o-header__nav-link');
	const trackNavLinks = (event) => {
		document.body.dispatchEvent(new CustomEvent('oTracking.event', { detail: { category: 'alphaville-navigation', action: 'click', context: {url: event.target.getAttribute('href')} }, bubbles: true}));
	};
	for (let i = 0; i < navLinks.length; i++) {
		navLinks[i].addEventListener('click', trackNavLinks);
	}


	function manageLoginLinks (container) {
		if (container) {
			const referrerLinks = container.querySelectorAll('[data-av2-url-referrer]');
			if (referrerLinks.length) {
				for (let i = 0; i < referrerLinks.length; i++) {
					const hasQueryParams = referrerLinks[i].href.indexOf('?') !== -1;
					const paramName = referrerLinks[i].getAttribute('data-av2-url-referrer');
					const valueDef = referrerLinks[i].getAttribute('data-av2-url-referrer-value') ? referrerLinks[i].getAttribute('data-av2-url-referrer-value') : 'current_location';
					let value;
					switch (valueDef) {
						case 'current_location':
							value = encodeURIComponent(document.location.href);
							break;
						case 'home_location':
							value = encodeURIComponent(document.location.origin);
							break;
						default:
							value = referrerLinks[i].getAttribute('data-av2-url-referrer-value');
							break;
					}

					referrerLinks[i].href += `${hasQueryParams ? '&' : '?'}${paramName}=${value}`;
				}
			}

			const userLoggedIn = !!document.documentElement.classList.contains('av2-logged-in');
			const loginDependentLinks = container.querySelectorAll(userLoggedIn ? '.av2-logged-in-hidden' : '.av2-logged-out-hidden');
			if (loginDependentLinks.length) {
				for (let i = 0; i < loginDependentLinks.length; i++) {
					loginDependentLinks[i].parentNode.removeChild(loginDependentLinks[i]);
				}
			}
		}
	}

	const headerContainer = document.querySelector('.o-header');
	const headerDrawerContainer = document.querySelector('.o-header__drawer');

	manageLoginLinks(headerContainer);
	manageLoginLinks(headerDrawerContainer);
});
