import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { Select } from "@/components/form/fields/Select";
import { Switch } from "@/components/form/fields/Switch";
import { TextField } from "@/components/form/fields/TextField";

const createdFormContext = createFormHookContexts();
export const { useFieldContext } = createdFormContext;
const { fieldContext, formContext } = createdFormContext;

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    // Checkbox,
    // InputBase,
    // RadioGroup,
    Select,
    // Slider,
    Switch,
    TextField,
  },
  formComponents: {
    // SubmitButton,
  },
  fieldContext,
  formContext,
});
