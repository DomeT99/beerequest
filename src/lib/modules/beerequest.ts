export class BeeRequest {
  public async useFetch<T>(
    url: string,
    requestInit?: RequestInit
  ): Promise<T> {
    
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

let t = new BeeRequest();

t.useFetch("https://jsonplaceholder.typicode.com/posts");
