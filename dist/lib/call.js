"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const enum_1 = require("./enum");
/* The class is a static class that has a static method that takes a RequestParams object as a
parameter and returns a promise. */
class Api {
    /**
     * @param {RequestParams} reqParams - RequestParams
     * @param [succFn] - (res: any) => void: This is a function that will be called if the request is
     * successful.
     * @returns The resultCall variable is being returned.
     */
    static async callGlobal(reqParams, succFn) {
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
        let resultCall = await this.genericFetch(reqParams.url, reqParams.data, succFn);
        return resultCall;
    }
    /**
     * @param {string} url - string - the url to fetch
     * @param {RequestInit} [data]
     * @param [succFn] - (res: any) => void
     * @returns The resultGeneric.json() is being returned.
     */
    static async genericFetch(url, data, succFn) {
        let resultGeneric;
        try {
            if (data !== undefined) {
                resultGeneric = await fetch(url, data);
                if (!resultGeneric.ok) {
                    switch (resultGeneric.status) {
                        case undefined:
                            return enum_1.StatusCall.STAT_UNDEFINED;
                        case 403:
                            return enum_1.StatusCall.STAT_403;
                        case 404:
                            return enum_1.StatusCall.STAT_404;
                        case 405:
                            return enum_1.StatusCall.STAT_405;
                        case 500:
                            return enum_1.StatusCall.STAT_500;
                        default:
                            return resultGeneric.status;
                    }
                }
                else {
                    if (resultGeneric.status == 200) {
                        if (succFn !== undefined) {
                            succFn(JSON.stringify(resultGeneric));
                        }
                        else {
                            return resultGeneric.json();
                        }
                    }
                }
            }
            else {
                return enum_1.GenericMessage.DATA_UNDEFINED;
            }
        }
        catch (e) {
            console.log(e);
            return enum_1.GenericMessage.CATCH_ERROR;
        }
    }
}
exports.Api = Api;
//# sourceMappingURL=call.js.map