/**
 * Written by Jonathan L Ward
 * 
 * This is a helper file to reduce boiler code when making axios calls. You can simply copy over this file into
 * a utility folder and import the axios call out of it. 
 * Change the defaults as you see fit, objects defaults (headers, params, etc) should be changed as Axios.defaults.
 * Single string or numberic defaults (IE baseURL) should be set in the axios instance
 * 
 * You may need to import other functionality for things such as JWT headers to be available on every axios call.
 */

import Axios from 'axios';

//If you need a series of objects or key pairs, use defaults to that type
Axios.defaults.headers.common = { // set <dot> default <dot> headers <dot> on all axios calls, may repeat this other declaration 
    "Content-Type": "application.json",
    //make more comma separated string pairs as you need them
}

// If the default you need is a single attribute, put it into the instance
export let axios = Axios.create({ //an instance of axios, you can create more if you need more defaults
    baseURL: 'http://localhost:3222/', //base url, you can add further extensions with url: in the specific call
})

/* Other fields you can edit are: params, data, timeout, responseType, onUpload (onDownload) Progress, 
maxRedirects, proxy.
 It is not recommended to set URLs or method defaults
 When manipulating data with responses, you can do so by calling response. data, status, statusText, 
 headers, config, request */

// #region for error logging code

// function for catch blocks on your axios. Will indicate the source of the error
export function errorLogger(error) {
    if (error.response) {
        console.log('The server responded with a status that isn\'t 200.');
        errorDetails(error);
    } else if (error.request) {
        console.log('The server didn\'t respond at all.');
        errorDetails(error);
    } else {
        console.log('There is an error on the client side, most likely. Didn\'t even send.');
        errorDetails(error);
    }
}
// function to log errors, includes error message, and what was sent. Repeated in all error types
function errorDetails(error) {
    console.log(error.message);
    console.log('You sent the following: ');
    console.log(error.config);
}
// #endregion


// #region other ways to call axios, for educational purposes
//Some older test codes I kept in here, they basically work too but are less modular
/* Axios({
    url: '/posts',
    baseURL: 'https://my-json-server.typicode.com/typicode/demo',
    method: 'DELETE', // needed, must be an all-caps string. Options of: GET, POST, PUT, PATCH, DELETE
    params: { 'id': 1 }, // appended to URL, usually used for some other functionality server side, an object
}).then(response => {
    console.log(response.data) // do something with data, here for example only
})
    .catch(error => { // debugging aid
        errorLogger(error);
    });
*/
/*Axios.get('https://my-json-server.typicode.com/typicode/demo/posts').then((response) =>
    console.log(response.headers)); */
/*abc({
    url: '/posts',
    method: 'GET',
    params: { 'id': 1 }
}).then(response => {
    console.log(response.data) // do something with data, here for example only
})
    .catch(error => { // debugging aid
        errorLogger(error);
    });
*/
// #endregion