import {
    FieldValues,
    UseFormProps,
    UseControllerProps,
    UseFormStateProps,
    UseFieldArrayProps,
    UseFormReturn,
    UseFieldArrayReturn,
    UseFormStateReturn,
    UseControllerReturn,
    useWatch,
    useController,
    useFormState,
    useFieldArray,
    Control,
    FieldPath,
    DeepPartialSkipArrayKey,
    FieldPathValue,
    FieldPathValues,
    FieldArrayPath,
    Path,
    PathValue,
    ArrayPath,
    useForm,
    FormState,
    UseFormClearErrors,
    UseFormGetFieldState,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormReset,
    UseFormResetField,
    UseFormSetError,
    UseFormSetFocus,
    UseFormSetValue,
    UseFormTrigger,
    UseFormUnregister,
    UseFormWatch
} from 'react-hook-form'

export interface IVinessFormForm<TFieldValues extends FieldValues = FieldValues, TContext = any> {
    watch: UseFormWatch<TFieldValues>
    getValues: UseFormGetValues<TFieldValues>
    getFieldState: UseFormGetFieldState<TFieldValues>
    setError: UseFormSetError<TFieldValues>
    clearErrors: UseFormClearErrors<TFieldValues>
    setValue: UseFormSetValue<TFieldValues>
    trigger: UseFormTrigger<TFieldValues>
    formState: FormState<TFieldValues>
    resetField: UseFormResetField<TFieldValues>
    reset: UseFormReset<TFieldValues>
    handleSubmit: UseFormHandleSubmit<TFieldValues>
    unregister: UseFormUnregister<TFieldValues>
    register: UseFormRegister<TFieldValues>
    setFocus: UseFormSetFocus<TFieldValues>
    useWatch(props: {
        defaultValue?: DeepPartialSkipArrayKey<TFieldValues>
        control?: Control<TFieldValues>
        disabled?: boolean
        exact?: boolean
    }): DeepPartialSkipArrayKey<TFieldValues>
    useWatch<TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: {
        name: TFieldName
        defaultValue?: FieldPathValue<TFieldValues, TFieldName>
        control?: Control<TFieldValues>
        disabled?: boolean
        exact?: boolean
    }): FieldPathValue<TFieldValues, TFieldName>
    useWatch<TFieldNames extends readonly FieldPath<TFieldValues>[] = readonly FieldPath<TFieldValues>[]>(props: {
        name: readonly [...TFieldNames]
        defaultValue?: DeepPartialSkipArrayKey<TFieldValues>
        control?: Control<TFieldValues>
        disabled?: boolean
        exact?: boolean
    }): FieldPathValues<TFieldValues, TFieldNames>
    useWatch(): DeepPartialSkipArrayKey<TFieldValues>

    useFormState(props?: UseFormStateProps<TFieldValues>): UseFormStateReturn<TFieldValues>

    useFieldArray<TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>, TKeyName extends string = 'id'>(
        props: UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>
    ): UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName>

    useController<TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
        props: UseControllerProps<TFieldValues, TName>
    ): UseControllerReturn<TFieldValues, TName>
}

/**
 *
 */
export class Form<TFieldValues extends FieldValues = FieldValues, TContext = any> implements IVinessFormForm<TFieldValues, TContext> {
    form!: UseFormReturn<TFieldValues, TContext>
    private props: UseFormProps<TFieldValues, TContext>

    constructor(props: UseFormProps<TFieldValues, TContext>) {
        this.props = props
    }

    get formState() {
        return this.form.formState
    }

    get setValue() {
        return this.form.setValue
    }

    get getValues() {
        return this.form.getValues
    }

    get setFocus() {
        return this.form.setFocus
    }

    get setError() {
        return this.form.setError
    }

    get clearErrors() {
        return this.form.clearErrors
    }

    get getFieldState() {
        return this.form.getFieldState
    }

    get watch() {
        return this.form.watch
    }

    get register() {
        return this.form.register
    }

    get unregister() {
        return this.form.unregister
    }

    get handleSubmit() {
        return this.form.handleSubmit
    }

    get reset() {
        return this.form.reset
    }

    get resetField() {
        return this.form.resetField
    }

    get trigger() {
        return this.form.trigger
    }

    private get control() {
        return this.form.control
    }

    private initialize() {
        if (!this.form) {
            const form = useForm(this.props)
            this.form = form
        }
    }

    use(): UseFormReturn<TFieldValues, TContext> {
        this.initialize()
        return this.form
    }

    useFormState(
        props?:
            | Partial<{
                  control?: Control<TFieldValues, any> | undefined
                  disabled?: boolean | undefined
                  name?: Path<TFieldValues> | Path<TFieldValues>[] | readonly Path<TFieldValues>[] | undefined
                  exact?: boolean | undefined
              }>
            | undefined
    ): UseFormStateReturn<TFieldValues> {
        this.initialize()
        return useFormState({ control: this.control as any, ...props })
    }

    useFieldArray<TFieldArrayName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>, TKeyName extends string = 'id'>(
        props: UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>
    ): UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName> {
        this.initialize()
        return useFieldArray({ control: this.control as any, ...props })
    }

    useController<TName extends Path<TFieldValues> = Path<TFieldValues>>(
        props: UseControllerProps<TFieldValues, TName>
    ): UseControllerReturn<TFieldValues, TName> {
        this.initialize()
        return useController({ control: this.control as any, ...props })
    }

    useWatch(props: {
        defaultValue?: DeepPartialSkipArrayKey<TFieldValues> | undefined
        control?: Control<TFieldValues, any> | undefined
        disabled?: boolean | undefined
        exact?: boolean | undefined
    }): DeepPartialSkipArrayKey<TFieldValues>
    useWatch<TFieldName extends Path<TFieldValues> = Path<TFieldValues>>(props: {
        name: TFieldName
        defaultValue?: PathValue<TFieldValues, TFieldName> | undefined
        control?: Control<TFieldValues, any> | undefined
        disabled?: boolean | undefined
        exact?: boolean | undefined
    }): PathValue<TFieldValues, TFieldName>
    useWatch<TFieldNames extends readonly Path<TFieldValues>[] = readonly Path<TFieldValues>[]>(props: {
        name: readonly [...TFieldNames]
        defaultValue?: DeepPartialSkipArrayKey<TFieldValues> | undefined
        control?: Control<TFieldValues, any> | undefined
        disabled?: boolean | undefined
        exact?: boolean | undefined
    }): { [K in keyof TFieldNames]: PathValue<TFieldValues, TFieldNames[K] & Path<TFieldValues>> }
    useWatch(): DeepPartialSkipArrayKey<TFieldValues>
    useWatch(props: any = {}): any {
        this.initialize()
        return useWatch({ control: this.control as any, ...props })
    }
}

export const createForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(props: UseFormProps<TFieldValues, TContext>) => {
    return new Form<TFieldValues, TContext>(props)
}
