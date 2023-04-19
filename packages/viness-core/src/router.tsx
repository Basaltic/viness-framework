import { ReactNode } from 'react'
import { RouteObject, generatePath, matchPath, useNavigate, useLocation, useParams } from 'react-router-dom'

type IRouteObject = Pick<RouteObject, 'id' | 'path' | 'element'>

export { useNavigate, useLocation, useParams }

export interface IRoute {}

/**
 *
 */
export class SuperRoute<
    Params extends Record<string, string | number | boolean> = {},
    Queries extends Record<string, string | string[]> = {}
> {
    id?: string
    path: string
    element: ReactNode
    children?: SuperRoute[]

    constructor(params: { id?: string; path: string; element: any; children?: SuperRoute[] }) {
        const { id, path, element, children } = params

        this.id = id
        this.path = path
        this.element = element
        this.children = children
    }

    /**
     * Get tha path string
     *
     * @param option
     * @returns
     */
    toString(option?: { params?: Params; queries?: Queries }) {
        const { params = {}, queries } = option || {}

        const path = generatePath(this.path, params)

        if (queries) {
            const searchParams = new URLSearchParams()
            return `${path}?${searchParams.toString()}`
        }

        return path
    }

    /**
     *
     *
     */
    isMatch(path: string): boolean {
        const isMatch = Boolean(matchPath({ path: this.path }, path))
        return isMatch
    }

    useParams() {
        return useParams() as Params
    }
}

/**
 * Create A Route Object
 *
 * @param routeObject
 * @returns
 */
export function createRoute<
    Params extends Record<string, string | number | boolean> = {},
    Queries extends Record<string, string | number | boolean> = {}
>(routeObject: IRouteObject) {
    const { id, path = '', element } = routeObject
    return new SuperRoute({ id, path, element })
}
