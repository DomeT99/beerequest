import { Api, RequestParams, StatusCall } from '../src/index';
import fetchMock from 'jest-fetch-mock';

describe("Suite error call", () => {

    test("404 NOT FOUND", async () => {
        fetchMock.mockResponse(JSON.stringify(StatusCall.STAT_404));
        
        let params: RequestParams = {
            url: 'https://pokeapi.co/api/v2/generation/1200',
            method: "GET"
        };

        
        let callTest = await Api.callGlobal(params);

        
        expect(callTest).toEqual(StatusCall.STAT_404);
    })
})