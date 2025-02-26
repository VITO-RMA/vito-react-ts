import type {
  DeepKeys,
  DeepValue,
  FieldApi,
  FieldAsyncValidateOrFn,
  FieldValidateOrFn,
  FormApi,
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  StandardSchemaV1,
} from "@tanstack/react-form";

export type IFieldApi<
  TFormData extends {},
  TName extends DeepKeys<TFormData>,
  TData extends DeepValue<TFormData, TName>,
  TOnMount extends
    | undefined
    | FieldValidateOrFn<TFormData, TName, TData> = StandardSchemaV1<
    TData,
    Error
  >,
  TOnChange extends
    | undefined
    | FieldValidateOrFn<TFormData, TName, TData> = undefined,
  TOnChangeAsync extends
    | undefined
    | FieldAsyncValidateOrFn<TFormData, TName, TData> = undefined,
  TOnBlur extends
    | undefined
    | FieldValidateOrFn<TFormData, TName, TData> = undefined,
  TOnBlurAsync extends
    | undefined
    | FieldAsyncValidateOrFn<TFormData, TName, TData> = undefined,
  TOnSubmit extends
    | undefined
    | FieldValidateOrFn<TFormData, TName, TData> = undefined,
  TOnSubmitAsync extends
    | undefined
    | FieldAsyncValidateOrFn<TFormData, TName, TData> = undefined,
  TFormOnMount extends undefined | FormValidateOrFn<TFormData> = undefined,
  TFormOnChange extends undefined | FormValidateOrFn<TFormData> = undefined,
  TFormOnChangeAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TFormOnBlur extends undefined | FormValidateOrFn<TFormData> = undefined,
  TFormOnBlurAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TFormOnSubmit extends undefined | FormValidateOrFn<TFormData> = undefined,
  TFormOnSubmitAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TFormOnServer extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
> = FieldApi<
  TFormData,
  TName,
  TData,
  TOnMount,
  TOnChange,
  TOnChangeAsync,
  TOnBlur,
  TOnBlurAsync,
  TOnSubmit,
  TOnSubmitAsync,
  TFormOnMount,
  TFormOnChange,
  TFormOnChangeAsync,
  TFormOnBlur,
  TFormOnBlurAsync,
  TFormOnSubmit,
  TFormOnSubmitAsync,
  TFormOnServer
>;

export type IFormApi<
  TFormData,
  TOnMount extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnChange extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnChangeAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnBlur extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnSubmit extends undefined | FormValidateOrFn<TFormData> = undefined,
  TOnSubmitAsync extends
    | undefined
    | FormAsyncValidateOrFn<TFormData> = undefined,
  TOnServer extends undefined | FormAsyncValidateOrFn<TFormData> = undefined,
> = FormApi<
  TFormData,
  TOnMount,
  TOnChange,
  TOnChangeAsync,
  TOnBlur,
  TOnBlurAsync,
  TOnSubmit,
  TOnSubmitAsync,
  TOnServer
>;

export type FormOnSubmit<TFormData> = (args: {
  value: TFormData;
  formApi: IFormApi<TFormData, StandardSchemaV1<TFormData, Error>>;
}) => unknown | Promise<unknown>;
