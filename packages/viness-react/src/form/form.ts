import { IVinessUIStore, UIState } from '../store';
import { FormState } from './form.protocol';

export type VinessFormOption<DV extends object> = {
    defaultValues: DV;
};

export class VinessForm<DV extends object> {
    private formStateStore: UIState<FormState<DV>>;
    private formValuesStore: UIState<DV>;
    private formValuesValidationRules: any;

    constructor(option: VinessFormOption<DV>) {
        const { defaultValues } = option;
        const defaultFormState: FormState<DV> = {
            isDirty: false,
            isValid: true,
            isValidating: false,
            isSubmitted: false,
            isSubmiteedSuccessful: false,
            isSubmitting: false,
            submitCount: 0,
            defaultValues,
            errors: undefined
        };
        this.formStateStore = new UIState({ defaultState: defaultFormState });

        this.formValuesStore = new UIState({ defaultState: defaultValues });
    }

    register() {}

    unregister() {}

    // TODO: use lodash get and set

    setValue(path: string, value: any, option?: {}) {
        this.formStateStore.setState((s) => {
            // _.set(path, s)
        });
    }

    getValues(path?: string) {
        if (path) {
            // _.get(path)
        }

        const values = this.formValuesStore.getState();

        return values;
    }

    setError() {}

    clearErrors(name?: string) {
        if (name) {
            return;
        }

        this.formStateStore.setState((s) => {
            s.errors = undefined;
        });
    }

    /**
     * trigger field validation
     */
    trigger() {}

    // TODO: define option type
    reset(values: Partial<DV>, option: {}) {}

    resetField() {}

    watch() {}
}
