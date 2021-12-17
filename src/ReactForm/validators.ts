export const firstNameValidator = (value: string) => {
  if (value.length < 10) return "First name must be atleast 10 characters long";
};

export const lastNameValidator = (value: string) => {
  if (value.length < 5) return "Last name must be atleast 5 characters long";
};
