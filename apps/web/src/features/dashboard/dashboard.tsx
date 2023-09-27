import { Navigate, Outlet, useResolve } from '@viness/react'

export function DashboardLayout() {
    return (
        <div>
            <h1>dashboard</h1>
            <Outlet />
        </div>
    )
}
