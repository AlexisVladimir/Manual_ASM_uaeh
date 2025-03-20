import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import '../styles/home.css'; // Estilos generales para la página Home

const Home = () => {
  const [content, setContent] = useState('Seleccione un archivo para ver su contenido.');

  return (
    <div className="home-container">
      <Sidebar onSelect={setContent} />
      <MainContent content={content} />
    </div>
  );
};

export default Home;