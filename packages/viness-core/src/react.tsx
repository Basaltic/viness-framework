import { interfaces } from 'inversify'
import { Suspense, ComponentType, createContext, useContext } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { VinessApp } from './app'
import {} from 'react'

const AppContext = createContext<VinessApp | null>(null)
export const AppContextProvider = AppContext.Provider

/**
 * Get app instance from context
 */
export const useAppContext = () => {
    const app = useContext(AppContext)
    return app
}

export interface AppProviderProps {
    app: VinessApp
    SuspenseFallbackComponent: ComponentType
    ErrorFallbackComponent: ComponentType<FallbackProps>
}

export function AppProvider(props: AppProviderProps) {
    const { app, SuspenseFallbackComponent, ErrorFallbackComponent } = props

    const router = createHashRouter([])

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

export function createReactApp() {}

/**
 * Get Service and auto inject service
 */
export function useService<T>(identifier: interfaces.ServiceIdentifier<T>) {}

export function useAppRoute() {}

export function useAppStore() {}
