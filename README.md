
# Http Bee Request 🐝

A little tool to make web calling a breeze!✌️


## Installation

You can install Http Bee Request using npm

```bash
  npm i http-bee-request
```
    
## Usage

#### NB: the calls return a promise, so they must be done asynchronously through the ```async``` and ```await``` keywords

***Javascript***
```javascript
import { Api } from 'http-bee-request'

async function callExample() {
  
  let params = {
    url:"https://example.com/",
    method:"GET"
  };
  
  let result = await Api.callGlobal(params);

  console.log(result);
}
```

***Typescript***
```javascript
import { Api, RequestParams } from 'http-bee-request'

async function callExample() {
  
  let params : RequestParams = {
    url:"https://example.com/",
    method:"GET"
  };
  
  let result = await Api.callGlobal(params);

  console.log(result);
}
```
These examples above, show the basic use of the library in both Javascript and Typescript projects.
It starts with the creation of an object: **the `url` and ```method``` keys are required!**


With callback function in Javascript project:
```javascript
import { Api } from 'http-bee-request'

async function callExample() {
  
  let params = {
    url:"https://example.com/",
    method:"GET"
  };
  
  await Api.callGlobal(params, (result) => {
    console.log(result);
  });
}
```

or in Typescript project:
```javascript
import { Api, RequestParams } from 'http-bee-request'

async function callExample() {
  
  let params : RequestParams = {
    url:"https://example.com/",
    method:"GET"
  };
  
  await Api.callGlobal(params, (result) => {
    console.log(result);
  });
}
```

The callback function is an optional parameter: it accepts the result of the call as an input parameter.

### Body

Not all calls to the server need data to be sent, for this reason `body` is optional.

Here are some examples of how to use this parameter:

***Javascript***
```javascript
import { Api } from 'http-bee-request'

async function callExample() {
  
  let params = {
    url:"https://example.com/",
    method:"POST",
    body: JSON.stringify({
        id:1,
        name:"Tom",
        surname:"Hanks"
    })
  };
  
   await Api.callGlobal(params);
}
```

***Typescript***
```javascript
import { Api, RequestParams } from 'http-bee-request'

async function callExample() {
  
  let params : RequestParams = {
    url:"https://example.com/",
    method:"POST",
    body: JSON.stringify({
        id:1,
        name:"Tom",
        surname:"Hanks"
    })
  };
  
   await Api.callGlobal(params);
}
```
## Authors

- [Domenico Tenace](https://github.com/DomeT99)


## License

[MIT](https://github.com/DomeT99/beerequest/blob/master/LICENSE.md)

