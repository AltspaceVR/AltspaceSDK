(function () {
    var expect = chai.expect;

    //todo next is add a test for running in the client and return if false


    var core = function () {

        before(function () {
            if (!altspace.inClient)
                throw new Error("Not in client. Skipping in-client tests");
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
    }

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
