import { FieldValues } from './form-types'

export interface Field<TFieldValues extends FieldValues, FieldName extends keyof TFieldValues> {
    name: FieldName
    value: TFieldValues[FieldName]
    onBlur(): void
    onChange(value: any): void
}

export interface FieldState {
    /**
     * wethoer field has modified
     */
    isDirty: boolean
    /**
     * field has received a focus and blur event
     */
    isTouched: boolean
    /**
     * field is not valid
     */
    invalid: boolean
    /**
     * field error object.
     */
    error?: FieldError[]
}

export type FieldError = {
    type: string
    message: string
}
