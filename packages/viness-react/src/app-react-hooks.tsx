import { VinessApp } from './app/app'
import { useAppContext } from './app-react-context'
import { VinessServiceIdentifier } from './identifier'

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
