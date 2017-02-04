/**
* Silo
* Action helpers
* author: @patr
*/

/* global Promise */

module.exports = {
    /**
    * parses json
    */
    parseJSON: function parseJSON(response) {
        return response.json();
    },

    /**
    * checks status of API call
    */
    checkStatus: function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }

        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
    },
};