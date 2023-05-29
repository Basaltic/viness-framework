import { KeepStateOptions } from 'react-hook-form'
import { Field, FieldState } from './form-field'
import { FormState } from './form-state'
import { FieldValues } from './form-types'

export interface IVinessForm<TFieldValues extends FieldValues = FieldValues> {
    setError(): void

    clearErrors(): void

    trigger(): void

    reset(values: TFieldValues, options?: KeepStateOptions): void

    register<TName extends keyof TFieldValues>(name: any): Field<TFieldValues, TName>

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
    // formState: FormState<TFieldValues>
}
