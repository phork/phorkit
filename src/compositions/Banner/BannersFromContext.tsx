import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { BannerConsumer } from './BannerConsumer';
import { BannerContainer } from './BannerContainer';
import { BannerFromContext } from './BannerFromContext';

export type BannersFromContextProps = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    bannerStyle?: React.CSSProperties;
  };

export function BannersFromContext({
  bannerStyle,
  themeId: initThemeId,
  ...props
}: BannersFromContextProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <BannerConsumer>
      {({ removeNotification, notifications }) => (
        <React.Fragment>
          {notifications.size ? (
            <BannerContainer themeId={themeId} {...props}>
              {[...notifications.values()].map(element => (
                <BannerFromContext
                  element={element}
                  key={element.props.contextId}
                  removeNotification={removeNotification}
                  style={bannerStyle}
                  themeId={themeId}
                />
              ))}
            </BannerContainer>
          ) : null}
        </React.Fragment>
      )}
    </BannerConsumer>
  );
}

BannersFromContext.displayName = 'BannersFromContext';
