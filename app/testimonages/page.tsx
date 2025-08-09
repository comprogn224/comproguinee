'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from 'lucide-react'
import Image from "next/image"
import { useTestimonials } from '@/hooks/useTestimonials'

export default function TestimonialsPage() {
  const { testimonials, loading, error } = useTestimonials()

  const stats = [
    { number: "150+", label: "Clients satisfaits" },
    { number: "95%", label: "Taux de satisfaction" },
    { number: "4.9/5", label: "Note moyenne" },
    { number: "98%", label: "Clients qui recommandent" }
  ]

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen">
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Témoignages Clients
              </h1>
              <p className="text-xl text-red-100">
                Chargement des témoignages...
              </p>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // État d'erreur
  if (error) {
    return (
      <div className="min-h-screen">
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Témoignages Clients
              </h1>
              <p className="text-xl text-red-100">
                Erreur lors du chargement des témoignages
              </p>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="text-red-600 mb-4">
              <p>Erreur: {error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Réessayer
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Témoignages Clients
            </h1>
            <p className="text-xl text-red-100">
              Découvrez ce que nos clients disent de notre travail et des résultats obtenus
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des témoignages authentiques de clients qui ont fait confiance à Com'Pro Guinée
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6 flex-1">
                    <Quote className="h-8 w-8 text-red-200 absolute -top-2 -left-2" />
                    <p className="text-gray-600 italic pl-6">"{testimonial.text}"</p>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.position || 'Client'}</p>
                      <p className="text-sm text-red-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Date Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Témoignage</span>
                      <span className="text-gray-400">
                        {new Date(testimonial.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Témoignages Vidéo
            </h2>
            <p className="text-lg text-gray-600">
              Écoutez directement nos clients parler de leur expérience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((video) => (
              <Card key={video} className="overflow-hidden">
                <div className="relative bg-gray-300 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                    <p className="text-gray-600">Témoignage vidéo #{video}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-1">Client {video}</h4>
                  <p className="text-sm text-gray-600">Témoignage sur notre collaboration</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Rejoignez nos clients satisfaits
          </h2>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Faites comme eux, faites confiance à Com'Pro Guinée pour transformer votre présence digitale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-red-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              Demander un devis gratuit
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Voir nos réalisations
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
