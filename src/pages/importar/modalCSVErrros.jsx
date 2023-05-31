import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

export default function ModalCsvErros({isOpen, setOpen, children}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='md'>
        <DialogTitle>Erros ao Importar arquivo CSV</DialogTitle>
        <Divider/>
        <DialogContent>
          {children}
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}