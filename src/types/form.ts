import type { DeepKeys, DeepValue, FieldApi, FieldAsyncValidateOrFn, FieldValidateOrFn, FormAsyncValidateOrFn, FormValidateOrFn } from "@tanstack/react-form";

export type IFieldApi<TFormData extends {},
                      TName extends DeepKeys<TFormData>, 
                      TData extends DeepValue<TFormData, TName>,
                      TOnMount extends undefined | FieldValidateOrFn<TFormData, TName, TData>=undefined, 
                      TOnChange extends undefined | FieldValidateOrFn<TFormData, TName, TData>=undefined, 
                      TOnChangeAsync extends undefined | FieldAsyncValidateOrFn<TFormData, TName, TData>=undefined, 
                      TOnBlur extends undefined | FieldValidateOrFn<TFormData, TName, TData>=undefined, 
                      TOnBlurAsync extends undefined | FieldAsyncValidateOrFn<TFormData, TName, TData>=undefined,
                       TOnSubmit extends undefined | FieldValidateOrFn<TFormData, TName, TData>=undefined, 
                       TOnSubmitAsync extends undefined | FieldAsyncValidateOrFn<TFormData, TName, TData>=undefined, 
                       TFormOnMount extends undefined | FormValidateOrFn<TFormData>=undefined, 
                       TFormOnChange extends undefined | FormValidateOrFn<TFormData>=undefined, 
                       TFormOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData>=undefined, 
                       TFormOnBlur extends undefined | FormValidateOrFn<TFormData>=undefined, 
                       TFormOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData>=undefined, 
                       TFormOnSubmit extends undefined | FormValidateOrFn<TFormData>=undefined, 
                       TFormOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData>=undefined, 
                       TFormOnServer extends undefined | FormAsyncValidateOrFn<TFormData>= undefined> = FieldApi<TFormData, TName, TData , TOnMount, TOnChange , TOnChangeAsync , TOnBlur , TOnBlurAsync , TOnSubmit , TOnSubmitAsync , TFormOnMount , TFormOnChange, TFormOnChangeAsync, TFormOnBlur, TFormOnBlurAsync, TFormOnSubmit, TFormOnSubmitAsync, TFormOnServer>

