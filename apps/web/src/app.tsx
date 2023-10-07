import { VinessReactApp, VinessAppRouter } from '@viness/react';
import { AppModule } from './app.module';
import { createVinessApp } from '@viness/core';

const app = createVinessApp(AppModule);

export const App = () => {
    return (
        <VinessReactApp app={app}>
            <VinessAppRouter />
        </VinessReactApp>
    );
};
