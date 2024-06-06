import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import defaultImage from '../assets/imagen.jpg'; // Importar la imagen predeterminada
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const StudentCard = ({ student }) => {
  const { id, name, image, house, dateOfBirth, eyeColour, hairColour, wand, patronus } = student;
  const [saved, setSaved] = useState(false);

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
          savedItems.push(student);
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
    <Card>
      <CardMedia
        component="img"
        height="400"
        image={image ? image : defaultImage}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Casa: {house}<br />
          Fecha de nacimiento: {dateOfBirth}<br />
          Color de ojos: {eyeColour}<br />
          Color de cabello: {hairColour}<br />
          Varita: {wand.wood} - {wand.core} - {wand.length}<br />
          Patronus: {patronus}
        </Typography>
        {saved ? (
          <Typography variant="body1" align="center">Guardado</Typography>
        ) : (
          <Button variant="contained" onClick={handleSave} style={{ margin: '8px auto' }}>Guardar</Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentCard;
