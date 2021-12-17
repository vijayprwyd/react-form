import { useCallback } from "react";
import { useForm } from "../react-form/useForm";
import "../App.css";
import { firstNameValidator, lastNameValidator } from "./validators";

interface SignUpForm {
  firstName: string;
  lastName: string;
}

function ReactForm() {
  const { register, handleSubmit, formState } = useForm<SignUpForm>({
    firstName: "",
    lastName: "",
  });

  const { errors } = formState || {};

  const onSubmit = useCallback((data) => {
    alert(JSON.stringify(data));
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-element">
          <input
            type="text"
            className="form-input"
            {...register("firstName", {
              validate: firstNameValidator,
            })}
          ></input>
          {errors && errors.firstName && (
            <div className="form-error-message">{errors.firstName}</div>
          )}
        </div>

        <div className="form-element">
          <input
            type="text"
            className="form-input"
            {...register("lastName", {
              validate: lastNameValidator,
            })}
          ></input>
          {errors && errors.lastName && (
            <div className="form-error-message">{errors.lastName}</div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReactForm;
