export class BeeRequest {
  public async call<T>(url: string, requestInit?: RequestInit) {
    let result: T = await fetch(url, requestInit)
      .then((data) => data)
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        throw e;
      });

    return result;
  }
}
