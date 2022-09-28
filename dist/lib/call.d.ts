import { RequestParams } from "./interface";
import { ResultType } from "./types";
export declare class Api {
    /**
     * @param {RequestParams} reqParams - RequestParams
     * @param [succFn] - (res: any) => void
     * @param [errorFn] - (err: Error) => void
     * @returns The resultCall is being returned.
     */
    static callGlobal(reqParams: RequestParams, succFn?: (res: any) => void, errorFn?: (err: Error) => void): Promise<ResultType>;
    /**
     * @param {string} url - string - The url to which the request will be sent.
     * @param {RequestInit} [data] - RequestInit
     * @returns The result of the fetch request.
     */
    private static genericFetch;
}
