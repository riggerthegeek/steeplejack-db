/**
 * Pool Grabber
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


describe("poolGrabber test", function () {

    var resource,
        iterator,
        poolGrabber,
        StoreError;
    beforeEach(function () {

        resource = {
            acquire: sinon.stub(),
            release: sinon.stub()
        };
        iterator = sinon.stub();

        injector(function (_$poolGrabber_, _StoreError_) {
            poolGrabber = _$poolGrabber_;
            StoreError = _StoreError_;
        });

    });

    it("should handle an acquire error", function (done) {

        resource.acquire.yields(new Error("hello"));

        return poolGrabber(resource, iterator)
            .catch(function (err) {

                expect(err).to.be.instanceof(StoreError);
                expect(err.message).to.be.equal("hello");

                expect(resource.acquire).to.be.calledOnce;
                expect(resource.release).to.not.be.called;

                expect(iterator).to.not.be.called;

                done();

            });

    });

    it("should handle an iterator error, closing up the connection", function (done) {

        /* Yield - acquire requires a callback */
        resource.acquire.yields(null, "db");

        /* Reject - iterator is a promise */
        iterator.rejects(new Error("ooops"));

        poolGrabber(resource, iterator)
            .catch(function (err) {

                expect(err).to.be.instanceof(StoreError);
                expect(err.message).to.be.equal("ooops");

            })
            .finally(function () {

                expect(resource.acquire).to.be.calledOnce;
                expect(resource.release).to.be.calledOnce
                    .calledWith("db");

                expect(iterator).to.be.calledOnce
                    .calledWith("db");

                done();

            });

    });

    it("should run everything successfully", function (done) {

        resource.acquire.yields(null, "db");

        iterator.resolves("result");

        poolGrabber(resource, iterator)
            .then(function (result) {

                expect(result).to.be.equal("result");

                expect(resource.acquire).to.be.calledOnce;
                expect(resource.release).to.be.calledOnce
                    .calledWith("db");

                expect(iterator).to.be.calledOnce
                    .calledWith("db");

                done();

            });

    });

});
