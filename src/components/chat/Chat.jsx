import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
  where
} from 'firebase/firestore';
import { useAnonymousAuth } from '../../hooks/useAnonymousAuth';
import LoginForm from './LoginForm';
import CommentItem from './CommentItem';
import toast, { Toaster } from 'react-hot-toast';
import { useSEO } from '../../hooks/useSEO';
import AutoScrollTop from '../autoScrollTop/AutoScrollTop';


const Chat = () => {

  useSEO({
    title: 'Chat - Pokémon Añil',
    description: 'Únete a la comunidad de Pokémon Añil. Comparte dudas, reporta errores, sugiere mejoras y busca jugadores para intercambiar Pokémon. Espacio de ayuda y discusión para entrenadores.',
    keywords: 'pokémon añil comunidad, chat pokémon añil, foro pokémon añil, ayuda pokémon añil, intercambio pokémon añil, dudas pokémon añil, comunidad entrenadores, pokémon añil jugadores'
  });

  const { user, username, loading: authLoading, loginAnonymously, isAuthenticated } = useAnonymousAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(true);
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsData);
      setLoadingComments(false);
    }, (error) => {
      console.error('Error al cargar comentarios:', error);
      setLoadingComments(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !isAuthenticated || sending) return;

    setSending(true);

    try {
      await addDoc(collection(db, 'comments'), {
        text: newComment.trim(),
        username: username,
        userId: user.uid,
        timestamp: serverTimestamp(),
        repliesCount: 0
      });

      setNewComment('');
      toast.success('Comentario enviado correctamente');
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      toast.error('Error al enviar el comentario. Intenta nuevamente.');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  // Filtrar comentarios según búsqueda (solo por texto)
  const filteredComments = comments.filter(comment => {
    if (!search.trim()) return true;
    const searchLower = search.toLowerCase();
    return comment.text.toLowerCase().includes(searchLower);
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-slate-400 text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155',
          },
          success: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#f1f5f9',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#f1f5f9',
            },
          },
        }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-100 mb-4 uppercase tracking-wider drop-shadow-sm">
            Chat
          </h1>

          {/* <div className="max-w-7xl mx-auto px-4 mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start">
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">
                    ⚠️¡Aviso importante!
                  </p>
                  <p className="text-sm font-medium text-yellow-700 mt-1">
                    Ahora estamos en guianil.pages.dev (ya estas! no necesitas redireccionar) . Posiblemente será la dirección principal y, si esto sucede, la versión anterior (guianil.vercel.app) dejará de estar disponible.
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-4">
            <p className="text-slate-300 leading-relaxed">
              Este es un espacio para hacer preguntas sobre el juego, reportar errores de la página,
              sugerir mejoras,
              o simplemente compartir tus experiencias.
            </p>
          </div>
        </div>

        {!isAuthenticated ? (
          <LoginForm onLogin={loginAnonymously} />
        ) : (
          <div className="mb-8">
            <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 p-6 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="text-slate-300 font-semibold">{username}</span>
              </div>

              <div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe un comentario..."
                  className="w-full px-4 py-3 text-slate-100 bg-slate-700 rounded-lg shadow-inner font-medium 
                           border border-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                           placeholder:text-slate-500 resize-none"
                  rows="3"
                  maxLength="1000"
                  disabled={sending}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-form-type="other"
                />

                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-slate-400">
                    {newComment.length}/1000 caracteres
                  </span>
                  <button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || sending}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 
                             disabled:cursor-not-allowed text-white font-bold rounded-lg 
                             shadow-lg transition-colors duration-200"
                  >
                    {sending ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="mb-6">
          <div className="relative">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar comentarios"
              className="w-full px-4 py-3 pr-12 text-slate-100 bg-slate-800 rounded-lg shadow-lg font-medium 
                       border-none outline-none focus:outline-none focus:border-none focus:ring-0 placeholder:text-slate-500"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {search && (
            <p className="text-center mt-2 text-sm text-blue-400 font-semibold">
              {filteredComments.length} resultado{filteredComments.length !== 1 ? 's' : ''} encontrado{filteredComments.length !== 1 ? 's' : ''}
            </p>
          )}
        </div> */}

        {loadingComments ? (
          <div className="text-center py-12 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <div className="text-slate-400">Cargando comentarios...</div>
          </div>
        ) : search && filteredComments.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400 font-semibold">
              No se encontraron comentarios con "{search}"
            </p>
          </div>
        ) : !search && filteredComments.length === 0 ? null : (
          <div className="space-y-4">
            {filteredComments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUser={user}
                currentUsername={username}
              />
            ))}
          </div>
        )}
      </div>
      <AutoScrollTop />
    </div>
  );
};

export default Chat;