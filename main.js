import oDate from 'o-date';
import oAds from 'o-ads';
import oGrid from 'o-grid';
import oHeader from 'o-header';
import oFooter from 'o-footer';
import oTracking from 'o-tracking';
import oOverlay from 'o-overlay';
import oShare from 'o-share';
import oCookieMessage from 'o-cookie-message';

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
exports['permutive'] = require('./permutive');

exports.utils = {
	dom: require('./utils/dom'),
	httpRequest: require('./utils/httpRequest')
};
