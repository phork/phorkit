import React from 'react';
import { Typography } from '../../components/Typography/Typography';

export interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PaginationEllipsis({
  children,
  ...props
}: PaginationEllipsisProps): React.ReactElement<HTMLDivElement> {
  return children ? (
    <div {...props}>{children}</div>
  ) : (
    <Typography volume="quieter" size="xs" {...props}>
      ...
    </Typography>
  );
}

PaginationEllipsis.displayName = 'PaginationEllipsis';
