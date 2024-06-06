import { Card, CardMedia, Modal, Backdrop, Fade, Typography, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import defaultImage from '../assets/imagen.jpg'; // Importa la imagen por defecto
import Swal from 'sweetalert2';

const CharacterCard = ({ character }) => {
  const { id, name, image, species, house, dateOfBirth, eyeColour, hairColour, wand, patronus } = character;
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    Swal.fire({
      title: '¿Quieres guardar este personaje?',
      text: '¡Este personaje se guardará en tus favoritos!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, guardarlo!',

      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        if (!savedItems.find((item) => item.id === id)) {
          savedItems.push(character);
          localStorage.setItem('savedItems', JSON.stringify(savedItems));
          setSaved(true);
          Swal.fire(
            '¡Guardado!',
            'El personaje ha sido guardado en tus favoritos.',
            'success'
          );
        }
      }
    });
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const alreadySaved = savedItems.some((item) => item.id === id);
    setSaved(alreadySaved);
  }, [id]);

  return (
    <>
      <Card  style={{ cursor: 'pointer' }}>
        <CardMedia  onClick={handleOpen}component="img" height="300px" image={image || defaultImage} alt={name} /> {/* Usa la imagen por defecto si no hay imagen */}
        <Typography onClick={handleOpen}variant="h6" align="center">{name}</Typography>
        {saved ? (
          <Typography variant="body1" align="center">Guardado</Typography>
        ) : (
          <Button variant="contained" onClick={handleSave} style={{ margin: '8px auto' }}>Guardar</Button>
        )}
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
            }}
          >
            <img src={image || defaultImage} alt={name} style={{ height: '200px' }} /> {/* Usa la imagen por defecto si no hay imagen */}
            <Typography variant="h5" gutterBottom>{name}</Typography>
            <Typography variant="body1" gutterBottom>Especie: {species}</Typography>
            <Typography variant="body1" gutterBottom>Casa: {house}</Typography>
            <Typography variant="body1" gutterBottom>Fecha de nacimiento: {dateOfBirth}</Typography>
            <Typography variant="body1" gutterBottom>Color de ojos: {eyeColour}</Typography>
            <Typography variant="body1" gutterBottom>Color de cabello: {hairColour}</Typography>
            <Typography variant="body1" gutterBottom>Varita: {wand.wood} - {wand.core} - {wand.length}</Typography>
            <Typography variant="body1" gutterBottom>Patronus: {patronus}</Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CharacterCard;
