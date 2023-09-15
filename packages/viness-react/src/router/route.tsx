import { ReactNode } from 'react'
import {
    generatePath as innerGeneratePath,
    IndexRouteObject,
    LazyRouteFunction,
    LoaderFunction,
    NonIndexRouteObject,
    matchPath
} from 'react-router-dom'
import { NavigateOptions } from './types'
import { IVinessRoute, PathParam, IVinessRouteObject } from './route.protocol'
import { ContaienrUtil } from '../app/container'
import { IVinessRouter } from './router.protocol'

/**
 * Route
 */
export class VinessRoute<Path extends string> implements IVinessRoute<Path> {
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
    children?: IVinessRoute<Path>[] | undefined

    constructor(params: IVinessRouteObject<Path>) {
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
        } = params

        this.id = id
        this.path = path
        this.index = index
        this.element = element
        this.errorElement = errorElement
        this.Component = Component
        this.ErrorBoundary = ErrorBoundary
        this.hasErrorBoundary = hasErrorBoundary
        this.caseSensitive = caseSensitive
        this.children = children
        this.lazy = lazy
        this.loader = loader
    }

    navigate(params: { [key in PathParam<Path>]: string | null }, option?: NavigateOptions) {
        const router = ContaienrUtil.get(IVinessRouter)
        const toPath = this.generatePath(params)
        router.navigate(toPath, option)
    }

    getParams() {
        const router = ContaienrUtil.get(IVinessRouter)
        return router.getParams<Path>()
    }

    generatePath(params?: { [key in PathParam<Path>]: string | null }) {
        const toPath = innerGeneratePath(this.path || '', params || ({} as any))
        return toPath
    }

    isMatched() {
        const router = ContaienrUtil.get(IVinessRouter)
        const match = router.state.matches[router.state.matches.length - 1]
        console.log(match)
        return match.pathname === this.path
    }
}
