import { singleton, container } from '@viness/di';
import { ModulesScanner } from './module/scanner';
import { ModuleImport } from './module';

/**
 * ```
 *  const app = createApp(AppModule)
 * ```
 */
@singleton()
export class VinessApp {
    get container() {
        return container;
    }
}

export function createApp(appModule: ModuleImport) {
    const startTime = new Date().valueOf();

    const app = container.resolve(VinessApp);
    const scanner = new ModulesScanner(container);
    scanner.scan(appModule);

    const endTime = new Date().valueOf();
    console.log('app started in : ', endTime - startTime);

    return app;
}
