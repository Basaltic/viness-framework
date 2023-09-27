import { ReactNode } from 'react'
import {
    generatePath as innerGeneratePath,
    IndexRouteObject,
    LazyRouteFunction,
    LoaderFunction,
    NonIndexRouteObject
} from 'react-router-dom'
import { NavigateOptions, PathParam } from './types'
import { IVinessRoute, VinessRouteMetadata } from './route.protocol'
import { ContaienrUtil } from '../container'
import { IVinessRouter } from './router.protocol'

/**
 * Route
 */
export class VinessRoute<Path extends string> implements IVinessRoute<Path> {
    private static VROUTE = true

    id?: string
    path: Path
    element: ReactNode
    errorElement?: React.ReactNode | null
    Component?: React.ComponentType | null
    ErrorBoundary?: React.ComponentType | null
    hasErrorBoundary?: boolean
    caseSensitive?: boolean
    index?: boolean | undefined
    lazy?: LazyRouteFunction<IndexRouteObject> | LazyRouteFunction<NonIndexRouteObject> | undefined
    loader?: LoaderFunction | undefined
    children?: VinessRouteMetadata<Path>[] | undefined

    constructor(metadata: VinessRouteMetadata<Path>) {
        const {
            id,
            path,
            index,
            element,
            errorElement,
            Component,
            ErrorBoundary,
            hasErrorBoundary,
            caseSensitive,
            children,
            lazy,
            loader
        } = metadata

        this.id = id
        this.path = path
        this.index = index
        this.element = element
        this.errorElement = errorElement
        this.Component = Component
        this.ErrorBoundary = ErrorBoundary
        this.hasErrorBoundary = hasErrorBoundary
        this.caseSensitive = caseSensitive
        this.lazy = lazy
        this.loader = loader
        this.children = children
    }

    navigate(params: { [key in PathParam<Path>]: string | null }, option?: NavigateOptions) {
        const router = ContaienrUtil.resolve(IVinessRouter)
        const toPath = this.generatePath(params)
        router.navigate(toPath, option)
    }

    getParams() {
        const router = ContaienrUtil.resolve(IVinessRouter)
        return router.getParams<Path>()
    }

    generatePath(params?: { [key in PathParam<Path>]: string | null }) {
        const toPath = innerGeneratePath(this.path || '', params || ({} as any))
        return toPath
    }

    isMatched() {
        const router = ContaienrUtil.resolve(IVinessRouter)
        const match = router.state.matches[router.state.matches.length - 1]
        console.log(match)
        return match.pathname === this.path
    }
}
