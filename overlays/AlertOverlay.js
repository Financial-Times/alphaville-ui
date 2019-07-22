const Overlay = require('o-overlay');
const Delegate = require('ftdomdelegate');

function AlertOverlay (title, text) {
	if (!text) {
		text = title;
		title = null;
	}

	const overlayInstance = new Overlay("alphaville_alert", {
		html: `
			<div class="alphaville-overlay-text">${text}</div>
			<div class="alphaville-overlay-buttons">
				<button type="button" class="alphaville-overlay-ok o-buttons o-buttons--primary">OK</button>
			</div>
		`,
		modal: false,
		heading: {
			title: title || 'Alert',
			shaded: true
		}
	});

	overlayInstance.open();

	const confirmOverlayDelegate = new Delegate(overlayInstance.wrapper);

	confirmOverlayDelegate.on('click', '.alphaville-overlay-ok', () => {
		overlayInstance.close();
	});
}

module.exports = AlertOverlay;
