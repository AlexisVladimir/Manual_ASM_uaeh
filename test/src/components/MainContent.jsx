import React from 'react';
import './MainContent.css'; // Estilos específicos para el MainContent

const MainContent = ({ content }) => (
  <main className="main-content">
    <h1>Manual de Ensamblador NASM x86</h1>
    <p>
      Bienvenido al manual de ensamblador para NASM x86. Este sitio web está diseñado como una memoria técnica que cubre varios códigos de ejemplo en ensamblador. Aquí encontrarás ejemplos prácticos y explicaciones detalladas para ayudarte a comprender y utilizar el ensamblador NASM x86.
    </p>
    <p>
      A continuación, se presentan los códigos revisados en este manual:
    </p>
    <section className="key-resources">
      <h2>Contenido Seleccionado</h2>
      <p>{content}</p>
    </section>
  </main>
);

export default MainContent;