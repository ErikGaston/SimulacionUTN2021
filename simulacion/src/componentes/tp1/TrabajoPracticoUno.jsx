import React from 'react';
//material-ui
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { dejarDeListar, generar20Numeros, listarDesdeHasta, listarHastaFinal } from './logicaFunciones';

const TrabajoPracticoUno = () => {

    const [semilla, setSemilla] = React.useState(1)
    const [constMultiplicativa, setConstMultiplicativa] = React.useState(1)
    const [constAditiva, setConstAditiva] = React.useState(1)
    const [desde, setDesde] = React.useState(1)
    const [hasta, setHasta] = React.useState(100)


    const handleChange = () => e => {
        const { name, value } = e.target
        if (name === 'semilla') {
            setSemilla(value)
        }
        if (name === 'constMultiplicativa') {
            setConstMultiplicativa(value)
        }
        if (name === 'constAditiva') {
            setConstAditiva(value)
        }
    }

    return (
        <div >
            <Grid style={{ paddingTop: '20px' }} container direction={'row'} justifyContent={'center'} alignItems={'center'} alignContent={'center'} spacing={0}>
                <Grid item xs={4}>
                    <TextField
                        name={'semilla'}
                        value={semilla}
                        style={{ width: '300px' }}
                        label="Semilla"
                        type="number"
                        variant="outlined"
                        placeholder={'Ingrese la semilla'}
                        onChange={handleChange()}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        name={'constMultiplicativa'}
                        value={constMultiplicativa}
                        style={{ width: '300px' }}
                        label="Constante multiplicativa"
                        type="number"
                        defaultValue={1}
                        variant="outlined"
                        placeholder={'Ingrese la constante multiplicativa'}
                        onChange={handleChange()}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}

                    />
                </Grid>
                <Grid item>
                    <TextField
                        name={'constAditiva'}
                        value={constAditiva}
                        style={{ width: '300px' }}
                        label="Constante aditiva"
                        type="number"
                        defaultValue={1}
                        variant="outlined"
                        placeholder={'Ingrese la constante aditiva'}
                        onChange={handleChange()}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                    />
                </Grid>
                <Grid item style={{ marginTop: '40px' }}>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick={() => dejarDeListar()}>Dejar de Listar</Button>
                        <Button onClick={() => generar20Numeros(semilla, constMultiplicativa, constAditiva)}>Generar 20 numeros</Button>
                        <Button onClick={() => listarHastaFinal(semilla, constMultiplicativa, constAditiva)}>Listar hasta el final</Button>
                        <Button onClick={() => listarDesdeHasta(desde, hasta)}>Listar desde/hasta</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>

        </div>
    )
}

export default TrabajoPracticoUno;