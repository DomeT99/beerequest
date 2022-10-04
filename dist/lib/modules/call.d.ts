import { RequestParams } from "./interface";
import { StatusCall } from './enum';
export declare class Api {
    /**
     * @param {RequestParams} reqParams - RequestParams
     * @param [succFn] - (res: any) => void: This is a function that will be called if the request is
     * successful.
     * @returns The resultCall variable is being returned.
     */
    static callGlobal(reqParams: RequestParams, succFn?: (res: Promise<any>) => any, errorFn?: (error: StatusCall | number) => any): Promise<Response>;
    /**
     * @param {string} url - string - The url to fetch
     * @param {RequestInit} [data] - RequestInit - this is the data that is sent to the server.
     * @param [succFn] - (res: Promise) => any
     * @param [errorFn] - (error: number) => any
     * @returns The return type is a Promise.
     */
    private static genericFetch;
}
