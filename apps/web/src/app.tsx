import { VinessReactApp, VinessAppRouter } from '@viness/react';
import { AppModule } from './app.module';
import { createApp } from '@viness/core';

const app = createApp(AppModule);

export const App = () => {
    return (
        <VinessReactApp app={app}>
            <VinessAppRouter />
        </VinessReactApp>
    );
};
