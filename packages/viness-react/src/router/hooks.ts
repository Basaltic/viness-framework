import { useAppContext } from '../app/app-react-context';
import { useResolve } from '../hooks';
import { IVinessRoute } from './route.protocol';
import { IVinessRouter } from './router.protocol';

export function useRouter() {
    const app = useAppContext();
    const router = app.resolve(IVinessRouter);
    return router;
}

export function useRoute<Path extends string>(id: any) {
    return useResolve(id) as IVinessRoute<Path>;
}
