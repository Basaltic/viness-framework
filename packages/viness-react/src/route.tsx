import { ReactNode } from 'react'
import { RouteObject, generatePath, matchPath, useParams, type PathMatch } from 'react-router-dom'
import { IVinessRouter, NavOption } from './router'
import { joinPath } from './utils'
import { VinessServiceIdentifier } from './identifier'

export interface VinessRouteObject extends Omit<RouteObject, 'children'> {}

export interface IVinessRoute<
    Params extends Record<string, string | number | boolean> = {},
    Queries extends Record<string, string | string[]> = {}
> {
    id?: string
    path: string
    element: ReactNode
    errorElement?: React.ReactNode | null
    Component?: React.ComponentType | null
    ErrorBoundary?: React.ComponentType | null
    hasErrorBoundary?: boolean
    caseSensitive?: boolean
    identifier: VinessServiceIdentifier<IVinessRoute>
    /**
     * Go tho this route path
     *
     * @param option
     */
    go(config?: { params?: Params; queries?: Queries }): Promise<void> | undefined

    /**
     * Push this route path to the history stack with state
     */
    push(config?: { params?: Params; queries?: Queries }, options?: NavOption): Promise<void> | undefined

    /**
     * Replace to this route path
     */
    replace(config?: { params?: Params; queries?: Queries }, options?: NavOption): Promise<void> | undefined

    /**
     * Get the full path recurse to the parent
     */
    getPath(): string

    /**
     * Get tha path string
     *
     * @param option
     * @returns
     */
    generatePath(option?: { params?: Params; queries?: Queries }): string

    /**
     *
     * @param {string} path
     * @returns
     */
    matchPath(path: string): PathMatch<string> | null
    /**
     * Check if current path is matched to this route's path
     */
    isMatch(path: string): boolean

    /**
     * React hook to get current path params in the react component
     */
    useParams(): Params
}

/**
 * Route
 */
export class VinessRoute<
    Params extends Record<string, string | number | boolean> = {},
    Queries extends Record<string, string | string[]> = {}
> implements IVinessRoute<Params, Queries>
{
    id?: string
    path: string
    element: ReactNode
    errorElement?: React.ReactNode | null
    Component?: React.ComponentType | null
    ErrorBoundary?: React.ComponentType | null
    hasErrorBoundary?: boolean
    caseSensitive?: boolean

    router: IVinessRouter
    identifier: VinessServiceIdentifier<IVinessRoute>
    parentIdentifier?: VinessServiceIdentifier<IVinessRoute>

    constructor(
        params: VinessRouteObject,
        identifier: VinessServiceIdentifier<IVinessRoute>,
        parentIdentifier: VinessServiceIdentifier<IVinessRoute>,
        router: IVinessRouter
    ) {
        const { id, path, element, errorElement, Component, ErrorBoundary, hasErrorBoundary, caseSensitive } = params

        this.id = id || identifier.toString()
        this.path = path || ''
        this.element = element
        this.errorElement = errorElement
        this.Component = Component
        this.ErrorBoundary = ErrorBoundary
        this.hasErrorBoundary = hasErrorBoundary
        this.caseSensitive = caseSensitive

        this.identifier = identifier
        this.parentIdentifier = parentIdentifier
        this.router = router
    }

    /**
     * Go tho this route path
     *
     * @param option
     */
    go(config?: { params?: Params; queries?: Queries }) {
        const router = this.router
        const path = this.generatePath(config)
        return router.go(path)
    }

    /**
     * Push this route path to the history stack with state
     */
    push(config?: { params?: Params; queries?: Queries }, options?: NavOption) {
        const router = this.router
        const path = this.generatePath(config)
        return router.push(path, options)
    }

    /**
     * Replace to this route path
     */
    replace(config?: { params?: Params; queries?: Queries }, options?: NavOption) {
        const router = this.router
        const path = this.generatePath(config)
        return router.replace(path, options)
    }

    /**
     * Get the full path recurse to the parent
     */
    getPath(): string {
        if (this.parentIdentifier) {
            const parentRoute = this.router.get(this.parentIdentifier)
            const parentPath = parentRoute.getPath()

            return joinPath(parentPath, this.path)
        } else {
            return this.path
        }
    }

    /**
     * Get tha path string
     *
     * @param option
     * @returns
     */
    generatePath(option?: { params?: Params; queries?: Queries }): string {
        const { params = {}, queries } = option || {}

        const fullPath = this.getPath()
        const path = generatePath(fullPath, params)

        if (queries) {
            const searchParams = new URLSearchParams(queries as any)
            return `${path}?${searchParams.toString()}`
        }

        return path
    }

    /**
     *
     * @param {string} path
     * @returns
     */
    matchPath(path: string) {
        return matchPath({ path: this.path }, path)
    }

    /**
     * Check if current path is matched to this route's path
     */
    isMatch(path: string): boolean {
        const isMatch = Boolean(matchPath({ path: this.path }, path))
        return isMatch
    }

    /**
     * React hook to get current path params in the react component
     */
    useParams() {
        return useParams() as Params
    }
}
