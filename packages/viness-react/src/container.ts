import { createDecorator, ServiceIdentifier } from '@viness/di'
import { InstanceIdentifier } from './types'
export { createDecorator }

import { Container } from '@owja/ioc'
import { VinessApp } from './app'

export type VinessServiceIdentifier<T> = (instanceId?: InstanceIdentifier) => ServiceIdentifier<T>

export function createServiceIdentifier<T>(name: string): VinessServiceIdentifier<T> {
    const identifier = (instanceId?: InstanceIdentifier) => {
        const serviceId = instanceId ? `${name}_${instanceId}` : name
        return createDecorator<T>(serviceId)
    }
    return identifier
}

const container = new Container()
