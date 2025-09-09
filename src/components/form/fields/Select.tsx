import type { ReactNode } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
  styled,
  type SelectProps,
} from "@mui/material";
import { useStore } from "@tanstack/react-form";

import { useTranslation } from "react-i18next";

import { useFieldContext } from "hooks/formHooks";

type Value = number | string | number[] | string[];

type Props<V = Value> = SelectProps<V | string> & {
  helperText?: ReactNode;
  linked?: any[];
};

export function Select<V = Value>(props: Props<V | string>) {
  const {
    name = "",
    onChange,
    onBlur,
    helperText,
    label,
    required = false,
    fullWidth = true,
    multiple = false,
    size,
    className = "",
    variant,
    linked = [],
    ...textfieldProps
  } = props;
  const { t } = useTranslation();
  const { state, handleBlur, handleChange, store } = useFieldContext<
    V | string
  >();
  const { errors, isDirty, isError } = useStore(store, (state) => ({
    isError: state.meta.isTouched && (state.meta.errors?.length || 0) > 0,
    errors: state.meta.errors,
    isDirty: state.meta.isDirty,
  }));
  const hasEqualValues =
    linked.find((i) => i[name] !== state.value) === undefined;

  if (Array.isArray(state.value) === false && props.multiple) {
    console.log("name", name, "=> label", label);
  }

  if (!name) throw Error("Please provide a name");
  return (
    <Styles
      error={isError}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      className={`${className || ""} ${
        hasEqualValues ? "equal-values" : "different-values"
      } ${isDirty ? "disable-visual-linked" : "linked"} ${variant}`}
      sx={{
        "&.linked.different-values .MuiInputBase-root:after": {
          content: `'(${t("label.multiple")})'`,
        },
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <InputLabel variant={variant} required={required}>
        {label}
      </InputLabel>
      <MuiSelect<V | string>
        name={name}
        label={label}
        required={required}
        fullWidth={fullWidth}
        multiple={multiple}
        variant={variant}
        size={size}
        error={isError}
        value={state.value}
        onChange={(e, child) => {
          handleChange(e.target.value);
          if (onChange !== undefined) onChange(e, child);
        }}
        onBlur={(e) => {
          handleBlur();
          if (onBlur !== undefined) onBlur(e);
        }}
        {...textfieldProps}
        slotProps={{
          input: { ...textfieldProps.slotProps?.input, required },
          ...textfieldProps.slotProps,
        }}
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
  &:not(.disable-visual-linked).different-values {
    & .MuiInputBase-root {
      &:after {
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding: ${({ theme }) => theme.spacing(1.07, 1.75)};
        text-align: left;
        color: ${({ theme }) => theme.palette.grey[500]};
      }
      &.Mui-focused:after {
        display: none;
      }
      &:not(.Mui-focused) {
        & .MuiInputBase-input {
          color: transparent;
          opacity: 0;
        }
      }
    }
  }
` as unknown as typeof FormControl;
