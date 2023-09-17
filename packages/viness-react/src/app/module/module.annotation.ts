import { ModuleMetadata, createModule } from '../module/module'

export const MODULE_METADATA = '$viness:module_metadata'

export function Module(option: ModuleMetadata): ClassDecorator {
    return (target) => {
        const module = createModule(option)
        Object.defineProperty(target, MODULE_METADATA, { value: module })
    }
}
