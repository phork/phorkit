import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { BannerConsumer } from './BannerConsumer';
import { BannerContainer } from './BannerContainer';
import { BannerFromContext } from './BannerFromContext';

export type BannersFromContextProps = React.HTMLAttributes<HTMLDivElement> & ThemeProps;

export function BannersFromContext({ themeId: initThemeId, ...props }: BannersFromContextProps): React.ReactElement {
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
  );
}
