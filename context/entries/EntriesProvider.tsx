import { FC, ReactNode, useReducer } from "react"
import { EntriesContext, entriesReducer } from "./"
import { Entry } from "@/interfaces"
import { v4 as uuidv4 } from 'uuid'

export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: lorem ipsum dolor duis elit sunt qui dolor laborum veniam ea laboris quis consequat.',
            status: 'pending',
            createAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'En Progreso: lorem ipsum dolor duis elit sunt qui dolor laborum veniam ea laboris quis consequat2.',
            status: 'in-progress',
            createAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'Finalizado: lorem ipsum dolor duis elit sunt qui dolor laborum veniam ea laboris quis consequat3.',
            status: 'finished',
            createAt: Date.now() - 100000
        }
    ]
}

interface Props {
    children: ReactNode
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = ( description: string ) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createAt: Date.now(),
            status: 'pending',
        }
        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })
    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] - Update-Entry', payload: entry })
    }

    return (
        <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
            { children }
        </EntriesContext.Provider>
    )
}
