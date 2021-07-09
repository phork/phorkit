import React, { useRef } from 'react';
import { Textbox, TextboxProps } from '../../components/Form/Textbox/Textbox';
import { useListRegistryItem } from '../../components/ListRegistry/useListRegistryItem';

export interface TextboxGroupInputProps extends TextboxProps {
  /** The inputId is used to map the input to its ref */
  inputId: string;
}

export function TextboxGroupInput({ inputId, ...props }: TextboxGroupInputProps): ReturnType<typeof Textbox> {
  const ref = useRef<HTMLInputElement>(null!);
  useListRegistryItem<HTMLInputElement>({ id: inputId, ref });

  return <Textbox ref={ref} data-id={inputId} {...props} />;
}

TextboxGroupInput.displayName = 'TextboxGroupInput';
