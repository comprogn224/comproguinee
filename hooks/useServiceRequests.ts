import { useState } from 'react';

interface ServiceRequestData {
  nom: string;
  prenom: string;
  entreprise?: string;
  email: string;
  telephone?: string;
  services: string[];
  budget?: string;
  delai?: string;
  description: string;
  objectifs?: string;
  cible?: string;
  concurrents?: string;
  existant?: string;
}

interface UseServiceRequestsReturn {
  submitRequest: (data: ServiceRequestData) => Promise<{ success: boolean; message?: string; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

export function useServiceRequests(): UseServiceRequestsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRequest = async (data: ServiceRequestData) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/service-requests.php`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Erreur HTTP: ${response.status}`);
      }

      if (result.success) {
        return {
          success: true,
          message: result.message || 'Demande envoyée avec succès'
        };
      } else {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur lors de l\'envoi de la demande:', err);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitRequest,
    isLoading,
    error
  };
}
