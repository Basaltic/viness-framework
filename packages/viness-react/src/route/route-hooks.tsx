import { useLocation, useNavigate, useNavigation, useParams, useSearchParams } from 'react-router-dom'
import { VinessRouteIdentifer } from './route'

export { useNavigate, useNavigation, useLocation, useParams, useSearchParams }

/**
 * Get a list of route instances by route ids passed
 *
 * @param ids
 * @returns
 */
export function useRoutes(ids: VinessRouteIdentifer[]) {
    const routes = ids.map((id) => id.resolve())
    return routes
}
