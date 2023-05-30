import { DashboardPage1RouteId } from '../../../routes'

export function LandingPage() {
    const page1Route = DashboardPage1RouteId.useResolve()

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
