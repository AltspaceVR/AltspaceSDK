'use strict';
(function () {
	var expect = chai.expect;
	describe('layout', function () {
		var behaviors = altspace.utilities.behaviors;
		var scene,
			cube,
			container,
			log = [];
		var originalLog = console.log.bind(console);
		var originalError = console.error.bind(console);
		beforeEach(function () {
			log = [];
			window.console.log = (...args) => {
				log.push(...args);
				originalLog(...args);
			};
			window.console.error = (...args) => {
				log.push(...args);
				originalError(...args);
			};
			scene = new THREE.Scene();
			container = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10));
			cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 'red' }));
			container.add(cube);
			scene.add(container);

			if (!altspace.getEnclosure) {
				altspace.getEnclosure = function () {
					var mockPromise = {
						then: function (callback) {
							setTimeout(() => callback({
								innerHeight: 1024,
								innerWidth: 1024,
								innerDepth: 1024
							}), 0);
						}
					};
					return mockPromise;
				};
			}
		});
		it('should be able position object to the max', function () {
			cube.addBehavior(new behaviors.Layout({at: { y: 'max' }}));
			scene.updateAllBehaviors();
			expect(cube.position.y).to.equal(5);
		});
		it('should be able position object to the min', function () {
			cube.addBehavior(new behaviors.Layout({at: { y: 'min' }}));
			scene.updateAllBehaviors();
			expect(cube.position.y).to.equal(-5);
		});
		it('should be able position object to the center', function () {
			cube.position.y = 5;
			cube.addBehavior(new behaviors.Layout({at: { y: 'center' }}));
			scene.updateAllBehaviors();
			expect(cube.position.y).to.equal(0);
		});
		it('should be able position with pixel offset', function () {
			cube.addBehavior(new behaviors.Layout({at: {x: 'min+1'}}));
			scene.updateAllBehaviors();
			expect(cube.position.x).to.equal(-4);
		});
		it('should be able position with percent offset', function () {
			cube.addBehavior(new behaviors.Layout({at: {x: 'max-75%'}}));
			scene.updateAllBehaviors();
			expect(cube.position.x).to.equal(-2.5);
		});
		it('should be able set anchor', function () {
			cube.addBehavior(new behaviors.Layout({my: {x: 'max'}, at: {x: 'max'}}));
			scene.updateAllBehaviors();
			expect(cube.position.x).to.equal(4.5);
		});
		it('should be able position to enclosure', function (done) {
			container.addBehavior(new behaviors.Layout({my: {x: 'max'}, at: {x: 'max'}}));
			scene.updateAllBehaviors();
			altspace.getEnclosure().then(() => {
				expect(container.position.x).to.equal(507);
				done();
			});
		});
		it('should be able set anchor with rotation', function () {
			cube.rotation.z = Math.PI / 4;
			cube.addBehavior(new behaviors.Layout({my: {x: 'max'}, at: {x: 'max'}}));
			scene.updateAllBehaviors();
			var cubeDiagonal = Math.sqrt(Math.pow(0.5, 2) + Math.pow(0.5, 2));
			expect(cube.position.x).to.be.closeTo(5 - cubeDiagonal, 0.00001);
		});
		it('should be able position object in all axes', function () {
			cube.position.y = 5;
			cube.addBehavior(new behaviors.Layout({at: { x: 'max', y: 'min', z: 'max' }}));
			scene.updateAllBehaviors();
			expect(cube.position.x).to.equal(5);
			expect(cube.position.y).to.equal(-5);
			expect(cube.position.z).to.equal(5);
		});
		it('logs an error for an invalid argument', function () {
			cube.position.y = 2;
			cube.addBehavior(new behaviors.Layout({at: { y: 'top' }}));
			scene.updateAllBehaviors();
			expect(log.length).to.equal(1);
		});
		it('position should be relative to container', function () {
			container.position.y = 2;
			container.rotation.z = Math.PI;
			container.updateMatrixWorld();
			cube.addBehavior(new behaviors.Layout({at: { y: 'min' }}));
			scene.updateAllBehaviors();
			expect(cube.position.y).to.be.closeTo(-5, 0.00001);
		});
		it('should not affect parent transform', function () {
			container.position.y = 2;
			container.rotation.z = Math.PI;
			container.updateMatrix();
			container.updateMatrixWorld();
			expect(cube.getWorldPosition().y).to.equal(2, 'Sanity check cube world position');
			cube.addBehavior(new behaviors.Layout({at: { y: 'min' }}));
			scene.updateAllBehaviors();
			expect(cube.getWorldPosition().y).to.equal(7,
				'Check cube world position to ensure that container matrix is not changed');
		});
	});
})();
