import React from 'react'
import './eixos.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';



const Eixos = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (

        <div className='box'>
            <div className='ibox-content centralized' style={{ width: '1000px', height: '100px', borderRadius: '40px', }}>
                <div style={{ width: '1033px', display: 'grid', justifyItems: 'center' }}>
                    <h2 style={{ color: '#000000' }}>Eixos</h2>
                    <div className='barra_de_pesquisa' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <TextField
                            color='nightRide'
                            variant='outlined'
                            label='Pesquisar'
                            type='search'
                            sx={{ width: '85%' }}
                            style={{ width: '900px' }}
                        />

                        <div style={{ padding: '11px' }}>
                            <Button variant="outlined"
                                color='nightRide'
                                sx={{ width: '5%' }} >
                                <AddIcon onClick={handleClickOpen}> </AddIcon>
                            </Button>
                            <div sx={{ width: '700px' }}>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Cadastrar Eixo</DialogTitle>
                                    <DialogContent>

                                        <List>
                                            <ListItem>
                                                <TextField
                                                    color='nightRide'
                                                    sx={{ width: '100%' }}
                                                    label='Eixo'
                                                />
                                            </ListItem>

                                            <Divider />
                                            <ListItem>
                                                <TextField
                                                    color='nightRide'
                                                    sx={{ width: '100%' }}
                                                    label="Descrição"
                                                    multiline
                                                    rows={15}
                                                    defaultValue=""
                                                />
                                            </ListItem>
                                        </List>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button color='nightRide' onClick={handleClose}>Fechar</Button>
                                        <Button color='nightRide' onClick={handleClose}>Salvar</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
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
