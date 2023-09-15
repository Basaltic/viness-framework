import { RouteFactory } from '@viness/react'
import { LandingPage } from '../features/auth/pages/landing'
import { DashboardLayout } from '../features/dashboard/dashboard'
import { DashboardPage1 } from '../features/dashboard/pages/page1'
import { DashboardPage2 } from '../features/dashboard/pages/page2'
import { DashboardPage3 } from '../features/dashboard/pages/page3'
import {
    DASHBARD_PATH,
    DASHBOARD_PAGE_1_PATH,
    DASHBOARD_PAGE_2_PATH,
    DASHBOARD_PAGE_3_PATH,
    ROOT_PATH,
    dashboardPage1RouteToken,
    dashboardPage2RouteToken,
    dashboardPage3RouteToken,
    dashboardRouteToken,
    rootRouteToken
} from './routes.protocol'

export const rootRoute = RouteFactory.create(rootRouteToken, { path: ROOT_PATH, Component: LandingPage })

export const dashboardPage1Route = RouteFactory.create(dashboardPage1RouteToken, {
    index: true,
    path: DASHBOARD_PAGE_1_PATH,
    Component: DashboardPage1
})

export const dashboardPage2Route = RouteFactory.create(dashboardPage2RouteToken, {
    path: DASHBOARD_PAGE_2_PATH,
    Component: DashboardPage2
})

export const dashboardPage3Route = RouteFactory.create(dashboardPage3RouteToken, {
    path: DASHBOARD_PAGE_3_PATH,
    Component: DashboardPage3
})

export const dashboardRoute = RouteFactory.create(dashboardRouteToken, {
    path: DASHBARD_PATH,
    Component: DashboardLayout,
    children: [dashboardPage1Route, dashboardPage2Route, dashboardPage3Route]
})
