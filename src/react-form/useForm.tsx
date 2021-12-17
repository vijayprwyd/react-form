import { useCallback, useRef, useState } from "react";
import { createFormControl } from "./createFormControl";
import { FieldValues, FormControl } from "./types";

export const useForm = <TFieldValues extends FieldValues>(
  props?: TFieldValues
) => {
  const formControlRef = useRef<FormControl<TFieldValues>>();
  const [formState, setFormState] = useState<{
    errors: TFieldValues;
  }>();

  const updateFormState = useCallback(() => {
    if (formControlRef.current) {
      setFormState({
        errors: formControlRef.current.getErrors(),
      });
    }
  }, []);

  if (!formControlRef.current) {
    formControlRef.current = createFormControl<TFieldValues>(
      props || ({} as TFieldValues),
      updateFormState
    );
  }

  return {
    register: formControlRef.current.register,
    handleSubmit: formControlRef.current.handleSubmit,
    formState,
    getValues: () =>
      formControlRef.current && formControlRef.current.getValues(),
  };
};
