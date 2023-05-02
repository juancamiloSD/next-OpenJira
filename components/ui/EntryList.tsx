import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material"
import { EntryStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";
import { EntryCard } from './';
import { UIContext } from "@/context/ui";

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext)
    const { isDragging, endDragging } = useContext(UIContext)

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

    const allowDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text')
        const entry = entries.find(e=> e._id === id)!
        entry.status = status
        updateEntry( entry )
        endDragging()
    }

    return (
        <div 
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className={ isDragging ? styles.dragging : '' }
        >
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '8px 8px'}}>

                <List sx={{ opacity: isDragging ? 0.4 : 1, padding: 0, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard key={ entry._id } entry={entry}/>
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
