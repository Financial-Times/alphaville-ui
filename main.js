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

if (document.cookie.indexOf('FTSession') !== -1) {
	document.documentElement.className += ' alphaville-logged-in';
} else {
	document.documentElement.className += ' alphaville-logged-out';
}
