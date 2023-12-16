import { useAppContext } from '../app/app-react-context';
import { useInject } from '../hooks';
import { IVinessRoute } from './route.protocol';
import { VinessRouter } from './router';

export function useRouter() {
    const app = useAppContext();
    const router = app.container.resolve(VinessRouter);
    return router;
}

export function useRoute<Path extends string>(id: any) {
    return useInject(id) as IVinessRoute<Path>;
}
