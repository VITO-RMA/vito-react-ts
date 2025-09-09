import type { FocusEvent, ReactNode } from "react";
import {
  FormControl,
  FormHelperText,
  Slider as MuiSlider,
  type FormControlProps,
  type SliderProps,
} from "@mui/material";
import { useStore } from "@tanstack/react-form";

import { useFieldContext } from "hooks/formHooks";

type Props = SliderProps &
  Omit<FormControlProps, "control" | "onChange" | "label"> & {
    label?: ReactNode;
    helperText?: ReactNode;
  };

export function Slider(props: Props) {
  const { name, onChange, onBlur, helperText, fullWidth, ...sliderProps } =
    props;
  const { state, handleBlur, handleChange, store } = useFieldContext<
    number | number[]
  >();
  const errors = useStore(store, (s) => s.meta.errors);
  const isError = state.meta.isTouched && (errors?.length || 0) > 0;

  // if (!name) throw Error("Please provide a name");
  return (
    <FormControl error={isError} fullWidth={fullWidth}>
      <MuiSlider
        name={name}
        {...sliderProps}
        value={state.value}
        onChange={(e, value: number | number[], activeThumb: number) => {
          handleChange(value);
          if (onChange !== undefined) onChange(e, value, activeThumb);
        }}
        onBlur={(e: FocusEvent<HTMLSpanElement>) => {
          handleBlur();
          if (onBlur !== undefined) onBlur(e);
        }}
      />
      {isError && (
        <FormHelperText>
          {isError
            ? state.meta.errors.map((e) => e?.message || "").join(", ")
            : helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

Slider.displayName = "MaterialUISlider";
