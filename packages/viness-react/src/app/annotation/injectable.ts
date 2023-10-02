import { ServiceIdentifier } from '@viness/di'

export const INJECTABLE_ID = '$viness:service_id'

export const tokenToService = new Map<ServiceIdentifier<any>, any>()

export interface Metadata {
    id: ServiceIdentifier<any>
}

/**
 *
 */
export function Injectable(metadata: ServiceIdentifier<any> | Metadata): ClassDecorator {
    return (target: any) => {
        Object.defineProperty(target, INJECTABLE_ID, { value: metadata })
    }
}
