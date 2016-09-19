const sessionListener = require('../marketslive-session-listener/main');

const sessionNotificationTemplate = `
	<div class="marketslive-notification">
		<div class="marketslive-notification-close"></div>
		<div class="marketslive-notification-title">
			Markets <strong>live</strong>
			<span class="marketslive-notification-icon"></span>
		</div>
		<div class="marketslive-notification-desc">
			today's conversation has started
		</div>
		<div class="marketslive-notification-cta">
			<a href="/marketslive">join in now</a>
		</div>
	</div>
`;

function toDOM (htmlString) {
	const d = document;
	let i;
	const a = d.createElement("div");
	const b = d.createDocumentFragment();

	a.innerHTML = htmlString;

	while (a.firstChild) {
		i = a.firstChild;
		b.appendChild(i);
	}

	return b;
};


let notificationEnabled = true;
let lastSessionId;

document.addEventListener('o.DOMContentLoaded', () => {

	function latestSession () {
		return sessionListener.activeSession().then(function (session) {
			if (session) {
				return session;
			}

			return false;
		}).catch(function (err) {
			console.log(err);
		});
	}


	function showLiveSession (sessionId) {
		lastSessionId = sessionId;
		document.body.classList.add('ml-is-live');

		if (notificationEnabled) {
			let sessionNotificationEl = document.querySelector('.marketslive-notification');

			if (!sessionNotificationEl) {
				const closedFlag = window.localStorage.getItem('marketslive-notification-closed');
				if (closedFlag !== sessionId) {
					document.body.appendChild(toDOM(sessionNotificationTemplate));
					sessionNotificationEl = document.querySelector('.marketslive-notification');

					sessionNotificationEl.querySelector('.marketslive-notification-close').addEventListener('click', () => {
						window.localStorage.setItem('marketslive-notification-closed', sessionId);
						document.body.removeChild(sessionNotificationEl);
					});
				}
			}
		}
	}

	function hideLiveSession () {
		document.body.classList.remove('ml-is-live');

		const sessionNotificationEl = document.querySelector('.marketslive-notification');
		if (sessionNotificationEl) {
			document.body.removeChild(sessionNotificationEl);
		}
	}


	latestSession().then((session) => {
		if (session) {
			showLiveSession(session.sessionId);
		}
	});

	sessionListener.listen().then(function (socket) {
		if (socket) {
			socket.bind('session-start', function (session) {
				showLiveSession(session.sessionId);
			});

			socket.bind('session-end', function () {
				function verifyIfSessionInProgress (verifyNumber) {
					latestSession().then((session) => {
						if (session) {
							if (session.sessionId === lastSessionId) {
								hideLiveSession();
							}

							if (verifyNumber > 4) {
								showLiveSession(session.sessionId);
							} else {
								setTimeout(() => {
									verifyIfSessionInProgress(verifyNumber + 1);
								}, verifyNumber * 1000);
							}
						} else {
							hideLiveSession();
						}
					});
				}

				verifyIfSessionInProgress(0);
			});
		}
	}).catch(function (err) {
		console.log(err);
	});
});


exports.sessionSeen = function (sessionId) {
	window.localStorage.setItem('marketslive-notification-closed', sessionId);
};

exports.disableNotification = function () {
	notificationEnabled = false;
};

exports.enableNotification = function () {
	notificationEnabled = true;
};
