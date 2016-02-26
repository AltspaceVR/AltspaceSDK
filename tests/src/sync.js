'use strict';

var expect = chai.expect;
describe('the sync utility', function () {

	function dashEscape(keyName) {
		return keyName ? encodeURIComponent(keyName).replace(/\./g, '%2E').replace(/%[A-Z0-9]{2}/g, '-') : null;
	}

	describe("when asked for a default sync session", function () {
		var session;
		before(function (done) {
			altspace.utilities.sync.connect().then(function (s) {
				session = s;
				done();
			});
		});

		it("should have a instance ref", function () {
			expect(session).to.have.a.property('instance').which.is.a('Object');
			expect(session.instance.parent().key()).to.equal(session.app.child('instances').key());
		});

		it("should have a app ref", function () {
			expect(session).to.have.a.property('app').which.is.a('Object');
		});

		if (altspace.inClient) {
			it("should have a space ref", function () {
				expect(session).to.have.a.property('space').which.is.a('Object');
				expect(session.space.parent().key()).to.equal(session.app.child('spaces').key());
			});

			it("should have a user ref", function () {
				expect(session).to.have.a.property('user').which.is.a('Object');;
				expect(session.user.parent().key()).to.equal(session.app.child('users').key());
			});
		} else {
			it("should not have a space ref", function () {
				expect(session).to.have.a.property('space').which.is['null'];
			});

			it("should not have a user ref", function () {
				expect(session).to.have.a.property('user').which.is['null'];
			});
		}

		it("should have a clients ref", function () {
			expect(session).to.have.a.property('clients').which.is.a('Object');
			expect(session.clients.parent().key()).to.equal(session.app.child('clients').key());
		});
	});
	describe("when asked for a customized sync session", function () {
		var session;
		var config = {
			appId: Math.random() + '',
			authorId: Math.random() + '',
			instanceId: Math.random() + '',
			spaceId: Math.random() + '',
			userId: Math.random() + ''
		};
		before(function (done) {
			altspace.utilities.sync.connect(config).then(function (s) {
				session = s;
				done();
			});
		});

		it("should have a custom instance ref", function () {
			expect(session.instance.key()).to.equal(dashEscape(config.instanceId));
		});

		it("should have a custom space ref", function () {
			expect(session.space.key()).to.equal(dashEscape(config.spaceId));
		});

		it("should have a custom user ref", function () {
			expect(session.user.key()).to.equal(dashEscape(config.userId));
		});
	});
});