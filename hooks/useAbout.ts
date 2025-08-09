import { useState, useEffect } from 'react'

export interface AboutSection {
  id: number
  section: string
  title: string
  content: string
  image?: string
  order: number
  dateCreated: string
}

export function useAbout() {
  const [sections, setSections] = useState<AboutSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAboutSections = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? 'https://your-domain.com/backend/api/about.php'
          : 'http://localhost/backend/api/about.php'
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des informations')
        }
        
        const data = await response.json()
        
        if (data.success) {
          setSections(data.sections)
        } else {
          throw new Error(data.message || 'Erreur inconnue')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        console.error('Erreur lors de la récupération des informations:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutSections()
  }, [])

  return { sections, loading, error }
}

export function useAboutSection(sectionType: string) {
  const [section, setSection] = useState<AboutSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSection = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? `https://your-domain.com/backend/api/about.php?section=${sectionType}`
          : `http://localhost/backend/api/about.php?section=${sectionType}`
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération de la section')
        }
        
        const data = await response.json()
        
        if (data.success) {
          setSection(data.section)
        } else {
          throw new Error(data.message || 'Section non trouvée')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        console.error('Erreur lors de la récupération de la section:', err)
      } finally {
        setLoading(false)
      }
    }

    if (sectionType) {
      fetchSection()
    }
  }, [sectionType])

  return { section, loading, error }
}
