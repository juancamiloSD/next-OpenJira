import { FC, ReactNode, useEffect, useReducer } from "react"
import { useSnackbar } from 'notistack'

import { EntriesContext, entriesReducer } from "./"
import { Entry } from "@/interfaces"
// import { v4 as uuidv4 } from 'uuid'
import { entriesApi } from "@/apis"

export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

interface Props {
    children: ReactNode
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    const { enqueueSnackbar } = useSnackbar()

    const addNewEntry = async ( description: string ) => {
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createAt: Date.now(),
        //     status: 'pending',
        // }

        const { data } = await entriesApi.post<Entry>('/entries', { description })
        // dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })
        dispatch({ type: '[Entry] - Add-Entry', payload: data })

    }

    const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status } )
            dispatch({ type: '[Entry] - Update-Entry', payload: data })
            if( showSnackbar )
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            
        } catch (error) {
            console.log({ error })
        }

    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: "[Entry] - Refresh-Data", payload: data })
    }

    const deleteEntry = async({ _id }: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${ _id }`)
            dispatch({ type: '[Entry] - Delete-Entry', payload: data })
            if( showSnackbar )
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        refreshEntries()
    }, [])
    

    return (
        <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry, deleteEntry }}>
            { children }
        </EntriesContext.Provider>
    )
}
