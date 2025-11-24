import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    const result = await onLogin(username);

    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-slate-100 mb-4">
          Únete a la conversación
        </h2>

        <p className="text-slate-300 text-sm mb-4">
          Para comentar, elige un nombre de usuario. No necesitas registrarte ni proporcionar un email.
        </p>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu nombre de usuario..."
              className="w-full px-4 py-3 text-slate-100 bg-slate-700 rounded-lg shadow-inner font-medium 
                       border border-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                       placeholder:text-slate-500"
              maxLength="20"
              disabled={loading}
            />
            <p className="text-xs text-slate-400 mt-1">
              Mínimo 3 caracteres, máximo 20
            </p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
              <p className="text-red-400 text-sm font-semibold">
                {error}
              </p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={username.trim().length < 3 || loading}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 
                     disabled:cursor-not-allowed text-white font-bold rounded-lg 
                     shadow-lg transition-colors duration-200"
          >
            {loading ? 'Entrando...' : 'Ingresar'}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default LoginForm;