import produce from 'immer';
import React, { useCallback, useRef, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { BannerContext, BannerContextValue } from './BannerContext';
import { bannerActions as ACTIONS } from './bannerActions';
import { bannerReducer as reducer, BannerState } from './bannerReducer';

export interface BannerProviderProps {
  children: React.ReactNode;
}

export function BannerProvider({ children }: BannerProviderProps): React.ReactElement {
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
    const { id = uuid() } = banner.props;
    const mutableBanner = React.cloneElement(banner, {
      id,
    });

    dispatch({
      id,
      type: ACTIONS.SET,
      value: mutableBanner,
    });
    return id;
  }, []);

  const clearNotifications = useCallback<BannerContextValue['clearNotifications']>(
    () => dispatch({ type: ACTIONS.CLEAR }),
    [],
  );

  const value = produce(previousValue.current, draftState => {
    draftState.notifications = state;
    draftState.clearNotifications = clearNotifications;
    draftState.createNotification = createNotification;
    draftState.removeNotification = removeNotification;
  });
  previousValue.current = value;

  return <BannerContext.Provider value={value}>{children}</BannerContext.Provider>;
}
