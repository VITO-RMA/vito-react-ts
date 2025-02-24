import type { ReactNode } from "react";
import {
  FormControl,
  FormHelperText,
  RadioGroup as MuiRadioGroupProps,
  type RadioGroupProps,
} from "@mui/material";
import type {
  DeepKeys,
  DeepValue,
} from "@tanstack/react-form";
import type { IFieldApi } from "types/form";

type Props<TFormData extends {}, TName extends DeepKeys<TFormData>> = Omit<
  RadioGroupProps,
  "name"
> & {
  name: TName;
  fieldApi: IFieldApi<TFormData, TName,DeepValue<TFormData, TName>>;
  helperText?: ReactNode | ReactNode[];
};

export function RadioGroup<
  TFormData extends {},
  TName extends DeepKeys<TFormData>,
>(props: Props<TFormData, TName>): ReactNode {
  const { name, onChange, onBlur, fieldApi, helperText, ...groupProps } = props;
  const { state, handleChange, handleBlur } = fieldApi;
  const isError = state.meta.isTouched && (state.meta.errors?.length || 0) > 0;

  if (!name) throw Error("Please provide a name");
  return (
    <FormControl error={isError} variant="standard">
      <MuiRadioGroupProps
        name={name}
        value={state.value}
        onChange={(e, v) => {
          //@ts-ignore FIXME: typing!
          handleChange(e.target.value);
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
            ? state.meta.errors.join(", ")
            : helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
