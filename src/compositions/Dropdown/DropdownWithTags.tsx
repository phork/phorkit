import React, { Reducer, useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { useComponentId } from '../../hooks/useComponentId';
import { useThemeId } from '../../hooks/useThemeId';
import { TimesIcon } from '../../icons/TimesIcon';
import { Flex } from '../../components/Flex';
import { IconText } from '../../components/IconText';
import { generateInteractiveGroupActions } from '../../components/InteractiveGroup/generateInteractiveGroupActions';
import { InteractiveGroupStateAction } from '../../components/InteractiveGroup/interactiveGroupActions';
import {
  getInteractiveGroupInitialState,
  interactiveGroupReducer,
  InteractiveGroupState,
} from '../../components/InteractiveGroup/interactiveGroupReducer';
import { Rhythm } from '../../components/Rhythm/Rhythm';
import { Tag, TagGroup, TagGroupProps, TagProps, TagShape, TagSize, TagVariant } from '../../components/Tag';
import { TypographyWithSvg } from '../../components/Typography';
import { Dropdown, DropdownHandles, DropdownProps } from './Dropdown';
import { DropdownOption } from './types';

export type DropdownWithTagsOption = DropdownOption & {
  tagProps?: TagProps<'button'>;
};

export interface DropdownWithTagsProps extends Omit<DropdownProps, 'initialSelected' | 'options' | 'reducer'> {
  initialSelected?: DropdownOption[];
  options: DropdownWithTagsOption[];
  tagGroupProps?: Omit<TagGroupProps, 'size'>;
  tagShape?: TagShape;
  tagSize?: TagSize;
  tagVariant?: TagVariant;
}

export function DropdownWithTags({
  contrast = false,
  id,
  initialSelected = [],
  minSelect = 0,
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
  const reducer = useReducer<Reducer<InteractiveGroupState<string>, InteractiveGroupStateAction<string>>>(
    interactiveGroupReducer,
    getInteractiveGroupInitialState({ items: [], selectedIds: initialSelected?.map(({ id }) => id) }),
  );

  const [state, dispatch] = reducer;

  const { selectId, unselectId } = useMemo(
    () => generateInteractiveGroupActions(dispatch, minSelect, maxSelect, false),
    [dispatch, minSelect, maxSelect],
  );

  const dropdownRef = useRef<DropdownHandles>(null!);
  const tagRef = useRef<HTMLButtonElement>(null!);
  const isDropdownOpen = useRef<boolean>(false);
  const previousSelectedIds = useRef<string[]>(state.selectedIds);
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
    if (!isDropdownOpen.current && state.selectedIds !== previousSelectedIds.current) {
      if (state.selectedIds.length < previousSelectedIds.current.length) {
        if (state.selectedIds.length >= 1) {
          tagRef.current?.focus();
        } else {
          dropdownRef.current?.toggle?.focus();
        }
      }
    }
    previousSelectedIds.current = state.selectedIds;
  }, [state.selectedIds]);

  const handleOpen = useCallback(() => {
    isDropdownOpen.current = true;
  }, []);

  const handleClose = useCallback(() => {
    isDropdownOpen.current = false;
  }, []);

  const handleSelect = useCallback<NonNullable<DropdownProps['onSelect']>>(
    (id, selectedIds) => {
      selectId(id);
      onSelect && onSelect(id, selectedIds);
    },
    [onSelect, selectId],
  );

  const handleUnselect = useCallback<NonNullable<DropdownProps['onUnselect']>>(
    (id, selectedIds) => {
      unselectId(id);
      onUnselect && onUnselect(id, selectedIds);
    },
    [onUnselect, unselectId],
  );

  const removeItem = (itemId: string) => {
    if (itemId) {
      unselectId(itemId);
    }
  };

  return (
    <Flex direction="column">
      <Dropdown
        contrast={contrast}
        id={id}
        maxSelect={maxSelect}
        onClose={handleClose}
        onOpen={handleOpen}
        onSelect={handleSelect}
        onSelectionChange={onSelectionChange}
        onUnselect={handleUnselect}
        options={strippedOptions}
        reducer={reducer}
        ref={dropdownRef}
        themeId={themeId}
        {...props}
      />
      <Rhythm mt={6} grouped>
        <TagGroup size={tagSize} {...tagGroupProps}>
          {options
            .filter(({ id }) => state.selectedIds.includes(id))
            .map(({ id: itemId, label }, i) => (
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
