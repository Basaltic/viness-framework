import { toRouteObjects } from '../route-tree';
import { createRouteToken } from '../route.factory';

describe('route tree', () => {
    it('[Method] toRouteObjects', () => {
        const root = createRouteToken('/');
        const landing = createRouteToken('landing');
        const project = createRouteToken('/project');
        const projectInfo = createRouteToken('info', { parent: project });

        const objects = toRouteObjects();

        const routeObjectStr = JSON.stringify(objects);

        expect(routeObjectStr).toBe(
            '[{"path":"/","children":[]},{"path":"/landing","children":[]},{"path":"/project","children":[{"path":"/project/info","children":[]}]}]'
        );
    });
});
