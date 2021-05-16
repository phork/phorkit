import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useComponentId } from '../../hooks/useComponentId';
import { useThemeId } from '../../hooks/useThemeId';
import { TimesIcon } from '../../icons/TimesIcon';
import { Flex } from '../../components/Flex';
import { IconText } from '../../components/IconText';
import { Rhythm } from '../../components/Rhythm/Rhythm';
import { Tag, TagGroup, TagGroupProps, TagProps, TagShape, TagSize, TagVariant } from '../../components/Tag';
import { TypographyWithSvg } from '../../components/Typography';
import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownContent } from './DropdownContent';
import { DropdownOption } from './types';

export type DropdownWithTagsOption = DropdownOption & {
  tagProps?: TagProps<'button'>;
};

export interface DropdownWithTagsProps extends Omit<DropdownProps, 'initialSelected' | 'dropdownContent' | 'options'> {
  initialSelected?: DropdownOption[];
  options: DropdownWithTagsOption[];
  readOnlyValue?: React.ReactChild;
  tagGroupProps: Omit<TagGroupProps, 'size'>;
  tagShape?: TagShape;
  tagSize?: TagSize;
  tagVariant?: TagVariant;
}

export function DropdownWithTags({
  contrast,
  id,
  initialSelected = [],
  minSelect = 1,
  maxSelect = -1,
  onSelect,
  onSelectionChange,
  onUnselect,
  options,
  tagGroupProps,
  tagShape = 'pill',
  tagSize = 'xsmall',
  tagVariant = 'outlined',
  themeId: initThemeId,
  translations: customTranslations,
  ...props
}: DropdownWithTagsProps): React.ReactElement<DropdownWithTagsProps, 'div'> | null {
  const dropdownRef = useRef<HTMLInputElement>(null!);
  const tagRef = useRef<HTMLButtonElement>(null!);
  const isDropdownOpen = useRef<boolean>(false);
  const previousNumSelected = useRef<number>(initialSelected?.length || 0);
  const [selected, setSelected] = useState<DropdownOption[]>(initialSelected);
  const { generateComponentId } = useComponentId();
  const themeId = useThemeId(initThemeId);

  // don't pass the tag props on to the dropdown, but map them by ID so they can be applied to the tags
  const strippedOptions = useMemo(() => options.map(({ tagProps, ...option }) => option), [options]);
  const mappedProps = useMemo(
    () =>
      options.reduce((acc, { id, tagProps }) => {
        acc[id] = tagProps;
        return acc;
      }, {} as Record<DropdownWithTagsOption['id'], DropdownWithTagsOption['tagProps']>),
    [options],
  );

  /**
   * If a tag is removed then change the focus to the first
   * tag or, if none, the input. This must use useEffect
   * rather than an onClick on the tag otherwise the redraw
   * will break this.
   *
   * This should only fire when the dropdown is closed so
   * that it doesn't take focus away from it.
   */
  useEffect(() => {
    if (!isDropdownOpen.current && selected.length !== previousNumSelected.current) {
      if (selected.length < previousNumSelected.current) {
        if (selected.length >= 1) {
          tagRef.current?.focus();
        } else {
          dropdownRef.current?.focus();
        }
      }
      previousNumSelected.current = selected.length;
    }
  }, [selected.length]);

  const handleOpen = useCallback(() => {
    isDropdownOpen.current = true;
  }, []);

  const handleClose = useCallback(() => {
    isDropdownOpen.current = false;
  }, []);

  const handleSelect = useCallback<NonNullable<DropdownProps['onSelect']>>(
    (option, selectedIds) => {
      setSelected(options.filter(({ id }) => selectedIds.includes(id)));
      onSelect && onSelect(option, selectedIds);
    },
    [onSelect, options],
  );

  const handleUnselect = useCallback<NonNullable<DropdownProps['onUnselect']>>(
    (option, selectedIds) => {
      setSelected(options.filter(({ id }) => selectedIds?.includes(id)));
      onUnselect && onUnselect(option, selectedIds);
    },
    [onUnselect, options],
  );

  const removeItem = (itemId: string) => {
    if (itemId) {
      setSelected(selected => selected?.filter(({ id }) => id !== itemId));

      if (selected.length >= 1) {
        tagRef.current?.focus();
      } else {
        dropdownRef.current?.focus();
      }
    }
  };

  return (
    <Flex direction="column">
      <Dropdown
        contrast={contrast}
        dropdownContent={DropdownContent}
        id={id}
        inputRef={dropdownRef}
        maxSelect={maxSelect}
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        onSelectionChange={onSelectionChange}
        onUnselect={handleUnselect}
        options={strippedOptions}
        themeId={themeId}
        {...props}
      />
      <Rhythm mt={6} grouped>
        <TagGroup size={tagSize} {...tagGroupProps}>
          {selected.filter(Boolean).map(({ id: itemId, label }, i) => (
            <Tag<'button'>
              actionable
              as="button"
              contrast={contrast}
              key={`${generateComponentId(id, itemId)}_tag`}
              label={
                <IconText
                  icon={
                    <TypographyWithSvg volume="quiet">
                      <TimesIcon scale="xsmall" />
                    </TypographyWithSvg>
                  }
                  text={<Rhythm mr={2}>{label}</Rhythm>}
                  reverse
                />
              }
              onClick={() => removeItem(itemId)}
              ref={i === 0 ? tagRef : undefined}
              shape={tagShape}
              size={tagSize}
              variant={tagVariant}
              themeId={themeId}
              {...mappedProps[itemId]}
            />
          ))}
        </TagGroup>
      </Rhythm>
    </Flex>
  );
}

DropdownWithTags.displayName = 'DropdownWithTags';
