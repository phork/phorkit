import React, { useCallback, useState } from 'react';
import { DropdownOption } from './types';
import { useComponentId } from '../../hooks/useComponentId';
import { useThemeId } from '../../hooks/useThemeId';
import { useTranslations } from '../../hooks/useTranslations';
import { TimesIcon } from '../../icons/TimesIcon';
import { Flex } from '../../components/Flex';
import { IconText } from '../../components/IconText';
import { Rhythm } from '../../components/Rhythm/Rhythm';
import { Tag, TagGroup, TagSize, TagVariant } from '../../components/Tag';
import { TypographyWithSvg } from '../../components/Typography';
import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownContent } from './DropdownContent';

export type DropdownWithTagsTranslations = {
  numSelectedSingular: string;
  numSelectedPlural: string;
};

export const dropdownWithTagsTranslations: DropdownWithTagsTranslations = {
  numSelectedSingular: '{0} item selected',
  numSelectedPlural: '{0} items selected',
};

export interface DropdownWithTagsProps extends Omit<DropdownProps, 'initialSelected' | 'dropdownContent'> {
  initialSelected?: DropdownOption[];
  readOnlyValue?: React.ReactChild;
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
  tagSize = 'xsmall',
  tagVariant = 'outlined',
  themeId: initThemeId,
  translations: customTranslations,
  ...props
}: DropdownWithTagsProps): React.ReactElement<DropdownWithTagsProps, 'div'> | null {
  const { generateComponentId } = useComponentId();
  const [selected, setSelected] = useState<DropdownOption[]>(initialSelected);
  const themeId = useThemeId(initThemeId);

  const translations = useTranslations<DropdownWithTagsTranslations>({
    customTranslations,
    fallbackTranslations: dropdownWithTagsTranslations,
  });
  const { numSelectedSingular, numSelectedPlural } = translations;

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
      return (selected.length === 1 ? numSelectedSingular : numSelectedPlural).replace(
        '{0}',
        selected.length.toString(),
      );
    }
    return undefined;
  };

  return (
    <Flex direction="column">
      <Dropdown
        contrast={contrast}
        disabledIds={selected.map(({ id }) => id)}
        dropdownContent={DropdownContent}
        mimicSelectOnFocus
        id={id}
        onSelect={handleSelect}
        options={options}
        readOnlyValue={readOnlyValue || getNumSelectedLabel()}
        themeId={themeId}
        {...props}
      />
      <Rhythm mt={6} grouped>
        <TagGroup size={tagSize}>
          {selected.filter(Boolean).map(({ id: itemId, label }) => (
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
              shape="pill"
              size={tagSize}
              variant={tagVariant}
              themeId={themeId}
            />
          ))}
        </TagGroup>
      </Rhythm>
    </Flex>
  );
}

DropdownWithTags.displayName = 'DropdownWithTags';
