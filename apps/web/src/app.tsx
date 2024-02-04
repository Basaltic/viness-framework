import { VinessReactApp } from '@viness/react';
import { appModule } from './app.module';
import { createApp } from '@viness/core';
import { HomePage } from './home/home.page';

const app = createApp(appModule);

export const App = () => {
    return (
        <VinessReactApp app={app}>
            <HomePage />
        </VinessReactApp>
    );
};
