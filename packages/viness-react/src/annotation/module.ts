import { ModuleOptions, createModule } from '../app/module'

export const INJECTABLE_MODULE_ID = '$viness:module'

export function Module(option: ModuleOptions): ClassDecorator {
    return (target) => {
        const module = createModule(option)
        Object.defineProperty(target, INJECTABLE_MODULE_ID, { value: module })
    }
}
