import type { ReactNode } from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  styled,
  type FormControlProps,
  type RadioGroupProps,
} from "@mui/material";
import { useStore } from "@tanstack/react-form";

import { useFieldContext } from "hooks/formHooks";

type Props = RadioGroupProps & {
  helperText?: ReactNode | ReactNode[];
  label?: ReactNode;
  type?: "string" | "number";
  component?: FormControlProps["component"];
};

export function RadioGroup(props: Props): ReactNode {
  const {
    name,
    onChange,
    onBlur,
    helperText,
    label = null,
    type = "string",
    className,
    component = "div",
    sx,
    ...groupProps
  } = props;

  const { state, handleBlur, handleChange, store } = useFieldContext<
    number | string | boolean
  >();
  const errors = useStore(store, (state) => state.meta.errors);
  const isError = state.meta.isTouched && (errors?.length || 0) > 0;

  if (!name) throw Error("Please provide a name");
  return (
    <Styles
      error={isError}
      variant="standard"
      className={className}
      component={component}
      sx={sx}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <MuiRadioGroup
        name={name}
        value={state.value}
        onChange={(e, v) => {
          handleChange(
            type === "number"
              ? Number.parseFloat(v)
              : v === "true" || v === "false"
                ? v === "true"
                : v
          );
          if (onChange !== undefined) onChange(e, v);
        }}
        onBlur={(e) => {
          handleBlur();
          if (onBlur !== undefined) onBlur(e);
        }}
        className={className}
        {...groupProps}
      />
      {(isError || helperText) && (
        <FormHelperText>
          {isError
            ? errors.map((e) => e?.message || "").join(", ")
            : helperText}
        </FormHelperText>
      )}
    </Styles>
  );
}

const Styles = styled(FormControl)`
  & > .MuiFormGroup-row {
    justify-content: center;
    align-items: center;
    & > .MuiFormLabel-root {
      padding-right: ${({ theme }) => theme.spacing(0.5)};
    }
  }
` as unknown as typeof FormControl;
