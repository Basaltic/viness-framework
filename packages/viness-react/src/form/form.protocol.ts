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
