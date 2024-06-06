
import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import imga from "../assets/harry.jpg";
import './Welcomemessage.css';

const WelcomeMessage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>Harry Potter API - Wizard World</Typography>
      <Link to="/todos-personajes">
        <img className="image" src={imga} alt="harryimg" />
      </Link>
      <Typography variant="body1" gutterBottom>Elaborado por: Edgar Camara Briones</Typography>
    </Container>
  );
};

export default WelcomeMessage;
