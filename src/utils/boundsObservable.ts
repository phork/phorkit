import { Observer, Observable } from '../types/observer';

class BoundsEmitter {
  request?: number | false;
  previous?: ClientRect;
  ref: React.RefObject<HTMLElement>;
  ondata: (bounds: ClientRect, previous?: ClientRect) => void;
  onerror: (err: Error) => void;
  oncomplete: () => void;

  public constructor({
    ref,
    ondata,
    onerror,
    oncomplete,
  }: Pick<BoundsEmitter, 'ref' | 'ondata' | 'onerror' | 'oncomplete'>) {
    this.request = undefined;
    this.previous = undefined;
    this.ref = ref;
    this.ondata = ondata;
    this.onerror = onerror;
    this.oncomplete = oncomplete;
  }

  public start(): void {
    try {
      if (!this.request) {
        this.request = typeof window !== 'undefined' ? window.requestAnimationFrame(() => this.emit()) : undefined;
      } else {
        throw new Error('Observer is already running');
      }
    } catch (err) {
      this.onerror(err);
    }
  }

  public emit(): void {
    try {
      if (this.ref) {
        if (this.ref.current) {
          const data = this.ref.current.getBoundingClientRect();
          this.ondata(data, this.previous);
          this.previous = data;

          this.request = typeof window !== 'undefined' && window.requestAnimationFrame(() => this.emit());
        } else {
          this.destroy();
        }
      } else {
        throw new Error('Missing ref');
      }
    } catch (err) {
      this.onerror(err);
    }
  }

  public destroy(): void {
    this.request && typeof window !== 'undefined' && window.cancelAnimationFrame(this.request);
    this.request = undefined;
    this.oncomplete();
  }

  public state(): boolean {
    return !!this.request;
  }
}

export function boundsObservable(observer: Observer<ClientRect>, ref: React.RefObject<HTMLElement>): Observable {
  const src = new BoundsEmitter({
    ref,
    ondata: (bounds, previous) => observer.next(bounds, previous),
    onerror: err => observer.error && observer.error(err),
    oncomplete: () => observer.complete && observer.complete(),
  });

  return {
    subscribe: () => src.start(),
    unsubscribe: () => src.destroy(),
    once: () => src.emit(),
    observing: () => src.state(),
  };
}
