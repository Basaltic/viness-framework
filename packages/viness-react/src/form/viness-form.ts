import { useEffect } from 'react'
import { VinessUIStore } from '../store/store'
import { Field, FieldState } from './form-field'
import { FormState, createDefaultFormState } from './form-state'
import { CriteriaMode, FieldValues, KeepStateOptions, ValidationMode } from './form-types'
import { IVinessForm, UseFieldReturn } from './viness-form-interface'

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
    private formFieldStateStore: VinessUIStore<{ [K in keyof TFieldValues]: FieldState }>
    private config: VinessFormProps<TFieldValues>

    constructor(props: VinessFormProps<TFieldValues>) {
        const { defaultValues } = props

        const defaultFormState = createDefaultFormState()
        this.formStateStore = new VinessUIStore<FormState<TFieldValues>>({ defaultState: defaultFormState })
        this.formValuesStore = new VinessUIStore<TFieldValues>({ defaultState: defaultValues })
        this.formFieldStateStore = new VinessUIStore<{ [K in keyof TFieldValues]: FieldState }>({ defaultState: {} as any })

        this.config = props
    }
    setError(): void {
        throw new Error('Method not implemented.')
    }
    clearErrors(): void {
        throw new Error('Method not implemented.')
    }
    trigger(): void {
        throw new Error('Method not implemented.')
    }
    reset(
        values: TFieldValues,
        options?:
            | Partial<{
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
            | undefined
    ): void {
        throw new Error('Method not implemented.')
    }

    private validate() {}

    register<TName extends keyof TFieldValues>(name: any): Field<TFieldValues, TName> {
        throw new Error('Method not implemented.')
    }

    getFormState() {
        return this.formStateStore.getState()
    }

    getFormValues() {
        return this.formValuesStore.getState()
    }

    getFormFieldState(): { [K in keyof TFieldValues]: FieldState }
    getFormFieldState<TName extends keyof TFieldValues>(name: TName): FieldState
    getFormFieldState<TName extends keyof TFieldValues>(name?: TName): any {
        if (name) {
            return this.formFieldStateStore.getState()[name]
        } else {
            return this.formFieldStateStore.getState()
        }
    }

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

    useField<TName extends keyof TFieldValues>(props: { name: TName }): UseFieldReturn<TFieldValues, TName> {
        const { name } = props

        const value = this.formValuesStore.useState((s) => s[name])
        const fieldState = this.formFieldStateStore.useState((s) => s[name])

        useEffect(() => {
            this.formFieldStateStore.setState((s) => {
                s[name] = {
                    isDirty: false,
                    isTouched: false,
                    invalid: false,
                    error: []
                }
            })
        }, [])

        const onBlur = () => {}
        const onChange = (v: any) => {
            this.formValuesStore.setState((s) => {
                s[name] = v
            })
            this.formFieldStateStore.setState((s) => {
                s[name].isDirty = true
            })
        }

        return {
            field: { name, value, onBlur, onChange },
            fieldState
        }
    }

    useFieldArray() {}

    useFormState() {
        return this.formStateStore.useState((s) => s)
    }
}

const form = new VinessForm({ defaultValues: { a: 1 } })

const a = form.useWatch()
