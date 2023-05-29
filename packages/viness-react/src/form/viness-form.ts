import { VinessUIStore } from '../store/store'
import { FormState, createDefaultFormState } from './form-state'
import { CriteriaMode, FieldValues, KeepStateOptions, ValidationMode } from './form-types'
import { IVinessForm } from './viness-form-interface'

export interface VinessFormProps<TFieldValues extends FieldValues> {
    values?: TFieldValues
    defaultValues: TFieldValues
    mode?: ValidationMode
    reValidateMode?: Exclude<ValidationMode, 'onTouched' | 'all'>
    resetOptions?: KeepStateOptions
    // resolver: Resolver<TFieldValues, TContext>
    // context: TContext
    shouldFocusError?: boolean
    shouldUnregister?: boolean
    shouldUseNativeValidation?: boolean
    criteriaMode?: CriteriaMode
    delayError?: number
}

export class VinessForm<TFieldValues extends FieldValues> implements IVinessForm<TFieldValues> {
    private formStateStore: VinessUIStore<FormState<TFieldValues>>
    private formValuesStore: VinessUIStore<TFieldValues>

    constructor(props: VinessFormProps<TFieldValues>) {
        const { defaultValues } = props

        const defaultFormState = createDefaultFormState()
        this.formStateStore = new VinessUIStore<FormState<TFieldValues>>({ defaultState: defaultFormState })
        this.formValuesStore = new VinessUIStore<TFieldValues>({ defaultState: defaultValues })
    }

    /**
     *
     * @returns
     */
    getFormState() {
        return this.formStateStore.getState()
    }

    getFormValues() {}

    async handleSubmit(cb: (values: TFieldValues) => void) {
        this.formStateStore.setState((formState) => {
            formState.isSubmitting = true
        })

        //  trigger validate

        const values = this.formValuesStore.getState()
        await cb(values)
    }

    /**
     * subscribe the changes of the form values
     */
    useWatch(): TFieldValues
    useWatch<T extends keyof TFieldValues>(name: T): TFieldValues[T]
    useWatch<T>(valuesSelector: (v: TFieldValues) => T): T
    useWatch(name?: any): any {
        if (name) {
            if (typeof name === 'function') {
                return this.formValuesStore.useState(name)
            }
            return this.formValuesStore.use[name]()
        } else {
            return this.formValuesStore.useState((s) => s)
        }
    }

    useField(name: string, options: {}) {}

    useFieldArray() {}

    useFormState() {
        return this.formStateStore.useState((s) => s)
    }
}

const form = new VinessForm({ defaultValues: { a: 1 } })

const a = form.useWatch()
