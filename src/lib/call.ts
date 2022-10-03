import { RequestParams } from "./interface";
import { StatusCall, GenericMessage } from './enum';


/* The class is a static class that has a static method that takes a RequestParams object as a
parameter and returns a promise. */
export class Api {

    /**
     * @param {RequestParams} reqParams - RequestParams
     * @param [succFn] - (res: any) => void: This is a function that will be called if the request is
     * successful.
     * @returns The resultCall variable is being returned.
     */
    static async callGlobal(reqParams: RequestParams, succFn?: (res: Promise<any>) => any, errorFn?: (error: StatusCall | number) => StatusCall | number) {


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
    private static async genericFetch(url: string, data?: RequestInit, succFn?: (res: Promise<any>) => any, errorFn?: (error: StatusCall | number) => StatusCall | number) {

        let promiseResult: Response;
        try {
            if (data !== undefined) {

                promiseResult = await fetch(url, data);

                if (!promiseResult.ok) {
                    switch (promiseResult.status) {
                        case undefined:
                            errorFn !== undefined ? StatusCall.STAT_UNDEFINED : errorFn(StatusCall.STAT_UNDEFINED);
                            break;
                        case 403:
                            errorFn !== undefined ? StatusCall.STAT_403 : errorFn(StatusCall.STAT_403);
                            break;
                        case 404:
                            errorFn !== undefined ? StatusCall.STAT_404 : errorFn(StatusCall.STAT_404);
                            break;
                        case 405:
                            errorFn !== undefined ? StatusCall.STAT_405 : errorFn(StatusCall.STAT_405);
                            break;
                        case 500:
                            errorFn !== undefined ? StatusCall.STAT_500 : errorFn(StatusCall.STAT_500);
                            break;
                        default:
                            errorFn !== undefined ? promiseResult.status : errorFn(promiseResult.status);
                            break;
                    }
                } else {
                    if (succFn !== undefined) {
                        succFn(await Promise.resolve(promiseResult.json()));
                    } else {
                        return promiseResult.json();
                    }
                }

            } else {
                return GenericMessage.DATA_UNDEFINED;
            }
        } catch (e) {
            console.log(e);
            return GenericMessage.CATCH_ERROR;
        }

    }
}
