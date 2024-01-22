import { Suspense, ComponentType, StrictMode, ReactNode } from 'react';
import { AppContextProvider } from './app-react-context';
import { DefaultSuspenseFallbackComponent } from './app-fallbacks';
import { VinessApp } from '@viness/core';

export interface VinessReactAppProps {
    app: VinessApp;
    children: ReactNode;
    SuspenseFallbackComponent?: ComponentType;
}

export function VinessReactApp(props: VinessReactAppProps) {
    const { app, children, SuspenseFallbackComponent = DefaultSuspenseFallbackComponent } = props;

    return (
        <StrictMode>
            <Suspense fallback={<SuspenseFallbackComponent />}>
                <AppContextProvider value={app}>{children}</AppContextProvider>
            </Suspense>
        </StrictMode>
    );
}

export function createReactApp(props: VinessReactAppProps) {
    return <VinessReactApp {...props} />;
}
