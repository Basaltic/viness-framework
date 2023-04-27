import { createContext, useContext } from 'react'
import { VinessApp } from '../app'

const AppContext = createContext<VinessApp | null>(null)
export const AppContextProvider = AppContext.Provider

/**
 * Get app instance from context
 */
export const useAppContext = () => {
    const app = useContext(AppContext)
    return app as VinessApp
}
