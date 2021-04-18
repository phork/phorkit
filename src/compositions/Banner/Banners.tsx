import React from 'react';
import { BannerProvider } from './BannerProvider';
import { BannersFromContext, BannersFromContextProps } from './BannersFromContext';

export interface BannersProps extends BannersFromContextProps {
  children?: React.ReactNode;
}

export function Banners({ children, ...props }: BannersProps): React.ReactElement {
  return (
    <BannerProvider>
      {children}
      <BannersFromContext {...props} />
    </BannerProvider>
  );
}

Banners.displayName = 'Banners';
