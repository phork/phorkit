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

export function PaginationPage<T extends ButtonElementType = 'button'>({
  active = false,
  as,
  disabled = false,
  href,
  onChangePage,
  page,
  themeId: initThemeId,
  ...props
}: PaginationPageProps<T>): ReturnType<typeof Button> {
  const themeId = useThemeId(initThemeId);

  const handleClick = useCallback(() => {
    onChangePage && onChangePage(page);
  }, [onChangePage, page]);

  return (
    <Button<T>
      as={as}
      disabled={disabled}
      href={href}
      onClick={handleClick}
      themeId={themeId}
      {...((props as unknown) as ButtonProps<T>)}
    >
      {page}
    </Button>
  );
}

PaginationPage.displayName = 'PaginationPage';
