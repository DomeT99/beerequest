import { RequestParams } from "./interface";
export declare class Api {
    /**
     * @param {RequestParams} reqParams - RequestParams
     * @param [succFn] - (res: any) => void: This is a function that will be called if the request is
     * successful.
     * @returns The resultCall variable is being returned.
     */
    static callGlobal(reqParams: RequestParams, succFn?: (res: any) => void): Promise<Response>;
    /**
     * @param {string} url - string - the url to fetch
     * @param {RequestInit} [data]
     * @param [succFn] - (res: any) => void
     * @returns The resultGeneric.json() is being returned.
     */
    private static genericFetch;
}
