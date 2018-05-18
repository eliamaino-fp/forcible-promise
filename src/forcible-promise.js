/**
 * Accepts a Promise and returns a Promise
 * with two helper functions (forceResolve and forceReject)
 * to force the execution of resolve and reject
 *
 * @export
 * @param  {Promise} originalPromise - the Promise to be wrapped
 * @return {Promise}
 */
export function forciblePromise(originalPromise) {
  let forceResolve
  let forceReject
  const forcerPromise = new Promise((resolve, reject) => {
    forceResolve = resolve
    forceReject = reject
  })

  const forciblePromise = Promise.race([originalPromise, forcerPromise])
  forciblePromise.forceResolve = forceResolve
  forciblePromise.forceReject = forceReject

  return forciblePromise
}
