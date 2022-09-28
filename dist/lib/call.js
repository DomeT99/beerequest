"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
/* The class is a static class that has a static method that takes a RequestParams object as a
parameter and returns a promise. */
class Api {
    /**
     * @param {RequestParams} reqParams - RequestParams
     * @param [succFn] - (res: any) => void
     * @param [errorFn] - (err: Error) => void
     * @returns The resultCall is being returned.
     */
    static async callGlobal(reqParams, succFn, errorFn) {
        /**
         * Body of the request, with the required "method" property
         * The other properties are optional, in case of undefined or null value, the default value is taken.
         */
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
        let resultCall = await this.genericFetch(reqParams.url, reqParams.data);
        /* It's checking if the resultCall is true or false. If it's true, it calls the succFn function, if
        it's false, it calls the errorFn function. */
        if (resultCall instanceof Response) {
            if (succFn !== undefined)
                succFn(resultCall);
        }
        else {
            if (errorFn !== undefined)
                errorFn(resultCall);
        }
        return resultCall;
    }
    /**
     * @param {string} url - string - The url to which the request will be sent.
     * @param {RequestInit} [data] - RequestInit
     * @returns The result of the fetch request.
     */
    static async genericFetch(url, data) {
        if (data !== undefined) {
            let resultGeneric = await fetch(url, data)
                .then((response) => {
                return response.json();
            })
                .catch((err) => {
                throw err;
            });
            if (!resultGeneric.ok) {
                switch (resultGeneric.status) {
                    case 403:
                        return new Error("⛔️ You do not have the necessary permissions to log in! ⛔️");
                    case 404:
                        return new Error("❌ Page not found! ❌");
                    case 405:
                        return new Error("☢️ Operation not allowed! ☢️");
                    case 500:
                        return new Error("☠️ Server side error! ☠️");
                }
            }
            else {
                return resultGeneric.json();
            }
        }
        else {
            throw new Error(`The params are undefined!`);
        }
    }
}
exports.Api = Api;
//# sourceMappingURL=call.js.map