import { ServiceIdentifier } from '@viness/di'
import { VinessApp } from './app'
import { useAppContext } from './app-react-context'
import { VinessRoute } from './route'

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

export function useRoute(id: ServiceIdentifier<VinessRoute>) {
    const app = useAppContext()
    return app?.getService(id)
}
