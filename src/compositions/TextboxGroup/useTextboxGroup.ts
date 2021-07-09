import { useCallback } from 'react';
import { FormboxValue } from '../../components/Form/Formbox';
import { TextboxProps } from '../../components/Form/Textbox/Textbox';
import { ListRegistryItemType } from './../../components/ListRegistry/types';

// refs are used so that the focus can automatically change to the next/prev input
export type TextboxGroupRef = ListRegistryItemType<HTMLInputElement>;

export type TextboxGroupRefWithValidator = {
  ref: TextboxGroupRef;
  validator: (value: FormboxValue) => boolean;
};

export type UseTextboxGroupOptions = {
  /** A map of the input refs (and optional validator function) keyed by their ID */
  refs: Map<string, TextboxGroupRef | TextboxGroupRefWithValidator>;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>, values: Record<string, string>) => void;
  /** An array of the ref IDs in the order they should be tabbed through */
  orderBy?: string[];
  /** A common validator function for each input */
  validator?: (value: FormboxValue) => boolean;
  /** The value of each input keyed by its ID */
  values: Record<string, string>;
};

export type UseTextboxGroupResponse = {
  onChange: NonNullable<TextboxProps['onChange']>;
  onInput: NonNullable<TextboxProps['onInput']>;
  onKeyDown: NonNullable<TextboxProps['onKeyDown']>;
};

// to be used as a type guard
const isRefWithValidator = (
  ref: TextboxGroupRef | TextboxGroupRefWithValidator,
): ref is TextboxGroupRefWithValidator => {
  return (ref as TextboxGroupRefWithValidator).validator !== undefined;
};

/** When an input is considered valid the focus automatically moves to the next input */
export const useTextboxGroup = ({
  refs,
  onChange: forwardChange,
  orderBy,
  validator,
  values,
}: UseTextboxGroupOptions): UseTextboxGroupResponse => {
  const changeFocus = useCallback(
    (startId: string, numPlaces: number): void => {
      const orderByIndex = orderBy?.findIndex(id => id === startId);
      if (orderByIndex !== undefined) {
        const nextId = orderBy?.[orderByIndex + numPlaces];
        if (nextId !== undefined) {
          const nextRef = refs.get(nextId);
          if (nextRef !== undefined) {
            const element = isRefWithValidator(nextRef) ? nextRef.ref.current : nextRef.current;
            element.focus();
          }
        }
      }
    },
    [orderBy, refs],
  );

  const handleInput = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const id = target.getAttribute('data-id');
      const ref = id !== null ? refs.get(id) : undefined;
      const { value } = target;

      const isValid = ref && (isRefWithValidator(ref) ? ref.validator(value) : !validator || validator(value));
      if (isValid) {
        changeFocus(id!, 1);
        forwardChange?.(event, { ...values, [id!]: `${value}` });
      }
    },
    [changeFocus, forwardChange, refs, validator, values],
  );

  // change focus to the next input if the current input is valid
  const onChange = useCallback<UseTextboxGroupResponse['onChange']>(event => handleInput(event), [handleInput]);

  // the same as onChange, but can be applied if the form input replaces the same value
  const onInput = useCallback<UseTextboxGroupResponse['onInput']>(event => handleInput(event), [handleInput]);

  // change focus to the previous input when backspacing from an empty input
  const onKeyDown = useCallback<UseTextboxGroupResponse['onKeyDown']>(
    event => {
      const target = event.target as HTMLInputElement;
      const id = target.getAttribute('data-id');
      const ref = id !== null ? refs.get(id) : undefined;

      if (ref) {
        if (event.key === 'Backspace') {
          if (target.value === '') {
            changeFocus(id!, -1);
          }
          forwardChange && forwardChange(event, { ...values, [id!]: '' });
        }
      }
    },
    [changeFocus, forwardChange, refs, values],
  );

  return { onChange, onInput, onKeyDown };
};
