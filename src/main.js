/**
 * main
 *
 * This is a plugin that handles the basic database
 * connection.  This is designed to use the generic-pool
 * package when creating a new resource.
 *
 * It also requires a StoreError to be registered, such
 * as the one provided by the steeplejack-errors package.
 */

"use strict";


/* Node modules */


/* Third-party modules */
var steeplejack = require("steeplejack");


/* Files */


module.exports = new steeplejack.Plugin([
    require("./lib/PoolGrabber")
]);
