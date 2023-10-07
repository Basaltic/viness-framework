import { Container, SyncDescriptor } from './instantiation';
import { AppContext } from './app-context';
import { DepsScanner, ModuleImport } from './module';
import { createInjectDecorator } from './decorator';

export const IVinessApp = createInjectDecorator(Symbol('IVinessApp'));

/**
 * ```
 *  const app = createVinessApp()
 *  app.render()
 * ```
 */
export class VinessApp extends AppContext {}

export function createVinessApp(appModule: ModuleImport) {
    const startTime = new Date().valueOf();
    const container = new Container();

    const scanner = new DepsScanner(container);
    scanner.scan(appModule);

    const appDescriptor = new SyncDescriptor(VinessApp, [container]);
    container.register(IVinessApp, appDescriptor);

    const app = new VinessApp(container);

    const endTime = new Date().valueOf();
    console.log('app started in : ', endTime - startTime);

    return app;
}
