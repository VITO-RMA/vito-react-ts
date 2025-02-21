import type { ReactNode } from "react";
import {
  FormControl,
  FormHelperText,
  Slider as MuiSlider,
  type SliderProps,
} from "@mui/material";
import type { DeepKeys, FieldApi,  } from "@tanstack/react-form";

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// interface SliderProps
//   extends FieldProps,
//     Omit<SliderProps, "name" | "onChange" | "value" | "defaultValue"> {}

type Props<TFormData extends {}, TName extends DeepKeys<TFormData>> = Omit<
  SliderProps,
  "name"
> & {
  name: TName;
  helperText?: ReactNode;
  fieldApi: FieldApi<TFormData, TName>;
};
export function Slider<TFormData extends {}, TName extends DeepKeys<TFormData>>(
  props: Props<TFormData, TName>
) {
  const { name, onChange, onBlur, fieldApi, helperText, ...sliderProps } =
    props;
  const { state, handleChange, handleBlur } = fieldApi;
  const isError = state.meta.isTouched && (state.meta.errors?.length || 0) > 0;

  if (!name) throw Error("Please provide a name");
  return (
    <FormControl error={isError}>
      <MuiSlider
        name={name}
        {...sliderProps}
        value={state.value}
        onChange={(e, value: number | number[], activeThumb: number) => {
          handleChange(value);
          if (onChange !== undefined) onChange(e, value, activeThumb);
        }}
        onBlur={(e) => {
          handleBlur();
          if (onBlur !== undefined) onBlur(e);
        }}
      />
      {isError && (
        <FormHelperText>
          {isError ? state.meta.errors.join(", ") : helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

Slider.displayName = "FormikMaterialUISlider";
