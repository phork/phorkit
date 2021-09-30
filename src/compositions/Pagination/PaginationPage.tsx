import React, { useCallback } from 'react';
import { AsReactType, MergeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { Button, ButtonElementType, ButtonProps } from '../../components/Button';

export interface LocalPaginationPageProps {
  active?: boolean;
  allowRightClickLinks?: boolean;
  disabled?: boolean;
  href?: string;
  onChangePage?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, page: number) => void;
  page: number;
}

export type PaginationPageProps<T extends ButtonElementType = 'button'> = AsReactType<T> &
  MergeProps<Omit<ButtonProps<T>, 'as' | 'children'>, LocalPaginationPageProps>;

export function PaginationPageBase<T extends ButtonElementType = 'button'>(
  {
    active = false,
    allowRightClickLinks,
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

  const handleClick = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent): void => {
      allowRightClickLinks && event.preventDefault();
      onChangePage && onChangePage(event, page);
    },
    [allowRightClickLinks, onChangePage, page],
  );

  return (
    <Button<T>
      disabled={disabled}
      href={href}
      onClick={handleClick}
      ref={forwardedRef}
      themeId={themeId}
      {...(props as unknown as ButtonProps<T>)}
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
