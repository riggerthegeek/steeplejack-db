/**
 * Pool Grabber
 *
 * This is a simple function to grab a database resource
 * from the pool.  Unless an error is detected during the
 * acquire stage, it will always return it to the pool
 * when finished.
 */

"use strict";


/* Node modules */


/* Third-party modules */
var bluebird = require("bluebird");


/* Files */


module.exports.__factory = function $poolGrabber (StoreError) {

    return function (resource, iterator) {

        var acquire = bluebird.promisify(resource.acquire);

        return acquire()
            .then(function (db) {

                /* Once a database is retrieved, it must be returned to the pool */
                return iterator(db)
                    .finally(function () {
                        resource.release(db);
                    });

            })
            .catch(function (err) {
                /* Wrap any errors in a StoreError */
                throw new StoreError(err);
            });

    };

};
