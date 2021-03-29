import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks';

export interface BannerFromContextProps extends ThemeProps {
  element: React.ReactElement;
  removeNotification: (id: string) => void;
}

export const BannerFromContext = React.memo(function BannerFromContext({
  element,
  removeNotification,
  themeId: initThemeId,
}: BannerFromContextProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const { id, permanent } = element.props;

  return React.cloneElement(element, {
    themeId,
    onClose: permanent ? undefined : () => removeNotification(id),
    permanent: undefined /* this effectively removes the permanent prop which is invalid on <Banner> */,
  });
});
