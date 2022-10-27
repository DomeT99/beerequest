import { RequestParams, ResponseCall } from "./interface";
import { StatusCall } from './enum';
export declare class Api {
    /**
     * It's assigning the values of the RequestParams object to the data object
     * @param {RequestParams} reqParams - RequestParams
     * @param [succFn] - (res: ResponseCall) => any
     * @param [errorFn] - (error: StatusCall | number | ResponseCall) => any
     * @returns The resultCall variable is being returned.
     */
    static callGlobal(reqParams: RequestParams, succFn?: (res: ResponseCall) => any, errorFn?: (error: StatusCall | number | ResponseCall) => any): Promise<ResponseCall>;
    /**
     * This function is a generic function that handles the fetch request and returns a promise with the
     * result of the request.
     * @param {string} url - string - the url to fetch
     * @param {RequestInit} [data] - RequestInit = {
     * @param [succFn] - (res: ResponseCall | {}) => any
     * @param [errorFn] - (error: StatusCall | number | ResponseCall) => any
     * @returns a promise.
     */
    private static genericFetch;
}
