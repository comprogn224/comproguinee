import { useState, useEffect } from 'react';

interface User {
  id: number;
  nom: string;
  email: string;
  telephone?: string;
  role: 'admin' | 'client';
  date_creation: string;
}

interface RegisterData {
  nom: string;
  email: string;
  telephone?: string;
  mot_de_passe: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string; error?: string }>;
  logout: () => void;
  checkFirstVisit: () => Promise<{ firstVisit: boolean; usersCount: number }>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const savedUser = localStorage.getItem('compro_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        localStorage.removeItem('compro_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth.php`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email,
          mot_de_passe: password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Erreur HTTP: ${response.status}`);
      }

      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('compro_user', JSON.stringify(result.user));
        
        return {
          success: true,
          message: result.message || 'Connexion réussie'
        };
      } else {
        throw new Error(result.error || 'Erreur de connexion');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Erreur lors de la connexion:', err);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth.php`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'register',
          ...userData
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Erreur HTTP: ${response.status}`);
      }

      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('compro_user', JSON.stringify(result.user));
        
        return {
          success: true,
          message: result.message || 'Inscription réussie'
        };
      } else {
        throw new Error(result.error || 'Erreur d\'inscription');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Erreur lors de l\'inscription:', err);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('compro_user');
  };

  const checkFirstVisit = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth.php`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        return {
          firstVisit: result.first_visit,
          usersCount: result.users_count
        };
      } else {
        throw new Error(result.error || 'Erreur de vérification');
      }

    } catch (err) {
      console.error('Erreur lors de la vérification:', err);
      return {
        firstVisit: false,
        usersCount: 0
      };
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkFirstVisit
  };
}
