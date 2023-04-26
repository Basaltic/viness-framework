import { ServiceIdentifier } from '@viness/di'
import { VinessApp } from './app'
import { useAppContext } from './app-react-context'
import { VinessRoute } from './route'
import { IVinessRouter } from './router'

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
    const container = app?.container
    return container?.get(id) as T
}

/**
 * Get specific Route Instance by id in FC
 *
 * @param id
 * @returns {VinessRoute}
 */
export function useRoute(id: ServiceIdentifier<VinessRoute>) {
    const app = useAppContext()
    return app?.getService(id)
}

/**
 * Get 'Router' instance in FC
 *
 * @returns {IVinessRouter}
 */
export const useRouter = () => {
    const app = useAppContext()
    return app.getService(IVinessRouter)
}
