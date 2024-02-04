import { createModule } from '@viness/core';
import { homeStoreProvider } from './store/home-store';
import { HomeEffects, homeEffectsToken } from './store/home-effects';

export const homeModule = createModule({
    providers: [
        homeStoreProvider,
        {
            token: homeEffectsToken,
            useClass: HomeEffects
        }
    ]
});
