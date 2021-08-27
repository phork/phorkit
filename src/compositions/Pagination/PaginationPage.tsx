import React, { useCallback } from 'react';
import { AsReactType, MergeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { Button, ButtonElementType, ButtonProps } from '../../components/Button';

export interface LocalPaginationPageProps {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  onChangePage?: (page: number) => void;
  page: number;
}

export type PaginationPageProps<T extends ButtonElementType = 'button'> = AsReactType<T> &
  MergeProps<Omit<ButtonProps<T>, 'as' | 'children'>, LocalPaginationPageProps>;

export function PaginationPageBase<T extends ButtonElementType = 'button'>(
  {
    active = false,
    as,
    disabled = false,
    href,
    onChangePage,
    page,
    themeId: initThemeId,
    ...props
  }: PaginationPageProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): ReturnType<typeof Button> {
  const themeId = useThemeId(initThemeId);

  const handleClick = useCallback(() => {
    onChangePage && onChangePage(page);
  }, [onChangePage, page]);

  return (
    <Button<T>
      disabled={disabled}
      href={href}
      onClick={handleClick}
      ref={forwardedRef}
      themeId={themeId}
      {...((props as unknown) as ButtonProps<T>)}
      as={as}
    >
      {page}
    </Button>
  );
}

export const PaginationPage = React.forwardRef(PaginationPageBase) as <T extends ButtonElementType = 'button'>(
  p: PaginationPageProps<T> & { ref?: React.Ref<HTMLElementTagNameMap[T]> },
) => React.ReactElement<T>;

// note that the base element cannot have a displayName because it breaks Storybook
(PaginationPageBase as React.NamedExoticComponent).displayName = 'PaginationPageBase';
