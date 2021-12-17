import { useCallback } from "react";
import { useForm } from "../react-form/useForm";
import "../App.css";
import { firstNameValidator, lastNameValidator } from "./validators";
import { useWatch } from "../react-form/useWatch";
import { FormInternalControls } from "../react-form/types";

interface SignUpForm {
  firstName: string;
  lastName: string;
}

interface FirstNameWatcherProps {
  control: FormInternalControls;
}

const FirstNameWatcher = ({ control }: FirstNameWatcherProps) => {
  const firstName = useWatch("firstName", control);
  const lastName = useWatch("lastName", control);

  return (
    <div>
      <div>Watched first name: {firstName}</div>
      <div>Watched last name: {lastName}</div>
    </div>
  );
};

const ReactFormWatch = () => {
  const { register, handleSubmit, control, formState } = useForm<SignUpForm>({
    firstName: "",
    lastName: "",
  });

  const { errors } = formState || {};

  const onSubmit = useCallback((data) => {
    alert(JSON.stringify(data));
  }, []);

  console.log("Re-rendered");
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
      <FirstNameWatcher control={control} />
    </div>
  );
};

export default ReactFormWatch;
