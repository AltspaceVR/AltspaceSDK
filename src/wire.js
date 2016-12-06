AFRAME.registerComponent('wire',
{
	multiple: true,
	schema: {
		on: {type: 'string'},
		emit: {type: 'string'},
		gained: {type: 'string'},
		lost: {type: 'string'},
		gain: {type: 'string'},
		lose: {type: 'string'},
		targets: {type: 'selectorAll'}
	},
	update: function (oldData) {
		if (oldData.on) {
			this.el.removeEventListener(oldData.on, this.actOnTargets);
		}
		if (oldData.gained) {
			this.el.removeEventListener('stateadded', this.actOnTargetsIfStateMatches);
		}
		if (oldData.lost) {
			this.el.removeEventListener('stateremoved', this.actOnTargetsIfStateMatches);
		}

		this.actOnTargets = function () {
			this.data.targets.forEach(function (el) {
				if (this.data.emit) {
					el.emit(this.data.emit);
				}
				if (this.data.gain) {
					el.addState(this.data.gain);
				}
				if (this.data.lose) {
					el.removeState(this.data.lose);
				}
			}.bind(this));
		}.bind(this);

		this.actOnTargetsIfStateMatches = function (event) {
			var state = event.detail.state;
			if (state === this.data.gained || state === this.data.lost) {
				this.actOnTargets();
			}
		}.bind(this);

		if (this.data.on) {
			this.el.addEventListener(this.data.on, this.actOnTargets);
		}
		if (this.data.gained) {
			this.el.addEventListener('stateadded', this.actOnTargetsIfStateMatches);
		}
		if (this.data.lost) {
			this.el.addEventListener('stateremoved', this.actOnTargetsIfStateMatches);
		}
	},
	remove: function () {
		this.el.removeEventListener(this.data.on, this.actOnTargets);
		this.el.removeEventListener('stateadded', this.actOnTargetsIfStateMatches);
		this.el.removeEventListener('stateremoved', this.actOnTargetsIfStateMatches);
	}
});
