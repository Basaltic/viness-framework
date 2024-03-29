import { createContext, useContext } from 'react';
import { VinessApp } from '@viness/core';

const AppContext = createContext<VinessApp | null>(null);
export const AppContextProvider = AppContext.Provider;
export const useAppContext = () => {
    const app = useContext(AppContext);
    return app as VinessApp;
};
