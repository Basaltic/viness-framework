import './index.css'

import { createApp } from '@viness/react'

import { appModule } from './app.module'

export const app = createApp(appModule)

const ErrorFallbackComponent = () => <div>error</div>
const SuspenseFallbackComponent = () => <div></div>

app.render('root', { ErrorFallbackComponent: ErrorFallbackComponent, SuspenseFallbackComponent: SuspenseFallbackComponent })
