import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET() {
  try {
    // Lire le fichier JSON des témoignages
    const jsonDirectory = path.join(process.cwd(), 'lib/data')
    const fileContents = await fs.readFile(jsonDirectory + '/testimonials.json', 'utf8')
    const data = JSON.parse(fileContents)
    
    // Retourner les témoignages triés par date (plus récents en premier)
    const sortedTestimonials = data.testimonials.sort((a: any, b: any) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    return NextResponse.json({
      success: true,
      testimonials: sortedTestimonials
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des témoignages' },
      { status: 500 }
    )
  }
}

// Optionnel: API pour ajouter un nouveau témoignage
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, text, rating } = body
    
    // Validation basique
    if (!name || !company || !text || !rating) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }
    
    // Lire les témoignages existants
    const jsonDirectory = path.join(process.cwd(), 'lib/data')
    const fileContents = await fs.readFile(jsonDirectory + '/testimonials.json', 'utf8')
    const data = JSON.parse(fileContents)
    
    // Créer un nouveau témoignage
    const newTestimonial = {
      id: data.testimonials.length + 1,
      name,
      company,
      text,
      rating: parseInt(rating),
      avatar: `/avatars/default.jpg`,
      date: new Date().toISOString().split('T')[0]
    }
    
    // Ajouter le nouveau témoignage
    data.testimonials.push(newTestimonial)
    
    // Sauvegarder dans le fichier
    await fs.writeFile(jsonDirectory + '/testimonials.json', JSON.stringify(data, null, 2))
    
    return NextResponse.json({
      success: true,
      testimonial: newTestimonial
    })
  } catch (error) {
    console.error('Erreur lors de l\'ajout du témoignage:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'ajout du témoignage' },
      { status: 500 }
    )
  }
}
