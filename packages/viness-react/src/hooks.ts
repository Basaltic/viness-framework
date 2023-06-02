import { ServiceIdentifier } from '@viness/di'
import { useAppContext } from './app/app-react-context'

export function useResolve<T>(id: ServiceIdentifier<T>): T {
    const app = useAppContext()
    return app.container.resolve(id)
}
