import React from 'react'
import { useFormContext, Controller, useForm } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const FormInput = ({name, label}) => {
    const { control } = useForm()
    
    return (
        <Grid item xs={12} sm={6} >
            <Controller 
                render = {({field}) => 
                <TextField 
                    {...field}        
                    label={label} required
                />}
                name={name}
                control = {control}
                defaultValue=""
            />
        </Grid>
    )
    }
    
    
export default FormInput