import { useRoute } from '@viness/react'
import { useCounterStore } from '../store/counter-store.protocol'
import { DashboardPage2Route } from '../../../routes/routes.protocol'

const ids = ['1', '2', '3', '4', '5', '6']

export function DashboardPage2() {
    return (
        <div>
            {ids.map((id) => (
                <Item key={id} id={id} />
            ))}
        </div>
    )
}

function Item(props: { id: string }) {
    const { id } = props

    const route = useRoute(DashboardPage2Route)

    route.getParams()

    const store = useCounterStore()
    const selectedId = store.useState((s) => s.selectedIds[id])
    const isSelected = 1 === selectedId

    // const handleSelect = () => store.select(id)
    // const handledeselect = () => store.deselect(id)

    return (
        <div>
            <div>
                id: {id}, selected: {String(isSelected)}
            </div>
            {/* <button onClick={handleSelect}>select</button>
            <button onClick={handledeselect}>deselect</button> */}
        </div>
    )
}
