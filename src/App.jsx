// App.jsx
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodosPersonajes from './components/TodosPersonajes';
import TodosEstudiantesHogwarts from './components/TodosEstudiantesHogwarts';
import CaracteresEnCasa from './components/CaracteresEnCasa';
import Guardados from './components/Guardados';
import WelcomeMessage from './components/Welcomemessage';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/todos-personajes" element={<TodosPersonajes />} />
        <Route path="/todos-estudiantes-hogwarts" element={<TodosEstudiantesHogwarts />} />
        <Route path="/caracteres-en-casa" element={<CaracteresEnCasa />} />
        <Route path="/guardados" element={<Guardados />} />
        {/* Ruta por defecto */}
        <Route path="/" element={<WelcomeMessage />} />
        
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
