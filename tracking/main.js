const oTracking = require('o-tracking');
function otrackinginit() {
	const config_data = {
		server: 'https://spoor-api.ft.com/px.gif',
		context: {
			product: 'alphaville'
		},
		user: {
			ft_session: oTracking.utils.getValueFromCookie(/FTSession=([^;]+)/)
		}
	};
	oTracking.init(config_data);
}

document.addEventListener("o.DOMContentLoaded", function() {
	otrackinginit();
	oTracking.page({
		content: {
			asset_type: 'page'
		}
	});
	oTracking.click.init('cta');
});
