import { StatusCall } from './enum';
import { ResponseCall } from './interface';

export class ErrorHandler {



    /**
     * It checks the status of the response and returns the appropriate error message.
     * @param {Response} response - Response - The response object from the http request
     * @param [errorFn] - The function that will be called if the status code is not 200.
     * @returns The return value is a function that takes a parameter of type ResponseCall.
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

    /**
     * @param genericFn - (error: ResponseCall | {}) => void
     * @param {Response} responseCall - Response - The response from the fetch call
     * @param {StatusCall} [statusCallMessage] - This is the message that will be displayed in the console.
     * @returns a Promise.
     */
    private static async checkFunction(genericFn: (error: ResponseCall | {}) => void, responseCall: Response, statusCallMessage?: StatusCall) {

        if (genericFn !== undefined) {
            console.error(statusCallMessage);

            genericFn({
                status: responseCall.status,
                result: await Promise.resolve(responseCall.json())
                    .then((res) => { return res })
            });
        }
        else {
            console.error(statusCallMessage);
            return ({
                status: responseCall.status,
                result: await Promise.resolve(responseCall.json())
                    .then((res) => { return res })
            });
        }
    }
}