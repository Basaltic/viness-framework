import { MODULE_METADATA, importModule, VinessModule } from './module';

/**
 * ```
 *  const app = createApp()
 *  app.render()
 * ```
 */
export class VinessApp {
    constructor(private appModule: any) {
        const startTime = new Date().valueOf();

        this.initialize();

        const endTime = new Date().valueOf();

        console.log('app started in : ', endTime - startTime);
    }

    private initialize() {
        importModule(this.appModule);
    }
}

export function createVinessApp(appModule: any) {
    return new VinessApp(appModule);
}

export class AppFactory {
    static create(appModule: any) {
        return createVinessApp(appModule);
    }
}
