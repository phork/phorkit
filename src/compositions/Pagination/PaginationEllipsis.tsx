import React from 'react';
import { EllipsisIcon } from '../../icons';
import { Button, ButtonProps } from '../../components/Button';
import { Rhythm } from '../../components/Rhythm/Rhythm';

export type PaginationEllipsisProps = Omit<ButtonProps<'div'>, 'as' | 'children'>;

/** This uses an unclickable div Button to make it easier to share styles with the rest of the pagination */
export function PaginationEllipsis(props: PaginationEllipsisProps): ReturnType<typeof Button> | null {
  return (
    <Button<'div'> imitation noPadding {...(props as ButtonProps<'div'>)} as="div">
      <Rhythm mx={2}>
        <EllipsisIcon scale="medium" />
      </Rhythm>
    </Button>
  );
}

PaginationEllipsis.displayName = 'PaginationEllipsis';
