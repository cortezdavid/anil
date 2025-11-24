import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

export const useAnonymousAuth = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const storedUsername = localStorage.getItem('pokemon_chat_username');
        const storedUserId = localStorage.getItem('pokemon_chat_userId');
        
        // Si el userId coincide con el guardado, recuperar username
        if (storedUserId === currentUser.uid && storedUsername) {
          setUser(currentUser);
          setUsername(storedUsername);
        } else {
          // Usuario nuevo o diferente
          setUser(currentUser);
          localStorage.setItem('pokemon_chat_userId', currentUser.uid);
          
          if (storedUsername) {
            setUsername(storedUsername);
          }
        }
      } else {
        setUser(null);
        setUsername('');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAnonymously = async (desiredUsername) => {
    try {
      // Validar username
      if (!desiredUsername || desiredUsername.trim().length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres');
      }

      if (desiredUsername.trim().length > 20) {
        throw new Error('El nombre no puede tener más de 20 caracteres');
      }

      const trimmedUsername = desiredUsername.trim();
      
      // Login anónimo en Firebase
      const userCredential = await signInAnonymously(auth);
      
      // Guardar username y userId en localStorage
      localStorage.setItem('pokemon_chat_username', trimmedUsername);
      localStorage.setItem('pokemon_chat_userId', userCredential.user.uid);
      
      setUsername(trimmedUsername);
      
      return { success: true };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    username,
    loading,
    loginAnonymously,
    isAuthenticated: !!user
  };
};