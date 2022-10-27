import { RequestParams, ResponseCall } from "./interface";
import { StatusCall, GenericMessage } from './enum';
import { ErrorHandler } from './errorHandler';


/* The class is a static class that has a static method that takes a RequestParams object as a
parameter and returns a promise. */
export class Api {


    /**
     * It's assigning the values of the RequestParams object to the data object
     * @param {RequestParams} reqParams - RequestParams
     * @param [succFn] - (res: ResponseCall) => any
     * @param [errorFn] - (error: StatusCall | number | ResponseCall) => any
     * @returns The resultCall variable is being returned.
     */
    static async callGlobal(reqParams: RequestParams, succFn?: (res: ResponseCall) => any, errorFn?: (error: StatusCall | number | ResponseCall) => any) {


        /* It's assigning the values of the RequestParams object to the data object. */
        reqParams.data = {
            body: JSON.stringify(reqParams.body) ?? null,
            method: reqParams.method,
            headers: reqParams.headers ?? { 'Content-type': 'application/json; charset=UTF-8' },
            cache: reqParams.cache ?? 'no-cache',
            credentials: reqParams.credentials ?? 'same-origin',
            integrity: reqParams.integrity ?? '',
            keepalive: reqParams.keepalive ?? false,
            mode: reqParams.mode ?? 'same-origin',
            redirect: reqParams.redirect ?? 'follow',
            referrerPolicy: reqParams.referrerPolicy ?? 'same-origin'
        }

        let resultCall: ResponseCall = await this.genericFetch(reqParams.url, reqParams.data, succFn, errorFn);

        return resultCall;
    }



    /**
     * This function is a generic function that handles the fetch request and returns a promise with the
     * result of the request.
     * @param {string} url - string - the url to fetch
     * @param {RequestInit} [data] - RequestInit = {
     * @param [succFn] - (res: ResponseCall | {}) => any
     * @param [errorFn] - (error: StatusCall | number | ResponseCall) => any
     * @returns a promise.
     */
    private static async genericFetch(url: string, data?: RequestInit, succFn?: (res: ResponseCall | {}) => any, errorFn?: (error: StatusCall | number | ResponseCall) => any) {

        let promiseResult: Response;

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
                    return ErrorHandler.statusHandler(promiseResult, errorFn);

                } else {

                    if (succFn !== undefined) {

                        succFn({
                            status: promiseResult.status,
                            result: await Promise.resolve(promiseResult.json())
                                .then((res) => { return res })
                        });

                    } else {

                        return ({
                            status: promiseResult.status,
                            result: await Promise.resolve(promiseResult.json())
                                .then((res) => { return res })
                        });
                    }
                }

            } else {
                throw GenericMessage.DATA_UNDEFINED;
            }

        } catch (e) {
            console.error(e);
            throw GenericMessage.CATCH_ERROR;
        }

    }

}
