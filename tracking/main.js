import oTracking from 'o-tracking';

function otrackinginit() {
	const config_data = {
		server: 'https://spoor-api.ft.com/px.gif',
		context: {
			product: 'next',
			app: 'alphaville'
		},
		user: {
			ft_session: oTracking.utils.getValueFromCookie(/FTSession=([^;]+)/)
		}
	};
	oTracking.init(config_data);
}

document.addEventListener("o.DOMContentLoaded", function setupOTracking() {
	// Remove the event listener so that o-tracking is only ever setup once.
	// This is a protective measure incase other code fires this event.
	document.removeEventListener("o.DOMContentLoaded", setupOTracking);
	var article = document.querySelectorAll('article.article__body.n-content-body');
	var uuid = (article.length > 0)? article[0].getAttribute('data-content-id'): false;
	var trackingPageConfig = {
		content: {
			asset_type: 'alphaville',
			section: 'Brand.FT Alphaville'
		}
	}
	if (uuid) {
		trackingPageConfig.content.uuid = uuid;
	}
	otrackinginit();
	oTracking.page(trackingPageConfig);
	oTracking.click.init('cta');
});
