/**
 * injector
 *
 * Configures the injector method
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");


/* Files */


global.injector = steeplejack.test({
    modules: [
        "src/errors/**/*.js"
    ]
});
