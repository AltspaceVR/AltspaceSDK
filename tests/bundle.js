(function () {
    var expect = chai.expect;

    //todo next is add a test for running in the client and return if false


    var core = function () {

        before(function () {
            if (!altspace.inClient)
                { throw new Error("Not in client. Skipping in-client tests"); }
        });

        describe("the window.altspace namespace", function () {

            it("should not be deleteable", function () {
                expect(altspace).to.exist;
                delete window.altspace;
                expect(altspace).to.exist;
            });

            it("should not be reassignable", function () {
                window.altspace = 'foo';
                expect(altspace).to.not.equal('foo');
            });
        });

        describe("this enclosure", function () {

            var enclosure;
            before(function (done) {
                altspace.getEnclosure().then(function (enc) {
                    enclosure = enc;
                    done();
                });
            });

            it("should have reasonable dimensions", function () {
                expect(enclosure).to.have.a.property('innerWidth').which.is.within(1, 4096);
                expect(enclosure).to.have.a.property('innerHeight').which.is.within(1, 4096);
                expect(enclosure).to.have.a.property('innerDepth').which.is.within(1, 4096);
            });


            it("should have a reasonable pixelsPerMeter", function () {
                expect(enclosure).to.have.a.property('pixelsPerMeter').which.is.within(0.001, 1000000);
            });

            //TODO: Fire a test change somehow and see if the values get modified.
        });

        describe("this user", function () {
            var user;
            before(function (done) {
                altspace.getUser().then(function (u) {
                    user = u;
                    done();
                });
            });

            it("should have a displayName", function () {
                expect(user).to.have.a.property('displayName').which.is.a('string').and.is.not.equal('');
            });

            it("should have a userId", function () {
                expect(user).to.have.a.property('userId').which.is.a('string').and.is.not.equal('');
            });
        });

        describe("the tracking skeleton", function () {
            var trackingSkeleton;
            before(function (done) {
                altspace.getThreeJSTrackingSkeleton().then(function (skel) {
                    trackingSkeleton = skel;
                    done();
                });
            });

            it("should have joints", function () {
                expect(trackingSkeleton).to.exist;
                expect(trackingSkeleton).to.have.a.property('children').which.has.a.property('length').which.is.above(0);
            });

            it("should have a joint getter supporting default properties", function () {
                expect(trackingSkeleton.getJoint("Eye")).to.equal(trackingSkeleton.getJoint("Eye", "Center", 0));
            });

            it("should have a center eye with some confidence", function () {
                var centerEye = trackingSkeleton.getJoint("Eye");
                expect(centerEye).to.exist.and.to.have.a.property('confidence').which.is.greaterThan(0);
            });

            it("should have a center eye with a reasonable position", function () {
                var centerEye = trackingSkeleton.getJoint("Eye");
                //Unless your head is precisely in the middle of the composition, every axis should not be 0
                expect(centerEye.position).to.satisfy(function (position) {
                    return !(position.x === 0 &&
                        position.y === 0 &&
                        position.z === 0);
                });
            });

            it("should return the same skeleton for subsequent calls", function () {
                return expect(altspace.getThreeJSTrackingSkeleton()).to.eventually.equal(trackingSkeleton);
            });
        });

        describe("the threejs renderer", function () {
            it("should have a render function", function () {
                var renderer = altspace.getThreeJSRenderer();
                expect(renderer).to.exist;
                expect(renderer).to.have.a.property('render');
            });
        });
    };

    describe("in-client tests", core);

    /*describe("one second later", function () {
        it('should be tried again', function (done) {
            setTimeout(function () {
                core();
                done();
            }, 1000);
        });
    });*/
})();

