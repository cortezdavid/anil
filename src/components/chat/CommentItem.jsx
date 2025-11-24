import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import toast from 'react-hot-toast';

const CommentItem = ({ comment, currentUser, currentUsername }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [sending, setSending] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!comment.id) return;

    const q = query(
      collection(db, 'comments', comment.id, 'replies'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const repliesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReplies(repliesData);
      setLoadingReplies(false);

      // Si hay respuestas, mostrarlas automáticamente
      if (repliesData.length > 0 && !showReplies) {
        setShowReplies(true);
      }
    }, (error) => {
      console.error('Error al cargar respuestas:', error);
      setLoadingReplies(false);
    });

    return () => unsubscribe();
  }, [comment.id]);

  const handleSubmitReply = async () => {
    if (!replyText.trim() || !currentUser || sending) return;

    setSending(true);

    try {
      await addDoc(collection(db, 'comments', comment.id, 'replies'), {
        text: replyText.trim(),
        username: currentUsername,
        userId: currentUser.uid,
        timestamp: serverTimestamp(),
        replyTo: comment.username
      });

      setReplyText('');
      setShowReplyBox(false);

      setShowReplies(true);
      toast.success('Respuesta enviada correctamente');
    } catch (error) {
      console.error('Error al enviar respuesta:', error);
      toast.error('Error al enviar la respuesta. Intenta nuevamente.');
    } finally {
      setSending(false);
    }
  };

  const handleDeleteComment = async () => {
    setDeleting(true);
    const loadingToast = toast.loading('Eliminando comentario...');

    try {
      // Eliminar todas las respuestas primero
      if (replies.length > 0) {
        const deletePromises = replies.map(reply =>
          deleteDoc(doc(db, 'comments', comment.id, 'replies', reply.id))
        );
        await Promise.all(deletePromises);
      }

      await deleteDoc(doc(db, 'comments', comment.id));

      toast.success('Comentario eliminado correctamente', { id: loadingToast });
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      toast.error('Error al eliminar el comentario. Intenta nuevamente.', { id: loadingToast });
      setDeleting(false);
    }
  };

  const handleDeleteReply = async (replyId) => {
    const loadingToast = toast.loading('Eliminando respuesta...');

    try {
      await deleteDoc(doc(db, 'comments', comment.id, 'replies', replyId));
      toast.success('Respuesta eliminada correctamente', { id: loadingToast });
    } catch (error) {
      console.error('Error al eliminar respuesta:', error);
      toast.error('Error al eliminar la respuesta. Intenta nuevamente.', { id: loadingToast });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitReply();
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Ahora';

    const date = timestamp.toDate();
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;

    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const repliesCount = replies.length;
  const isOwner = currentUser && comment.userId === currentUser.uid;

  if (deleting) {
    return (
      <div className="bg-slate-800/50 rounded-xl shadow-lg p-4 border border-slate-700">
        <div className="text-center text-slate-400 text-sm">Eliminando comentario...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 p-4 border border-slate-700">
      {/* Comentario principal */}
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
          {comment.username.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-slate-100 font-bold text-sm">
              {comment.username}
            </span>
            <span className="text-slate-500 text-xs">
              {formatDate(comment.timestamp)}
            </span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
            {comment.text}
          </p>

          {/* Botones de acción */}
          <div className="flex items-center gap-4 mt-3">
            {currentUser && (
              <button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors"
              >
                Responder
              </button>
            )}

            {repliesCount > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-slate-400 hover:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${showReplies ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {showReplies ? 'Ocultar' : 'Ver'} {repliesCount} {repliesCount === 1 ? 'respuesta' : 'respuestas'}
              </button>
            )}

            {isOwner && (
              <button
                onClick={handleDeleteComment}
                className="text-red-400 hover:text-red-300 text-xs font-semibold transition-colors ml-auto"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Caja de respuesta */}
      {showReplyBox && currentUser && (
        <div className="mt-4 ml-13 pl-4 border-l-2 border-blue-600/30">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {currentUsername.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Responder a ${comment.username}...`}
                className="w-full px-3 py-2 text-slate-100 bg-slate-700 rounded-lg shadow-inner text-sm font-medium 
                         border border-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                         placeholder:text-slate-500 resize-none"
                rows="2"
                maxLength="1000"
                disabled={sending}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-form-type="other"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-slate-500">
                  {replyText.length}/1000
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowReplyBox(false);
                      setReplyText('');
                    }}
                    className="px-3 py-1 text-slate-400 hover:text-slate-300 text-xs font-semibold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmitReply}
                    disabled={!replyText.trim() || sending}
                    className="px-4 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 
                             disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg 
                             shadow transition-colors duration-200"
                  >
                    {sending ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de respuestas */}
      {showReplies && (
        <div className="mt-4 ml-13 pl-4 border-l-2 border-slate-700 space-y-3">
          {loadingReplies ? (
            <div className="text-slate-500 text-xs">Cargando respuestas...</div>
          ) : replies.length === 0 ? (
            <div className="text-slate-500 text-xs">No hay respuestas aún</div>
          ) : (
            replies.map(reply => {
              const isReplyOwner = currentUser && reply.userId === currentUser.uid;

              return (
                <div key={reply.id} className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {reply.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-100 font-bold text-xs">
                            {reply.username}
                          </span>
                          <span className="text-slate-500 text-xs">
                            {formatDate(reply.timestamp)}
                          </span>
                        </div>
                        {isReplyOwner && (
                          <button
                            onClick={() => handleDeleteReply(reply.id)}
                            className="text-red-400 hover:text-red-300 text-xs font-semibold transition-colors"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap break-words">
                        {reply.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;