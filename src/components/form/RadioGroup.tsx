import type { ReactNode } from "react";
import {
  FormControl,
  FormHelperText,
  RadioGroup as MuiRadioGroupProps,
  type RadioGroupProps,
} from "@mui/material";
import type { DeepKeys, DeepValue } from "@tanstack/react-form";

import type { IFieldApi } from "types/form";

type Props<TFormData extends {}, TName extends DeepKeys<TFormData>> = Omit<
  RadioGroupProps,
  "name"
> & {
  name: TName;
  fieldApi: IFieldApi<TFormData, TName, DeepValue<TFormData, TName>>;
  helperText?: ReactNode | ReactNode[];
  label?: ReactNode;
  type?: "string" | "number";
};

export function RadioGroup<
  TFormData extends {},
  TName extends DeepKeys<TFormData>,
>(props: Props<TFormData, TName>): ReactNode {
  const {
    name,
    onChange,
    onBlur,
    fieldApi,
    helperText,
    label = null,
    type = "string",
    ...groupProps
  } = props;
  const { state, handleChange, handleBlur } = fieldApi;
  const isError = state.meta.isTouched && (state.meta.errors?.length || 0) > 0;

  if (!name) throw Error("Please provide a name");
  return (
    <FormControl error={isError} variant="standard">
      {label}
      <MuiRadioGroupProps
        name={name}
        value={state.value}
        onChange={(e, v) => {
          //@ts-ignore FIXME: typing!
          handleChange(type === "number" ? parseFloat(v) : v);
          if (onChange !== undefined) onChange(e, v);
        }}
        onBlur={(e) => {
          handleBlur();
          if (onBlur !== undefined) onBlur(e);
        }}
        {...groupProps}
      />
      {(isError || helperText) && (
        <FormHelperText>
          {state.meta.isTouched && state.meta.errors.length
            ? state.meta.errors.map((e) => e?.message || "").join(", ")
            : helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
