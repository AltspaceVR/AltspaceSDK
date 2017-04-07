let expect = chai.expect;
describe('the sync utility', () => {

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
	            expect(connection).to.have.a.property('user').which.is.a('Object');;
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
	    var rand = () => Math.floor(Math.random() * 10000);
	    var config = {
	        appId: rand() + '',
	        authorId: rand() + '',
	        instanceId: rand() + '',
	        spaceId: rand() + '',
	        userId: rand() + '',
	    }
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
