import type {
  FormAsyncValidateOrFn,
  FormOptions,
  FormValidateOrFn,
  StandardSchemaV1,
} from "@tanstack/react-form";

export type FormOnSubmit<
  TFormData,
  TParentSubmitMeta = any | undefined,
> = Required<
  Pick<
    FormOptions<
      TFormData,
      FormValidateOrFn<TFormData>,
      StandardSchemaV1<TFormData, Error>,
      FormAsyncValidateOrFn<TFormData>,
      FormValidateOrFn<TFormData>,
      FormAsyncValidateOrFn<TFormData>,
      FormValidateOrFn<TFormData>,
      FormAsyncValidateOrFn<TFormData>,
      FormValidateOrFn<TFormData>,
      FormAsyncValidateOrFn<TFormData>,
      FormAsyncValidateOrFn<TFormData>,
      TParentSubmitMeta
    >,
    "onSubmit"
  >
>["onSubmit"];

export type FormOnSubmitInvalid<
  TFormData,
  TParentSubmitMeta = any | undefined,
> = Required<
  Pick<
    FormOptions<
      TFormData,
      FormValidateOrFn<TFormData>,
      StandardSchemaV1<TFormData, Error>,
      FormAsyncValidateOrFn<TFormData>,
      FormValidateOrFn<TFormData>,
      FormAsyncValidateOrFn<TFormData>,
      FormValidateOrFn<TFormData>,
      FormAsyncValidateOrFn<TFormData>,
      FormValidateOrFn<TFormData>,
      FormAsyncValidateOrFn<TFormData>,
      FormAsyncValidateOrFn<TFormData>,
      TParentSubmitMeta
    >,
    "onSubmitInvalid"
  >
>["onSubmitInvalid"];
