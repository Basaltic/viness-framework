import { useLocation, useNavigate, useNavigation, useParams, useSearchParams } from 'react-router-dom'
import { useAppContext } from '../app-react-context'
import { IVinessRoute } from './route'
import { VinessRouteIdentifer } from './route-identifier'

export { useNavigate, useNavigation, useLocation, useParams, useSearchParams }

/**
 * Get specific Route Instance by id in FC
 *
 * @param id
 * @returns {IVinessRoute}
 */
export function useRoute(id: VinessRouteIdentifer<IVinessRoute>) {
    const app = useAppContext()
    const navigate = useNavigate()
    const route = app?.routes?.get(id)
    if (route) {
        route.navigate = navigate
    }
    return route
}

/**
 * Get a list of route instances by route ids passed
 *
 * @param ids
 * @returns
 */
export function useRoutes(ids: VinessRouteIdentifer<IVinessRoute>[]) {
    const app = useAppContext()
    const routes = ids.map((id) => app?.routes?.get(id))
    return routes
}
