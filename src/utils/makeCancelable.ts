export const makeCancelable = <T = unknown>(promise: Promise<T>) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      (val: T) => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
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
