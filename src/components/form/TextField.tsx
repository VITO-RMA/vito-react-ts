import { TextField as MuiTextField, type TextFieldProps } from "@mui/material";
import {
  type DeepKeys,
  type FieldApi,
  type Validator,
} from "@tanstack/react-form";

type Props<TFormData extends {}, TName extends DeepKeys<TFormData>> = Omit<
  TextFieldProps,
  "name"
> & {
  name: TName;
  fieldApi: FieldApi<TFormData, TName, undefined, Validator<TFormData>, any>;
};

export function TextField<
  TFormData extends {},
  TName extends DeepKeys<TFormData>,
>(props: Props<TFormData, TName>) {
  const { name, onChange, onBlur, fieldApi, helperText, ...textfieldProps } =
    props;
  const { state, handleChange, handleBlur } = fieldApi;
  const isError = state.meta.isTouched && (state.meta.errors?.length || 0) > 0;
  if (!name) throw Error("Please provide a name");
  return (
    <MuiTextField
      name={name}
      error={isError}
      value={state.value}
      onChange={(e) => {
        //@ts-ignore FIXME: typing!
        handleChange(e.target.value);
        if (onChange !== undefined) onChange(e);
      }}
      onBlur={(e) => {
        handleBlur();
        if (onBlur !== undefined) onBlur(e);
      }}
      helperText={isError ? state.meta.errors.join(", ") : helperText}
      {...textfieldProps}
    />
  );
}
