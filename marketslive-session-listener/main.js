/* global Pusher */

function activeSession () {
	return fetch('/marketslive/api/sessions/latest?_=' + new Date().getTime()).then((response) => {
		if (response.status < 200 || response.status >= 400) {
			throw new Error("Request failed");
		}

		return response.json();
	}).then((json) => {
		if (json && json.data && json.data.sessionId) {
			return json.data;
		} else {
			return null;
		}
	});
};


function fetchChannel () {
	return fetch('/marketslive/api/sessions/channel').then((response) => {
		if (response.status < 200 || response.status >= 400) {
			throw new Error("Request failed");
		}

		return response.json();
	}).then((json) => {
		if (json && json.data) {
			const channelInfo = json.data;

			if (window.Pusher) {
				const pusher = new Pusher(channelInfo.key, {
					disableStats: true
				});
				const channel = pusher.subscribe(channelInfo.channel);

				return channel;
			} else {
				throw new Error("Pusher is not defined");
			}
		} else {
			throw new Error("Channel info could not be fetched.");
		}
	});
}

let channelFetchPromise;
function listen () {
	if (!channelFetchPromise) {
		channelFetchPromise = fetchChannel();
	}

	return channelFetchPromise;
};

export default {
	listen,
	activeSession
}