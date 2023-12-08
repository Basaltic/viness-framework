import '@abraham/reflection';

if (typeof Reflect === 'undefined' || !Reflect.getMetadata) {
    throw new Error(`tsyringe requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`);
}

export type { DependencyContainer, Disposable, RegistrationOptions, Frequency } from './types';
export * from './types/lifecycle';
export * from './decorators';
export * from './factories';
export * from './providers';
export { delay } from './lazy-helpers';
export { instance as container } from './dependency-container';
