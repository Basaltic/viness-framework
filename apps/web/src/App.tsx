import './App.css'
import { VinessApp, AppProvider } from '@viness/core'

const ErrorFallbackComponent = () => <div>error</div>
const SuspenseFallbackComponent = () => <div></div>

function AppEntry() {
    const app = new VinessApp()

    return (
        <AppProvider
            app={app}
            SuspenseFallbackComponent={SuspenseFallbackComponent}
            ErrorFallbackComponent={ErrorFallbackComponent}
        ></AppProvider>
    )
}

export default AppEntry
