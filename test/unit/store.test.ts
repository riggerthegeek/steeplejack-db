/**
 * store.test
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {injectFlag} from "steeplejack/decorators/inject";
import {FatalException} from "steeplejack/exception/fatal";


/* Files */
import {expect} from "../helper";
import {StoreError} from "../../lib/store";


describe("store error test", function () {

    it("should register to the injector correctly", function () {

        expect(StoreError[injectFlag]).to.be.eql({
            name: "StoreError",
            factory: true,
            deps: []
        });

    });

    it("should configure the exception instance correctly", function () {

        let obj = new StoreError("uh-oh");

        expect(obj).to.be.instanceof(StoreError)
            .instanceof(FatalException);

        expect(obj.message).to.be.equal("uh-oh");
        expect(obj.getHttpCode()).to.be.equal(503);
        expect(obj.type).to.be.equal("STORE");

    });

});
