import { Container, Grid, IconButton, Typography, CircularProgress, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard'; // Importar el componente CharacterCard
import Swal from 'sweetalert2';

function Guardados() {
  const [savedItems, setSavedItems] = useState([]); // Estado para almacenar los personajes guardados
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedChars = JSON.parse(localStorage.getItem('savedItems')) || []; // Obtener los personajes guardados del localStorage
    setSavedItems(savedChars);
    setLoading(false);
  }, []);

  const handleDeleteCharacter = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = savedItems.filter((item) => item.id !== id);
        setSavedItems(updatedItems);
        localStorage.setItem('savedItems', JSON.stringify(updatedItems));
        Swal.fire(
          '¡Borrado!',
          'El personaje ha sido eliminado.',
          'success'
        );
      }
    });
  };
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = savedItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg"style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color de fondo negro con opacidad del 50%
        minHeight: '100vh', // Altura mínima para ocupar toda la pantalla
        marginTop: '10px',
        marginBottom: '10px'
      }}
      >
      <Typography variant="h2" align="center" style={{ color: 'white', marginBottom: '20px' }}>
        Guardados
        </Typography>
      <TextField
        label="Buscar guardados"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px',backgroundColor: 'rgba(255, 255, 255, 1)' }}
      />
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : filteredItems.length === 0 ? (
        <Typography variant="body1" align="center">No hay resultados</Typography>
      ) : (
        
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <IconButton onClick={() => handleDeleteCharacter(item.id)} color="secondary" aria-label="delete">
                BORRAR<DeleteIcon />
              </IconButton>
              <CharacterCard character={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Guardados;
