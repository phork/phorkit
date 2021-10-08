/**
 * This accepts a promise and returns a replacement
 * promise that can be canceled using the cancel
 * function that's also returned.
 */
export const makeCancelable = <T = unknown>(promise: Promise<T>) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      (value: T) => (hasCanceled ? reject({ isCanceled: true }) : resolve(value)),
      (error: unknown) => (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};
