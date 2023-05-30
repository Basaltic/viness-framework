import { useResolve } from '@viness/react'
import { DashboardPage1RouteId } from '../../../routes'

export function LandingPage() {
    const page1Route = useResolve(DashboardPage1RouteId)

    const toPage = () => {
        page1Route.go()
    }

    return (
        <div>
            LandingPage
            <button onClick={toPage}>test</button>
        </div>
    )
}
