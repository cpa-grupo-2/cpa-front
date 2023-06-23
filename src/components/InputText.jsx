import React from 'react'
import { TextField, Select, styled } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';


export const InputText = styled(TextField, Select, InputLabel)(({ theme }) => ({
    margin: '0px',
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            bordercolor: '#000000'
        }


    }


}));


