import { SyncDescriptor } from '@viness/di'
import { FieldValues, UseFormProps } from 'react-hook-form'
import { servicesContainer } from '../app/container'
import { createIdentifier, VinessServiceIdentifier } from '../identifier'
import { VinessForm, IVinessForm } from './viness-form'

export interface IForms {
    createForm<TFieldValues extends FieldValues = FieldValues>(
        props: UseFormProps<TFieldValues>
    ): VinessServiceIdentifier<IVinessForm<TFieldValues>>
}

export class Forms implements IForms {
    createForm = <TFieldValues extends FieldValues = FieldValues>(props: UseFormProps<TFieldValues>) => {
        const descriptor = new SyncDescriptor(VinessForm, [props], true)
        const identifier = createIdentifier<IVinessForm<TFieldValues>>('VinessForm')
        servicesContainer.register(identifier, descriptor)
        return identifier
    }
}
