export class BeeRequest {
	public async useFetch<T>(url: string, requestInit?: RequestInit): Promise<T> {
		let result: T = await fetch(url, requestInit)
			.then((data: Response) => data)
			.then((res: Response) => {
				return res.json();
			})
			.catch((error: Error) => {
				return error.message;
			});

		return result;
	}
}
