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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-blue-950 flex items-center justify-center">
        <div className="text-blue-300 text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e3a8a',
            color: '#dbeafe',
            border: '1px solid #1e40af',
          },
          success: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#dbeafe',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#dbeafe',
            },
          },
        }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Chat
          </h1>

          <div className="bg-blue-950/50 border border-blue-800 rounded-xl p-4">
            <p className="leading-relaxed">
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
            <div className="bg-blue-900 border border-blue-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-950 flex items-center justify-center text-blue-100 font-bold text-sm">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold">{username}</span>
              </div>

              <div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe un comentario..."
                  className="w-full px-4 py-3 text-blue-100 bg-blue-950 rounded-lg font-medium
                           border border-blue-800 outline-none focus-visible:outline focus-visible:outline-2
                           focus-visible:outline-offset-2 focus-visible:outline-blue-100
                           placeholder:text-blue-300/60 resize-none"
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
                  <span className="text-xs text-blue-300">
                    {newComment.length}/1000 caracteres
                  </span>
                  <button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || sending}
                    className="px-6 py-2 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-950 disabled:border disabled:border-blue-800 disabled:text-blue-300
                             disabled:cursor-not-allowed text-blue-100 font-semibold rounded-lg
                             transition-colors duration-200"
                  >
                    {sending ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loadingComments ? (
          <div className="text-center py-12 bg-blue-900 border border-blue-800 rounded-xl">
            <div className="text-blue-300">Cargando comentarios...</div>
          </div>
        ) : comments.length === 0 ? null : (
          <div className="space-y-4">
            {comments.map(comment => (
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