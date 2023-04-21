import { InstantiationService, ServiceRegistry } from '@viness/di'
import { ComponentType } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { createHashRouter } from 'react-router-dom'
import { initI18n, InitOptions } from './i18n'
import { renderApp } from './react'

export interface VinessAppConfig {
    SuspenseFallbackComponent: ComponentType
    ErrorFallbackComponent: ComponentType<FallbackProps>
    i18nConfig?: InitOptions
}

/**
 *
 */
export class VinessApp {
    readonly serviceRegistry: ServiceRegistry
    readonly instantiationService: InstantiationService

    private config?: VinessAppConfig

    constructor(config?: VinessAppConfig) {
        initI18n(config?.i18nConfig || {})

        const serviceRegistry = new ServiceRegistry()
        const instantiationService = new InstantiationService(serviceRegistry.toServiceCollection(), true)

        // TODO: Pre-registered buildin service

        this.serviceRegistry = serviceRegistry
        this.instantiationService = instantiationService

        this.config = config
    }

    get regiser() {
        return this.serviceRegistry.register.bind(this)
    }
}
