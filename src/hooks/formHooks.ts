import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { Checkbox } from "components/form/fields/Checkbox";
import { InputBase } from "components/form/fields/InputBase";
import { RadioGroup } from "components/form/fields/RadioGroup";
import { Select } from "components/form/fields/Select";
import { Slider } from "components/form/fields/Slider";
import { Switch } from "components/form/fields/Switch";
import { TextField } from "components/form/fields/TextField";

const createdFormContext = createFormHookContexts();
export const { useFieldContext } = createdFormContext;
const { fieldContext, formContext } = createdFormContext;

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Checkbox,
    InputBase,
    RadioGroup,
    Select,
    Slider,
    Switch,
    TextField,
  },
  formComponents: {
    // SubmitButton,
  },
  fieldContext,
  formContext,
});
