import React from 'react'
import './perguntas.css'
import TextField from '@mui/material/TextField';


const Perguntas = () => {
    return (

        <div className='box'>
            <div className='ibox-content centralized' style={{ width: '1000px', height: '100px', borderRadius: '40px', }}>
                <div className='divider-title' style={{ width: '1033px', display: 'grid', justifyItems: 'center' }}>
                    <h2 style={{ color: '#000000' }}>Perguntas</h2>
                    <TextField
                        color='nightRide'
                        variant='outlined'
                        label='Pesquisar'
                        type='search'
                        style={{ width: '900px' }}
                    />
                </div>
            </div>
            <div className='ibox-content centralizeddois' style={{ width: '1000px', height: '700px', borderRadius: '40px', }}>
                <div className='divider' style={{ width: '1033px', display: 'grid' }}>
                    <table>
                        <thead>
                            <tr>
                                <th className='esqu'>Eixo</th>
                                <th className='meio'>Descrição</th>
                                <th className='dire'>Editar</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>


                </div>
            </div>
        </div>

    )
}
export default Perguntas;
