// src/components/Respuesta.js
export default function Respuesta({ respuesta }) {
    // Si no hay respuesta, no renderizamos nada
    if (!respuesta) return null;

    const { pasaje, cita, reflexion } = respuesta;

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-center mb-2 text-indigo-700">Pasaje Bíblico</h2>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-gray-800 italic mb-2">{pasaje}</p>
                    <p className="text-right text-sm text-gray-600 font-medium">— {cita}</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-center mb-2 text-indigo-700">Reflexión</h2>
                <div className="prose prose-indigo">
                    {reflexion.split('\n').map((parrafo, index) => (
                        <p key={index} className="mb-3 text-gray-700">
                            {parrafo}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 italic">&quot;Sensus Fidei: La sabiduría de la fe en diálogo con la vida.&quot;</p>
            </div>
        </div>
    );
}