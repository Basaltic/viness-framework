import { FieldError } from './form-field'
import { FieldValues } from './form-types'

export interface FormState<TFieldValues extends FieldValues = FieldValues> {
    isDirty: boolean
    isLoading: boolean
    isSubmitted: boolean
    isSubmitSuccessful: boolean
    isSubmitting: boolean
    isValidating: boolean
    isValid: boolean
    submitCount: number
    defaultValues?: Partial<TFieldValues>
    // TODO:
    dirtyFields: any
    touchedFields: any
    errors?: { [K in keyof TFieldValues]: FieldError }
}

export function createDefaultFormState() {
    return {
        isDirty: false,
        isLoading: false,
        isSubmitted: false,
        isSubmitSuccessful: false,
        isSubmitting: false,
        isValidating: false,
        isValid: false,
        submitCount: 0,
        defaultValues: {},
        dirtyFields: {},
        touchedFields: {},
        errors: undefined
    }
}
