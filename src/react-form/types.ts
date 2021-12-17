import React from "react";

export type ValidateFunction = (fieldValue: string) => string | undefined;

interface RegisterOptions {
  validate: ValidateFunction;
}

export type FieldValues = Record<string, any>;

export interface FormState {}

// --------------------------REACT FORM -------------------------------------

export interface FormRegisterHandlers {
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormControl<T> {
  register: (
    fieldName: string,
    options?: RegisterOptions
  ) => FormRegisterHandlers;
  handleSubmit: (
    callback: (values: T) => void
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  getValues: () => T;
  getErrors: () => T;
}

export interface ReactFormValues<T> extends FormControl<T> {
  formState: FormState;
  // getValues: () => T;
  values: T;
}
