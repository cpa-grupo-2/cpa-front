import React from 'react'
import './eixos.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '../../components/modal.jsx';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';



const Eixos = () => {
    const [openModal, setOpenModal] = React.useState(false);
    return (

        <div className='box'>
            <div className='ibox-content centralized' style={{ width: '1000px', height: '100px', borderRadius: '40px', }}>
                <div style={{ width: '1033px', display: 'grid', justifyItems: 'center' }}>
                    <h2 style={{ color: '#000000' }}>Eixos</h2>
                    <div className='barra_de_pesquisa' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '15px' }}>
                        <TextField
                            color='nightRide'
                            variant='outlined'
                            label='Pesquisar'
                            type='search'
                            sx={{ width: '85%' }}
                            style={{ width: '900px' }}
                        />

                        <div style={{ padding: '11px' }}>
                            <Button 
                                variant="outlined"
                                onClick={() => setOpenModal(true)}
                                color='nightRide'
                                sx={{ width: '5%' }} >
                                <AddIcon/>
                            </Button>
                            <Modal isOpen={openModal} setOpen={setOpenModal} title={'Cadastrar Eixo'} isCadastro={true}>
                                <Box
                                    gap={'15px'}
                                >
                                    <TextField
                                        color='nightRide'
                                        sx={{ width: '100%' }}
                                        label='Eixo'
                                    />
                                    <TextField
                                        color='nightRide'
                                        sx={{ width: '100%' }}
                                        label="Descrição"
                                        multiline
                                        rows={15}
                                        defaultValue=""
                                    />
                                </Box>
                            </Modal>
                        </div>

                    </div>
                </div>
            </div>
            <div className='ibox-content centralized' style={{ borderColor: '#ffffff', width: '1000px', height: '700px', borderRadius: '40px', justifyContent: 'start' }}>
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
export default Eixos;
