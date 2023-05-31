import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { createDecorator } from '../decorator'

export interface HttpResponse<T = any, D = any> extends AxiosResponse<T, D> {}

/**
 * Promise can be canceled
 */
export interface ICancelablePromise<T, Response extends HttpResponse<T>> extends Promise<Response> {
    /**
     * cancel the request
     */
    cancel: () => void
}

export interface IHttpClient<Response extends HttpResponse = HttpResponse> {
    /**
     * Get Request
     *
     * @param url
     * @param config
     */
    get<P = any, T = any>(url: string, config?: AxiosRequestConfig): (params?: P) => ICancelablePromise<T, Response>

    /**
     * Post
     *
     * @param url
     * @param data
     * @param config
     */
    post<D = any, T = any>(url: string, config?: AxiosRequestConfig): (data?: D) => ICancelablePromise<T, Response>

    /**
     * Patch
     *
     * @param url
     * @param data
     * @param config
     */
    patch<D = any, T = any>(url: string, config?: AxiosRequestConfig): (data?: D) => ICancelablePromise<T, Response>

    /**
     * Delete
     *
     * @param url
     * @param data
     * @param config
     */
    delete<P = any, T = any>(url: string, config: AxiosRequestConfig): (params?: P) => ICancelablePromise<T, Response>

    /**
     * Head
     *
     * @param url
     * @param data
     * @param config
     */
    head<P = any, T = any>(url: string, config?: AxiosRequestConfig): (params?: P) => ICancelablePromise<T, Response>

    /**
     * Options
     *
     * @param url
     * @param data
     * @param config
     */
    options<P = any, T = any>(url: string, config?: AxiosRequestConfig): (params?: P) => ICancelablePromise<T, Response>
}

export const IHttpClient = createDecorator<IHttpClient>('IHttpClient')

/**
 * Http Client based in axios
 */
export class HttpClient<Response extends HttpResponse = HttpResponse> implements IHttpClient<Response> {
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

            return promise as ICancelablePromise<T, Response>
        }
    }

    /**
     * Post
     *
     * @param url
     * @param data
     * @param config
     */
    post<D = any, T = any>(url: string, config: AxiosRequestConfig = {}) {
        return (data?: D) => {
            const source = axios.CancelToken.source()
            config.cancelToken = source.token

            const promise = this.instance.post(url, data, config) as any
            promise.cancel = () => source.cancel()

            return promise as ICancelablePromise<T, Response>
        }
    }

    /**
     * Patch
     *
     * @param url
     * @param data
     * @param config
     */
    patch<D = any, T = any>(url: string, config: AxiosRequestConfig = {}) {
        return (data?: D) => {
            const source = axios.CancelToken.source()
            config.cancelToken = source.token

            const promise = this.instance.patch(url, data, config) as any
            promise.cancel = () => source.cancel()

            return promise as ICancelablePromise<T, Response>
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

            return promise as ICancelablePromise<T, Response>
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

            return promise as ICancelablePromise<T, Response>
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

            return promise as ICancelablePromise<T, Response>
        }
    }
}
