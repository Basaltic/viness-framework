import './index.css'

import { createRoot } from 'react-dom/client'
import { createApp } from '@viness/react'

import { appModule } from './app.module'

export const app = createApp(appModule)

const ErrorFallbackComponent = () => <div>error</div>
const SuspenseFallbackComponent = () => <div></div>

const container = document.getElementById('root')
container &&
    createRoot(container).render(
        app.render({ ErrorFallbackComponent: ErrorFallbackComponent, SuspenseFallbackComponent: SuspenseFallbackComponent })
    )
