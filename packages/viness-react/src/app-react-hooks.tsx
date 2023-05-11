import { ServiceInstanceIdentifier } from '@viness/di'
import { VinessApp } from './app'
import { useAppContext } from './app-react-context'
import { VinessServiceIdentifier } from './identifier'
import { IVinessRoute } from './route'
import { UIStore } from './ui-store'

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
export function useService<T>(id: VinessServiceIdentifier<T>) {
    const app = useAppContext()
    return app?.services.get(id) as T
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
 * @returns {IVinessRoute}
 */
export function useRoute(id: VinessServiceIdentifier<IVinessRoute>) {
    const app = useAppContext()
    return app?.router?.get(id)
}

/**
 * Get UIStore instance
 *
 * @param {ServiceIdentifier<T>} id
 * @returns {T}
 */
export function useStore<S extends object, T extends UIStore<S>>(
    id: VinessServiceIdentifier<T>,
    instanceId?: ServiceInstanceIdentifier
) {
    const app = useAppContext()
    return app?.stores.get(id, instanceId)
}
