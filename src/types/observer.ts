export type Observer<T> = {
  next: (next: T, previous?: T) => void;
  error: (err: Error) => void;
  complete: () => void;
};

export type Observable = {
  subscribe: () => void;
  unsubscribe: () => void;
  once: () => void;
  observing: () => boolean;
};
