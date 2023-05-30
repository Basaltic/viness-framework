import './index.css'

import { createRoot } from 'react-dom/client'
import { VinessReactApp } from '@viness/react'

import { routes } from './routes'

const ErrorFallbackComponent = () => <div>error</div>
const SuspenseFallbackComponent = () => <div></div>

const container = document.getElementById('root')
container &&
    createRoot(container).render(
        <VinessReactApp
            router={{ type: 'browser', routes: routes }}
            ErrorFallbackComponent={ErrorFallbackComponent}
            SuspenseFallbackComponent={SuspenseFallbackComponent}
        />
    )
