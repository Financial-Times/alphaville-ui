exports['o-date'] = require('o-date');
exports['o-ads'] = require('o-ads');
exports['o-grid'] = require('o-grid');
exports['o-header'] = require('o-header');
exports['o-footer'] = require('o-footer');
exports['o-tracking'] = require('o-tracking');

exports['header'] = require('./header/main');
exports['marketslive-session-listener'] = require('./marketslive-session-listener/main');
exports['marketslive-session-notification'] = require('./marketslive-session-notification/main');
exports['tracking'] = require('./tracking/main');
exports['InfiniteScroll'] = require('./infinite-scroll/main');

exports.utils = {
	dom: require('./utils/dom'),
	httpRequest: require('./utils/httpRequest')
};

if (document.cookie.indexOf('FTSession') !== -1) {
	if (document.documentElement.classList.contains('alphaville-logged-out')) {
		document.documentElement.classList.remove('alphaville-logged-out');
	}

	if (!document.documentElement.classList.contains('alphaville-logged-in')) {
		document.documentElement.classList.add('alphaville-logged-in');
	}
} else {
	if (document.documentElement.classList.contains('alphaville-logged-in')) {
		document.documentElement.classList.remove('alphaville-logged-in');
	}

	if (!document.documentElement.classList.contains('alphaville-logged-out')) {
		document.documentElement.classList.add('alphaville-logged-out');
	}
}
