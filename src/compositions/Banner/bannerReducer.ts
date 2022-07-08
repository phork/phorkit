import { BannerWithContextItemType } from './BannerFromContext';
import { bannerActions as ACTIONS, BannerStateAction } from './bannerActions';

export type BannerState = Map<string, BannerWithContextItemType>;

const handleDelete = (banner: BannerWithContextItemType | undefined) => {
  banner && banner.props.onClose?.(undefined, banner.props.contextId);
};

export function bannerReducer(state: BannerState, action: BannerStateAction): BannerState {
  const mutable = new Map(state);

  switch (action.type) {
    case ACTIONS.SET:
      mutable.set(action.id, action.value);
      return mutable;

    case ACTIONS.DELETE: {
      const banner = mutable.get(action.id);
      if (banner) {
        handleDelete(banner);
        mutable.delete(action.id);
        return mutable;
      }
      return state;
    }

    case ACTIONS.CLEAR:
      if (mutable.size) {
        Array.from(mutable.values())
          .reverse()
          .forEach(banner => handleDelete(banner));
        mutable.clear();
        return mutable;
      }
      return state;

    default:
      return state;
  }
}
