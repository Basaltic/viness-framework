import { Suspense, ComponentType } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { VinessApp } from '@viness/core'
import { AppContextProvider } from './app-react-context'

export interface VinessReactAppProps {
    app: VinessApp
    children: React.ReactNode
    SuspenseFallbackComponent: ComponentType
    ErrorFallbackComponent: ComponentType<FallbackProps>
}

export function VinessReactApp(props: VinessReactAppProps) {
    const { app, children, SuspenseFallbackComponent, ErrorFallbackComponent } = props

    return (
        <Suspense fallback={<SuspenseFallbackComponent />}>
            <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
                <HelmetProvider>
                    <AppContextProvider value={app}>{children}</AppContextProvider>
                </HelmetProvider>
            </ErrorBoundary>
        </Suspense>
    )
}
