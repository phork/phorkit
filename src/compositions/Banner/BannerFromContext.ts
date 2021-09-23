import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { BannerProps } from './Banner';

/* a banner in context is used with the banner system and requires a context id */
export type BannerWithContextItemType = React.ReactElement<
  Omit<BannerProps, 'contextId'> & {
    contextId: string;
    permanent?: boolean;
  }
>;

export interface BannerFromContextProps extends ThemeProps {
  element: BannerWithContextItemType;
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
  const { contextId, permanent, style } = element.props;

  return React.cloneElement(element, {
    themeId,
    onClose: permanent ? undefined : () => removeNotification(contextId),
    // this effectively removes the permanent prop which is invalid on <Banner>
    permanent: undefined,
    style: { ...style, ...customStyle },
  });
});
