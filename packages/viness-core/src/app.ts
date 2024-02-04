import { ModulesScanner } from './module/scanner';
import { Module } from './module';
import { globaleContainer, resolve } from './global-container';
import { token } from './injection';

/**
 * ```
 *  const app = createApp(AppModule)
 * ```
 */
export class VinessApp {
    doSometing() {}
}

export const vinessAppToken = token<VinessApp>('VinessApp');

export function createApp(appModule: Module) {
    globaleContainer.bind(vinessAppToken).to(VinessApp).inSingletonScope();

    const app = resolve(vinessAppToken)();

    const scanner = new ModulesScanner(globaleContainer);
    scanner.scan(appModule);

    return app;
}
