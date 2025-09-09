import {
  TextField as MuiTextField,
  styled,
  type TextFieldProps,
} from "@mui/material";
import { useStore } from "@tanstack/react-form";

import { useTranslation } from "react-i18next";

import { useFieldContext } from "hooks/formHooks";

type Props = TextFieldProps & { linked?: any[]; disableVisualLinked?: true };

export function TextField(props: Props) {
  const {
    name = "",
    onChange,
    onBlur,
    helperText,
    type,
    linked = [],
    disableVisualLinked = false,
    className = "",
    sx,
    ...textfieldProps
  } = props;
  const { t } = useTranslation();
  const { state, handleBlur, handleChange, store } = useFieldContext<
    number | string
  >();
  const { errors, isDirty, isError } = useStore(store, (state) => ({
    isError: state.meta.isTouched && (state.meta.errors?.length || 0) > 0,
    errors: state.meta.errors,
    isDirty: state.meta.isDirty,
  }));
  const hasEqualValues =
    linked.find((i) => i[name] !== state.value) === undefined;

  // if (!name) throw Error("Please provide a name");
  return (
    <Styles
      name={name}
      error={isError}
      type={type}
      value={state.value}
      className={`${className} ${
        hasEqualValues ? "equal-values" : "different-values"
      } ${disableVisualLinked || isDirty ? "disable-visual-linked" : "linked"}`}
      onChange={(e) => {
        if (type === "number" && e.target.value !== "")
          handleChange(Number.parseFloat(`${e.target.value}`));
        else handleChange(e.target.value);
        if (onChange !== undefined) onChange(e);
      }}
      onBlur={(e) => {
        handleBlur();
        if (onBlur !== undefined) onBlur(e);
      }}
      sx={{
        ...sx,
        "&.linked.different-values .MuiInputBase-root:after": {
          content: `'(${t("label.multiple")})'`,
        },
      }}
      helperText={
        isError ? errors.map((e) => e?.message || "").join(", ") : helperText
      }
      {...textfieldProps}
    />
  );
}

const Styles = styled(MuiTextField)`
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
        & input {
          color: transparent;
        }
      }
    }
    &.touched {
      & .MuiInputBase-root {
        &:after {
          display: none;
        }
        & input {
          color: inherit;
        }
      }
    }
  }
` as unknown as typeof MuiTextField;

/***
 * 
 *  linked={selectedItemsIndexes.map(
          (index) =>
            `${basePath.split(".").slice(0, -1).join(".")}.${index}.slope`
        )}
 * 
 */
