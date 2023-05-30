import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { createDecorator } from '../decorator'

/**
 * Promise can be canceled
 */
export interface ICancelablePromise<T = any> extends Promise<T> {
    /**
     * cancel the request
     */
    cancel: () => void
}

export const IHttpClient = createDecorator<IHttpClient>('IHttpClient')

export interface IHttpClient {
    /**
     * Get Request
     *
     * @param url
     * @param config
     */
    get<P = any, T = any>(url: string, config?: AxiosRequestConfig): (params?: P) => ICancelablePromise<T>

    /**
     * Post
     *
     * @param url
     * @param data
     * @param config
     */
    post<D = any, P = any, T = any>(url: string, config?: AxiosRequestConfig): (data?: D, params?: P) => ICancelablePromise<T>

    /**
     * Patch
     *
     * @param url
     * @param data
     * @param config
     */
    patch<D = any, P = any, T = any>(url: string, config?: AxiosRequestConfig): (data?: D, params?: P) => ICancelablePromise<T>

    /**
     * Delete
     *
     * @param url
     * @param data
     * @param config
     */
    delete<P = any, T = any>(url: string, config: AxiosRequestConfig): (params?: P) => ICancelablePromise<T>

    /**
     * Head
     *
     * @param url
     * @param data
     * @param config
     */
    head<P = any, T = any>(url: string, config?: AxiosRequestConfig): (params?: P) => ICancelablePromise<T>

    /**
     * Options
     *
     * @param url
     * @param data
     * @param config
     */
    options<P = any, T = any>(url: string, config?: AxiosRequestConfig): (params?: P) => ICancelablePromise<T>
}

/**
 * Http Client based in axios
 */
export class HttpClient {
    protected instance: AxiosInstance

    constructor(config?: AxiosRequestConfig) {
        this.instance = axios.create(config)
    }

    /**
     * Get Request
     *
     * @param url
     * @param config
     */
    get<P = any, T = any>(url: string, config: AxiosRequestConfig = {}) {
        return (params?: P) => {
            const source = axios.CancelToken.source()
            config.cancelToken = source.token
            config.params = params

            const promise = this.instance.get(url, config) as any
            promise.cancel = () => source.cancel()

            return promise as ICancelablePromise<T>
        }
    }

    /**
     * Post
     *
     * @param url
     * @param data
     * @param config
     */
    post<D = any, P = any, T = any>(url: string, config: AxiosRequestConfig = {}) {
        return (data?: D, params?: P) => {
            const source = axios.CancelToken.source()
            config.cancelToken = source.token
            config.params = params

            const promise = this.instance.post(url, data, config) as any
            promise.cancel = () => source.cancel()

            return promise as ICancelablePromise<T>
        }
    }

    /**
     * Patch
     *
     * @param url
     * @param data
     * @param config
     */
    patch<D = any, P = any, T = any>(url: string, config: AxiosRequestConfig = {}) {
        return (data?: D, params?: P) => {
            const source = axios.CancelToken.source()
            config.cancelToken = source.token
            config.params = params

            const promise = this.instance.patch(url, data, config) as any
            promise.cancel = () => source.cancel()

            return promise as ICancelablePromise<T>
        }
    }

    /**
     * Delete
     *
     * @param url
     * @param data
     * @param config
     */
    delete<P = any, T = any>(url: string, config: AxiosRequestConfig = {}) {
        return (params?: P) => {
            const source = axios.CancelToken.source()
            config.cancelToken = source.token
            config.params = params

            const promise = this.instance.delete(url, config) as any
            promise.cancel = () => source.cancel()

            return promise as ICancelablePromise<T>
        }
    }

    /**
     * Head
     *
     * @param url
     * @param data
     * @param config
     */
    head<P = any, T = any>(url: string, config: AxiosRequestConfig = {}) {
        return (params?: P) => {
            const source = axios.CancelToken.source()
            config.cancelToken = source.token
            config.params = params

            const promise = this.instance.head(url, config) as any
            promise.cancel = () => source.cancel()

            return promise as ICancelablePromise<T>
        }
    }

    /**
     * Options
     *
     * @param url
     * @param data
     * @param config
     */
    options<P = any, T = any>(url: string, config: AxiosRequestConfig = {}) {
        return (params?: P) => {
            const source = axios.CancelToken.source()
            config.cancelToken = source.token
            config.params = params

            const promise = this.instance.options(url, config) as any
            promise.cancel = () => source.cancel()

            return promise as ICancelablePromise<T>
        }
    }
}
