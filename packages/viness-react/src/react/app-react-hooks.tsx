import { ServiceIdentifier, ServiceInstanceIdentifier } from '@viness/di'
import { VinessApp } from '../app'
import { useAppContext } from './app-react-context'
import { VinessRoute } from '../route'
import { UIStore } from '../ui-store'

/**
 * Get the Viness App instance
 */
export function useApp() {
    const app = useAppContext()
    return app as VinessApp
}

/**
 * Get Service and auto inject service
 */
export function useService<T>(id: ServiceIdentifier<T>) {
    const app = useAppContext()
    return app?.services.getService(id) as T
}

/**
 * Get 'Router' instance in FC
 *
 * @returns {IVinessRouter}
 */
export const useRouter = () => {
    const app = useAppContext()
    return app.router
}

/**
 * Get specific Route Instance by id in FC
 *
 * @param id
 * @returns {VinessRoute}
 */
export function useRoute(id: ServiceIdentifier<VinessRoute>) {
    const app = useAppContext()
    return app?.router.getRoute(id)
}

/**
 * Get UIStore instance
 *
 * @param {ServiceIdentifier<T>} id
 * @returns {T}
 */
export function useStore<S extends object, T extends UIStore<S>>(
    id: ServiceIdentifier<T>,
    instanceId: ServiceInstanceIdentifier
) {
    const app = useAppContext()
    return app?.stores.getStore(id, instanceId)
}
