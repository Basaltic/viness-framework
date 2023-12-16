import { Container } from 'inversify';

export const globalContainer = new Container({ defaultScope: 'Singleton', skipBaseClassChecks: true });
