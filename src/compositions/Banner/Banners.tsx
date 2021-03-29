import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { BannerConsumer } from './BannerConsumer';
import { BannerContainer } from './BannerContainer';
import { BannerFromContext } from './BannerFromContext';
import { BannerProvider } from './BannerProvider';

export interface BannersProps extends ThemeProps {
  children?: React.ReactNode;
}

export function Banners({ children, themeId: initThemeId, ...props }: BannersProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <BannerProvider {...props}>
      <BannerConsumer>
        {({ removeNotification, notifications }) => (
          <React.Fragment>
            {children}
            {notifications.size ? (
              <BannerContainer themeId={themeId} {...props}>
                {[...notifications.values()].map(element => (
                  <BannerFromContext
                    element={element}
                    removeNotification={removeNotification}
                    themeId={themeId}
                    key={element.props.id}
                  />
                ))}
              </BannerContainer>
            ) : null}
          </React.Fragment>
        )}
      </BannerConsumer>
    </BannerProvider>
  );
}
