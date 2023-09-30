export type FormState<DefaultValues extends object> = {
    /**
     *
     */
    isDirty: boolean

    isValid: boolean

    isValidating: boolean

    /**
     *
     */
    isSubmitted: boolean

    isSubmiteedSuccessful: boolean

    isSubmitting: boolean

    submitCount: number

    /**
     * default form values which is set while the form instance initializing
     */
    defaultValues: DefaultValues

    errors?: any
}

type ValidateFunction = (value: any, formValues: any) => boolean | string

export type ValidationRule = {
    required: boolean | ValidateFunction
    validate?: ValidateFunction
}

export interface VinessFormHooks {}
