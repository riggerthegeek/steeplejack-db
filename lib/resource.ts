/**
 * resource
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Promise} from "es6-promise";


/* Files */


export interface IResource {
    acquire: (err: any, db?: any) => void;
    release: (db: any) => Promise<any>;
}
