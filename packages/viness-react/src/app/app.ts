import { Container } from '@viness/di'
import { renderApp, VinessReactAppProps } from './app-react'
import { VinessModule } from './module'

export interface IVInessApp {}

let container: Container

export class VinessApp {
    private appModule: VinessModule
    private container: Container
    constructor(module: VinessModule) {
        container = new Container()

        this.appModule = module
        this.container = container
    }

    render(props: Omit<VinessReactAppProps, 'app'>) {
        return renderApp({ ...props, app: this })
    }
}

export function createApp(appModule: VinessModule) {
    return new VinessApp(appModule)
}
