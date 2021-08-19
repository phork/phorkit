import React from 'react';
import { Typography } from '../../components/Typography';

export type StoryContainerProps = {
  children: React.ReactElement;
  title: string;
};

export function StoryContainer({ children, title, ...props }: StoryContainerProps): React.ReactElement {
  return (
    <div style={{ marginBottom: 20 }} {...props}>
      <Typography<'h2'> as="h2">{title}</Typography>
      {children}
    </div>
  );
}

StoryContainer.displayName = 'StoryContainer';
