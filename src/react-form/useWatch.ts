import { useCallback, useEffect, useState } from "react";
import { FormInternalControls } from "./types";

export const useWatch = (name: string, control: FormInternalControls): any => {
  const [value, setValue] = useState();

  const watchField = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  useEffect(() => {
    const watcher = control.getWatcher();
    control.setWatcher({
      ...watcher,
      [name]: watchField,
    });
  }, [control, name, watchField]);

  return value;
};
