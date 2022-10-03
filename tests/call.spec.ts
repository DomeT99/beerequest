import { Api, RequestParams, StatusCall, GenericMessage } from '../src/index';
import fetchMock from 'jest-fetch-mock';

/**
 * In these test suite are used the API of "https://pokeapi.co/ and "https://jsonplaceholder.typicode.com/" 
 * as a reference for generating errors and exception. 
 * */
describe("Test success call", () => {
    jest.setTimeout(20000);

    test("Success call: GET", async () => {
        let result = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        }
        fetchMock.mockResponse(JSON.stringify(result));

        let params: RequestParams = {
            url: "https://jsonplaceholder.typicode.com/todos/1",
            method: "GET"
        }

        let callTest = await Api.callGlobal(params);

        expect(callTest).toEqual(result);
    })

    test("Success call: POST", async () => {
        let result = {
            id: 101,
            title: 'foo',
            body: 'bar',
            userId: 1
        }
        fetchMock.mockResponse(JSON.stringify(result));

        let params: RequestParams = {
            url: "https://jsonplaceholder.typicode.com/posts",
            method: "POST",
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
        }

        let callTest = await Api.callGlobal(params);

        expect(callTest).toEqual(result);
    })

    test("Success call: PUT", async () => {

        let result = {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1
        }
        fetchMock.mockResponse(JSON.stringify(result));

        let params: RequestParams = {
            url: "https://jsonplaceholder.typicode.com/posts/1",
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
        }

        let callTest = await Api.callGlobal(params);

        expect(callTest).toEqual(result);
    })

    test("Success call: DELETE", async () => {

        let result = {};
        fetchMock.mockResponse(JSON.stringify(result));

        let params: RequestParams = {
            url: "https://jsonplaceholder.typicode.com/posts/1",
            method: 'DELETE'
        }

        let callTest = await Api.callGlobal(params);

        expect(callTest).toEqual(result);
    })
})

describe("Test call CB Function", () => {
    jest.setTimeout(20000);

    test("Success call: GET", async () => {
        let equalRes = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        }
        fetchMock.mockResponse(JSON.stringify(equalRes));

        let params: RequestParams = {
            url: "https://jsonplaceholder.typicode.com/todos/1",
            method: "GET"
        }

        let res;
        await Api.callGlobal(params, (result) => {
            res = result;
        });
        expect(res).toEqual(equalRes);

    })

    test("Success call: POST", async () => {
        let equalRes = {
            id: 101,
            title: 'foo',
            body: 'bar',
            userId: 1
        }
        fetchMock.mockResponse(JSON.stringify(equalRes));

        let params: RequestParams = {
            url: "https://jsonplaceholder.typicode.com/posts",
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            })
        }

        let res;
        await Api.callGlobal(params, (result) => {
            res = result;
        });
        expect(res).toEqual(equalRes);

    })

    test("Success call: PUT", async () => {
        let equalRes = {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1
        }
        fetchMock.mockResponse(JSON.stringify(equalRes));

        let params: RequestParams = {
            url: "https://jsonplaceholder.typicode.com/posts/1",
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1,
            })
        }

        let res;
        await Api.callGlobal(params, (result) => {
            res = result;
        });
        expect(res).toEqual(equalRes);
    })

    test("Success call: PATCH", async () => {
        let equalRes = {
            id: 1,
            title: 'foo',
            body: 'test patch',
            userId: 1
        }
        fetchMock.mockResponse(JSON.stringify(equalRes));

        let params: RequestParams = {
            url: "https://jsonplaceholder.typicode.com/posts/1",
            method: 'PATCH',
            body: JSON.stringify({
                title: 'foo',
                body: 'test patch'
            })
        }

        let res;
        await Api.callGlobal(params, (result) => {
            res = result;
        });
        expect(res).toEqual(equalRes);
    })

    test("Success call: DELETE", async () => {
        let equalRes = {}
        fetchMock.mockResponse(JSON.stringify(equalRes));
        let params: RequestParams = {
            url: "https://jsonplaceholder.typicode.com/posts/1",
            method: 'DELETE'
        }
        let res;
        await Api.callGlobal(params, (result) => {
            res = result;
        });
        expect(res).toEqual(equalRes);
    })
})

describe("Suite error call", () => {
    /**In this suite, tests are performed 
     * for possible errors generated by calls 
     * */
    jest.setTimeout(20000);

    test.only("Check status result: ex. 404 NOT FOUND", async () => {
        /**Generic test for status return: status 404 as an example */
        fetchMock.mockResponse(JSON.stringify(StatusCall.STAT_404));

        let params: RequestParams = {
            url: 'https://pokeapi.co/api/v2/generation/1200',
            method: "GET"
        };


        let callTest = await Api.callGlobal(params);


        expect(callTest).toEqual(StatusCall.STAT_404);
    })


    test("Catch error", async () => {
        /**Testing the catch() block during the call */
        fetchMock.mockResponse(JSON.stringify(GenericMessage.CATCH_ERROR));

        let params: RequestParams = {
            url: 'https://pokeaspi.co/api/v2/generation/1200',
            method: "GET"
        };


        let callTest = await Api.callGlobal(params);


        expect(callTest).toEqual(GenericMessage.CATCH_ERROR);
    })
})