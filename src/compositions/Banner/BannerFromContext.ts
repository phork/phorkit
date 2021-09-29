import React, { useContext } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { BannerProps } from './Banner';
import { BannerContext } from './BannerContext';

export type BannerWithContextItemType = React.ReactElement<
  Omit<BannerProps, 'contextId'> & {
    /* A banner from context is used with the banner system and requires a context id */
    contextId: string;
    permanent?: boolean;
  }
>;

export interface BannerFromContextProps extends ThemeProps {
  banner: BannerWithContextItemType;
  style?: React.CSSProperties;
}

/**
 * This accepts a Banner element and its ID and it
 * clones the banner and passes it an onClose prop
 * that can be used to the remove banner from the
 * state.
 */
export const BannerFromContext = React.memo(function BannerFromContext({
  banner,
  style: customStyle,
  themeId: initThemeId,
}: BannerFromContextProps): React.ReactElement<BannerProps> {
  const themeId = useThemeId(initThemeId);
  const { removeNotification } = useContext(BannerContext);
  const { contextId, permanent, style } = banner.props;

  return React.cloneElement(banner, {
    themeId,
    onClose: permanent ? undefined : () => removeNotification(contextId),
    // this effectively removes the permanent prop which is invalid on <Banner>
    permanent: undefined,
    style: { ...style, ...customStyle },
  });
});
