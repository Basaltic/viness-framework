import React from 'react'
import { FieldValues } from './form-types'

export interface Field<TFieldValues extends FieldValues = FieldValues, FieldName extends keyof TFieldValues = ''> {
    onChange(value: any): void
    onBlur(): void
    value: TFieldValues[FieldName]
    name: FieldName
    ref: React.Ref<any>
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
