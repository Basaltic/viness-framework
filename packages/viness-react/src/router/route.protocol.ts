import { RouteObject, NavigateOptions } from 'react-router-dom'
import { VinessInjectionToken } from '../token'
import { PathParam } from './types'

export type VinessRouteInjectionToken<Path extends string> = VinessInjectionToken<IVinessRoute<Path>> & {
    metadata: VinessRouteMetadata<Path>
}

export interface VinessRouteMetadata<Path extends string> {
    id?: string
    path: Path
    index?: boolean
    element?: React.ReactNode | null
    errorElement?: React.ReactNode | null
    hasErrorBoundary?: boolean
    caseSensitive?: boolean
    ErrorBoundary?: React.ComponentType | null
    Layout?: React.ComponentType | null
    Component?: React.ComponentType | null
    lazy?: RouteObject['lazy']
    action?: RouteObject['action']
    loader?: RouteObject['loader']
    children?: VinessRouteMetadata<Path>[] | undefined
}

export interface IVinessRoute<Path extends string> extends VinessRouteMetadata<Path> {
    /**
     *
     * @param option
     * @returns
     */
    navigate: (params: { [key in PathParam<Path>]: string | null }, option?: NavigateOptions) => void

    /**
     *
     * @param params
     * @returns
     */
    generatePath: (params: { [key in PathParam<Path>]: string | null }) => string

    /**
     *
     * @returns
     */
    getParams: () => { [key in PathParam<Path>]: string | null }

    isMatched(): boolean
}
