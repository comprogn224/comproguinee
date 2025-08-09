import { useState, useEffect } from 'react'

export interface Service {
  id: number
  title: string
  description: string
  shortDescription: string
  priceMin?: number
  priceMax?: number
  duration?: string
  icon: string
  image?: string
  order: number
  dateCreated: string
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        // Essayer l'API services, sinon utiliser l'API testimonials comme test
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? 'https://your-domain.com/backend/api/services.php'
          : 'http://localhost/backend/api/services.php'
        
        console.log('Tentative de connexion à:', apiUrl)
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des services')
        }
        
        const data = await response.json()
        
        if (data.success) {
          setServices(data.services)
        } else {
          throw new Error(data.message || 'Erreur inconnue')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        console.error('Erreur lors de la récupération des services:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return { services, loading, error }
}

export function useService(id: number) {
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? `https://your-domain.com/backend/api/services.php?id=${id}`
          : `http://localhost/backend/api/services.php?id=${id}`
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du service')
        }
        
        const data = await response.json()
        
        if (data.success) {
          setService(data.service)
        } else {
          throw new Error(data.message || 'Service non trouvé')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        console.error('Erreur lors de la récupération du service:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchService()
    }
  }, [id])

  return { service, loading, error }
}
