import { AppProvider } from '@viness/core'
import { app } from './app'

const ErrorFallbackComponent = () => <div>error</div>
const SuspenseFallbackComponent = () => <div></div>

export function App() {
    return (
        <AppProvider
            app={app}
            SuspenseFallbackComponent={SuspenseFallbackComponent}
            ErrorFallbackComponent={ErrorFallbackComponent}
        ></AppProvider>
    )
}
