export interface Observer<T> {
  next: (next: T, previous?: T) => void;
  error: (err: Error) => void;
  complete: () => void;
}

export interface Observable {
  subscribe: () => void;
  unsubscribe: () => void;
  once: () => void;
  observing: () => boolean;
}
