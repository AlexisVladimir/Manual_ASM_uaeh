import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MarkdownViewer from '../components/MarkdownViewer';
import '../App.css'; // Asegúrate de mover los estilos aquí o crear MainPage.css

const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState('/static/markdown/presentacion.md');

  const handleSelect = (filePath) => {
    setSelectedFile(filePath);
  };

  return (
    <div className="app">
      <div className="sidebar-container">
        <Sidebar onSelect={handleSelect} />
      </div>
      <div className="content-container">
        {selectedFile ? (
          <MarkdownViewer filePath={selectedFile} />
        ) : (
          <div className="welcome-message">
            Selecciona un archivo de la barra lateral para visualizarlo
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;