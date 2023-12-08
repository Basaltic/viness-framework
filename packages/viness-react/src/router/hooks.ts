import { useAppContext } from '../app/app-react-context';
import { useResolve } from '../hooks';
import { IVinessRoute } from './route.protocol';
import { VinessRouter } from './router';

export function useRouter() {
    const app = useAppContext();
    const router = app.container.resolve(VinessRouter);
    return router;
}

export function useRoute<Path extends string>(id: any) {
    return useResolve(id) as IVinessRoute<Path>;
}
