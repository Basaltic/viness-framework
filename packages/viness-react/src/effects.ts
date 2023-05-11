import { ServiceIdentifier, ServiceInstanceIdentifier } from '@viness/di'
import { storeContainer } from './container'
import { createIdentifier, VinessServiceIdentifier } from './identifier'

export class Effects {}

export const IEffectss = createIdentifier<Effectss>('IEffectss')

export class Effectss {
    /**
     * Add Effects to the app
     *
     * @param id
     * @param effects
     */
    bind<T extends Effects, Services extends {}[]>(
        effects: new (...services: Services) => T,
        identifier?: VinessServiceIdentifier<T>
    ): VinessServiceIdentifier<T> {
        if (!identifier) {
            identifier = createIdentifier(effects.name)
        }

        storeContainer.register(identifier, effects)
        return identifier
    }

    /**
     * Get effects instance by id
     *
     * @param {ServiceIdentifier} identifier
     * @param {ServiceInstanceIdentifier} [instanceId]
     * @returns
     */
    get<T extends Effects>(identifier: ServiceIdentifier<T>, instanceId?: ServiceInstanceIdentifier) {
        return storeContainer.get(identifier, instanceId)
    }
}
