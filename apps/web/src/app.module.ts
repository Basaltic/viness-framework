import { createModule } from '@viness/core';
import { homeModule } from './home/home.module';

export const appModule = createModule({
    imports: [homeModule],
    providers: []
});
