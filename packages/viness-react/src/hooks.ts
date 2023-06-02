import { ServiceIdentifier } from '@viness/di'
import { useAppContext } from './app/app-react-context'
import { container } from './app/container'

export function useResolve<T>(id: ServiceIdentifier<T>): T {
    const app = useAppContext()
    return container.resolve(id)
}
