import { MODULE_METADATA_ID, registerModule, VinessModule } from './module'

/**
 * ```
 *  const app = createApp()
 *  app.render()
 * ```
 */
export class VinessApp {
    constructor(private appModule: VinessModule) {
        const startTime = new Date().valueOf()

        this.initialize()

        const endTime = new Date().valueOf()

        console.log('initialization spend: ', endTime - startTime)
    }

    private initialize() {
        registerModule(this.appModule)
    }
}

export function createVinessApp(appModule: any) {
    const module: VinessModule = appModule[MODULE_METADATA_ID] || appModule
    return new VinessApp(module)
}

export class AppFactory {
    static create(appModule: any) {
        const module: VinessModule = appModule[MODULE_METADATA_ID] || appModule

        return new VinessApp(module)
    }
}
