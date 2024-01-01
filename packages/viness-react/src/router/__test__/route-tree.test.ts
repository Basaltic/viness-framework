import { toRouteObjects } from '../route-tree';
import { createRouteProvider } from '../route.factory';

describe('route tree', () => {
    it('[Method] toRouteObjects', () => {
        const root = createRouteProvider('/');
        const landing = createRouteProvider('landing');
        const project = createRouteProvider('/project');
        const projectInfo = createRouteProvider('info', { parent: project });

        const objects = toRouteObjects();

        const routeObjectStr = JSON.stringify(objects);

        expect(routeObjectStr).toBe(
            '[{"path":"/","children":[]},{"path":"/landing","children":[]},{"path":"/project","children":[{"path":"/project/info","children":[]}]}]'
        );
    });
});
