import { Suspense, ComponentType, StrictMode } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { AppRouter } from '../route/router-react'
import { RouteItem } from '../route/route'
import { VinessApp } from './app'
import { AppContextProvider } from './app-react-context'

export interface VinessReactAppProps {
    app: VinessApp
    router: {
        type: 'hash' | 'browser' | 'memory'
        routes: RouteItem[]
        basename?: string
    }
    Providers?: ComponentType<React.PropsWithChildren<any>>[]
    SuspenseFallbackComponent: ComponentType
    ErrorFallbackComponent: ComponentType<FallbackProps>
}

export function VinessReactApp(props: VinessReactAppProps) {
    const { app, router, SuspenseFallbackComponent, ErrorFallbackComponent, Providers = [] } = props
    const { routes, type, basename } = router

    let element = <AppRouter basename={basename} type={type} routeItems={routes} />
    for (let i = Providers.length - 1; i >= 0; i--) {
        const Provider = Providers[i]
        element = <Provider children={element} />
    }

    return (
        <StrictMode>
            <Suspense fallback={<SuspenseFallbackComponent />}>
                <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
                    <HelmetProvider>
                        <AppContextProvider value={app}>{element}</AppContextProvider>
                    </HelmetProvider>
                </ErrorBoundary>
            </Suspense>
        </StrictMode>
    )
}
