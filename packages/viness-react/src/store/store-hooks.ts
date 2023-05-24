import { ServiceInstanceIdentifier } from '@viness/di'
import { useAppContext } from '../app-react-context'
import { VinessServiceIdentifier } from '../identifier'
import { VinessUIStore } from './store'

/**
 * Get UIStore instance
 *
 * @param {ServiceIdentifier<T>} id
 * @returns {T}
 */
export function useStore<S extends object, T extends VinessUIStore<S>>(
    id: VinessServiceIdentifier<T>,
    instanceId?: ServiceInstanceIdentifier
) {
    const app = useAppContext()
    return app?.stores.get(id, instanceId)
}
