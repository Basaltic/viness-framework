import { Field, FieldState } from './form-field'
import { FormState } from './form-state'
import { FieldValues } from './form-types'

export interface IVinessForm<TFieldValues extends FieldValues = FieldValues> {
    getFormState(): FormState<TFieldValues>
    getFormValues(): TFieldValues
    handleSubmit(cb: (values: TFieldValues) => void): Promise<void>

    /**
     * subscribe the changes of the form values
     */
    useWatch(): TFieldValues
    useWatch<T extends keyof TFieldValues>(name: T): TFieldValues[T]
    useWatch<T>(valuesSelector: (v: TFieldValues) => T): T

    /**
     *
     */
    useField(props: { name: string; options: {} }): { field: Field; fieldState: FieldState; formState: FormState<TFieldValues> }

    // useFieldArray()

    useFormState(): FormState<TFieldValues>
}
