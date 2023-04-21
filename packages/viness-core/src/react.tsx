import { IInstantiationService, ServiceIdentifier } from '@viness/di'
import { Suspense, ComponentType, createContext, useContext } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { VinessApp } from './app'

const AppContext = createContext<VinessApp | null>(null)
export const AppContextProvider = AppContext.Provider

/**
 * Get app instance from context
 */
export const useAppContext = () => {
    const app = useContext(AppContext)
    return app
}

export interface VinessReactAppProps {
    app: VinessApp
    router: ReturnType<typeof createHashRouter>
    SuspenseFallbackComponent: ComponentType
    ErrorFallbackComponent: ComponentType<FallbackProps>
}

export function VinessReactApp(props: VinessReactAppProps) {
    const { app, router, SuspenseFallbackComponent, ErrorFallbackComponent } = props

    return (
        <Suspense fallback={<SuspenseFallbackComponent />}>
            <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
                <HelmetProvider>
                    <AppContextProvider value={app}>
                        <RouterProvider router={router} />
                    </AppContextProvider>
                </HelmetProvider>
            </ErrorBoundary>
        </Suspense>
    )
}

export function renderApp(props: VinessReactAppProps) {
    return <VinessReactApp {...props} />
}

/**
 * Get Service and auto inject service
 */
export function useService<T>(id: ServiceIdentifier<T>) {
    const app = useAppContext()
    const instantiation = app?.instantiationService as IInstantiationService
    return instantiation.invokeFunction((accessor) => accessor.get(id))
}
