import { Suspense, ComponentType, StrictMode, ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { AppContextProvider } from './app-react-context';
import { DefaultErrorFallbackComponent, DefaultSuspenseFallbackComponent } from './app-fallbacks';
import { VinessApp } from '@viness/core';

export interface VinessReactAppProps {
    app: VinessApp;
    children: ReactNode;
    SuspenseFallbackComponent?: ComponentType;
    ErrorFallbackComponent?: ComponentType<FallbackProps>;
}

export function VinessReactApp(props: VinessReactAppProps) {
    const {
        app,
        children,
        SuspenseFallbackComponent = DefaultSuspenseFallbackComponent,
        ErrorFallbackComponent = DefaultErrorFallbackComponent
    } = props;

    return (
        <StrictMode>
            <Suspense fallback={<SuspenseFallbackComponent />}>
                <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
                    <AppContextProvider value={app}>{children}</AppContextProvider>
                </ErrorBoundary>
            </Suspense>
        </StrictMode>
    );
}

export function createReactApp(props: VinessReactAppProps) {
    return <VinessReactApp {...props} />;
}
