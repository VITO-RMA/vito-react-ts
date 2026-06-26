import type { ReactNode } from "react";

import type {
  SelectRoot,
  SelectRootChangeEventDetails,
} from "@base-ui/react/select";
import { useStore } from "@tanstack/react-form";

import { useFieldContext } from "@/hooks/formHooks";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select as UiSelect,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

type Value = number | string | number[] | string[];

type Props<V = Value, Multiple extends boolean = false> = SelectRoot.Props<
  V,
  Multiple
> & {
  label?: ReactNode | ReactNode[];
  icon?: ReactNode;
  className?: string;
  triggerClassName?: string;
  wrapperClassName?: string;
  iconPlacement?: "start" | "end";
};

export function Select<V = Value, Multiple extends boolean = false>(
  props: Props<V, Multiple>
) {
  const {
    name = "",
    onValueChange,
    required = false,
    multiple = false,
    className = "",
    triggerClassName = "",
    wrapperClassName = "",
    children,
    label = null,
    icon = null,
    iconPlacement = "start",
    ...itemProps
  } = props;
  const { state, handleBlur, handleChange, store } = useFieldContext<
    SelectRoot.Props<V, Multiple>["value"] | null | undefined
  >();
  const { errors, isDirty, isError } = useStore(store, (state) => ({
    isError: state.meta.isTouched && (state.meta.errors?.length || 0) > 0,
    errors: state.meta.errors,
    isDirty: state.meta.isDirty,
  }));

  if (!name) throw Error("Please provide a name");
  return (
    <Field
      data-invalid={isError}
      onBlur={handleBlur}
      className={cn("flex-col w-full", className)}
    >
      {label && (
        <FieldLabel htmlFor={name} aria-label={name}>
          {label}
        </FieldLabel>
      )}
      <div className={cn("flex items-center gap-2", wrapperClassName)}>
        {icon && iconPlacement === "start" && (
          <span className="text-muted-foreground">{icon}</span>
        )}
        <UiSelect<V, Multiple>
          value={state.value}
          onValueChange={(
            value,
            eventDetails: SelectRootChangeEventDetails
          ) => {
            handleChange(value);
            if (onValueChange !== undefined) onValueChange(value, eventDetails);
          }}
          {...itemProps}
        >
          <SelectTrigger
            className={cn("w-full border-none ", triggerClassName)}
          >
            <SelectValue placeholder="Select review template" />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </UiSelect>
        {icon && iconPlacement === "end" && (
          <span className="text-muted-foreground">{icon}</span>
        )}
      </div>
      {isDirty && isError && <FieldError>{errors.at(0)?.message}</FieldError>}
    </Field>
  );
}
