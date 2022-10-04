"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const enum_1 = require("./enum");
const errorHandler_1 = require("./errorHandler");
/* The class is a static class that has a static method that takes a RequestParams object as a
parameter and returns a promise. */
class Api {
    /**
     * @param {RequestParams} reqParams - RequestParams
     * @param [succFn] - (res: any) => void: This is a function that will be called if the request is
     * successful.
     * @returns The resultCall variable is being returned.
     */
    static async callGlobal(reqParams, succFn, errorFn) {
        /* It's assigning the values of the RequestParams object to the data object. */
        reqParams.data = {
            body: reqParams.body ?? null,
            method: reqParams.method,
            headers: reqParams.headers ?? { 'Content-type': 'application/json; charset=UTF-8' },
            cache: reqParams.cache ?? 'no-cache',
            credentials: reqParams.credentials ?? 'same-origin',
            integrity: reqParams.integrity ?? '',
            keepalive: reqParams.keepalive ?? false,
            mode: reqParams.mode ?? 'cors',
            redirect: reqParams.redirect ?? 'follow',
            referrerPolicy: reqParams.referrerPolicy ?? 'same-origin'
        };
        let resultCall = await this.genericFetch(reqParams.url, reqParams.data, succFn, errorFn);
        return resultCall;
    }
    /**
     * @param {string} url - string - The url to fetch
     * @param {RequestInit} [data] - RequestInit - this is the data that is sent to the server.
     * @param [succFn] - (res: Promise) => any
     * @param [errorFn] - (error: number) => any
     * @returns The return type is a Promise.
     */
    static async genericFetch(url, data, succFn, errorFn) {
        let promiseResult;
        /** "try catch" block for handling any exceptions.  */
        try {
            /**
             * Control of incoming data:
             * if undefined I show an error message
             */
            if (data !== undefined) {
                promiseResult = await fetch(url, data);
                if (!promiseResult.ok) {
                    /**Error handling */
                    return errorHandler_1.ErrorHandler.statusHandler(promiseResult, errorFn);
                }
                else {
                    if (succFn !== undefined) {
                        succFn(await Promise.resolve(promiseResult.json()));
                    }
                    else {
                        return promiseResult.json();
                    }
                }
            }
            else {
                throw enum_1.GenericMessage.DATA_UNDEFINED;
            }
        }
        catch (e) {
            console.error(e);
            throw enum_1.GenericMessage.CATCH_ERROR;
        }
    }
}
exports.Api = Api;
//# sourceMappingURL=call.js.map