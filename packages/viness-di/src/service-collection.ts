import type { ServiceIdentifier } from './instantiation'
import type { SyncDescriptor } from './descriptors'

/**
 *
 */
export class ServiceCollection {
    /**
     * key: Service Identifier
     * value: Service Descriptor or Instance
     */
    private _entries = new Map<ServiceIdentifier<any>, any>()

    constructor(...entries: [ServiceIdentifier<any>, any][]) {
        for (const [id, service] of entries) {
            this.set(id, service)
        }
    }

    set<T>(id: ServiceIdentifier<T>, instanceOrDescriptor: T | SyncDescriptor<T>): T | SyncDescriptor<T> {
        const result = this._entries.get(id)
        this._entries.set(id, instanceOrDescriptor)
        return result
    }

    has(id: ServiceIdentifier<any>): boolean {
        return this._entries.has(id)
    }

    get<T>(id: ServiceIdentifier<T>): T | SyncDescriptor<T> {
        return this._entries.get(id)
    }
}
