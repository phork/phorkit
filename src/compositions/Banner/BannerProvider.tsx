import produce, { castDraft } from 'immer';
import { nanoid } from 'nanoid';
import React, { useCallback, useRef, useReducer } from 'react';
import { BannerContext, BannerContextValue } from './BannerContext';
import { bannerActions as ACTIONS } from './bannerActions';
import { bannerReducer as reducer, BannerState } from './bannerReducer';

export type BannerProviderProps = {
  children: React.ReactNode;
};

/**
 * The banner provider tracks a collection of banners
 * and provides functions to create a banner, remove a
 * banner and clear all banners. It also provides a
 * map containing all the banners.
 */
export function BannerProvider({ children }: BannerProviderProps): JSX.Element {
  const previousValue = useRef<BannerContextValue>({} as BannerContextValue);
  const [state, dispatch] = useReducer(reducer, new Map() as BannerState);

  const removeNotification = useCallback<BannerContextValue['removeNotification']>(
    id =>
      dispatch({
        id,
        type: ACTIONS.DELETE,
      }),
    [],
  );

  // if a banner already exists it will be overwritten
  const createNotification = useCallback<BannerContextValue['createNotification']>(banner => {
    const { contextId = nanoid() } = banner.props;
    const mutableBanner = React.cloneElement(banner, {
      contextId,
    });

    dispatch({
      id: contextId,
      type: ACTIONS.SET,
      value: mutableBanner,
    });
    return contextId;
  }, []);

  const clearNotifications = useCallback<BannerContextValue['clearNotifications']>(
    () => dispatch({ type: ACTIONS.CLEAR }),
    [],
  );

  const value = produce(previousValue.current, draftState => {
    draftState.notifications = castDraft(state);
    draftState.clearNotifications = clearNotifications;
    draftState.createNotification = createNotification;
    draftState.removeNotification = removeNotification;
  });
  previousValue.current = value;

  return <BannerContext.Provider value={value}>{children}</BannerContext.Provider>;
}

BannerProvider.displayName = 'BannerProvider';
