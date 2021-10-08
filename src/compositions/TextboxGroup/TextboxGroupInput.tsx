import React, { useRef } from 'react';
import { Textbox, TextboxProps } from '../../components/Form/Textbox/Textbox';
import { useListRegistryItem } from '../../components/ListRegistry/useListRegistryItem';

export type TextboxGroupInputProps = TextboxProps & {
  /** The inputId is used to map the input to its ref */
  inputId: string;
};

/**
 * The textbox group input should be a descendent
 * of the `TextboxGroupContainer` component. It's used
 * to render a textbox and register it with the group.
 *
 * This uses the `Textbox` and `ListRegistry` components.
 */
export function TextboxGroupInput({ inputId, ...props }: TextboxGroupInputProps): ReturnType<typeof Textbox> {
  const ref = useRef<HTMLInputElement>(null!);
  useListRegistryItem<HTMLInputElement>({ id: inputId, ref });

  return <Textbox data-id={inputId} ref={ref} {...props} />;
}

TextboxGroupInput.displayName = 'TextboxGroupInput';
