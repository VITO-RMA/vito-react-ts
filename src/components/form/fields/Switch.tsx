import type { ReactNode } from "react";

import type { SwitchRoot, SwitchRootProps } from "@base-ui/react";
import { useStore } from "@tanstack/react-form";

import { useFieldContext } from "@/hooks/formHooks";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

type Props = SwitchRootProps & {
  label?: ReactNode;
  desciption?: ReactNode;
  helperText?: ReactNode;
  onChange?: (checked: boolean, details: SwitchRoot.ChangeEventDetails) => void;
};

export function Switch(props: Props) {
  const {
    name,
    label = null,
    desciption,
    onChange,
    onBlur,
    className = "",
    helperText,
    ...itemProps
  } = props;

  const { state, handleBlur, handleChange, store } = useFieldContext<boolean>();
  const { errors, isDirty, isError } = useStore(store, (state) => ({
    isError: state.meta.isTouched && (state.meta.errors?.length || 0) > 0,
    errors: state.meta.errors,
    isDirty: state.meta.isDirty,
  }));

  if (!name) throw Error("Please provide a name");
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
        {desciption && <FieldDescription>{desciption}</FieldDescription>}
      </FieldContent>
      <Switch
        id={name}
        value={state.value ? "on" : "off"}
        onCheckedChange={(
          checked: boolean,
          details: SwitchRoot.ChangeEventDetails
        ) => {
          handleChange(checked);
          if (onChange) onChange(checked, details);
        }}
        onBlur={handleBlur}
        {...itemProps}
      />
      {isDirty && isError && <FieldError>{errors.at(0)?.message}</FieldError>}
    </Field>
  );
}
