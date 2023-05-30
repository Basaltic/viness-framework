import { Field, FieldError, FieldState } from './form-field'
import { FormState } from './form-state'
import { FieldValues, KeepStateOptions } from './form-types'

export interface IVinessForm<TFieldValues extends FieldValues = FieldValues> {
    setError<TName extends keyof TFieldValues>(name: TName, error: FieldError): void

    /**
     * Remove all errors
     */
    clearErrors(): void

    /**
     * Trigger validation
     */
    trigger<TName extends keyof TFieldValues>(name: TName): void

    reset(values: TFieldValues, options?: KeepStateOptions): void

    /**
     * Register new field
     *
     * @param name
     */
    register<TName extends keyof TFieldValues>(name: any): Field<TFieldValues, TName>

    /**
     * Handle form submitation
     * @param cb
     */
    handleSubmit(cb: (values: TFieldValues) => void): Promise<void>

    getFormState(): FormState<TFieldValues>
    getFormValues(): TFieldValues

    getFormFieldState(): { [K in keyof TFieldValues]: FieldState }
    getFormFieldState<TName extends keyof TFieldValues>(name: TName): FieldState

    /**
     * *hook* subscribe the changes of the form values
     */
    useWatch(): TFieldValues
    useWatch<T extends keyof TFieldValues>(name: T): TFieldValues[T]
    useWatch<T>(valuesSelector: (v: TFieldValues) => T): T

    /**
     * *hook* register field to this form
     */
    useField<TName extends keyof TFieldValues>(props: { name: TName; options: {} }): UseFieldReturn<TFieldValues, TName>

    // useFieldArray()

    useFormState(): FormState<TFieldValues>
}

export interface UseFieldReturn<TFieldValues extends FieldValues = FieldValues, TName extends keyof TFieldValues = ''> {
    field: Field<TFieldValues, TName>
    fieldState: FieldState
}
