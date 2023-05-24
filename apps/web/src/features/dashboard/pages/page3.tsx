import { app } from '../../../app'

interface FormValues {
    name: string
}

const defaultFormValues: FormValues = {
    name: ''
}

const formId = app.forms.createForm({ defaultValues: defaultFormValues })

export function DashboardPage3() {
    const form = formId.resolve()

    const handleSubmit = () => {
        console.log(form.getValues())
        console.log(form)

        form.handleSubmit((v) => {
            console.log(v)
        })
    }

    return (
        <div>
            <h3>dashboard page3 - form</h3>
            <NameFormItem />

            <div>
                <button onClick={handleSubmit}>submit</button>
            </div>
        </div>
    )
}

function NameFormItem() {
    const { field, formState } = formId.resolve().useController({ name: 'name' })

    console.log(field, formState)

    return <input value={field.value} onChange={field.onChange} />
}
