import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-blue-950 text-blue-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-blue-900 border border-blue-800 rounded-xl p-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          404
        </h1>
        <p className="text-lg mb-6">
          La página que buscas no existe.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-700 hover:bg-blue-800 text-blue-100 font-semibold px-6 py-3 rounded-lg transition-colors
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;