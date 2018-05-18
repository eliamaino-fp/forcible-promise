# forcible-promise
A JavaScript es6 Promise wrapper which allows you to force either resolve or reject.

## Install
`forcible-promise` is provided as an npm package, so you can easily install it with
```bash
npm install forcible-promise
```

## Usage
```javascript
import { forciblePromise } from 'forcible-promise'

const originalPromise = new Promise((resolve, reject) => {
  // Logic which resolves or rejects
});

// Get a forcible version of the original promise
const forcible = forciblePromise(originalPromise);

forcible
  .then(data => console.log(data))
  .catch(err => console.log(err))
  .finally(() => console.log('done'))

// Force the resolving of the forcible by calling forceResolve
// This will trigger the then of the promise
forcible.forceResolve(data)

// Force the rejection of the forcible by calling forceReject
// This will trigger the catch of the promise
forcible.forceReject(err)
```
