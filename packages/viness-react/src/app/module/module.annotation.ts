import { createModule } from '../module/module'
import { ModuleMetadata } from './module.protocol'

export const MODULE_METADATA_ID = '$viness:module_metadata'

export function Module(option: ModuleMetadata): ClassDecorator {
    return (target) => {
        const module = createModule(option)
        Object.defineProperty(target, MODULE_METADATA_ID, { value: module })
    }
}
