'use strict';

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('cycle-preview', {
	schema: {
		view: {type: 'selector', default: null},
		direction: {type: 'string', default: 'forward'},
		library: {type: 'selector', default: null}
	},
	init: function()
	{
		this.el.object3D.addEventListener('cursorup', (function(e)
		{
			if(!this.data.library || !this.data.view)
				return;

			if( !/^(category-)?(for|back)ward$/.test(this.data.direction) )
				return;

            var nextElem;
            var curId = this.data.view.getAttribute('synced-resource').res;
			var curElem = this.data.library.querySelector('[id="'+curId+'"]');
			var curCategory = /^[^\/]+/.exec(curId);
			if(curCategory) curCategory = curCategory[0];

			if( /forward$/.test(this.data.direction) )
			{
				nextElem = curElem.nextElementSibling || curElem.parentElement.firstElementChild;
				while( this.data.direction.startsWith('category')
					&& nextElem.id.startsWith(curCategory)
					&& nextElem !== curElem
				){
					nextElem = nextElem.nextElementSibling || nextElem.parentElement.firstElementChild;
				}
			}
			else if( /backward$/.test(this.data.direction) )
			{
				nextElem = curElem.previousElementSibling || curElem.parentElement.lastElementChild;
				while( this.data.direction.startsWith('category')
					&& nextElem.id.startsWith(curCategory)
					&& nextElem !== curElem
				){
					nextElem = nextElem.previousElementSibling || nextElem.parentElement.lastElementChild;
				}
			}

			console.log('setting preview to', nextElem.id);
            this.data.view.setAttribute('synced-resource', 'res', nextElem.id);

		}).bind(this));
	}
});

AFRAME.registerComponent('synced-resource', {
	dependencies: ['sync'],
	schema: {
        res: {type: 'string'},
        label: {type: 'selector'}
    },
	init: function()
	{
		var self = this;
		var sync = this.el.components.sync;
		self.firstUpdate = true;
		self.refLock = false;

		if(sync.isConnected)
			start();
		else
			this.el.addEventListener('connected', start);

		function start()
		{
            var resourceRef = sync.dataRef.child('resource');
			resourceRef.on('value', function (snapshot)
			{
                if (sync.isMine && !self.firstValue) return;
				var val = snapshot.val();

                self.refLock = true;
                self.data.res = val;
                self.refLock = false;
				self.firstValue = false;
			});
		}
	},

	update: function(oldData)
	{
		var sync = this.el.components.sync;
        var resourceRef = sync.dataRef ? sync.dataRef.child('resource') : null;

        if(sync.isMine && !this.refLock && resourceRef)
			resourceRef.set(this.data.res);

        this.setResource(this.data.res);
	},

    setResource: function(id)
    {
        if(/^interactables\//.test(id))
        {
            this.el.removeAttribute('n-object');
            this.el.setAttribute('n-spawner', 'res', id);
        }
        else {
            this.el.removeAttribute('n-spawner');
            this.el.setAttribute('n-object', 'res', id);
        }

        // update the label if there is one
        if(this.data.label){
            this.data.label.setAttribute('n-text', 'text', id);
        }
    }
});

AFRAME.registerComponent('array-data', {
	schema: {
		depth: {type: 'number', default: '1'},
		width: {type: 'number', default: '1'},
		height: {type: 'number', default: '1'},
		model: {type: 'string', default: 'effects/fire'}
	}
});
