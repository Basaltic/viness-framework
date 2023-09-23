import { VinessInjectionToken } from '../token'
import { IVinessRoute } from './route.protocol'

export type RouteToken<P extends string> = VinessInjectionToken<IVinessRoute<P>>

export type RouteNode<P extends string> = { route: RouteToken<P>; index?: boolean; children: RouteNode<P>[] | RouteToken<P>[] }

export type RouteTree = RouteNode<any>[]

export function convertToReactRoutes() {}
