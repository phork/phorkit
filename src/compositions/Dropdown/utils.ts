import { substituteTranslationArgs } from '../../hooks/useTranslations';
import { InteractiveGroupState } from '../../components/InteractiveGroup/interactiveGroupReducer';
import { DropdownTranslations, DropdownOption } from './types';

export const getDropdownSelectedView = ({
  options,
  maxSelect,
  selectedState,
  translations,
}: {
  options: readonly DropdownOption[];
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
