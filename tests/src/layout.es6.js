let expect = chai.expect;
describe('layout', () => {
	let behaviors = altspace.utilities.behaviors;
	let scene,
		cube,
		container,
		log = [];
	let originalLog = console.log.bind(console);
	let originalError = console.error.bind(console);
	beforeEach(() => {
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
		cube = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({ color: 'red' }));
		container.add(cube);
		scene.add(container);

		if (!altspace.getEnclosure) {
			altspace.getEnclosure = () => {
				let mockPromise = {
					then: (callback) => {
						setTimeout(() => callback({
							innerHeight: 1024,
							innerWidth: 1024,
							innerDepth: 1024,
							pixelsPerMeter: 100
						}), 0);
					}
				};
				return mockPromise;
			};
		}
	});
	it('should be able position object to the max', (done) => {
		cube.addBehavior(new behaviors.Layout({at: { y: 'max' }}));
		scene.updateAllBehaviors();
		// HACK Since the Layout behavior retrieves the enclosure, it
		// happens asynchronously. Retrieving the enclosure here again
		// forces the assertion to occur after layout is complete.
		altspace.getEnclosure().then(() => {
			expect(cube.position.y).to.equal(5);
			done();
		});
	});
	it('should be able position object to the min', (done) => {
		cube.addBehavior(new behaviors.Layout({at: { y: 'min' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(() => {
			expect(cube.position.y).to.equal(-5);
			done();
		});
	});
	it('should be able position object to the center', (done) => {
		cube.position.y = 5;
		cube.addBehavior(new behaviors.Layout({at: { y: 'center' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(() => {
			expect(cube.position.y).to.equal(0);
			done();
		});
	});
	it('should be able position object when outside parent\'s bounding box', (done) => {
		cube.position.y = 20;
		cube.addBehavior(new behaviors.Layout({at: { y: 'max' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(() => {
			expect(cube.position.y).to.equal(5);
			done();
		});
	});
	it('should be able position with pixel offset', (done) => {
		cube.addBehavior(new behaviors.Layout({at: {x: 'min+1'}}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(() => {
			expect(cube.position.x).to.equal(-4);
			done();
		});
	});
	it('should be able position with percent offset', (done) => {
		cube.addBehavior(new behaviors.Layout({at: {x: 'max-75%'}}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(() => {
			expect(cube.position.x).to.equal(-2.5);
			done();
		});
	});
	it('should be able set anchor', (done) => {
		cube.addBehavior(new behaviors.Layout({
			my: {x: 'max'}, at: {x: 'max'}}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(() => {
			expect(cube.position.x).to.equal(4.5);
			done();
		});
	});
	it('should be able position to enclosure', (done) => {
		container.addBehavior(new behaviors.Layout({
			my: {x: 'max'}, at: {x: 'max'}}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(() => {
			expect(container.position.x).to.equal(507);
			done();
		});
	});
	it('should be able set anchor with rotation', (done) => {
		cube.rotation.z = Math.PI / 4;
		cube.addBehavior(new behaviors.Layout({
			my: {x: 'max'}, at: {x: 'max'}}));
		scene.updateAllBehaviors();
		let cubeDiagonal = Math.sqrt(Math.pow(0.5, 2) + Math.pow(0.5, 2));
		altspace.getEnclosure().then(() => {
			expect(cube.position.x).to.be.closeTo(5 - cubeDiagonal, 0.00001);
			done();
		});
	});
	it('should be able position object in all axes', (done) => {
		cube.position.y = 5;
		cube.addBehavior(new behaviors.Layout({
			at: { x: 'max', y: 'min', z: 'max' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(() => {
			expect(cube.position.x).to.equal(5);
			expect(cube.position.y).to.equal(-5);
			expect(cube.position.z).to.equal(5);
			done();
		});
	});
	it('throws an error for an invalid argument', (done) => {
		cube.position.y = 2;
		cube.addBehavior(new behaviors.Layout({at: { y: 'top' }}));
		scene.updateAllBehaviors();
		// temporarily disable global error handling
		let originalOnerror = window.onerror;
		window.onerror = null;
		window.addEventListener('error', (evt) => {
			expect(evt.error.message).to.match(/invalid layout position/);
			window.onerror = originalOnerror;
			done();
		});
	});
	it('position should be relative to container', (done) => {
		container.position.y = 2;
		container.rotation.z = Math.PI;
		container.updateMatrixWorld();
		cube.addBehavior(new behaviors.Layout({at: { y: 'min' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(() => {
			expect(cube.position.y).to.be.closeTo(-5, 0.00001);
			done();
		});
	});
	it('should not affect parent transform', (done) => {
		container.position.y = 2;
		container.rotation.z = Math.PI;
		container.updateMatrix();
		container.updateMatrixWorld();
		expect(cube.getWorldPosition().y).to.equal(
			2, 'Sanity check cube world position');
		cube.addBehavior(new behaviors.Layout({at: { y: 'min' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(() => {
			expect(cube.getWorldPosition().y).to.equal(7,
				'Check cube world position to ensure that container matrix is not changed');
			done();
		});
	});
});
