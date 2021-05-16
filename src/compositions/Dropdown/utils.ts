import { substituteTranslationArgs } from '../../hooks/useTranslations';
import { InteractiveGroupState } from '../../components/InteractiveGroup/interactiveGroupReducer';
import {
  DropdownListSize,
  DropdownListVariant,
  DropdownTranslations,
  DropdownLayout,
  DropdownListColor,
  DropdownOption,
} from './types';

export const getDropdownSelectedView = ({
  options,
  maxSelect,
  selectedState,
  translations,
}: {
  options: DropdownOption[];
  maxSelect: number;
  selectedState: InteractiveGroupState<string>;
  translations: DropdownTranslations;
}): React.ReactChild | undefined => {
  if (maxSelect === -1 || maxSelect > 1) {
    const { numSelectedSingular, numSelectedPlural } = translations;

    if (Array.isArray(selectedState.selectedIds) && selectedState.selectedIds.length > 0) {
      return substituteTranslationArgs(
        selectedState.selectedIds.length === 1 ? numSelectedSingular : numSelectedPlural,
        selectedState.selectedIds.length,
      );
    }
    return undefined;
  }

  if (selectedState.selectedIds && selectedState.selectedIds.length > 0) {
    const selectedId = selectedState.selectedIds[0];
    const selectedOption = options?.find(({ id }) => id === selectedId);
    return selectedOption?.selectedLabel || selectedOption?.label;
  }

  return undefined;
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
