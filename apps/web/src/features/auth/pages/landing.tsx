import { useNavigate } from '@viness/core'
import React from 'react'

export default function LandingPage() {
    const navigate = useNavigate()

    const toPage = () => {
        navigate('/dashboard/test')
    }

    return (
        <div>
            LandingPage
            <button onClick={toPage}>test</button>
        </div>
    )
}
