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
      {({ notifications }) => (
        <React.Fragment>
          {notifications.size ? (
            <BannerContainer themeId={themeId} {...props}>
              {[...notifications.values()].map(banner => (
                <BannerFromContext banner={banner} key={banner.props.contextId} style={bannerStyle} themeId={themeId} />
              ))}
            </BannerContainer>
          ) : null}
        </React.Fragment>
      )}
    </BannerConsumer>
  );
}

BannersFromContext.displayName = 'BannersFromContext';
