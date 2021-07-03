import { useCallback, useRef } from 'react';
import { TextboxProps } from '../../components/Form/Textbox/Textbox';
import { ListRegistryItemType } from './../../components/ListRegistry/types';

export type TextboxGroupRef = ListRegistryItemType<HTMLInputElement>;

export type TextboxGroupRefWithValidator = {
  ref: TextboxGroupRef;
  validator: (value: string) => boolean;
};

export type UseTextboxGroupOptions = {
  /** A map of the input refs (and optional validator function) keyed by their ID */
  refs: Map<string, TextboxGroupRef | TextboxGroupRefWithValidator>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, values: Record<string, string>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** An array of the ref IDs in the order they should be tabbed through */
  orderBy?: string[];
  /** A common validator function for each input */
  validator?: (value: string) => boolean;
  /** The value of each input keyed by its ID */
  values: Record<string, string>;
};

export type UseTextboxGroupResponse = {
  onChange: NonNullable<TextboxProps['onChange']>;
  onKeyDown: NonNullable<TextboxProps['onKeyDown']>;
  onKeyUp: NonNullable<TextboxProps['onKeyUp']>;
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
  onChange,
  onKeyUp,
  orderBy,
  validator,
  values,
}: UseTextboxGroupOptions): UseTextboxGroupResponse => {
  const previousValue = useRef<string>();

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
            element.select();
          }
        }
      }
    },
    [orderBy, refs],
  );

  const onInputChange = useCallback<UseTextboxGroupResponse['onChange']>(
    (event, value) => {
      const id = (event.target as HTMLInputElement).getAttribute('data-id');
      if (id) {
        const newValues = { ...values, [id]: `${value}` };
        onChange && onChange(event, newValues);
      }
    },
    [onChange, values],
  );

  const onInputKeyDown = useCallback<UseTextboxGroupResponse['onKeyDown']>(event => {
    const value = (event.target as HTMLInputElement).value;
    previousValue.current = value;
  }, []);

  const onInputKeyUp = useCallback<UseTextboxGroupResponse['onKeyUp']>(
    event => {
      onKeyUp && onKeyUp(event);

      const id = (event.target as HTMLInputElement).getAttribute('data-id');
      const value = (event.target as HTMLInputElement).value;
      const ref = id !== null ? refs.get(id) : undefined;

      if (ref) {
        if (
          ![
            'Alt',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'Control',
            'Enter',
            'Escape',
            'Meta',
            'Shift',
            'Tab',
          ].includes(event.key)
        ) {
          // change focus to the previous input when backspacing from an empty input
          if (event.key === 'Backspace' && previousValue.current === '') {
            id && changeFocus(id, -1);
          }

          // change focus to the next input if the current input is valid
          if (event.key !== 'Backspace' && event.key !== 'Delete') {
            const isValid = ref && (isRefWithValidator(ref) ? ref.validator(value) : !validator || validator(value));
            isValid && changeFocus(id!, 1);
          }
        }
      }
    },
    [changeFocus, onKeyUp, refs, validator],
  );

  return { onChange: onInputChange, onKeyDown: onInputKeyDown, onKeyUp: onInputKeyUp };
};
