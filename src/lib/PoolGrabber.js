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


/* Files */


module.exports.__factory = function $poolGrabber (StoreError) {

    return function (resource, iterator, cb) {

        /* Acquire DB */
        resource.acquire(function (err, db) {

            if (err) {
                /* Error in grabbing pool - can't continue to the iterator */
                cb(new StoreError(err));
                return;
            }

            /* Run the iterator function, passing in db and a callback */
            iterator(db, function poolGrabberCallback (err, result) {

                /* Return resource back to the pool */
                resource.release(db);

                if (err) {
                    /* An error happened - wrap in StoreError */
                    cb(new StoreError(err));
                    return;
                }

                /* All good - send back */
                cb(null, result);

            });

        });

    };

};
