import { ComponentType, ReactNode } from 'react'
import { RouteObject, generatePath, matchPath, NavigateFunction, useParams } from 'react-router-dom'

type IRoute = Omit<RouteObject, 'children'>

export function Layout() {
    return
}

/**
 * 路由定义类
 */
export class SuperRoute<
    Params extends Record<string, string | number | boolean> = {},
    Queries extends Record<string, string | number | boolean> = {}
> {
    id?: string
    path: string
    component: any
    auth?: boolean = false
    layout?: boolean

    constructor(
        params: { id?: string; path: string; component: any; layout?: boolean },
        private navigate: NavigateFunction
    ) {
        const { id, path, component, layout } = params

        this.id = id

        this.path = path
        this.layout = layout
        this.component = component
    }

    /**
     * 检测输入的本路由是否匹配输入路径
     *
     * @param path
     */
    match(path: string): boolean {
        const isMatch = Boolean(matchPath({ path: this.path }, path))
        return isMatch
    }

    /**
     * 跳转并把记录入栈
     *
     * @param config
     */
    go(config: { params?: Params; queries?: Queries; state?: any } = {}) {
        const { params = {}, queries } = config

        const pathname = generatePath(this.path, params)

        let search = ''
        if (queries) {
            const qs = toQueryString(queries)
            search = `?${qs}`
        }

        this.navigate({ pathname, search })
    }

    /**
     * 跳转并替换当前最上层堆栈
     *
     * @param config
     */
    replace(config: { params?: Params; queries?: Queries; state?: any } = {}) {
        const { params = {}, queries } = config

        const pathname = generatePath(this.path, params)

        let search = ''
        if (queries) {
            const qs = toQueryString(queries)
            search = `?${qs}`
        }

        this.navigate({ pathname, search }, { replace: true })
    }
}

/**
 * 把对象转换为url中的请求参数
 *
 * @param obj 参数对象
 * @returns {string} 格式化的请求参数字符串
 */
function toQueryString(obj: Record<string, string | number | boolean>) {
    const str: string[] = []
    Object.keys(obj).forEach((p) => {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    })

    return str.join('&')
}

export function useQueries() {}
