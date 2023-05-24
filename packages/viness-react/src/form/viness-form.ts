import { FieldErrors, FieldNamesMarkedBoolean } from 'react-hook-form'
import { VinessUIStore } from '../store/store'
import { FieldValues } from './form-types'

export interface FormState<TFieldValues extends FieldValues> {
    isDirty: boolean
    isLoading: boolean
    isSubmitted: boolean
    isSubmitSuccessful: boolean
    isSubmitting: boolean
    isValidating: boolean
    isValid: boolean
    submitCount: number
    defaultValues?: Partial<TFieldValues>
    dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>
    touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>
    errors: FieldErrors<TFieldValues>
}

export interface Field {
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
    error: FieldErrors
}

export interface VinessFormProps<TFieldValues extends FieldValues> {
    defaultValues: TFieldValues
}

function createDefaultFormState() {
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
        errors: {}
    }
}

export interface IVinessForm<TFieldValues extends FieldValues = FieldValues> {}

export class VinessForm<TFieldValues extends FieldValues> implements IVinessForm<TFieldValues> {
    private formStateStore: VinessUIStore<FormState<TFieldValues>>
    private formValuesStore: VinessUIStore<TFieldValues>

    constructor(props: VinessFormProps<TFieldValues>) {
        const { defaultValues } = props

        const defaultFormState = createDefaultFormState()
        this.formStateStore = new VinessUIStore<FormState<TFieldValues>>(defaultFormState)
        this.formValuesStore = new VinessUIStore<TFieldValues>(defaultValues)
    }

    async handleSubmit(cb: (values: TFieldValues) => void) {
        //  trigger validate
        this.formStateStore.setState((formState) => {
            formState.isSubmitting = true
        })
        const values = this.formValuesStore.getState()
        await cb(values)
    }

    useWatch(name: string) {
        return this.formValuesStore.use[name]()
    }

    useField(name: string, options: {}) {}

    useFieldArray() {}

    useFormState() {
        return this.formStateStore.useState((s) => s)
    }
}
