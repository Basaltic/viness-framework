import { DashboardPage1RouteId } from '../../../app-routes'

export default function LandingPage() {
    const page1Route = DashboardPage1RouteId.use()

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
