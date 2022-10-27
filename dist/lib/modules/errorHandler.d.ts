import { ResponseCall } from './interface';
export declare class ErrorHandler {
    /**
     * It checks the status of the response and returns the appropriate error message.
     * @param {Response} response - Response - The response object from the http request
     * @param [errorFn] - The function that will be called if the status code is not 200.
     * @returns The return value is a function that takes a parameter of type ResponseCall.
     */
    static statusHandler(response: Response, errorFn?: (error: ResponseCall | {}) => any): Promise<{
        status: number;
        result: any;
    }>;
    /**
     * @param genericFn - (error: ResponseCall | {}) => void
     * @param {Response} responseCall - Response - The response from the fetch call
     * @param {StatusCall} [statusCallMessage] - This is the message that will be displayed in the console.
     * @returns a Promise.
     */
    private static checkFunction;
}
