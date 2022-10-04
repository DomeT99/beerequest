import { StatusCall } from './enum';

export class ErrorHandler {


    /**
     * If the response status is undefined, 401, 403, 404, 405, 429, 500, or 502, then call the error
     * function with the response status and the corresponding StatusCall enum value.
     * @param {Response} response - Response - this is the response from the http call
     * @param [errorFn] - The function that will be called if the status is not 200.
     * @returns The return value is a function that is being called with the errorFn parameter.
     */
    public static statusHandler(response: Response, errorFn?: (error: number) => any) {

        switch (response.status) {

            case undefined:
                return this.checkFunction(errorFn, response.status, StatusCall.STAT_UNDEFINED);
            case 401:
                return this.checkFunction(errorFn, response.status, StatusCall.STAT_401);
            case 403:
                return this.checkFunction(errorFn, response.status, StatusCall.STAT_403);
            case 404:
                return this.checkFunction(errorFn, response.status, StatusCall.STAT_404);
            case 405:
                return this.checkFunction(errorFn, response.status, StatusCall.STAT_405);
            case 429:
                return this.checkFunction(errorFn, response.status, StatusCall.STAT_429);
            case 500:
                return this.checkFunction(errorFn, response.status, StatusCall.STAT_500);
            case 502:
                return this.checkFunction(errorFn, response.status, StatusCall.STAT_502);
            default:
                return this.checkFunction(errorFn, response.status, StatusCall.STAT_UNDEFINED);
        }
    }

    /**
     * Here's the function in action:
     * @param genericFn - (statusParam: number) => void - This is the function that is passed in.
     * @param {number} statusCall - number - This is the status code that you want to return.
     * @param {StatusCall} [statusCallMessage] - This is the message that will be displayed in the console.
     * @returns The return value is the statusCall value.
     */
    private static checkFunction(genericFn: (statusParam: number) => void, statusCall: number, statusCallMessage?: StatusCall) {

        if (genericFn !== undefined) {
            console.error(statusCallMessage);
            genericFn(statusCall);
        }
        else {
            console.error(statusCallMessage);
            return statusCall;
        }
    }
}