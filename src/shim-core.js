(function () {
	//Cant use || as assigning the same value to an unwritable property would throw an error
	if (!window.altspace) {
		window.altspace = {};
		window.altspace.inClient = false;
	}
	if (!window.altspace.utilities) {
		window.altspace.utilities = {};
	}

	// THREE is exposed locally by the UMD wrapper, but altspace-client.js
	// requires it to be global so export it here, once we
	if (!window.THREE) {
		window.THREE = THREE
	}
}());
