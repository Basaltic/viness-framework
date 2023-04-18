import { Container } from './container'

export interface AppConfig {}

export class App {
    private mainContainer: Container

    constructor(config?: AppConfig) {
        if (config) {
        }
        this.mainContainer = new Container()
    }

    get container() {
        return this.mainContainer
    }
}
