import React from 'react';
import './Sidebar.css'; // Estilos específicos para el Sidebar

const Sidebar = ({ onSelect }) => {
  const sections = [
    {
      title: 'NASM x86',
      links: [
        { href: '#hola', text: 'hola.asm', filePath: '/markdown/hola.md' },
        { href: '#ciclo', text: 'ciclo.asm', filePath: '/markdown/ciclo.md' },
        { href: '#leer', text: 'leer.asm', filePath: '/markdown/leer.md' },
        { href: '#suma', text: 'suma.asm', filePath: '/markdown/suma.md' },
        { href: '#calculadora', text: 'calculadora.asm', filePath: '/markdown/calculadora.md' },
        { href: '#suma-y-ciclo', text: 'suma_y_ciclo.asm', filePath: '/markdown/suma_y_ciclo.md' },
      ],
    },
    {
      title: 'NASM x86 y GCC',
      links: [
        { href: '#suma-gcc', text: 'suma', filePath: '/markdown/suma_gcc.md' },
        { href: '#raiz', text: 'raiz', filePath: '/markdown/raiz.md' },
        { href: '#factorial', text: 'factorial', filePath: '/markdown/factorial.md' },
        { href: '#es-par', text: 'es_par', filePath: '/markdown/es_par.md' },
        { href: '#leer-gcc', text: 'leer', filePath: '/markdown/leer_gcc.md' },
        { href: '#calculadora-gcc', text: 'calculadora', filePath: '/markdown/calculadora_gcc.md' },
        { href: '#piramide', text: 'pirámide', filePath: '/markdown/piramide.md' },
      ],
    },
  ];

  const handleClick = (e, filePath) => {
    e.preventDefault();
    onSelect(filePath);
  };

  return (
    <nav className="sidebar">
      <ul>
        {sections.map((section, index) => (
          <li key={index}>
            <span>{section.title}</span>
            {section.links && (
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} onClick={(e) => handleClick(e, link.filePath)}>{link.text}</a>
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