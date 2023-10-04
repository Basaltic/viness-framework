import { createVinessApp, VinessReactApp, VinessAppRouter } from '@viness/react';
import { AppModule } from './app.module';

const app = createVinessApp(AppModule);

export const App = () => {
    return (
        <VinessReactApp app={app}>
            <VinessAppRouter />
        </VinessReactApp>
    );
};
