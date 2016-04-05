/**
 * PoolGrabber
 *
 * This is a simple function to grab a database
 * resource from the pool.  Unless an error is
 * detected during the acquire stage, it will
 * always return it to the pool when finished.
 *
 * This is a thin-wrapper around the generic-pool
 * acquire method, but it is promisified.
 */

"use strict";


/* Node modules */


/* Third-party modules */
import {Promise} from "es6-promise";


/* Files */
import {IResource} from "./resource";


const name = "$poolGrabber";


function factory (StoreError: (err: any) => void) {

    return (resource: IResource, iterator: (db: any) => Promise<any>) => {

        return new Promise((resolve, reject) => {

            resource.acquire((err, db) => {

                if (err) {
                    /* Wrap an error in a StoreError */
                    reject(new StoreError(err));
                    return;
                }

                /* Return the db instance */
                resolve(db);

            });

        })
            .then(db => {

                return new Promise(resolve => {

                    resolve(iterator(db));

                }).then(result => {
                    resource.release(db);

                    return result;
                }).catch(err => {
                    resource.release(db);

                    return Promise.reject(err);
                });

            });

    };

}


export let __factory = {
    name,
    factory
};
