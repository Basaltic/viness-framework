import { Navigate, Outlet, useResolve } from '@viness/react'
import { dashboardRouteToken, dashboardPage1RouteToken } from '../../routes/routes.protocol'

export function DashboardLayout() {
    return (
        <div>
            <h1>dashboard</h1>
            <Outlet />
        </div>
    )
}
