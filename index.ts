/**
 * Steeplejack DB
 *
 * Database plugin for a Steeplejack project
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Plugin} from "steeplejack/lib/plugin";


/* Files */
import * as poolGrabber from "./lib/poolGrabber";
import * as store from "./lib/store";


/* Add the modules to the plugin */
export let db = new Plugin([
    poolGrabber,
    store
]);
