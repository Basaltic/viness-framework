import { ReactNode } from 'react'
import { IInstantiationService, ServiceIdentifier } from '@viness/di'
import { RouteObject, generatePath, matchPath, useParams } from 'react-router-dom'
import { IVinessRouter, NavOption, VinessRouter } from './router'
import { joinPath } from './utils'

export interface VinessRouteObject extends Omit<RouteObject, 'children'> {}

/**
 * Route
 */
export class VinessRoute<
    Params extends Record<string, string | number | boolean> = {},
    Queries extends Record<string, string | string[]> = {}
> implements VinessRouteObject
{
    id?: string
    path: string
    element: ReactNode
    errorElement?: React.ReactNode | null
    Component?: React.ComponentType | null
    ErrorBoundary?: React.ComponentType | null
    hasErrorBoundary?: boolean
    caseSensitive?: boolean

    identifier: ServiceIdentifier<VinessRoute>
    instantiantionService: IInstantiationService

    constructor(
        params: VinessRouteObject,
        identifier: ServiceIdentifier<VinessRoute>,
        instantiantionService: IInstantiationService
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
        this.instantiantionService = instantiantionService
    }

    /**
     * Go tho this route path
     *
     * @param option
     */
    go(config?: { params?: Params; queries?: Queries }) {
        const router = this.instantiantionService.invokeFunction((a) => a.get(IVinessRouter)) as VinessRouter
        const path = this.generatePath(config)
        return router.go(path)
    }

    /**
     * Push this route path to the history stack with state
     */
    push(config?: { params?: Params; queries?: Queries }, options?: NavOption) {
        const router = this.instantiantionService.invokeFunction((a) => a.get(IVinessRouter)) as VinessRouter
        const path = this.generatePath(config)
        return router.push(path, options)
    }

    /**
     * Replace to this route path
     */
    replace(config?: { params?: Params; queries?: Queries }, options?: NavOption) {
        const router = this.instantiantionService.invokeFunction((a) => a.get(IVinessRouter)) as VinessRouter
        const path = this.generatePath(config)
        return router.replace(path, options)
    }

    /**
     * Get tha path string
     *
     * @param option
     * @returns
     */
    generatePath(option?: { params?: Params; queries?: Queries }): string {
        const { params = {}, queries } = option || {}

        const fullPath = this.getFullPath()
        const path = generatePath(fullPath, params)

        if (queries) {
            const searchParams = new URLSearchParams()
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

    /**
     * Get the full path recurse to the parent
     */
    getFullPath(): string {
        const router = this.instantiantionService.invokeFunction((a) => a.get(IVinessRouter)) as VinessRouter
        const pathList = [this.path]
        let parentRoute = router.getParentRoute(this.identifier)
        while (parentRoute) {
            pathList.unshift(parentRoute.path)
            parentRoute = router.getParentRoute(parentRoute.identifier)
        }

        return joinPath(...pathList)
    }

    /**
     * Convert to React-Router Route Object
     */
    _toRouteObj(): RouteObject {
        return {
            id: this.id,
            path: this.path,
            element: this.element,
            errorElement: this.errorElement,
            Component: this.Component,
            ErrorBoundary: this.ErrorBoundary,
            hasErrorBoundary: this.hasErrorBoundary,
            caseSensitive: this.caseSensitive
        }
    }
}
