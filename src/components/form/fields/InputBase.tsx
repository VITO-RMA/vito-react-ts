import { InputBase as MuiInputBase, type InputBaseProps } from "@mui/material";
import { useStore } from "@tanstack/react-form";

import { useFieldContext } from "hooks/formHooks";

type Props = InputBaseProps;

export function InputBase(props: Props) {
  const { name = "", onChange, onBlur, type, ...textfieldProps } = props;
  const { state, handleBlur, handleChange, store } = useFieldContext<
    number | string
  >();
  const { isError } = useStore(store, (state) => ({
    isError: state.meta.isTouched && (state.meta.errors?.length || 0) > 0,
    errors: state.meta.errors,
    isDirty: state.meta.isDirty,
  }));

  if (!name) throw Error("Please provide a name");
  return (
    <MuiInputBase
      name={name}
      error={isError}
      type={type}
      value={state.value}
      onChange={(e) => {
        if (type === "number" && e.target.value !== "")
          handleChange(Number.parseFloat(`${e.target.value}`));
        else handleChange(e.target.value);
        if (onChange !== undefined) onChange(e);
      }}
      onBlur={(e) => {
        handleBlur();
        if (onBlur !== undefined) onBlur(e);
      }}
      {...textfieldProps}
    />
  );
}
