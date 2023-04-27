import { useNavigate } from '@viness/react'

export default function LandingPage() {
    const navigate = useNavigate()

    const toPage = () => {
        navigate('/dashboard/page1')
    }

    return (
        <div>
            LandingPage
            <button onClick={toPage}>test</button>
        </div>
    )
}
