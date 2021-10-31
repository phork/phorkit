import React from 'react';
import { useThemeId } from '../../context/Theme';
import { BannerConsumer } from './BannerConsumer';
import { BannerContainer, BannerContainerProps } from './BannerContainer';
import { BannerFromContext } from './BannerFromContext';

export type BannersFromContextProps = Omit<BannerContainerProps, 'children'> & {
  /** Additional styles to apply to every banner */
  bannerStyle?: React.CSSProperties;
};

/**
 * This consumes the banners from the `BannerProvider`
 * and displays them all.
 */
export function BannersFromContext({
  bannerStyle,
  themeId: initThemeId,
  ...props
}: BannersFromContextProps): JSX.Element {
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
