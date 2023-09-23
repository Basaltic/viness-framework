import { AppFactory, VinessReactApp } from '@viness/react'
import { AppModule } from './app.module'

export const App = () => {
    const app = AppFactory.create(AppModule)

    return <VinessReactApp app={app}></VinessReactApp>
}
