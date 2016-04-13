/**
 * Store
 *
 * This is to be used when an error is returned
 * from a data store. This typically means that
 * the application is (probably) ok, but that
 * the data store has returned an error we weren't
 * expecting. This might be because the data store
 * is down, or the query itself cannot be understood
 * by the data store.
 *
 * This will be published as an HTTP 503 error.
 *
 * This cannot be recovered from.
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Inject} from "steeplejack/decorators/inject";
import {FatalException} from "steeplejack/exception/fatal";


/* Files */


@Inject({
    name: "StoreError",
    factory: true
})
export class StoreError extends FatalException {

    public get type () {
        return "STORE";
    }

    public getHttpCode () : number {
        return 503;
    }

}
