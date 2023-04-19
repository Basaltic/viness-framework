import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'

export interface IServiceResponse<T> extends AxiosResponse<T> {
    $data: T
    $error: null | {
        code: string | number
        message: string
    }
    $success: boolean
}

/**
 * 接口返回类型
 */
export interface IServicePromise<T = any> extends Promise<IServiceResponse<T>> {
    /**
     * 接口发送取消
     */
    cancel: () => void
}

/**
 * Http Client
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
