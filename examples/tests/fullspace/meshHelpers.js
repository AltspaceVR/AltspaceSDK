var meshHelpers = (function () {
	function makeBox(x, y, z, texUrl) {
		var boxMesh = new THREE.Mesh(boxGeo, boxMat.clone());
		if (texUrl) {
			boxMesh.material.map = new THREE.TextureLoader().load(texUrl);
		}
		boxMesh.userData.altspace = {collider: {enabled: false}};
		boxMesh.position.set(x, y, z);
		sim.scene.add(boxMesh);
		return boxMesh;
	}

	function makeMovingBox(x, y, z) {
		var boxMesh = makeBox(x, y, z);
		boxMesh.addBehavior({
			awake: function (obj) {
				this.obj = obj;
				this.origX = obj.position.x;
				this.time = 0;
			},
			update: function (delta) {
				this.time += delta;
				this.obj.position.x = this.origX + Math.sin(this.time / 1000) * 3;
			}
		});
		return boxMesh;
	}

	function makeFlippingBox(x, y, z) {
		var boxMesh = makeBox(x, y, z);
		boxMesh.addBehavior({
			awake: function (obj) {
				this.obj = obj;
				this.time = 0;
				this.flip = true;
			},
			update: function (delta) {
				this.time += delta;
				if (this.time > 2000) {
					if (this.flip) {
						this.obj.position.set(0, 0, 0);
					}
					else {
						this.obj.position.set(x, y, z);
					}
					this.time = 0;
					this.flip = !this.flip;
				}
			}
		});
		return boxMesh;
	}

	function makePulsingSphere() {
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(1, 6, 6),
			new THREE.MeshBasicMaterial({color: 'white'})
		);
		sphere.userData.altspace = {collider: {enabled: false}};
		sphere.addBehavior({
			awake: function (obj) {
				this.obj = obj;
				this.time = 0;
				this.size = 1;
			},
			update: function (delta) {
				this.time += delta;
				var x = Math.max(0.00000001, Math.abs((Math.cos(this.time / 1000) - 1) / 2 * this.size));
				this.obj.scale.set(x, x, x);
			},
			type: 'pulsingSphereBehavior'
		});
		sim.scene.add(sphere);
		return sphere;
	}

	return {
		makeBox: makeBox,
		makeMovingBox: makeMovingBox,
		makeFlippingBox: makeFlippingBox,
		makePulsingSphere: makePulsingSphere
	};
}());
