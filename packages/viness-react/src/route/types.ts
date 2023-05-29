import { NavigateOptions, To } from 'react-router'
export { type NavigateFunction } from 'react-router-dom'

export { type To, type NavigateOptions }
export type NavOption = Pick<NavigateOptions, 'state' | 'preventScrollReset'>
