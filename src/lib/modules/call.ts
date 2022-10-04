import { RequestParams } from "./interface";
import { StatusCall, GenericMessage } from './enum';
import { ErrorHandler } from './errorHandler';


/* The class is a static class that has a static method that takes a RequestParams object as a
parameter and returns a promise. */
export class Api {

    /**
     * @param {RequestParams} reqParams - RequestParams
     * @param [succFn] - (res: any) => void: This is a function that will be called if the request is
     * successful.
     * @returns The resultCall variable is being returned.
     */
    static async callGlobal(reqParams: RequestParams, succFn?: (res: Promise<any>) => any, errorFn?: (error: StatusCall | number) => any) {


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
        }

        let resultCall: Response = await this.genericFetch(reqParams.url, reqParams.data, succFn, errorFn);

        return resultCall;
    }

    /**
     * @param {string} url - string - the url to fetch
     * @param {RequestInit} [data] 
     * @param [succFn] - (res: any) => void
     * @returns The resultGeneric.json() is being returned.
     */
    private static async genericFetch(url: string, data?: RequestInit, succFn?: (res: Promise<any>) => any, errorFn?: (error: number) => any) {

        let promiseResult: Response;
        try {

            if (data !== undefined) {

                promiseResult = await fetch(url, data);

                if (!promiseResult.ok) {

                    switch (promiseResult.status) {

                        case undefined:
                            return ErrorHandler.checkFunction(errorFn, promiseResult.status, StatusCall.STAT_UNDEFINED);
                        case 401:
                            return ErrorHandler.checkFunction(errorFn, promiseResult.status, StatusCall.STAT_401);
                        case 403:
                            return ErrorHandler.checkFunction(errorFn, promiseResult.status, StatusCall.STAT_403);
                        case 404:
                            return ErrorHandler.checkFunction(errorFn, promiseResult.status, StatusCall.STAT_404);
                        case 405:
                            return ErrorHandler.checkFunction(errorFn, promiseResult.status, StatusCall.STAT_405);
                        case 429:
                            return ErrorHandler.checkFunction(errorFn, promiseResult.status, StatusCall.STAT_429);
                        case 500:
                            return ErrorHandler.checkFunction(errorFn, promiseResult.status, StatusCall.STAT_500);
                        case 502:
                            return ErrorHandler.checkFunction(errorFn, promiseResult.status, StatusCall.STAT_502);
                        default:
                            return ErrorHandler.checkFunction(errorFn, promiseResult.status, StatusCall.STAT_UNDEFINED);

                    }

                } else {
                    if (succFn !== undefined) {
                        succFn(await Promise.resolve(promiseResult.json()));
                    } else {
                        return promiseResult.json();
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
