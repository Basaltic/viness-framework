import './index.css'

import { AppFactory } from '@viness/react'
import { AppModule } from './app.module'

AppFactory.create(AppModule).render('root', {})
