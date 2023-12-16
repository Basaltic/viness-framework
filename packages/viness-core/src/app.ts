import { ModulesScanner } from './module/scanner';
import { ModuleImport } from './module';
import { globalContainer } from './global-container';
import { Injectable } from './di/decorator';

/**
 * ```
 *  const app = createApp(AppModule)
 * ```
 */
@Injectable()
export class VinessApp {
    get container() {
        return globalContainer;
    }
}

globalContainer.bind(VinessApp).toSelf();

export function createApp(appModule: ModuleImport) {
    const startTime = new Date().valueOf();

    const app = globalContainer.get(VinessApp);
    const scanner = new ModulesScanner(globalContainer);
    scanner.scan(appModule);

    const endTime = new Date().valueOf();
    console.log('app started in : ', endTime - startTime);

    return app;
}