var expect = chai.expect;
describe('the sync utility', function () {

    function dashEscape(keyName) {
        return keyName ? encodeURIComponent(keyName).replace(/\./g, '%2E').replace(/%[A-Z0-9]{2}/g, '-') : null;
    }

    describe("when asked for a sync connection with no parameters", function() {
        it("should throw an error for missing an authorId or appId", function () {
            expect(altspace.utilities.sync.connect).to.throw(Error);
        });
    });

	describe("when asked for a default sync connection", function () {
	    var connection;
	    before(function (done) {
	        altspace.utilities.sync.connect({authorId:'AltspaceVR',appId:'SyncTest'}).then(function (s) {
	            connection = s;
	            done();
	        });
	    });

	    it("should have a instance ref", function () {
	        expect(connection).to.have.a.property('instance').which.is.a('Object');
	        expect(connection.instance.parent().key()).to.equal(connection.app.child('instances').key());
	    });

	    it("should have a app ref", function () {
	        expect(connection).to.have.a.property('app').which.is.a('Object');
	    });


	    if (altspace.inClient) {
	        it("should have a space ref", function() {
	            expect(connection).to.have.a.property('space').which.is.a('Object');
	            expect(connection.space.parent().key()).to.equal(connection.app.child('spaces').key());
	        });

	        it("should have a user ref", function () {
	            expect(connection).to.have.a.property('user').which.is.a('Object');
	            expect(connection.user.parent().key()).to.equal(connection.app.child('users').key());
	        });
	    } else {
	        it("should not have a space ref", function () {
	            expect(connection).to.have.a.property('space').which.is.null;
	        });

	        it("should not have a user ref", function () {
	            expect(connection).to.have.a.property('user').which.is.null;
	        });
	    }
	});
	describe("when asked for a customized sync connection", function () {
	    var connection;
	    var rand = function () { return Math.floor(Math.random() * 10000); };
	    var config = {
	        appId: rand() + '',
	        authorId: rand() + '',
	        instanceId: rand() + '',
	        spaceId: rand() + '',
	        userId: rand() + '',
	    };
	    before(function (done) {
	        altspace.utilities.sync.connect(config).then(function (s) {
	            connection = s;
	            done();
	        });
	    });

	    it("should have a custom instance ref", function () {
	        expect(connection.instance.key()).to.equal(dashEscape(config.instanceId));
	    });

	    it("should have a custom space ref", function () {
	        expect(connection.space.key()).to.equal(dashEscape(config.spaceId));
	    });

	    it("should have a custom user ref", function () {
	        expect(connection.user.key()).to.equal(dashEscape(config.userId));
	    });
	});
});

var expect$1 = chai.expect;
describe('The behavior shim', function () {
	var scene, cube;
	beforeEach(function () {
		scene = new THREE.Scene();
		cube = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({ color: 'red' }));
		scene.add(cube);
	});
	it('can add and retrieve behavior', function () {
		cube.addBehavior({type: 'Foo'});
		expect$1(cube.getBehaviorByType('Foo')).to.exist;
	});
	it('can add multiple behaviors', function () {
		cube.addBehaviors({type: 'Foo'}, {type: 'Bar'});
		expect$1(cube.getBehaviorByType('Foo').type).to.equal('Foo');
		expect$1(cube.getBehaviorByType('Bar').type).to.equal('Bar');
	});
	it('can update behaviors', function () {
		var updatedFoo = false;
		var updatedBar = false;
		cube.addBehaviors(
			{update: function () { updatedFoo = true; }, type: 'Foo'},
			{update: function () { updatedBar = true; }, type: 'Bar'});
		cube.updateBehaviors();
		expect$1(updatedFoo).to.be.true;
		expect$1(updatedBar).to.be.true;
	});
	it('can remove a behavior', function () {
		var behavior = {type: 'Foo'};
		cube.addBehavior(behavior);
		cube.removeBehavior(behavior);
		expect$1(cube.getBehaviorByType('Foo')).to.not.exist;
	});
	it('can remove all behaviors', function () {
		cube.addBehaviors({type: 'Foo'}, {type: 'Bar'});
		cube.removeAllBehaviors();
		expect$1(cube.getBehaviorByType('Foo')).to.not.exist;
		expect$1(cube.getBehaviorByType('Bar')).to.not.exist;
	});
});

