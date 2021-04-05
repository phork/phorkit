import React, { useCallback } from 'react';
import { AsType, MergeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { Button, ButtonElementType, ButtonProps } from '../../components/Button/Button';

export interface LocalPaginationPageProps {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  onChangePage?: (page: number) => void;
  page: number;
}

export type PaginationPageProps<T extends ButtonElementType = 'button'> = AsType<T> &
  MergeProps<Omit<ButtonProps<T>, 'as' | 'children'>, LocalPaginationPageProps>;

export function PaginationPage<T extends ButtonElementType = 'button'>({
  active,
  as,
  disabled,
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
      color={active ? 'primary' : 'neutral'}
      disabled={disabled}
      href={href}
      onClick={handleClick}
      themeId={themeId}
      weight="text"
      {...((props as unknown) as ButtonProps<T>)}
    >
      {page}
    </Button>
  );
}
