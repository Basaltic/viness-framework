export type FieldValues = Record<string, any>

export type ValidationMode = 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all'
export type CriteriaMode = 'firstError' | 'all'
export type KeepStateOptions = Partial<{
    keepDirtyValues: boolean
    keepErrors: boolean
    keepDirty: boolean
    keepValues: boolean
    keepDefaultValues: boolean
    keepIsSubmitted: boolean
    keepTouched: boolean
    keepIsValid: boolean
    keepSubmitCount: boolean
}>
