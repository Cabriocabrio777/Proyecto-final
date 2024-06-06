import { Container, Button, Typography } from '@mui/material'; // Importar el componente Container de Material-UI
import { useState } from 'react';
import HouseCard from './HouseCard'; // Importar el componente HouseCard

function CaracteresEnCasa() {
  const [house, setHouse] = useState('Gryffindor'); // Estado para almacenar la casa seleccionada

  const handleHouseChange = (selectedHouse) => {
    setHouse(selectedHouse); // Actualizar la casa seleccionada
  };

  return (
    <Container 
      maxWidth="lg" 
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color de fondo negro con opacidad del 50%
        minHeight: '100vh', // Altura mínima para ocupar toda la pantalla
        marginTop: '10px',
        marginBottom: '10px'
      }}
      
    >
      <Typography variant="h2" align="center" style={{ color: 'white', marginBottom: '20px' }}>
        Caracteres en {house}
      </Typography>
      
      <Button onClick={() => handleHouseChange('Gryffindor')} variant={house === 'Gryffindor' ? 'contained' : 'outlined'}>Gryffindor</Button>
      <Button onClick={() => handleHouseChange('Slytherin')} variant={house === 'Slytherin' ? 'contained' : 'outlined'}>Slytherin</Button>
      <Button onClick={() => handleHouseChange('Hufflepuff')} variant={house === 'Hufflepuff' ? 'contained' : 'outlined'}>Hufflepuff</Button>
      <Button onClick={() => handleHouseChange('Ravenclaw')} variant={house === 'Ravenclaw' ? 'contained' : 'outlined'}>Ravenclaw</Button>
      <HouseCard house={house} /> {/* Renderizar las cartas según la casa seleccionada */}
    </Container>
  );
}

export default CaracteresEnCasa;
