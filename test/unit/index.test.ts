/**
 * index.test
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Plugin} from "steeplejack/lib/plugin";


/* Files */
import {expect} from "../helper";
import * as poolGrabber from "../../lib/poolGrabber";
import * as storeError from "../../lib/store";
import {db} from "../../index";


describe("config test", function () {

    it("should create a plugin", function () {

        expect(db).to.be.instanceof(Plugin);

        expect(db.modules).to.be.an("array")
            .have.length(2);

        expect(db.modules[0]).to.be.equal(poolGrabber);
        expect(db.modules[1]).to.be.equal(storeError);

    });

});
