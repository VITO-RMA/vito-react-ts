import type { ReactNode } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiCheckbox,
  type CheckboxProps,
  type FormControlLabelProps,
} from "@mui/material";
import type { DeepKeys, DeepValue } from "@tanstack/react-form";

import type { IFieldApi } from "types/form";

type Props<TFormData extends {}, TName extends DeepKeys<TFormData>> = Omit<
  CheckboxProps,
  "name"
> &
  Omit<FormControlLabelProps, "control" | "onChange" | "label"> & {
    name: TName;
    label?: ReactNode;
    helperText?: ReactNode;
    fieldApi: IFieldApi<TFormData, TName, DeepValue<TFormData, TName>>;
  };

export function Checkbox<
  TFormData extends {},
  TName extends DeepKeys<TFormData>,
>(props: Props<TFormData, TName>) {
  const {
    name,
    slotProps,
    label = null,
    labelPlacement,
    onChange,
    onBlur,
    fieldApi,
    helperText,
    ...textfieldProps
  } = props;
  const { state, handleChange, handleBlur } = fieldApi;
  const isError = state.meta.isTouched && (state.meta.errors?.length || 0) > 0;
  if (!name) throw Error("Please provide a name");
  return (
    <FormControl error={isError}>
      <FormControlLabel
        labelPlacement={labelPlacement}
        slotProps={slotProps}
        control={
          <MuiCheckbox
            //@ts-ignore FIXME: typing!
            checked={state.value}
            onChange={(e, checked) => {
              //@ts-ignore FIXME: typing!
              handleChange(checked);
              if (onChange !== undefined) onChange(e, checked);
            }}
            onBlur={(e) => {
              handleBlur();
              if (onBlur !== undefined) onBlur(e);
            }}
            {...textfieldProps}
          />
        }
        label={label}
      />
      <FormHelperText>
        {isError
          ? state.meta.errors.map((e) => e?.message || "").join(", ")
          : helperText}
      </FormHelperText>
    </FormControl>
  );
}
