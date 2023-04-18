import { createContext, useContext } from 'react'
import { App } from './app'

const AppContext = createContext<App | null>(null)
export const AppContextProvider = AppContext.Provider
export const useAppContext = () => {
    const app = useContext(AppContext)
    return app
}
