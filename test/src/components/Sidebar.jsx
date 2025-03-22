// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onSelect }) => {
  const sections = [
    {
      title: 'NASM x86',
      links: [
        { href: '#hola', text: 'hola.asm', filePath: '/static/markdown/hola.md' },
        { href: '#ciclo', text: 'ciclo.asm', filePath: '/static/markdown/ciclo.md' },
        { href: '#leer', text: 'leer.asm', filePath: '/static/markdown/leer.md' },
        { href: '#suma', text: 'suma.asm', filePath: '/static/markdown/suma.md' },
        { href: '#calculadora', text: 'calculadora.asm', filePath: '/static/markdown/calculadora.md' },
        { href: '#suma-y-ciclo', text: 'suma_y_ciclo.asm', filePath: '/static/markdown/suma_y_ciclo.md' },
      ],
    },
    {
      title: 'NASM x86 y GCC',
      links: [
        { href: '#suma-gcc', text: 'suma', filePath: '/static/markdown/suma_gcc.md' },
        { href: '#raiz', text: 'raiz', filePath: '/static/markdown/raiz.md' },
        { href: '#factorial', text: 'factorial', filePath: '/static/markdown/factorial.md' },
        { href: '#es-par', text: 'es_par', filePath: '/static/markdown/es_par.md' },
        { href: '#leer-gcc', text: 'leer', filePath: '/static/markdown/leer_gcc.md' },
        { href: '#calculadora-gcc', text: 'calculadora', filePath: '/static/markdown/calculadora_gcc.md' },
        { href: '#piramide', text: 'pirámide', filePath: '/static/markdown/piramide.md' },
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
                    <a href={link.href} onClick={() => onSelect(link.filePath)}>{link.text}</a>
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