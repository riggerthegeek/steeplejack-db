/**
 * poolGrabber.test
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Promise} from "es6-promise";


/* Files */
import {__factory} from "../../lib/poolGrabber";
import {expect, sinon} from "../helper";


describe("poolGrabber test", function () {

    describe("module setup", function () {

        it("should define the steeplejack factory", function () {

            expect(__factory).to.be.an("object")
                .have.keys([
                    "name",
                    "factory"
                ]);

            expect(__factory.name).to.be.equal("$poolGrabber");
            expect(__factory.factory).to.be.a("function");

        });

    });

    describe("pool grabber", function () {

        beforeEach(function () {

            this.StoreError = sinon.stub();

            this.factory = __factory.factory(this.StoreError);

            this.resource = {
                acquire: sinon.stub(),
                release: sinon.spy()
            }

        });

        it("should simulate an iterator error and still release afterwards", function () {

            let db = {
                db: "client"
            };

            this.resource.acquire.yields(null, db);

            return this.factory(this.resource, (returnDb: any) => {

                expect(returnDb).to.be.equal(db);

                expect(this.resource.release).to.not.be.called;

                throw new Error("some error");

            }).then(() => {
                throw new Error("invalid");
            }).catch(err => {

                expect(err).to.be.instanceof(Error);
                expect(err.message).to.be.equal("some error");

                expect(this.resource.release).to.be.calledOnce
                    .calledWithExactly(db);

            });

        });

        it("should return the database, do a then and release afterwards", function () {

            let db = {
                db: "client"
            };

            this.resource.acquire.yields(null, db);

            return this.factory(this.resource, (returnDb: any) => {

                expect(returnDb).to.be.equal(db);

                expect(this.resource.release).to.not.be.called;

                return "thenable";

            })
                .then((result) => {

                    expect(result).to.be.equal("thenable");

                    expect(this.resource.release).to.be.calledOnce
                        .calledWithExactly(db);

                });

        });

        it("should wrap an error in a StoreError", function () {

            let inst = {
                my: "error"
            };

            this.StoreError.returns(inst);

            this.resource.acquire.yields("err");

            return this.factory(this.resource, () => {
                throw new Error("invalid");
            })
                .then(() => {
                    throw new Error("invalid error");
                })
                .catch(err => {

                    expect(err).to.be.eql({
                        my: "error"
                    });

                    expect(this.resource.acquire).to.be.calledOnce;
                    expect(this.resource.release).to.not.be.called;

                    expect(this.StoreError).to.be.calledOnce
                        .calledWithNew
                        .calledWithExactly("err");

                });

        });

    });

});
