// src/pages/index.js

"use client"
import { useState } from 'react';
import Head from 'next/head';
import FormularioPensamiento from '../components/FormularioPensamiento';
import Respuesta from '../components/Respuesta';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [respuesta, setRespuesta] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (pensamiento) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/reflexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pensamiento }),
      });
      
      if (!response.ok) {
        throw new Error('Ocurrió un error al procesar tu solicitud.');
      }
      
      const data = await response.json();
      setRespuesta(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Lo sentimos, ocurrió un error al buscar conexiones bíblicas. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Sensus Fidei</title>
        <meta name="description" content="Relaciona tus pensamientos con la sabiduría de las Sagradas Escrituras" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-indigo-800 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Sensus Fidei</h1>
          <p className="text-center mt-2 text-indigo-200">
            El sentido de la fe en diálogo con las Sagradas Escrituras
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FormularioPensamiento onSubmit={handleSubmit} isLoading={isLoading} />
        
        {error && (
          <div className="max-w-md mx-auto mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <Respuesta respuesta={respuesta} />
      </main>

      <footer className="bg-gray-100 py-6 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Sensus Fidei &copy; {new Date().getFullYear()}</p>
          <p className="mt-2">
            Esta aplicación busca relacionar tus pensamientos con la sabiduría de las Escrituras. 
            No reemplaza el discernimiento personal ni el consejo de un sacerdote o director espiritual.
          </p>
        </div>
      </footer>
    </div>
  );
}