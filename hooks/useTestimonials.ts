import { useState, useEffect } from 'react'

export interface Testimonial {
  id: number
  name: string
  company: string
  text: string
  rating: number
  avatar?: string
  date: string
  position?: string // Poste du client
  featured?: boolean // Témoignage mis en avant
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        // URL de votre API PHP (ajustez le port si nécessaire)
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? 'https://your-domain.com/backend/api/testimonials.php'
          : 'http://localhost/backend/api/testimonials.php'
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des témoignages')
        }
        
        const data = await response.json()
        
        if (data.success) {
          setTestimonials(data.testimonials)
        } else {
          throw new Error(data.message || 'Erreur inconnue')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        console.error('Erreur lors de la récupération des témoignages:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return { testimonials, loading, error }
}
