import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownViewer.css';

const MarkdownViewer = ({ filePath = '/static/markdown/presentacion.md' }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (filePath) {
      console.log('Intentando cargar:', filePath);
      setLoading(true);
      setError(null);

      fetch(filePath)
        .then((response) => {
          console.log('Estado de la respuesta:', response.status);
          console.log('URL solicitada:', response.url);
          if (!response.ok) {
            throw new Error(`No se pudo cargar el archivo: ${response.status} ${response.statusText}`);
          }
          return response.text();
        })
        .then((text) => {
          console.log('Contenido cargado:', text);
          setContent(text);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error en fetch:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [filePath]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="markdown-viewer">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;