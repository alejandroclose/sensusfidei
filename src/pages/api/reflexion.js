// src/pages/api/reflexion.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método no permitido' });
    }
  
    const { pensamiento } = req.body;
  
    if (!pensamiento || pensamiento.trim() === '') {
      return res.status(400).json({ error: 'Por favor, comparte un pensamiento válido.' });
    }
  
    try {
      // Prompt para OpenAI
      const prompt = `
  Actúa como un teólogo católico de la Iglesia Romana que ejemplifica el "Sensus Fidei" (el sentido de la fe). La persona ha compartido el siguiente pensamiento, situación o reflexión:
  
  "${pensamiento}"
  
  Por favor, proporciona:
  1. Un pasaje relevante de la Biblia que dialogue con este pensamiento (incluye la cita exacta).
  2. Una reflexión teológica que muestre cómo las Escrituras iluminan este pensamiento, ofreciendo una perspectiva desde la tradición y enseñanza católica.
  
  La respuesta debe tener el siguiente formato:
  {
    "pasaje": "Texto del pasaje bíblico",
    "cita": "Libro Capítulo:Versículo",
    "reflexion": "Texto de la reflexión"
  }
  `;
  
      // Llamamos directamente a la API de OpenAI usando fetch
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: 'Eres un teólogo católico que encarna el Sensus Fidei (sentido de la fe), relacionando las experiencias humanas con la sabiduría de las Escrituras y la tradición católica. Respondes siempre en formato JSON válido.'
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
  
      // Verificar si la respuesta es correcta
      if (!response.ok) {
        throw new Error(`Error en la API de OpenAI: ${response.statusText}`);
      }
      
      // Parsear la respuesta
      const data = await response.json();
      
      // Extraer y procesar la respuesta
      const respuestaTexto = data.choices[0].message.content.trim();
      
      // Intentar parsear la respuesta como JSON
      let respuestaJSON;
      try {
        // Algunos modelos pueden devolver el JSON con comillas simples o con markdown
        const limpiarJSON = respuestaTexto
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
        
        respuestaJSON = JSON.parse(limpiarJSON);
      } catch (error) {
        console.error('Error al parsear JSON:', error);
        
        // Si falla el parsing, intentamos extraer manualmente los datos
        const pasajeMatch = respuestaTexto.match(/"pasaje":\s*"([^"]*)"/);
        const citaMatch = respuestaTexto.match(/"cita":\s*"([^"]*)"/);
        const reflexionMatch = respuestaTexto.match(/"reflexion":\s*"([^"]*)"/);
        
        respuestaJSON = {
          pasaje: pasajeMatch ? pasajeMatch[1] : 'Pasaje no encontrado',
          cita: citaMatch ? citaMatch[1] : 'Cita no encontrada',
          reflexion: reflexionMatch ? reflexionMatch[1].replace(/\\n/g, '\n') : 'Reflexión no encontrada'
        };
      }
  
      return res.status(200).json(respuestaJSON);
    } catch (error) {
      console.error('Error al llamar a OpenAI:', error);
      return res.status(500).json({ 
        error: 'Error al procesar la solicitud', 
        details: error.message 
      });
    }
  }