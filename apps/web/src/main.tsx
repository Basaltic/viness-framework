import './index.css'

import { createApp } from '@viness/react'
import { appModule } from './app.module'

const app = createApp(appModule)
app.render('root', {})
