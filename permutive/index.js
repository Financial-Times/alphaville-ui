import oPermutive from 'o-permutive';
import oAds from 'o-ads';

/*
 * Permutive's project ID and API Key
 */
const PERMUTIVE_PUBKEYS = {
	projectId: 'e1c3fd73-dd41-4abd-b80b-4278d52bf7aa',
	publicApiKey: 'b2b3b748-e1f6-4bd5-b2f2-26debc8075a3',
	consentFtCookie: true,
};

/*
 * Ads API v2 endpoints
 */
const adsApiEndpoints = {
	user: () => 'https://ads-api.ft.com/v2/user',
	content: (contentId) => `https://ads-api.ft.com/v2/content/${contentId}`,
};

/*
 * Initialise an o-permutive component
 */
export const initPermutive = () => {
	try {
		return oPermutive.init(PERMUTIVE_PUBKEYS);
	} catch (e) {
		console.warn('Permutive could not be initialised:' + ' ' + e);
	}
};

/*
 * Retrieve user from Ads v2
 */
const getUser = () => {
	return oAds.api.getUserData(adsApiEndpoints.user(), 250)
		.catch((error) => {
			console.warn('oPermutive: Could not identify user');
			throw error;
		})
};

/*
 * Retrieve content from Ads v2
 */
const getContent = (contentId) => {
	if (contentId) {
		return Promise.resolve();
	}
	return oAds.api.getPageData(adsApiEndpoints.content(contentId), 250)
		.catch((error) => {
			console.warn('oPermutive: Could not set page metadata', error);
		});
};

/*
 * Identify the User
 */
const identifyUser = (user) => {
	if (user) {
		oPermutive.identifyUser([
			{
				id: user.spoorId,
				tag: 'SporeID',
			},
			{
				id: user.uuid,
				tag: 'GUID',
			}
		]);
		return user;
	}
};

/*
 * Set page metadata
 */
const setPageMetaData = (content, user) => {
	const pageMetaData = { type: 'article' };

	if (content) {
		pageMetaData.article = {
			id: content.uuid,
			// title,
			type: content.genre && content.genre instanceof Array && content.genre[0],
			organisations: content.organisation,
			people: content.person,
			categories: content.categories,
			authors: content.person,
			topics: content.topic,
			admants: content.admants,
		};
	}

	if (user) {
		pageMetaData.user = {
			industry: user.industry && user.industry.code,
			responsibility: user.responsibility && user.responsibility.code,
			position: user.position && user.position.code,
			subscriptionLevel: user.subscriptionLevel,
			loggedIn: (!!user.loggedInStatus).toString(),
			indb2b: user.hui.indb2b,
			gender: user.hui.gender,
		};
	}

	oPermutive.setPageMetaData({ page: pageMetaData });
};

const setUser = () =>
	getUser()
		.then(identifyUser);

const setContent = (contentId, user) =>
	getContent(contentId)
		.then((content) => setPageMetaData(content, user));

const setUserAndContent = (contentId) =>
	setUser()
		.then((user) => setContent(contentId, user));

const getPermutiveSegments = () => {
	let segs = window.localStorage.getItem('_pdfps');
	return (segs) ? JSON.parse(segs) : [];
};

const setPermutiveSegments = () =>
	oAds.targeting.add({ permutive: getPermutiveSegments() });

module.exports = {
	initPermutive,
	setUser,
	setContent,
	setUserAndContent,
	setPermutiveSegments,
};
