import { ServiceIdentifier } from '@viness/di'

export const INJECTABLE_ID = '$viness:service_id'

export const tokenToService = new Map<ServiceIdentifier<any>, any>()

/**
 *
 */
export function Injectable(identifier: ServiceIdentifier<any>): ClassDecorator {
    return (target: any) => {
        Object.defineProperty(target, INJECTABLE_ID, { value: identifier })
    }
}
