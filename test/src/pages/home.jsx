import React from 'react';
import './home.css'; // Optional: Add styles in a separate CSS file

const Sidebar = () => {
  const sections = [
    {
      title: 'NASM x86',
      links: [
        { href: '#hola', text: 'hola.asm' },
        { href: '#ciclo', text: 'ciclo.asm' },
        { href: '#leer', text: 'leer.asm' },
        { href: '#suma', text: 'suma.asm' },
        { href: '#calculadora', text: 'calculadora.asm' },
        { href: '#suma-y-ciclo', text: 'suma_y_ciclo.asm' },
      ],
    },
    {
      title: 'NASM x86 y GCC',
      links: [
        { href: '#suma-gcc', text: 'suma' },
        { href: '#raiz', text: 'raiz' },
        { href: '#factorial', text: 'factorial' },
        { href: '#es-par', text: 'es_par' },
        { href: '#leer-gcc', text: 'leer' },
        { href: '#calculadora-gcc', text: 'calculadora' },
        { href: '#piramide', text: 'pirámide' },
      ],
    },
  ];

  return (
    <nav className="sidebar">
      <ul>
        {sections.map((section, index) => (
          <li key={index}>
            <a href={section.href || `#${section.title.toLowerCase().replace(/\s+/g, '-')}`}>{section.title}</a>
            {section.links && (
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href}>{link.text}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const MainContent = () => (
  <main className="main-content">
    <h1>Manual de Ensamblador NASM x86</h1>
    <p>
      Bienvenido al manual de ensamblador para NASM x86. Este sitio web está diseñado como una memoria técnica que cubre varios códigos de ejemplo en ensamblador. Aquí encontrarás ejemplos prácticos y explicaciones detalladas para ayudarte a comprender y utilizar el ensamblador NASM x86.
    </p>
    <p>
      A continuación, se presentan los códigos revisados en este manual:
    </p>
    <section className="key-resources">
      <h2>NASM x86</h2>
      <ul>
        <li><a href="#hola">hola.asm</a></li>
        <li><a href="#ciclo">ciclo.asm</a></li>
        <li><a href="#leer">leer.asm</a></li>
        <li><a href="#suma">suma.asm</a></li>
        <li><a href="#calculadora">calculadora.asm</a></li>
        <li><a href="#suma-y-ciclo">suma_y_ciclo.asm</a></li>
      </ul>
      <h2>NASM x86 y GCC</h2>
      <ul>
        <li><a href="#suma-gcc">suma</a></li>
        <li><a href="#raiz">raiz</a></li>
        <li><a href="#factorial">factorial</a></li>
        <li><a href="#es-par">es_par</a></li>
        <li><a href="#leer-gcc">leer</a></li>
        <li><a href="#calculadora-gcc">calculadora</a></li>
        <li><a href="#piramide">pirámide</a></li>
      </ul>
    </section>
  </main>
);

const CookieNotice = () => {
  const handleAccept = () => alert('Aceptaste las cookies');
  const handleDecline = () => alert('Rechazaste las cookies');

  return (
    <footer className="cookie-notice">
      
    </footer>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <MainContent />
      <CookieNotice />
    </div>
  );
};

export default Home;