( function() {

    if (!THREE) return;

    if (window.altspace && window.altspace.inAltspace) return;

    THREE.EventDispatcher.prototype.dispatchEvent = dispatchEvent;
    THREE.Object3D.prototype.dispatchEvent = dispatchEvent;

	function dispatchEvent( event ) {

		var shouldStopPropagation;
		var shouldStopPropagationImmediately;

		if ( event.bubbles ) {

			event.currentTarget = this;

			event.stopPropagation = function () {

				shouldStopPropagation = true;

			}

			event.stopImmediatePropagation = function () {

				shouldStopPropagationImmediately = true;

			}

		}

		if ( this._listeners ) {

			var listeners = this._listeners;
			var listenerArray = listeners[ event.type ];

			if ( listenerArray ) {

				event.target = event.target || this;

				var array = [];
				var length = listenerArray.length;

				for ( var i = 0; i < length; i ++ ) {

					array[ i ] = listenerArray[ i ];

				}

				for ( var i = 0; i < length; i ++ ) {

					array[ i ].call( this, event );

					if ( shouldStopPropagationImmediately ) return;

				}

			}

		}


		if ( event.bubbles && this.parent && this.parent.dispatchEvent && ! shouldStopPropagation ) {

			dispatchEvent.call( this.parent, event );

		}

	}

}() );
