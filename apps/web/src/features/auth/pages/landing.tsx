import { useResolve, useNavigate } from '@viness/react'

export function LandingPage() {
    const navigate = useNavigate()

    const toPage = () => {
        navigate('/dashboard')
    }

    return (
        <div>
            LandingPage
            <button onClick={toPage}>test</button>
        </div>
    )
}
