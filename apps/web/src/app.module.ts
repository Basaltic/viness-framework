import { Module } from '@viness/react'
import { ExampleRouterModule } from './routes/routes.module'

@Module({
    imports: [ExampleRouterModule]
})
export class AppModule {}
