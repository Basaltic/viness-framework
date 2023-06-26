import { createDecorator, VinessServiceIdentifier } from '../decorator'

export interface VinessStoreIdentifier<T> extends VinessServiceIdentifier<T> {}

export function createStoreDecorator<T>(storeId: string): VinessStoreIdentifier<T> {
    const decorator = createDecorator(storeId) as VinessStoreIdentifier<T>
    return decorator
}
