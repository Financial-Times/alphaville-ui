import oDate from './node_modules/@financial-times/o-date';
import oAds from './node_modules/@financial-times/ads-legacy-o-ads';
import oGrid from './node_modules/@financial-times/o-grid';
import oHeader from './node_modules/@financial-times/o-header';
import oFooter from './node_modules/@financial-times/o-footer';
import oTracking from './node_modules/@financial-times/o-tracking';
import oOverlay from './node_modules/@financial-times/o-overlay';
import oShare from './node_modules/@financial-times/o-share';
import oCookieMessage from './node_modules/@financial-times/o-cookie-message';

exports['o-date'] = oDate;
exports['o-ads'] = oAds;
exports['o-grid'] = oGrid;
exports['o-header'] = oHeader;
exports['o-footer'] = oFooter;
exports['o-tracking'] = oTracking;
exports['o-overlay'] = oOverlay;
exports['o-share'] = oShare;
exports['o-cookie-message'] = oCookieMessage;

exports['header'] = require('./header/main');
exports['marketslive-session-listener'] = require('./marketslive-session-listener/main');
exports['marketslive-session-notification'] = require('./marketslive-session-notification/main');
exports['tracking'] = require('./tracking/main');
exports['InfiniteScroll'] = require('./infinite-scroll/main');

exports['AlertOverlay'] = require('./overlays/AlertOverlay');
exports['ConfirmOverlay'] = require('./overlays/ConfirmOverlay');
exports['FormOverlay'] = require('./overlays/FormOverlay');

exports.utils = {
	dom: require('./utils/dom'),
	httpRequest: require('./utils/httpRequest')
};
