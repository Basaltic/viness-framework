import { interfaces } from 'inversify'
import { Suspense, ComponentType } from 'react'
import {} from 'react-error-boundary'
import {} from 'react-helmet-async'
import { App } from './app'
import { useAppContext } from './react-context'

export interface AppProviderProps {
    children: React.ReactNode
    SuspenseFallbackComponent: ComponentType
    ErrorFallbackComponent: ComponentType
}

export function AppProvider(props: AppProviderProps) {
    const { children, SuspenseFallbackComponent } = props
    return <Suspense fallback={<SuspenseFallbackComponent />}>{children}</Suspense>
}

/**
 * Get Service and auto inject service
 */
export function useService<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const app = useAppContext() as App
    const service = app.container.get<T>(identifier)
    return service
}
