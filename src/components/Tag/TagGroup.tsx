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

export type TagGroupProps = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    actionable?: boolean;
    children?: React.ReactChild | React.ReactFragment | null;
    className?: string;
    shape?: TagShape;
    size?: TagSize;
    style?: React.CSSProperties;
    tags?: readonly TagGroupItem[];
    weight?: TagWeight;
  };

/**
 * The tag group renders a collection of tags with a
 * uniform amount of spacing between them.
 */
export function TagGroup({
  actionable,
  children,
  className,
  contrast = false,
  shape,
  size,
  tags,
  themeId: initThemeId,
  unthemed,
  weight,
  ...props
}: TagGroupProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const classes = cx(styles.tagGroup, className);

  return (
    <div className={classes} role="group" {...props}>
      {tags &&
        tags.map(({ id, label, ...tag }) => (
          <Tag
            actionable={actionable}
            contrast={contrast}
            key={id}
            shape={shape}
            size={size}
            themeId={themeId}
            unthemed={unthemed}
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
