import { DashboardPage1RouteId } from '../../../app'

export default function LandingPage() {
    const page1Route = DashboardPage1RouteId.get()

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
