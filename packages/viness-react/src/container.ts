import { Container } from '@viness/di'

export const storeContainer = new Container()
export const servicesContainer = storeContainer.createChild()
export const effectsContainer = servicesContainer.createChild()