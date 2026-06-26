

import type { ComponentProps, ReactNode } from "react";

import { useStore } from "@tanstack/react-form";

import { useFieldContext } from "@/hooks/formHooks";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface Props extends ComponentProps<typeof Input> {
  label?: ReactNode | ReactNode[];
  icon?: ReactNode;
  iconPlacement?: "start" | "end";
  fieldsetClasses?: string;
}

export function TextField(props: Props) {
  const {
    name = "",
    onChange,
    onBlur,
    type = "text",
    className = "",
    fieldsetClasses = "",
    icon,
    iconPlacement = "start",
    label = null,
    ...textfieldProps
  } = props;
  const { state, handleBlur, handleChange, store } = useFieldContext<
    number | string
  >();
  const { errors, isDirty, isError } = useStore(store, (state) => ({
    isError: state.meta.isTouched && (state.meta.errors?.length || 0) > 0,
    errors: state.meta.errors,
    isDirty: state.meta.isDirty,
  }));

  return (
    <Field data-invalid={isError} className={fieldsetClasses}>
      {label && (
        <FieldLabel
          htmlFor={name}
          aria-label={name}
          className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5"
        >
          {label}
        </FieldLabel>
      )}
      <div
        className="flex items-center gap-2 bg-input/60 border border-border focus-within:border-primary
                            rounded-sm px-3 py-2.5 transition-colors"
      >
        {icon && iconPlacement === "start" && (
          <span className="text-muted-foreground">{icon}</span>
        )}
        <Input
          name={name}
          id={name}
          type={type}
          className={`bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground/60 text-foreground ${className}`}
          value={state.value}
          aria-invalid={isError}
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
          {...textfieldProps}
        />
        {icon && iconPlacement === "end" && (
          <span className="text-muted-foreground">{icon}</span>
        )}
      </div>
      {isDirty && isError && <FieldError>{errors.at(0)?.message}</FieldError>}
    </Field>
  );
}
