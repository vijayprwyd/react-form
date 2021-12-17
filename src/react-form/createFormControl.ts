import React from "react";
import { FieldValues, FormControl, ValidateFunction } from "./types";

type Validators = Record<string, ValidateFunction>;
// type Watchers = Record<string, (watchedValue: any) => void>;

export const createFormControl = <
  TFieldValues extends FieldValues = FieldValues
>(
  defaultValues: TFieldValues,
  updateFormState: () => void
): FormControl<TFieldValues> => {
  let values = (defaultValues || {}) as TFieldValues;
  let errors = {} as TFieldValues;
  let validators: Validators = {};
  // let watchers: Watchers = {};

  const updateErrorState = (name: string) => {
    if (validators[name]) {
      const error = validators[name](values[name]);

      if (errors[name] !== error) {
        errors = {
          ...errors,
          [name]: error,
        };
        updateFormState();
      }
      return error;
    }
  };

  return {
    register: (name, options) => {
      validators = {
        ...validators,
        ...(options?.validate && { [name]: options?.validate }),
      };
      return {
        onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = evt.target;
          values = {
            ...values,
            [name]: value,
          };
          updateErrorState(name);
        },
      };
    },
    handleSubmit: (callback: (values: TFieldValues) => void) => {
      return function (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let hasFormError = false;
        Object.keys(validators).forEach((name) => {
          if (updateErrorState(name)) {
            hasFormError = true;
          }
        });
        if (!hasFormError) {
          callback(values);
        }
      };
    },
    // Getters
    getValues: () => values,
    getErrors: () => errors,
    // Setters
    // getWatchers: () => watchers,
  };
};
