import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter, VinessReactApp } from '@viness/react'

import { app } from './app'

import './app-routes'
import './app-stores'

const ErrorFallbackComponent = () => <div>error</div>
const SuspenseFallbackComponent = () => <div></div>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        {/* Other Custom Providers Wrap App */}
        <VinessReactApp
            app={app}
            SuspenseFallbackComponent={SuspenseFallbackComponent}
            ErrorFallbackComponent={ErrorFallbackComponent}
        >
            {/* Other Custom Providers Wrap Routes */}
            <AppRouter />
        </VinessReactApp>
    </React.StrictMode>
)
