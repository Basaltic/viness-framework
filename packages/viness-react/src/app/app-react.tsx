import { ReactNode } from 'react';
import { AppContextProvider } from './app-react-context';
import { VinessApp } from '@viness/core';

export interface VinessReactAppProps {
    app: VinessApp;
    children: ReactNode;
}

export function VinessReactApp(props: VinessReactAppProps) {
    const { app, children } = props;

    return <AppContextProvider value={app}>{children}</AppContextProvider>;
}

export function createReactApp(props: VinessReactAppProps) {
    return <VinessReactApp {...props} />;
}
