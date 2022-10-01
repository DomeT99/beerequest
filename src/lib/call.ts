import { RequestParams } from "./interface";
import { ResultType } from "./types";
import { StatusCall, GenericMessage } from './enum';


/* The class is a static class that has a static method that takes a RequestParams object as a
parameter and returns a promise. */
export class Api {

    static async callGlobal(reqParams: RequestParams, succFn?: (res: any) => void): Promise<ResultType> {


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

        let resultCall:Response = await this.genericFetch(reqParams.url, reqParams.data!, succFn);

        return resultCall;
    }


    private static async genericFetch(url: string, data?: RequestInit, succFn?: (res: any) => void): Promise<any> {

        let resultGeneric: Response;
        try {
            if (data !== undefined) {

                resultGeneric = await fetch(url, data);
                
                if (!resultGeneric.ok) {
                    switch (resultGeneric.status) {
                        case undefined:
                            return StatusCall.STAT_UNDEFINED;
                        case 403:
                            return StatusCall.STAT_403;
                        case 404:
                            return StatusCall.STAT_404;
                        case 405:
                            return StatusCall.STAT_405;
                        case 500:
                            return StatusCall.STAT_500;
                        default:
                            return resultGeneric.status;
                    }
                } else {

                    if (resultGeneric.status == 200) {

                        if (succFn !== undefined) {
                            succFn(JSON.stringify(resultGeneric));
                        } else {
                            return resultGeneric.json();
                        }
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
