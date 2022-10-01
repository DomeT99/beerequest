import { Api, RequestParams, StatusCall, GenericMessage } from '../src/index';
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

    test("Catch error",async () => {
        fetchMock.mockResponse(JSON.stringify(GenericMessage.CATCH_ERROR));
        
        let params: RequestParams = {
            url: 'https://pokeaspi.co/api/v2/generation/1200',
            method: "GET"
        };

        
        let callTest = await Api.callGlobal(params);

        
        expect(callTest).toEqual(GenericMessage.CATCH_ERROR);
    })
})