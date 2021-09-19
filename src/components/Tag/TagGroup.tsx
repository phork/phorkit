import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Tag.module.css';
import { Tag, TagShape, TagSize, TagWeight, TagProps } from './Tag';

export type TagGroupItem = {
  id: string;
  label: TagProps['children'];
} & Omit<TagProps, 'as' | 'children'>;

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement>, Omit<ThemeProps, 'unthemed'> {
  actionable?: boolean;
  children?: React.ReactNode;
  className?: string;
  shape?: TagShape;
  size?: TagSize;
  tags?: TagGroupItem[];
  weight?: TagWeight;
}

export function TagGroup({
  actionable,
  children,
  className,
  contrast = false,
  shape,
  size,
  tags,
  themeId: initThemeId,
  weight,
  ...props
}: TagGroupProps): React.ReactElement<TagGroupProps> {
  const themeId = useThemeId(initThemeId);
  const classes = cx(styles.tagGroup, className);

  return (
    <div className={classes} {...props}>
      {tags &&
        tags.map(({ id, label, ...tag }) => (
          <Tag
            actionable={actionable}
            contrast={contrast}
            key={id}
            shape={shape}
            size={size}
            themeId={themeId}
            weight={weight}
            {...tag}
          >
            {label}
          </Tag>
        ))}

      {children}
    </div>
  );
}

TagGroup.displayName = 'TagGroup';
