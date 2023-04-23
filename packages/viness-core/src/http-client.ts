import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { createDecorator } from './container'

/**
 * Promise with cancel
 */
export interface IServicePromise<T = any> extends Promise<T> {
    /**
     * cancel the request
     */
    cancel: () => void
}

export const IHttpClient = createDecorator<IHttpClient>('IHttpClient')

export interface IHttpClient {}

/**
 * Http Client based in axios
 */
export class HttpClient {
    private instance: AxiosInstance

    constructor(config?: AxiosRequestConfig) {
        this.instance = axios.create(config)
    }

    /**
     * Get Request
     *
     * @param url
     * @param config
     */
    protected get<P = any, T = any>(url: string, config?: AxiosRequestConfig) {
        return (params?: P) => {
            const source = axios.CancelToken.source()

            if (config) {
                config.cancelToken = source.token
            } else {
                config = { cancelToken: source.token }
            }

            config.params = params

            const promise = this.instance.get(url, config) as any
            promise.cancel = () => source.cancel()

            return promise as IServicePromise<T>
        }
    }

    /**
     * Post
     *
     * @param url
     * @param data
     * @param config
     */
    protected post<P = any, T = any>(url: string, config?: AxiosRequestConfig) {
        return (data?: P) => {
            const source = axios.CancelToken.source()
            if (config) {
                config.cancelToken = source.token
            } else {
                config = { cancelToken: source.token }
            }

            const promise = this.instance.post(url, data, config) as any
            promise.cancel = () => source.cancel()

            return promise as IServicePromise<T>
        }
    }

    /**
     * Patch
     *
     * @param url
     * @param data
     * @param config
     */
    protected patch<P = any, T = any>(url: string, config?: AxiosRequestConfig) {
        return (data?: P) => {
            const source = axios.CancelToken.source()
            if (config) {
                config.cancelToken = source.token
            } else {
                config = { cancelToken: source.token }
            }

            const promise = this.instance.patch(url, data, config) as any
            promise.cancel = () => source.cancel()

            return promise as IServicePromise<T>
        }
    }

    /**
     * Delete
     *
     * @param url
     * @param data
     * @param config
     */
    protected delete<P = any, T = any>(url: string, config?: AxiosRequestConfig) {
        return (params?: P) => {
            const source = axios.CancelToken.source()
            if (config) {
                config.cancelToken = source.token
            } else {
                config = { cancelToken: source.token }
            }

            config.params = params

            const promise = this.instance.delete(url, config) as any
            promise.cancel = () => source.cancel()

            return promise as IServicePromise<T>
        }
    }

    /**
     * Head
     *
     * @param url
     * @param data
     * @param config
     */
    protected head<P = any, T = any>(url: string, config?: AxiosRequestConfig) {
        return (params?: P) => {
            const source = axios.CancelToken.source()
            if (config) {
                config.cancelToken = source.token
            } else {
                config = { cancelToken: source.token }
            }

            config.params = params

            const promise = this.instance.head(url, config) as any
            promise.cancel = () => source.cancel()

            return promise as IServicePromise<T>
        }
    }
}
