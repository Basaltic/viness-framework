import { RouteObject, NavigateOptions } from 'react-router-dom'
import { VinessInjectionToken } from '../token'

export declare type _PathParam<Path extends string> = Path extends `${infer L}/${infer R}`
    ? _PathParam<L> | _PathParam<R>
    : Path extends `:${infer Param}`
    ? Param extends `${infer Optional}?`
        ? Optional
        : Param
    : never
/**
 * Examples:
 * "/a/b/*" -> "*"
 * ":a" -> "a"
 * "/a/:b" -> "b"
 * "/a/blahblahblah:b" -> "b"
 * "/:a/:b" -> "a" | "b"
 * "/:a/b/:c/*" -> "a" | "c" | "*"
 */
export declare type PathParam<Path extends string> = Path extends '*' | '/*'
    ? '*'
    : Path extends `${infer Rest}/*`
    ? '*' | _PathParam<Rest>
    : _PathParam<Path>

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
    Component?: React.ComponentType | null
    lazy?: RouteObject['lazy']
    action?: RouteObject['action']
    loader?: RouteObject['loader']
}

export interface IVinessRouteObject<Path extends string> {
    id?: string
    path: Path
    index?: boolean
    element?: React.ReactNode | null
    errorElement?: React.ReactNode | null
    hasErrorBoundary?: boolean
    caseSensitive?: boolean
    ErrorBoundary?: React.ComponentType | null
    Component?: React.ComponentType | null
    lazy?: RouteObject['lazy']
    loader?: RouteObject['loader']
    action?: RouteObject['action']
    children?: IVinessRoute<Path>[]
}

export interface IVinessRoute<Path extends string> extends IVinessRouteObject<Path> {
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
