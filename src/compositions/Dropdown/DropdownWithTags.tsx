import React, { Reducer, useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { useThemeId } from '../../context/Theme';
import { useComponentId } from '../../hooks/useComponentId';
import { renderFromProp, RenderFromPropElement } from '../../utils/renderFromProp';
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
import { Tag, TagGroup, TagGroupProps, TagProps, TagShape, TagSize, TagWeight } from '../../components/Tag';
import { TypographyWithSvg } from '../../components/Typography';
import { PartialDropdown, PartialDropdownHandles, PartialDropdownProps } from './PartialDropdown';
import { DropdownOption } from './types';

export type DropdownWithTagsOption = DropdownOption & {
  tagProps?: TagProps<'button'>;
};

export type DropdownWithTagsProps = Omit<PartialDropdownProps, 'initialSelected' | 'options' | 'reducer'> & {
  initialSelected?: readonly DropdownWithTagsOption[];
  options: readonly DropdownWithTagsOption[];
  /** A custom renderer for the tags */
  tag?: RenderFromPropElement<DropdownWithTagsOption>;
  tagGroupProps?: Omit<TagGroupProps, 'size'>;
  tagProps?: Omit<TagProps<'button'>, 'actionable' | 'as' | 'children' | 'onClick' | 'ref'>;
  tagShape?: TagShape;
  tagSize?: TagSize;
  tagWeight?: TagWeight;
};

/**
 * This renders a `Dropdown` component and underneath it
 * for every selected item it renders a `Tag`. Tags can
 * be clicked to be removed/unselected.
 *
 * Keyboard navigation is available for this component.
 * Navigate with `Up`, `Down`, `Left`, `Right`, `Home`
 * or `End`. Toggle with `Space`. Select with `Enter`.
 *
 * This uses the `Dropdown`, `Flex`, `IconText`, `Rhythm`,
 * `Tag`, `TagGroup` and `Typography` components.
 */
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
  tag,
  tagGroupProps,
  tagProps,
  tagShape = 'pill',
  tagSize = 'xsmall',
  tagWeight = 'outlined',
  themeId: initThemeId,
  translations: customTranslations,
  ...props
}: DropdownWithTagsProps): JSX.Element | null {
  const reducer = useReducer<Reducer<InteractiveGroupState<string>, InteractiveGroupStateAction<string>>>(
    interactiveGroupReducer,
    getInteractiveGroupInitialState({ items: [], selectedIds: initialSelected?.map(({ id }) => id) }),
  );

  const [state, dispatch] = reducer;

  const { selectId, unselectId } = useMemo(
    () => generateInteractiveGroupActions(dispatch, minSelect, maxSelect, false),
    [dispatch, minSelect, maxSelect],
  );

  const dropdownRef = useRef<PartialDropdownHandles>(null!);
  const tagRef = useRef<HTMLButtonElement>(null!);
  const isDropdownOpen = useRef<boolean>(false);
  const previousSelectedIds = useRef<readonly string[]>(state.selectedIds);
  const { generateComponentId } = useComponentId(id);
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

  const handleSelect = useCallback<NonNullable<PartialDropdownProps['onSelect']>>(
    (id, selectedIds) => {
      selectId(id);
      onSelect && onSelect(id, selectedIds);
    },
    [onSelect, selectId],
  );

  const handleUnselect = useCallback<NonNullable<PartialDropdownProps['onUnselect']>>(
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

  // this uses the partial dropdown because it needs to access the reducer to remove tags
  return (
    <Flex direction="column">
      <PartialDropdown
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
      <Rhythm grouped mt={6}>
        <TagGroup size={tagSize} {...tagGroupProps}>
          {options
            .filter(({ id }) => state.selectedIds.includes(id))
            .map(({ id: itemId, label, ...tagItemProps }, i) => {
              const children = tag ? (
                renderFromProp<DropdownWithTagsOption>(tag, {
                  id: itemId,
                  label,
                  themeId,
                  ...tagItemProps,
                })
              ) : (
                <IconText
                  reverse
                  icon={
                    <TypographyWithSvg<'div'> as="div" volume="quiet">
                      <TimesIcon scale="xsmall" />
                    </TypographyWithSvg>
                  }
                  text={<Rhythm mr={2}>{label}</Rhythm>}
                />
              );

              return (
                children && (
                  <Tag<'button'>
                    actionable
                    as="button"
                    contrast={contrast}
                    key={`${generateComponentId(id, itemId)}_tag`}
                    onClick={() => removeItem(itemId)}
                    ref={i === 0 ? tagRef : undefined}
                    shape={tagShape}
                    size={tagSize}
                    themeId={themeId}
                    weight={tagWeight}
                    {...tagProps}
                    {...mappedProps[itemId]}
                  >
                    {children}
                  </Tag>
                )
              );
            })}
        </TagGroup>
      </Rhythm>
    </Flex>
  );
}

DropdownWithTags.displayName = 'DropdownWithTags';
