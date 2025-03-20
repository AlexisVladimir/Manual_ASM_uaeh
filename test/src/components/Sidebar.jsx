import React from 'react';
import './Sidebar.css'; // Estilos específicos para el Sidebar

const Sidebar = ({ onSelect }) => {
  const sections = [
    {
      title: 'NASM x86',
      links: [
        { href: '#hola', text: 'hola.asm', content: 'Contenido de hola.asm' },
        { href: '#ciclo', text: 'ciclo.asm', content: 'Contenido de ciclo.asm' },
        { href: '#leer', text: 'leer.asm', content: 'Contenido de leer.asm' },
        { href: '#suma', text: 'suma.asm', content: 'Contenido de suma.asm' },
        { href: '#calculadora', text: 'calculadora.asm', content: 'Contenido de calculadora.asm' },
        { href: '#suma-y-ciclo', text: 'suma_y_ciclo.asm', content: 'Contenido de suma_y_ciclo.asm' },
      ],
    },
    {
      title: 'NASM x86 y GCC',
      links: [
        { href: '#suma-gcc', text: 'suma', content: 'Contenido de suma' },
        { href: '#raiz', text: 'raiz', content: 'Contenido de raiz' },
        { href: '#factorial', text: 'factorial', content: 'Contenido de factorial' },
        { href: '#es-par', text: 'es_par', content: 'Contenido de es_par' },
        { href: '#leer-gcc', text: 'leer', content: 'Contenido de leer' },
        { href: '#calculadora-gcc', text: 'calculadora', content: 'Contenido de calculadora' },
        { href: '#piramide', text: 'pirámide', content: 'Contenido de pirámide' },
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
                    <a href={link.href} onClick={() => onSelect(link.content)}>{link.text}</a>
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

export default Sidebar;