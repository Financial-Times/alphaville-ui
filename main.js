import oDate from '@financial-times/o-date';
import oAds from '@financial-times/ads-legacy-o-ads';
import oGrid from '@financial-times/o-grid';
import oHeader from '@financial-times/o-header';
import oFooter from '@financial-times/o-footer';
import oTracking from '@financial-times/o-tracking';
import oOverlay from '@financial-times/o-overlay';
import oShare from '@financial-times/o-share';
import oCookieMessage from '@financial-times/o-cookie-message';

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
