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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-blue-900 border border-blue-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Únete a la conversación
        </h2>

        <p className="text-sm mb-4">
          Para comentar, elige un nombre de usuario. No necesitas registrarte ni proporcionar un email.
        </p>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu nombre de usuario..."
              className="w-full px-4 py-3 text-blue-100 bg-blue-950 rounded-lg font-medium
                       border border-blue-800 outline-none focus-visible:outline focus-visible:outline-2
                       focus-visible:outline-offset-2 focus-visible:outline-blue-100
                       placeholder:text-blue-300/60"
              maxLength="20"
              disabled={loading}
            />
            <p className="text-xs text-blue-300 mt-1">
              Mínimo 3 caracteres, máximo 20
            </p>
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-800 rounded-lg p-3">
              <p className="text-red-400 text-sm font-semibold">
                {error}
              </p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={username.trim().length < 3 || loading}
            className="w-full px-6 py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-950 disabled:border disabled:border-blue-800 disabled:text-blue-300
                     disabled:cursor-not-allowed text-blue-100 font-semibold rounded-lg
                     transition-colors duration-200"
          >
            {loading ? 'Entrando...' : 'Ingresar'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;