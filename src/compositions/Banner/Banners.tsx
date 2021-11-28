import React from 'react';
import { BannerProvider } from './BannerProvider';
import { BannersFromContext, BannersFromContextProps } from './BannersFromContext';

export type BannersProps = BannersFromContextProps & {
  children?: React.ReactChild | React.ReactFragment | null;
};

/**
 * The banners component is a simple wrapper around
 * the `BannerProvider` and the `BannersFromContext`
 * which is used to display the current banners.
 */
export function Banners({ children, ...props }: BannersProps): JSX.Element {
  return (
    <BannerProvider>
      {children}
      <BannersFromContext {...props} />
    </BannerProvider>
  );
}

Banners.displayName = 'Banners';
