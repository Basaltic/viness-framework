import { Outlet } from '@viness/core'

export function DashboardLayout() {
    return (
        <div>
            <h1>dashboard</h1>
            <Outlet />
        </div>
    )
}
