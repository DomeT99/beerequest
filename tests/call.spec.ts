import { BeeRequest } from "../src/index";
import fetchMock from "jest-fetch-mock";

describe("Test success call", () => {
	jest.setTimeout(20000);

	test("GET request", async () => {
		let resultModel: FirstResult = {
			userId: 1,
			id: 1,
			title: "delectus aut autem",
			completed: false,
		};
		fetchMock.mockResponse(JSON.stringify(resultModel));
		let request = new BeeRequest();

		let result = await request.useFetch<FirstResult>(
			"https://jsonplaceholder.typicode.com/todos/1"
		);

		expect(result).toEqual(resultModel);
	});

	test("POST request", async () => {
		let resultModel: SecondResult = {
			id: 101,
			title: "foo",
			body: "bar",
			userId: 1,
		};

		fetchMock.mockResponse(JSON.stringify(resultModel));
		let request = new BeeRequest();

		let result = await request.useFetch<SecondResult>(
			"https://jsonplaceholder.typicode.com/posts",
			{
				method: "POST",
				body: JSON.stringify({
					title: "foo",
					body: "bar",
					userId: 1,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}
		);

		expect(result).toEqual(resultModel);
	});

	test("PUT request", async () => {
		let resultModel: SecondResult = {
			id: 1,
			title: "foo",
			body: "bar",
			userId: 1,
		};

		fetchMock.mockResponse(JSON.stringify(resultModel));
		let request = new BeeRequest();

		let result = await request.useFetch<SecondResult>(
			"https://jsonplaceholder.typicode.com/posts/1",
			{
				method: "PUT",
				body: JSON.stringify({
					id: 1,
					title: "foo",
					body: "bar",
					userId: 1,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}
		);

		expect(result).toEqual(resultModel);
	});

	test("PATCH request", async () => {
		let resultModel: SecondResult = {
			id: 1,
			title: "foo",
			body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
			userId: 1,
		};

		fetchMock.mockResponse(JSON.stringify(resultModel));
		let request = new BeeRequest();

		let result = await request.useFetch<SecondResult>(
			"https://jsonplaceholder.typicode.com/posts/1",
			{
				method: "PATCH",
				body: JSON.stringify({
					title: "foo",
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}
		);

		expect(result).toEqual(resultModel);
	});

	test("DELETE request", async () => {
		let resultModel = {};

		fetchMock.mockResponse(JSON.stringify(resultModel));
		let request = new BeeRequest();

		let result = await request.useFetch<SecondResult>(
			"https://jsonplaceholder.typicode.com/posts/1",
			{
				method: "DELETE",
			}
		);

		expect(result).toEqual(resultModel);
	});
});

interface FirstResult {
	userId?: number;
	id: number;
	title: string;
	completed?: boolean;
}

interface SecondResult extends FirstResult {
	body: string;
}
