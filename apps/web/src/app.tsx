import { AppFactory, VinessReactApp, VinessAppRouter } from '@viness/react'
import { appModule } from './app.module'

export const App = () => {
    const app = AppFactory.create(appModule)

    return (
        <VinessReactApp app={app}>
            <VinessAppRouter />
        </VinessReactApp>
    )
}
