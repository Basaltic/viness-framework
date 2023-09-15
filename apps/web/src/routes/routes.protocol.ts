import { RouteFactory } from '@viness/react'

export const ROOT_PATH = '/'
export const rootRouteToken = RouteFactory.createToken(ROOT_PATH)

export const DASHBARD_PATH = '/dashboard'
export const dashboardRouteToken = RouteFactory.createToken(DASHBARD_PATH)

export const DASHBOARD_PAGE_1_PATH = '/dashboard'
export const dashboardPage1RouteToken = RouteFactory.createToken(DASHBOARD_PAGE_1_PATH)

export const DASHBOARD_PAGE_2_PATH = '/dashboard/page2'
export const dashboardPage2RouteToken = RouteFactory.createToken(DASHBOARD_PAGE_2_PATH)

export const DASHBOARD_PAGE_3_PATH = '/dashboard/page3'
export const dashboardPage3RouteToken = RouteFactory.createToken(DASHBOARD_PAGE_3_PATH)
