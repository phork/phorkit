import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Tag.module.css';
import { Tag, TagElementType, TagShape, TagSize, TagProps } from './Tag';

export interface TagGroupProps<T extends TagElementType = 'div'>
  extends React.HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  actionable?: boolean;
  children?: React.ReactNode;
  className?: string;
  shape?: TagShape;
  size?: TagSize;
  tags?: (TagProps<T> & { id: string })[];
}

export function TagGroup<T extends TagElementType = 'div'>({
  actionable,
  children,
  className,
  contrast = false,
  shape,
  size,
  tags,
  themeId: initThemeId,
  ...props
}: TagGroupProps<T>): React.ReactElement<TagGroupProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const classes = cx(styles.tagGroup, className);

  return (
    <div className={classes} {...props}>
      {tags &&
        tags.map(tag => (
          <Tag<T>
            actionable={actionable}
            contrast={contrast}
            key={tag.id}
            shape={shape}
            size={size}
            themeId={themeId}
            {...tag}
          />
        ))}

      {children}
    </div>
  );
}

TagGroup.displayName = 'TagGroup';
