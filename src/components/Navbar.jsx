import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import imagen from "../assets/icono.png";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#343434' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ sx: { backgroundColor: '#343434' } }} // Cambiar el color del menú
        >
          <MenuItem component={Link} to="/todos-personajes" onClick={handleClose} sx={{ color: '#b69e5e' }}>Todos los personajes</MenuItem> {/* Cambiar el color del texto */}
          <MenuItem component={Link} to="/todos-estudiantes-hogwarts" onClick={handleClose} sx={{ color: '#b69e5e' }}>Todos los estudiantes de Hogwarts</MenuItem> {/* Cambiar el color del texto */}
          <MenuItem component={Link} to="/caracteres-en-casa" onClick={handleClose} sx={{ color: '#b69e5e' }}>Caracteres en una casa</MenuItem> {/* Cambiar el color del texto */}
          <MenuItem component={Link} to="/guardados" onClick={handleClose} sx={{ color: '#b69e5e' }}>Guardados</MenuItem> {/* Cambiar el color del texto */}
        </Menu>
        <img
          src={imagen}
          alt="Icono"
          style={{ marginRight: '16px', height: '50px' }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#b69e5e' }}>
          Caracteres de Harry Potter
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
