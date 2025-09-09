import type { ReactNode } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch as MuiSwitch,
  type FormControlLabelProps,
  type SwitchProps,
} from "@mui/material";
import { useStore } from "@tanstack/react-form";

import { useFieldContext } from "hooks/formHooks";

type Props = SwitchProps &
  Omit<FormControlLabelProps, "control" | "onChange" | "label"> & {
    label?: ReactNode;
    helperText?: ReactNode;
  };

export function Switch(props: Props) {
  const {
    name,
    slotProps,
    label = null,
    labelPlacement,
    onChange,
    onBlur,
    className = "",
    helperText,
    ...textfieldProps
  } = props;

  const { state, handleBlur, handleChange, store } = useFieldContext<boolean>();
  const errors = useStore(store, (s) => s.meta.errors);
  const isError = state.meta.isTouched && (errors?.length || 0) > 0;

  if (!name) throw Error("Please provide a name");
  return (
    <FormControl error={isError} className={className}>
      <FormControlLabel
        labelPlacement={labelPlacement}
        slotProps={slotProps}
        control={
          <MuiSwitch
            checked={state.value}
            onChange={(e, checked) => {
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
        {isError ? errors.map((e) => e?.message || "").join(", ") : helperText}
      </FormHelperText>
    </FormControl>
  );
}
