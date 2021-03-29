import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { Tag, TagElementType, TagProps } from './Tag';
import styles from './styles/Tags.module.css';

export interface TagGroupProps<T extends TagElementType = 'div'>
  extends React.HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  actionable?: boolean;
  children?: React.ReactNode;
  className?: string;
  shape?: TagProps<T>['shape'];
  tags?: (TagProps<T> & { id: string })[];
}

export function TagGroup<T extends TagElementType = 'div'>({
  actionable,
  children,
  className,
  contrast,
  shape,
  tags,
  themeId: initThemeId,
}: TagGroupProps<T>): React.ReactElement<TagGroupProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const classes = cx(styles.tagGroup, className);

  return (
    <div className={classes}>
      {tags &&
        tags.map(tag => (
          <Tag<T> contrast={contrast} key={tag.id} shape={shape} themeId={themeId} actionable={actionable} {...tag} />
        ))}

      {children}
    </div>
  );
}
