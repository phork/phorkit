import { substituteTranslationArgs } from '../../hooks/useTranslations';
import { DropdownState } from './dropdownReducer';
import {
  DropdownListSize,
  DropdownListVariant,
  DropdownOption,
  DropdownTranslations,
  DropdownLayout,
  DropdownListColor,
} from './types';

export const getDropdownSelectedView = ({
  maxSelect,
  state,
  translations,
}: {
  maxSelect: number;
  state: DropdownState;
  translations: DropdownTranslations;
}): React.ReactChild | undefined => {
  if (maxSelect === -1 || maxSelect > 1) {
    const { numSelectedSingular, numSelectedPlural } = translations;

    if (Array.isArray(state.selected) && state.selected.length > 0) {
      return substituteTranslationArgs(
        state.selected.length === 1 ? numSelectedSingular : numSelectedPlural,
        state.selected.length,
      );
    }
    return undefined;
  }

  if (state.selected && state.selected.length > 0) {
    return state.selected[0]?.selectedLabel || state.selected[0]?.label;
  }

  return undefined;
};

export const isItemSelected = (item: DropdownOption, selected: DropdownState['selected']): boolean => {
  if (item && selected) {
    return selected.some(({ id }) => id === item.id);
  }
  return false;
};

export const getListDefaults = (layout: DropdownLayout) => {
  const defaults = {
    raised: {
      color: 'primary' as DropdownListColor,
      size: 'medium' as DropdownListSize,
      variant: 'unboxed' as DropdownListVariant,
    },
    contained: {
      color: 'primary' as DropdownListColor,
      size: 'medium' as DropdownListSize,
      variant: 'unboxed' as DropdownListVariant,
    },
  };
  return defaults[layout] || defaults.raised;
};
