import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks';

export interface BannerFromContextProps extends ThemeProps {
  element: React.ReactElement;
  removeNotification: (id: string) => void;
  style?: React.CSSProperties;
}

export const BannerFromContext = React.memo(function BannerFromContext({
  element,
  removeNotification,
  style: customStyle,
  themeId: initThemeId,
}: BannerFromContextProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const { id, permanent, style } = element.props;

  return React.cloneElement(element, {
    themeId,
    onClose: permanent ? undefined : () => removeNotification(id),
    permanent: undefined /* this effectively removes the permanent prop which is invalid on <Banner> */,
    style: { ...style, ...customStyle },
  });
});
