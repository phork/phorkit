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

export type BannerFromContextProps = ThemeProps & {
  banner: BannerWithContextItemType;
  style?: React.CSSProperties;
};

/**
 * This accepts a `Banner` element with a `contextId` prop
 * and it clones the banner and passes it an `onClose` prop
 * that can be used to the remove the banner from the
 * state.
 */
export const BannerFromContext = React.memo(function BannerFromContext({
  banner,
  style: customStyle,
  themeId: initThemeId,
}: BannerFromContextProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const { removeNotification } = useContext(BannerContext);
  const { contextId, permanent, style } = banner.props;

  return React.cloneElement(banner, {
    themeId,
    onClose: permanent ? undefined : () => removeNotification(contextId),
    style: { ...style, ...customStyle },
  });
});
