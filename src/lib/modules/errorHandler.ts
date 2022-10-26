import { StatusCall } from './enum';
import { ResponseCall } from './interface';

export class ErrorHandler {


    /**
     * If the response status is undefined, 401, 403, 404, 405, 429, 500, or 502, then call the error
     * function with the response status and the corresponding StatusCall enum value.
     * @param {Response} response - Response - this is the response from the http call
     * @param [errorFn] - The function that will be called if the status is not 200.
     * @returns The return value is a function that is being called with the errorFn parameter.
     */
    public static statusHandler(response: Response, errorFn?: (error: ResponseCall | {}) => any) {

        switch (response.status) {

            case undefined:
                return this.checkFunction(errorFn, response, StatusCall.STAT_UNDEFINED);
            case 401:
                return this.checkFunction(errorFn, response, StatusCall.STAT_401);
            case 403:
                return this.checkFunction(errorFn, response, StatusCall.STAT_403);
            case 404:
                return this.checkFunction(errorFn, response, StatusCall.STAT_404);
            case 405:
                return this.checkFunction(errorFn, response, StatusCall.STAT_405);
            case 429:
                return this.checkFunction(errorFn, response, StatusCall.STAT_429);
            case 500:
                return this.checkFunction(errorFn, response, StatusCall.STAT_500);
            case 502:
                return this.checkFunction(errorFn, response, StatusCall.STAT_502);
            default:
                return this.checkFunction(errorFn, response, StatusCall.STAT_UNDEFINED);
        }
    }

    private static async checkFunction(genericFn: (error: ResponseCall | {}) => void, responseCall: Response, statusCallMessage?: StatusCall) {

        if (genericFn !== undefined) {
            console.error(statusCallMessage);

            genericFn({
                status: responseCall.status,
                result: responseCall.json()
            });
        }
        else {
            console.error(statusCallMessage);
            return ({
                status: responseCall.status,
                result: responseCall.json()
            });
        }
    }
}