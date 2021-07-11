import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { FormboxValue } from '../../Formbox';

type PartialEvent = {
  target: {
    name: string;
    value: FormboxValue;
  };
};

export type UseFormResponse<V> = {
  handleChange: (event: PartialEvent, value?: FormboxValue | undefined) => void;
  handleClear: (event: PartialEvent) => void;
  handleSubmit: React.FormEventHandler;
  setValues: Dispatch<SetStateAction<V>>;
  values: V;
};

export const useForm = <V>(callback: (event: React.SyntheticEvent) => void, initialValues: V): UseFormResponse<V> => {
  const [values, setValues] = useState<V>(initialValues);

  const handleSubmit = useCallback<UseFormResponse<V>['handleSubmit']>(
    event => {
      event && event.preventDefault();
      callback(event);
    },
    [callback],
  );

  const handleChange = useCallback<UseFormResponse<V>['handleChange']>((event, value) => {
    setValues(values => ({ ...values, [event.target.name]: value === undefined ? event.target.value : value }));
  }, []);

  const handleClear = useCallback<UseFormResponse<V>['handleClear']>(event => {
    setValues(values => ({ ...values, [event.target.name]: '' }));
  }, []);

  return {
    handleChange,
    handleClear,
    handleSubmit,
    setValues,
    values,
  };
};
