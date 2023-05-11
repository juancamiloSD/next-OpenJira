import { Layout } from '@/components/layouts'
import { GetServerSideProps } from 'next'
import { Card, Grid, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import React, { ChangeEvent, FC, useContext, useMemo } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Entry, EntryStatus } from '../../interfaces';
import { useState } from 'react';
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';
import { useRouter } from 'next/router';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']


interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

    const { updateEntry, deleteEntry } = useContext(EntriesContext)
    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)
    const router = useRouter();    ///// esto modificado

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue( event.target.value )
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setStatus( event.target.value as EntryStatus )
    }
    
    const onDelete = () => {    ///// esto modificado
        deleteEntry( entry, true );
        router.push('/')
    }

    const onSave = () => {
        if( inputValue.trim().length === 0 ) return

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        updateEntry( updatedEntry, true )
    }

  return (
    <Layout title={ inputValue.substring(0,20) + '...' }>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader 
                        title={`Entrada: ${inputValue}`}
                        subheader={`Creada ${ dateFunctions.getFormatDistanceToNow(entry.createAt) }`}
                    />
                    <CardContent>
                        <TextField 
                            sx={{ marginTop:2, marginBottom:1 }}
                            fullWidth
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            value={ inputValue }
                            onChange={ onInputChanged }
                            onBlur={ ()=> setTouched(true) }
                            helperText={ isNotValid && 'Ingtese un valor'}
                            error={ isNotValid }
                        />
                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row
                                value={ status }
                                onChange={ onStatusChanged }
                            >
                                {
                                    validStatus.map(option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio/> }
                                            label={  capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        {/* Radio */}
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={ <EditIcon /> }
                            variant="contained"
                            fullWidth
                            onClick={ onSave }
                            disabled={ inputValue.length <= 0 }
                        >
                            Saved
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        <IconButton 
            onClick={ onDelete }
            sx={{ 
                position: 'fixed',
                bottom: 30,
                right: 30,
                background:  'text.secondary',
            }}
        >
            <DeleteOutlineIcon />
        </IconButton>

    </Layout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string }

    const entry = await dbEntries.getEntryById(id)

    if ( !entry ){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry: entry
        }
    }
}


export default EntryPage