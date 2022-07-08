import { useCallback } from 'react';
import { FormboxValue } from '../../components/Form/Formbox';
import { TextboxProps } from '../../components/Form/Textbox/Textbox';
import { ListRegistryItemType } from './../../components/ListRegistry/types';

// refs are used so that the focus can automatically change to the next/prev input
export type TextboxGroupRef = ListRegistryItemType<HTMLInputElement>;

export type TextboxGroupValidator = (value: FormboxValue) => { isValid: boolean; focusNext: boolean };

export type TextboxGroupRefWithValidator = {
  ref: TextboxGroupRef;
  validator: TextboxGroupValidator;
};

export type UseTextboxGroupProps = {
  /** A map of the input refs (and optional validator function) keyed by their ID */
  refs: Map<string, TextboxGroupRef | TextboxGroupRefWithValidator>;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>, values: Record<string, string>) => void;
  /** An array of the ref IDs in the order they should be tabbed through */
  orderBy?: string[];
  /** A common validator function for each input */
  validator?: TextboxGroupValidator;
  /** The value of each input keyed by its ID */
  values: Record<string, string>;
};

export type UseTextboxGroupResponse = {
  /** A function to move the focus a certain number of places */
  changeFocus: (startId: string, numPlaces?: number) => void;
  /** Changes focus to the next input if the current input is valid */
  onChange: NonNullable<TextboxProps['onChange']>;
  /** The same as onChange, but can be applied if the form input replaces the same value without changing it */
  onInput: NonNullable<TextboxProps['onInput']>;
  /** Changes focus to the previous input and remove its last char when backspacing from an empty input */
  onKeyDown: NonNullable<TextboxProps['onKeyDown']>;
};

// to be used as a type guard
const isRefWithValidator = (
  ref: TextboxGroupRef | TextboxGroupRefWithValidator,
): ref is TextboxGroupRefWithValidator => {
  return (ref as TextboxGroupRefWithValidator).validator !== undefined;
};

/**
 * This returns several helper function that are used
 * to navigate between inputs in an input groups.
 *
 * When an input is considered valid the focus automatically
 * moves to the next input.
 *
 * This uses the `Formbox` and `Textbox` components.
 */
export const useTextboxGroup = ({
  refs,
  onChange: forwardChange,
  orderBy,
  validator = () => ({ isValid: true, focusNext: true }),
  values,
}: UseTextboxGroupProps): UseTextboxGroupResponse => {
  const changeFocus = useCallback(
    (startId: string, numPlaces = 0): HTMLInputElement | undefined => {
      const orderByIndex = orderBy?.findIndex(id => id === startId);
      if (orderByIndex !== undefined) {
        const nextId = orderBy?.[orderByIndex + numPlaces];
        if (nextId !== undefined) {
          const nextRef = refs.get(nextId);
          if (nextRef !== undefined) {
            const element = isRefWithValidator(nextRef) ? nextRef.ref.current : nextRef.current;
            element.focus();
            return element;
          }
        }
      }
      return undefined;
    },
    [orderBy, refs],
  );

  const backspace = (value: string) => (value ? value.substring(0, value.length - 1) : '');

  const handleInput = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const id = target.getAttribute('data-id');
      const ref = id !== null ? refs.get(id) : undefined;
      const { value } = target;

      const { isValid, focusNext } = ref && isRefWithValidator(ref) ? ref.validator(value) : validator(value);
      if (isValid) {
        focusNext && changeFocus(id!, 1);
        forwardChange?.(event, { ...values, [id!]: `${value}` });
      }
    },
    [changeFocus, forwardChange, refs, validator, values],
  );

  const onChange = useCallback<UseTextboxGroupResponse['onChange']>(event => handleInput(event), [handleInput]);

  const onInput = useCallback<UseTextboxGroupResponse['onInput']>(event => handleInput(event), [handleInput]);

  const onKeyDown = useCallback<UseTextboxGroupResponse['onKeyDown']>(
    event => {
      const target = event.target as HTMLInputElement;
      const id = target.getAttribute('data-id');
      const ref = id !== null ? refs.get(id) : undefined;
      const newValues = { ...values };

      if (ref) {
        if (event.key === 'Backspace') {
          if (id !== null) {
            newValues[id] = backspace(values[id]);
          }

          if (target.value === '' && id !== null) {
            const element = changeFocus(id, -1);
            if (element) {
              const focusedId = element.getAttribute('data-id');
              if (focusedId !== null) {
                newValues[focusedId] = backspace(values[focusedId]);
              }
            }
          }

          forwardChange?.(event, newValues);
        }
      }
    },
    [changeFocus, forwardChange, refs, values],
  );

  return { changeFocus, onChange, onInput, onKeyDown };
};
