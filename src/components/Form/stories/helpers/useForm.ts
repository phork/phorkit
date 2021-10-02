import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { FormboxValue } from '../../Formbox';

export type UseFormResponse<V> = {
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    value?: FormboxValue | FormboxValue[] | undefined,
  ) => void;
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

  return {
    handleChange,
    handleSubmit,
    setValues,
    values,
  };
};
