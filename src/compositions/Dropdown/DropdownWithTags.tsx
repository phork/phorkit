import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useComponentId } from '../../hooks/useComponentId';
import { useThemeId } from '../../hooks/useThemeId';
import { substituteTranslationArgs, useTranslations } from '../../hooks/useTranslations';
import { TimesIcon } from '../../icons/TimesIcon';
import { Flex } from '../../components/Flex';
import { IconText } from '../../components/IconText';
import { Rhythm } from '../../components/Rhythm/Rhythm';
import { Tag, TagGroup, TagGroupProps, TagProps, TagShape, TagSize, TagVariant } from '../../components/Tag';
import { TypographyWithSvg } from '../../components/Typography';
import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownContent } from './DropdownContent';
import { DropdownOption } from './types';

export type DropdownWithTagsTranslations = {
  numSelectedSingular: string;
  numSelectedPlural: string;
};

export const dropdownWithTagsTranslations: DropdownWithTagsTranslations = {
  numSelectedSingular: '{0} item selected',
  numSelectedPlural: '{0} items selected',
};

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
  translations?: DropdownWithTagsTranslations;
}

export function DropdownWithTags({
  contrast,
  id,
  initialSelected = [],
  onSelect,
  options,
  readOnlyValue,
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

  const translations = useTranslations<DropdownWithTagsTranslations>({
    customTranslations,
    fallbackTranslations: dropdownWithTagsTranslations,
  });
  const { numSelectedSingular, numSelectedPlural } = translations;

  // if a tag is removed then change the focus to the first tag or, if none, the input
  useEffect(() => {
    if (selected.length !== previousNumSelected.current) {
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

  const handleSelect = useCallback(
    option => {
      if (option && !selected.includes(option)) {
        setSelected(selected => [...selected, option]);
        onSelect && onSelect(option);
      } else {
        // update the selected items to close the dropdown
        setSelected(selected => [...selected]);
      }
    },
    [onSelect, selected],
  );

  const removeItem = (itemId: string) => {
    if (itemId) {
      setSelected(selected => selected.filter(({ id }) => id !== itemId));
    }
  };

  const getNumSelectedLabel = (): string | undefined => {
    if (selected.length > 0) {
      return substituteTranslationArgs(
        selected.length === 1 ? numSelectedSingular : numSelectedPlural,
        selected.length,
      );
    }
    return undefined;
  };

  return (
    <Flex direction="column">
      <Dropdown
        allowReselect
        contrast={contrast}
        disabledIds={selected.map(({ id }) => id)}
        dropdownContent={DropdownContent}
        forgetSelection
        id={id}
        inputRef={dropdownRef}
        onSelect={handleSelect}
        options={strippedOptions}
        readOnlyValue={readOnlyValue || getNumSelectedLabel()}
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
