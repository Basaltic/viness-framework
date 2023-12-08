import { Injectable, Inject } from '@viness/core';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

export interface HttpRequestConfig<D = any> extends AxiosRequestConfig<D> {}

export interface HttpResponse<T = any, D = any> extends AxiosResponse<T, D> {}

/**
 * Promise can be canceled
 */
export interface ICancelablePromise<T, Response extends HttpResponse<T>> extends Promise<Response> {
    /**
     * cancel the request
     */
    cancel: () => void;
}

export interface IHttpClient<Response extends HttpResponse = HttpResponse> {
    /**
     * Get Request
     *
     * @param url
     * @param config
     */
    get<T = any>(url: string, config?: HttpRequestConfig): ICancelablePromise<T, Response>;

    /**
     * Post
     *
     * @param url
     * @param data
     * @param config
     */
    post<T = any>(url: string, config?: HttpRequestConfig): ICancelablePromise<T, Response>;

    /**
     * Patch
     *
     * @param url
     * @param data
     * @param config
     */
    patch<T = any>(url: string, config?: HttpRequestConfig): ICancelablePromise<T, Response>;

    /**
     * Delete
     *
     * @param url
     * @param data
     * @param config
     */
    delete<T = any>(url: string, config: HttpRequestConfig): ICancelablePromise<T, Response>;

    /**
     * Head
     *
     * @param url
     * @param data
     * @param config
     */
    head<T = any>(url: string, config?: HttpRequestConfig): ICancelablePromise<T, Response>;

    /**
     * Options
     *
     * @param url
     * @param data
     * @param config
     */
    options<T = any>(url: string, config?: HttpRequestConfig): ICancelablePromise<T, Response>;
}

export const IHttpClient = Inject('IHttpClient');

/**
 * Http Client based in axios
 */
export class HttpClient<Response extends HttpResponse = HttpResponse> implements IHttpClient<Response> {
    protected instance: AxiosInstance;

    constructor(config?: HttpRequestConfig) {
        this.instance = axios.create(config);
    }

    /**
     * Get Request
     *
     * @param url
     * @param config
     */
    get<T = any>(url: string, config: HttpRequestConfig = {}) {
        config.method = 'GET';
        return this.request<T>(url, config);
    }

    /**
     * Post
     *
     * @param url
     * @param config
     */
    post<T = any>(url: string, config: HttpRequestConfig = {}) {
        config.method = 'POST';
        return this.request<T>(url, config);
    }

    /**
     * Patch
     *
     * @param url
     * @param config
     */
    patch<T = any>(url: string, config: AxiosRequestConfig = {}) {
        config.method = 'PATCH';
        return this.request<T>(url, config);
    }

    /**
     * Delete
     *
     * @param url
     * @param config
     */
    delete<T = any>(url: string, config: HttpRequestConfig = {}) {
        config.method = 'DELETE';
        return this.request<T>(url, config);
    }

    /**
     * Head
     *
     * @param url
     * @param config
     */
    head<T = any>(url: string, config: HttpRequestConfig = {}) {
        config.method = 'HEAD';
        return this.request<T>(url, config);
    }

    /**
     * Options
     *
     * @param url
     * @param config
     */
    options<T = any>(url: string, config: HttpRequestConfig = {}) {
        config.method = 'OPTIONS';
        return this.request<T>(url, config);
    }

    protected request<T = any>(url: string, config: HttpRequestConfig = {}) {
        const source = axios.CancelToken.source();
        config.cancelToken = source.token;

        const promise = this.instance(url, config) as ICancelablePromise<T, Response>;
        promise.cancel = () => source.cancel();

        return promise;
    }
}
