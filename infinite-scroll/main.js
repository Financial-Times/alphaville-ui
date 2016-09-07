const oViewport = require('o-viewport');
const httpRequest = require('../utils/httpRequest');
const domUtils = require('../utils/dom');

function InfiniteScroll (config) {
	let baseUrl;
	const query = {};

	try {
		if (!config.container) {
			config.container = document.body;
		} else if (!(config.container instanceof HTMLElement)) { // could throw exception in IE
			config.container = document.querySelector(config.container);
		}
	} catch (e) {
		let el;
		if (typeof config.container === 'string') {
			el = document.querySelector(config.container);
		}

		if (el) {
			config.container = el;
		} else {
			config.container = document.body;
		}
	}

	if (config.baseUrl) {
		baseUrl = config.baseUrl;
	} else {
		if (location.search) {
			location.search
				.substr(1, location.search.length)
				.split('&')
				.forEach((val) => {
					const item = val.split('=');
					if (item[0] !== config.pageParamName) {
						query[item[0]] = item[1];
					}
				});
		}
		baseUrl = `${document.location.origin + document.location.pathname}`;
	}

	if (!InfiniteScroll.listenToScroll) {
		InfiniteScroll.listenToScroll = true;

		oViewport.listenTo('scroll');
	}

	let nextPage = 2;
	let loadInProgress = false;
	let morePages = true;

	config.container.appendChild(domUtils.toDOM(`
		<div class="alphaville-infinite-scroll--spinner-container">
			<div class="alphaville-spinner"></div>
		</div>
	`));
	const spinnerContainer = config.container.querySelector('.alphaville-infinite-scroll--spinner-container');

	const loadNextPage = function () {
		if (!loadInProgress && morePages) {
			loadInProgress = true;

			spinnerContainer.style.display = 'block';

			query.ajax = true;
			query[config.pageParamName] = nextPage;

			httpRequest.get({
				url: baseUrl,
				query: query
			}).then((itemsHtml) => {
				if (!itemsHtml.trim()) {
					morePages = false;
					document.removeEventListener('oViewport.scroll', onScroll);
					return;
				}

				nextPage++;
				config.container.insertBefore(domUtils.toDOM(itemsHtml), spinnerContainer);

				if (typeof config.onNewPage === 'function') {
					config.onNewPage();
				}

				spinnerContainer.style.display = 'none';

				loadInProgress = false;
			}).catch((err) => {
				console.log('Error loading the next page.', err);
				loadInProgress = false;
			});
		}
	};

	const onScroll = function (evt) {
		if (evt.detail.scrollHeight - (evt.detail.scrollTop + oViewport.getSize().height) < 400) {
			loadNextPage();
		}
	};
	document.addEventListener('oViewport.scroll', onScroll);
}
InfiniteScroll.listenToScroll = false;

module.exports = InfiniteScroll;
