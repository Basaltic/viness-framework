import { CounterStoreIdentifier } from '../store/counter.store'

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

    const store = CounterStoreIdentifier.useResolve()
    const selectedId = store.useState((s) => s.selectedIds[id])
    const isSelected = 1 === selectedId

    const handleSelect = () => store.select(id)
    const handledeselect = () => store.deselect(id)

    return (
        <div>
            <div>
                id: {id}, selected: {String(isSelected)}
            </div>
            <button onClick={handleSelect}>select</button>
            <button onClick={handledeselect}>deselect</button>
        </div>
    )
}
