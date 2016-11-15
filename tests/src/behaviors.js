'use strict';

var expect = chai.expect;
describe('The behavior shim', function () {
	var scene = undefined,
	    cube = undefined;
	beforeEach(function () {
		scene = new THREE.Scene();
		cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 'red' }));
		scene.add(cube);
	});
	it('can add and retrieve behavior', function () {
		cube.addBehavior({ type: 'Foo' });
		expect(cube.getBehaviorByType('Foo')).to.exist;
	});
	it('can add multiple behaviors', function () {
		cube.addBehaviors({ type: 'Foo' }, { type: 'Bar' });
		expect(cube.getBehaviorByType('Foo').type).to.equal('Foo');
		expect(cube.getBehaviorByType('Bar').type).to.equal('Bar');
	});
	it('can update behaviors', function () {
		var updatedFoo = false;
		var updatedBar = false;
		cube.addBehaviors({ update: function update() {
				updatedFoo = true;
			}, type: 'Foo' }, { update: function update() {
				updatedBar = true;
			}, type: 'Bar' });
		cube.updateBehaviors();
		expect(updatedFoo).to.be['true'];
		expect(updatedBar).to.be['true'];
	});
	it('can remove a behavior', function () {
		var behavior = { type: 'Foo' };
		cube.addBehavior(behavior);
		cube.removeBehavior(behavior);
		expect(cube.getBehaviorByType('Foo')).to.not.exist;
	});
	it('can remove all behaviors', function () {
		cube.addBehaviors({ type: 'Foo' }, { type: 'Bar' });
		cube.removeAllBehaviors();
		expect(cube.getBehaviorByType('Foo')).to.not.exist;
		expect(cube.getBehaviorByType('Bar')).to.not.exist;
	});
});