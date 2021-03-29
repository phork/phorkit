import { BannerItemType } from './types';
import { bannerActions as ACTIONS, BannerStateAction } from './bannerActions';

export type BannerState = Map<string, BannerItemType>;

export function bannerReducer(state: BannerState, action: BannerStateAction): BannerState {
  const mutable = new Map(state);

  switch (action.type) {
    case ACTIONS.SET:
      mutable.set(action.id, action.value);
      return mutable;

    case ACTIONS.DELETE:
      if (mutable.has(action.id)) {
        mutable.delete(action.id);
        return mutable;
      }
      return state;

    case ACTIONS.CLEAR:
      if (mutable.size) {
        mutable.clear();
        return mutable;
      }
      return state;

    default:
      return state;
  }
}
