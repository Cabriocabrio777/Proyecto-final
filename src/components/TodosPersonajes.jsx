import { Container, Grid, TextField, Typography } from '@mui/material';
import CharacterCard from './CharacterCard';
import { useEffect, useState } from 'react';

const TodosPersonajes = () => {
  const [characters, setCharacters] = useState([]);
  const [savedCharacters, setSavedCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Lógica para obtener los personajes de la API
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://hp-api.herokuapp.com/api/characters');
        if (response.ok) {
          const data = await response.json();
          setCharacters(data);
        } else {
          console.error('Error fetching characters:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    // Obtener personajes guardados del localStorage
    const savedCharactersData = JSON.parse(localStorage.getItem('savedCharacters')) || [];
    setSavedCharacters(savedCharactersData);

    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const mergedCharacters = filteredCharacters.map((character) => {
    const savedCharacter = savedCharacters.find((savedChar) => savedChar.id === character.id);
    return savedCharacter || character;
  });

  return (
    <>
    <Typography variant="h3" align="center" style={{ color: 'white', marginBottom: '20px' }}>
        Todos los Personajes de Hogwarts
      </Typography>
      <TextField
        label="Buscar personaje"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' ,backgroundColor: 'rgba(255, 255, 255, 1)'}}
      />
      {mergedCharacters.length === 0 ? (
        <Typography variant="body1" align="center">No hay resultados</Typography>
      ) : (
        <Container maxWidth="lg"style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color de fondo negro con opacidad del 50%
            minHeight: '100vh', // Altura mínima para ocupar toda la pantalla
            marginTop: '10px',
            marginBottom: '10px'
          }}
          ><Grid container spacing={3} >
          {mergedCharacters.map((character) => (
            <Grid item xs={12} sm={6} md={4} key={character.id}>
              <CharacterCard character={character} />
            </Grid> 
          ))}
        </Grid></Container>
      )}
    </>
  );
};

export default TodosPersonajes;
