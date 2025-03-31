// src/components/FormularioPensamiento.js
import { useState } from 'react';

export default function FormularioPensamiento({ onSubmit, isLoading }) {
  const [pensamiento, setPensamiento] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pensamiento.trim()) {
      onSubmit(pensamiento);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-center mb-4 text-indigo-700">Comparte tu Pensamiento</h2>
      <p className="text-gray-600 mb-4 text-sm text-center">
        Expresa tu inquietud, reflexión o situación para descubrir cómo dialoga 
        con la sabiduría de las Sagradas Escrituras.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea 
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline resize-none"
            rows="6"
            placeholder="Comparte lo que hay en tu corazón..."
            value={pensamiento}
            onChange={(e) => setPensamiento(e.target.value)}
            required
          ></textarea>
        </div>
        
        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Buscando conexiones bíblicas...' : 'Relacionar con las Escrituras'}
        </button>
      </form>
    </div>
  );
}