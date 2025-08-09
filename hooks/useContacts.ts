import { useState } from 'react'

export interface ContactForm {
  nom: string
  email: string
  telephone?: string
  entreprise?: string
  sujet?: string
  message: string
}

export interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
  status: 'nouveau' | 'en_cours' | 'traite' | 'ferme'
  dateCreated: string
}

export function useContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitContact = async (formData: ContactForm) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.com/backend/api/contacts.php'
        : 'http://localhost/backend/api/contacts.php'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setSuccess(true)
        return { success: true, message: data.message }
      } else {
        throw new Error(data.message || 'Erreur lors de l\'envoi')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(errorMessage)
      console.error('Erreur lors de l\'envoi du contact:', err)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSuccess(false)
    setError(null)
    setLoading(false)
  }

  return { 
    submitContact, 
    loading, 
    success, 
    error, 
    resetForm 
  }
}

// Hook pour l'administration (récupérer les contacts)
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async (status?: string) => {
    try {
      setLoading(true)
      const statusParam = status ? `?status=${status}` : ''
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? `https://your-domain.com/backend/api/contacts.php${statusParam}`
        : `http://localhost/backend/api/contacts.php${statusParam}`
      
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des contacts')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setContacts(data.contacts)
      } else {
        throw new Error(data.message || 'Erreur inconnue')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      console.error('Erreur lors de la récupération des contacts:', err)
    } finally {
      setLoading(false)
    }
  }

  return { contacts, loading, error, fetchContacts }
}
