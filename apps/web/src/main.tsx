import './index.css'

import { AppFactory } from '@viness/react'
import { appModule } from './app.module'

AppFactory.create(appModule).render('root', {})
