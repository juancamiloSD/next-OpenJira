import { Box, Button, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext)
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

    const [isAdding, setIsAdding] = useState(false)

    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const onTextChanges = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }


    const onSave = () => {
        if( inputValue.length === 0 ) return 
        addNewEntry( inputValue )
        setIsAddingEntry(false)
        setInputValue('')
        setTouched(false)
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>
            {
                isAddingEntry 
                ? (
                    <>
                        <TextField 
                            fullWidth 
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            helperText={ inputValue.length <= 0 && touched && "Ingrese un valor" }
                            error={ inputValue.length <= 0 && touched }
                            value={ inputValue }
                            onChange={ onTextChanges }
                            onBlur={ () => setTouched(true) }
                        />

                        <Box display="flex" justifyContent="space-between">
                            <Button 
                                variant="text"
                                onClick={ () => setIsAddingEntry(false) }
                            >
                                Cancelar
                            </Button>
                            <Button 
                                variant="outlined"
                                color="secondary"
                                endIcon={ <SaveIcon/> }
                                onClick={ onSave }
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                )
                : (
                    <Button
                        startIcon={ <AddIcon /> }
                        fullWidth
                        variant="outlined"
                        onClick={ () => setIsAddingEntry(true) }
                    >
                        Agregar Tarea
                    </Button>
                )
            }
            

            
        </Box>
    )
}
