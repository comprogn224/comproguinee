import { useState, useEffect } from 'react'

export interface Project {
  id: number
  title: string
  description: string
  shortDescription: string
  client: string
  sector: string
  technologies: string[]
  mainImage?: string
  gallery: string[]
  url?: string
  startDate?: string
  endDate?: string
  status: 'en_cours' | 'termine' | 'suspendu'
  featured: boolean
  order: number
  dateCreated: string
}

export function useProjects(featuredOnly: boolean = false) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const featuredParam = featuredOnly ? '?featured=true' : ''
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? `https://your-domain.com/backend/api/projects.php${featuredParam}`
          : `http://localhost/backend/api/projects.php${featuredParam}`
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des projets')
        }
        
        const data = await response.json()
        
        if (data.success) {
          setProjects(data.projects)
        } else {
          throw new Error(data.message || 'Erreur inconnue')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        console.error('Erreur lors de la récupération des projets:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [featuredOnly])

  return { projects, loading, error }
}

export function useProject(id: number) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? `https://your-domain.com/backend/api/projects.php?id=${id}`
          : `http://localhost/backend/api/projects.php?id=${id}`
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du projet')
        }
        
        const data = await response.json()
        
        if (data.success) {
          setProject(data.project)
        } else {
          throw new Error(data.message || 'Projet non trouvé')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        console.error('Erreur lors de la récupération du projet:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  return { project, loading, error }
}
