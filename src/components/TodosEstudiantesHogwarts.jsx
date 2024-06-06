import { Container, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import StudentCard from './StudentCard';

const TodosEstudiantesHogwarts = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://hp-api.herokuapp.com/api/characters/students');
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          console.error('Error fetching students:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="lg" style={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      minHeight: '100vh',
      marginTop: '10px',
      marginBottom: '10px'//Harrypotter-Api-Cabrio
    }}>
      <Typography variant="h3" align="center" style={{ color: 'white', marginBottom: '20px' }}>
        Todos los estudiantes de Hogwarts
      </Typography>
      <TextField
        label="Buscar estudiante"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
        InputProps={{ style: { color: 'black' } }}
      />
      {filteredStudents.length === 0 ? (
        <Typography variant="body1" align="center" style={{ color: 'white' }}>
          No hay resultados
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredStudents.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <StudentCard student={student} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TodosEstudiantesHogwarts;
