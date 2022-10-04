import { MethodCall } from "./types";
/**
 * This interface is similar to RequestInit but with some additions to make it more secure.
 */
export interface RequestParams {
    url: string;
    /**
     * Defining the type of the `_data` property.
     * _data is an object where defining the body of request.
     */
    data?: RequestInit;
    body?: BodyInit;
    method: MethodCall;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    headers?: HeadersInit;
    integrity?: string;
    keepalive?: boolean;
    mode?: RequestMode;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal | null;
    window?: null;
}
