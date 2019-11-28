import Overlay from 'o-overlay';
import Delegate from 'ftdomdelegate';

function ConfirmOverlay (title, text) {
	if (!text) {
		text = title;
		title = null;
	}

	return new Promise((resolve) => {
		const overlayInstance = new Overlay("alphaville_confirm", {
			html: `
				<div class="alphaville-overlay-text">${text}</div>
				<div class="alphaville-overlay-buttons">
					<button type="button" class="alphaville-overlay-ok o-buttons o-buttons--primary">OK</button>
					<button type="button" class="alphaville-overlay-cancel o-buttons">Cancel</button>
				</div>
			`,
			modal: true,
			heading: {
				title: title || 'Confirmation',
				shaded: true
			}
		});

		overlayInstance.open();

		const confirmOverlayDelegate = new Delegate(overlayInstance.wrapper);

		confirmOverlayDelegate.on('click', '.alphaville-overlay-ok', () => {
			resolve(true);
			overlayInstance.close();
		});
		confirmOverlayDelegate.on('click', '.alphaville-overlay-cancel', () => {
			resolve(false);
			overlayInstance.close();
		});

		const onDestroy = function () {
			overlayInstance.wrapper.removeEventListener('oOverlay.destroy', onDestroy);
			confirmOverlayDelegate.destroy();
		};
		overlayInstance.wrapper.addEventListener('oOverlay.destroy', onDestroy);
	});
}

document.addEventListener('o.DOMContentLoaded', () => {
	const confirmElements = document.querySelectorAll('a[data-component="alphaville-confirm"]');

	for (let i = 0; i < confirmElements.length; i++) {
		const el = confirmElements[i];

		if (el.getAttribute('data-alphaville-confirm-title') && el.getAttribute('data-alphaville-confirm-message')) {
			el.addEventListener('click', (evt) => {
				evt.preventDefault();

				new ConfirmOverlay(el.getAttribute('data-alphaville-confirm-title'), el.getAttribute('data-alphaville-confirm-message')).then(decision => {
					if (decision === true) {
						window.location.href = el.href;
					}
				});
			});
		}
	}
});

module.exports = ConfirmOverlay;
