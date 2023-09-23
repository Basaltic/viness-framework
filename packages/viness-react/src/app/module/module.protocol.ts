import { VinessInjectionToken } from '../../token'

export interface Type<T = any> extends Function {
    new (...args: any[]): T
}

export type ClassProvider<T> = {
    provide: VinessInjectionToken<T>
    useClass: Type<T>
}

export type ModuleProvider<T = any> = Type<any> | ClassProvider<T>

export type ModuleImport = Type<any> | VinessModule

export interface ModuleMetadata {
    imports?: ModuleImport[]
    providers?: ModuleProvider[]
}

export class VinessModule implements ModuleMetadata {
    imports?: ModuleImport[]
    providers?: ModuleProvider[]
    constructor(metadata?: ModuleMetadata) {
        this.imports = metadata?.imports
        this.providers = metadata?.providers
    }
}
