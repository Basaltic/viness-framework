export { type NavigateFunction, type NavigateOptions, type To } from 'react-router-dom'

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

export type Search = Record<string, string | string[]>
export type Params = Record<string, string | string[] | undefined>
export type Subscription = (location: Location) => void
