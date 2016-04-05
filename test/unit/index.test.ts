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
import {db} from "../../index";


describe("config test", function () {

    it("should create a plugin", function () {

        expect(db).to.be.instanceof(Plugin);

        expect(db.modules).to.be.an("array")
            .have.length(1);

        expect(db.modules[0]).to.be.equal(poolGrabber);

    });

});
