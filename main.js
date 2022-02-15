import oDate from '@financial-times/o-date';
import oAds from '@financial-times/ads-legacy-o-ads';
import oGrid from '@financial-times/o-grid';
import oHeader from '@financial-times/o-header';
import oFooter from '@financial-times/o-footer';
import oTracking from '@financial-times/o-tracking';
import oOverlay from '@financial-times/o-overlay';
import oShare from '@financial-times/o-share';
import oCookieMessage from '@financial-times/o-cookie-message';
import header from './header/main';
import marketsliveSessionListener from './marketslive-session-listener/main';
import marketsliveSessionNotification from './marketslive-session-notification/main';
import tracking from './tracking/main';
import InfiniteScroll from './infinite-scroll/main';

import AlertOverlay from './overlays/AlertOverlay';
import ConfirmOverlay from './overlays/ConfirmOverlay';
import FormOverlay from './overlays/FormOverlay';

import dom from './utils/dom';

import httpRequest from './utils/httpRequest';

const exports = {};
export default exports;

exports['o-date'] = oDate;
exports['o-ads'] = oAds;
exports['o-grid'] = oGrid;
exports['o-header'] = oHeader;
exports['o-footer'] = oFooter;
exports['o-tracking'] = oTracking;
exports['o-overlay'] = oOverlay;
exports['o-share'] = oShare;
exports['o-cookie-message'] = oCookieMessage;

exports['header'] = header;
exports['marketslive-session-listener'] = marketsliveSessionListener;
exports['marketslive-session-notification'] = marketsliveSessionNotification;
exports['tracking'] = tracking;
exports['InfiniteScroll'] = InfiniteScroll;

exports['AlertOverlay'] = AlertOverlay;
exports['ConfirmOverlay'] = ConfirmOverlay;
exports['FormOverlay'] = FormOverlay;

exports.utils = {
	dom,
	httpRequest
};
