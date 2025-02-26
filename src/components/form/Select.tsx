import type { ReactNode } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
  type SelectProps,
} from "@mui/material";
import { type DeepKeys, type DeepValue } from "@tanstack/react-form";

import type { IFieldApi } from "types/form";

type Props<TFormData extends {}, TName extends DeepKeys<TFormData>> = Omit<
  SelectProps,
  "name"
> & {
  name: TName;
  fieldApi: IFieldApi<TFormData, TName, DeepValue<TFormData, TName>>;
  helperText?: ReactNode;
};

export function Select<TFormData extends {}, TName extends DeepKeys<TFormData>>(
  props: Props<TFormData, TName>
) {
  const {
    name,
    onChange,
    onBlur,
    fieldApi,
    helperText,
    label,
    fullWidth = true,
    size,
    variant,
    ...textfieldProps
  } = props;
  const { state, handleChange, handleBlur } = fieldApi;
  const isError = state.meta.isTouched && (state.meta.errors?.length || 0) > 0;
  if (!name) throw Error("Please provide a name");
  return (
    <FormControl
      error={isError}
      fullWidth={fullWidth}
      size={size}
      onClick={(e) => e.stopPropagation()}
    >
      <InputLabel variant={variant}>{label}</InputLabel>
      <MuiSelect
        name={name}
        label={label}
        fullWidth={fullWidth}
        variant={variant}
        size={size}
        error={isError}
        value={state.value}
        onChange={(e, child) => {
          //@ts-ignore FIXME: typing!
          handleChange(e.target.value);
          if (onChange !== undefined) onChange(e, child);
        }}
        onBlur={(e) => {
          handleBlur();
          if (onBlur !== undefined) onBlur(e);
        }}
        {...textfieldProps}
      />
      {(isError || helperText) && (
        <FormHelperText>
          {isError
            ? state.meta.errors.map((e) => e?.message || "").join(", ")
            : helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
