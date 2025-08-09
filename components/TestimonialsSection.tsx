'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { useTestimonials } from '@/hooks/useTestimonials'

export function TestimonialsSection() {
  const { testimonials, loading, error } = useTestimonials()

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow animate-pulse">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-5 w-5 bg-gray-200 rounded mr-1" />
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
          </div>
          <div className="text-center text-red-600">
            <p>Erreur lors du chargement des témoignages: {error}</p>
            <p className="text-sm text-gray-500 mt-2">
              Veuillez rafraîchir la page ou réessayer plus tard.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Afficher seulement les 6 premiers témoignages sur la page d'accueil
  const displayedTestimonials = testimonials.slice(0, 6)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-gray-600">
            {testimonials.length} témoignages de clients satisfaits
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(testimonial.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {testimonials.length > 6 && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Et {testimonials.length - 6} autres témoignages...
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
