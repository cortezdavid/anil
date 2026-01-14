// NotFound.jsx
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-4xl font-black text-slate-100 mb-4">
          404
        </h1>
        <p className="text-slate-300 text-lg mb-6">
          La página que buscas no existe.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;