import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import StudentCard from './StudentCard'; // Importar el componente StudentCard

const HouseCard = ({ house }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://hp-api.herokuapp.com/api/characters/house/${house}`);
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

    fetchCharacters();
  }, [house]);

  return (
    <Grid container spacing={3}>
      {characters.map((character) => (
        <Grid item xs={12} sm={6} md={4} key={character.id}>
          <StudentCard student={character} /> {/* Usa el componente StudentCard */}
        </Grid>
      ))}
    </Grid>
  );
};

export default HouseCard;