var expect$2 = chai.expect;
describe('the layout utility', function () {
	var behaviors = altspace.utilities.behaviors;
	var scene,
		cube,
		container;
	var originalLog = console.log.bind(console);
	var originalError = console.error.bind(console);
	beforeEach(function () {
		window.console.error = function () {
			var args = [], len = arguments.length;
			while ( len-- ) args[ len ] = arguments[ len ];

			window.dispatchEvent(new CustomEvent('consoleevent', { detail: args.join('/') }));
			originalError.apply(void 0, args);
		};
		scene = new THREE.Scene();
		container = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10));
		cube = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({ color: 'red' }));
		container.add(cube);
		scene.add(container);

		if (!altspace.getEnclosure) {
			altspace.getEnclosure = function () {
				var mockPromise = {
					then: function (callback) {
						setTimeout(function () { return callback({
							innerHeight: 1024,
							innerWidth: 1024,
							innerDepth: 1024,
							pixelsPerMeter: 100
						}); }, 0);
					}
				};
				return mockPromise;
			};
		}
	});
	it('should be able position object to the max', function (done) {
		cube.addBehavior(new behaviors.Layout({at: { y: 'max' }}));
		scene.updateAllBehaviors();
		// HACK Since the Layout behavior retrieves the enclosure, it
		// happens asynchronously. Retrieving the enclosure here again
		// forces the assertion to occur after layout is complete.
		altspace.getEnclosure().then(function () {
			expect$2(cube.position.y).to.equal(5);
			done();
		});
	});
	it('should be able position object to the min', function (done) {
		cube.addBehavior(new behaviors.Layout({at: { y: 'min' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(function () {
			expect$2(cube.position.y).to.equal(-5);
			done();
		});
	});
	it('should be able position object to the center', function (done) {
		cube.position.y = 5;
		cube.addBehavior(new behaviors.Layout({at: { y: 'center' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(function () {
			expect$2(cube.position.y).to.equal(0);
			done();
		});
	});
	it('should be able position object when outside parent\'s bounding box', function (done) {
		cube.position.y = 20;
		cube.addBehavior(new behaviors.Layout({at: { y: 'max' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(function () {
			expect$2(cube.position.y).to.equal(5);
			done();
		});
	});
	it('should be able position with pixel offset', function (done) {
		cube.addBehavior(new behaviors.Layout({at: {x: 'min+1'}}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(function () {
			expect$2(cube.position.x).to.equal(-4);
			done();
		});
	});
	it('should be able position with percent offset', function (done) {
		cube.addBehavior(new behaviors.Layout({at: {x: 'max-75%'}}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(function () {
			expect$2(cube.position.x).to.equal(-2.5);
			done();
		});
	});
	it('should be able set anchor', function (done) {
		cube.addBehavior(new behaviors.Layout({
			my: {x: 'max'}, at: {x: 'max'}}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(function () {
			expect$2(cube.position.x).to.equal(4.5);
			done();
		});
	});
	it('should be able position to enclosure', function (done) {
		container.addBehavior(new behaviors.Layout({
			my: {x: 'max'}, at: {x: 'max'}}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(function (enclosure) {
			try {
				expect$2(container.position.x).to.equal(enclosure.innerWidth / 2 - 5);
			}
			catch (e) {
				done(e);
			}
			done();
		});
	});
	it('should be able set anchor with rotation', function (done) {
		cube.rotation.z = Math.PI / 4;
		cube.addBehavior(new behaviors.Layout({
			my: {x: 'max'}, at: {x: 'max'}}));
		scene.updateAllBehaviors();
		var cubeDiagonal = Math.sqrt(Math.pow(0.5, 2) + Math.pow(0.5, 2));
		altspace.getEnclosure().then(function () {
			expect$2(cube.position.x).to.be.closeTo(5 - cubeDiagonal, 0.00001);
			done();
		});
	});
	it('should be able position object in all axes', function (done) {
		cube.position.y = 5;
		cube.addBehavior(new behaviors.Layout({
			at: { x: 'max', y: 'min', z: 'max' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(function () {
			expect$2(cube.position.x).to.equal(5);
			expect$2(cube.position.y).to.equal(-5);
			expect$2(cube.position.z).to.equal(5);
			done();
		});
	});
	it('throws an error for an invalid argument', function (done) {
		cube.position.y = 2;
		cube.addBehavior(new behaviors.Layout({at: { y: 'top' }}));
		scene.updateAllBehaviors();
		window.addEventListener('consoleevent', function (evt) {
			expect$2(evt.detail).to.match(/invalid layout position/);
			done();
		});
	});
	it('position should be relative to container', function (done) {
		container.position.y = 2;
		container.rotation.z = Math.PI;
		container.updateMatrixWorld();
		cube.addBehavior(new behaviors.Layout({at: { y: 'min' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(function () {
			expect$2(cube.position.y).to.be.closeTo(-5, 0.00001);
			done();
		});
	});
	it('should not affect parent transform', function (done) {
		container.position.y = 2;
		container.rotation.z = Math.PI;
		container.updateMatrix();
		container.updateMatrixWorld();
		expect$2(cube.getWorldPosition().y).to.equal(
			2, 'Sanity check cube world position');
		cube.addBehavior(new behaviors.Layout({at: { y: 'min' }}));
		scene.updateAllBehaviors();
		altspace.getEnclosure().then(function () {
			expect$2(cube.getWorldPosition().y).to.equal(7,
				'Check cube world position to ensure that container matrix is not changed');
			done();
		});
	});
});
