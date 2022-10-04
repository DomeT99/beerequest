import { StatusCall } from './enum';

export class ErrorHandler {

    /**
     * Here's the function in action:
     * @param genericFn - (statusParam: number) => void - This is the function that is passed in.
     * @param {number} statusCall - number - This is the status code that you want to return.
     * @param {StatusCall} [statusCallMessage] - This is the message that will be displayed in the console.
     * @returns The return value is the statusCall value.
     */
    public static checkFunction(genericFn: (statusParam: number) => void, statusCall: number, statusCallMessage?: StatusCall) {
       
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