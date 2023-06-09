import React from 'react'
import './perguntas.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from 'components/modal';
import AddIcon from '@mui/icons-material/Add';



const Perguntas = () => {
    const [openModal, setOpenModal] = React.useState(false);

    return (

        <div className='box'>
            <div className='ibox-content centralized' style={{ width: '1000px', height: '100px', borderRadius: '40px', }}>
                <div style={{ width: '1033px', display: 'grid', justifyItems: 'center' }}>
                    <h2 style={{ color: '#000000' }}>Perguntas</h2>
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
                                onClick={() => setOpenModal(true)}
                                variant="outlined"
                                color='nightRide'
                                sx={{ width: '5%' }} >
                                <AddIcon/>
                            </Button>
                            <Modal isOpen={openModal} setOpen={setOpenModal} title={'Cadastrar Pergunta'} isCadastro={true}>
                                <TextField
                                    color='nightRide'
                                    sx={{ width: '50%' }}
                                    label='Eixo'
                                />
                                <TextField
                                    color='nightRide'
                                    sx={{ width: '50%' }}
                                    label='Tipo de Resposta'
                                />
                                <TextField
                                    color='nightRide'
                                    sx={{ width: '100%' }}
                                    label="Descrição"
                                    multiline
                                    rows={15}
                                    defaultValue=""
                                />
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
                                <th>Eixo</th>
                                <th>Descrição</th>
                                <th>Editar</th>
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
