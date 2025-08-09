'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, PenTool, Users, Globe, Camera, BarChart3, Megaphone, Smartphone, ArrowRight, Zap } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useServices } from '@/hooks/useServices'

export default function ServicesPage() {
  const { services, loading, error } = useServices()

  // Mapping des icônes
  const iconMap: { [key: string]: any } = {
    'target': Target,
    'zap': Zap,
    'users': Users,
    'globe': Globe,
    'camera': Camera,
    'bar-chart': BarChart3,
    'megaphone': Megaphone,
    'smartphone': Smartphone,
    'pen-tool': PenTool
  }

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen">
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Nos Services
              </h1>
              <p className="text-xl text-red-100">
                Chargement des services...
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
                    <div className="w-12 h-12 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded"></div>
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
                Nos Services
              </h1>
              <p className="text-xl text-red-100">
                Erreur lors du chargement des services
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
              Nos Services
            </h1>
            <p className="text-xl text-red-100">
              Des solutions complètes pour booster votre présence digitale et développer votre activité en Guinée
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Target
              const priceText = service.priceMin && service.priceMax 
                ? `${service.priceMin.toLocaleString()} - ${service.priceMax.toLocaleString()} GNF`
                : service.priceMin 
                ? `À partir de ${service.priceMin.toLocaleString()} GNF`
                : 'Sur devis'
              
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6 flex-1">
                      {service.shortDescription || service.description}
                    </p>
                    {service.duration && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">
                          <strong>Durée:</strong> {service.duration}
                        </p>
                      </div>
                    )}
                    <div className="mt-auto">
                      <p className="text-lg font-semibold text-red-600 mb-4">{priceText}</p>
                      <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                        <Link href="/demande-service">
                          Demander un devis
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre Processus de Travail
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une méthode éprouvée pour garantir le succès de vos projets
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Analyse",
                description: "Nous analysons vos besoins et votre marché pour définir la meilleure stratégie."
              },
              {
                step: "02",
                title: "Stratégie",
                description: "Élaboration d'un plan d'action personnalisé avec des objectifs clairs et mesurables."
              },
              {
                step: "03",
                title: "Création",
                description: "Mise en œuvre de la stratégie avec création de contenus et campagnes adaptés."
              },
              {
                step: "04",
                title: "Optimisation",
                description: "Suivi des performances et optimisation continue pour maximiser les résultats."
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Contactez-nous pour discuter de vos besoins et recevoir un devis personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50">
              <Link href="/demande-service">
                Demander un devis gratuit
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-red-600 hover:bg-white hover:text-red-700">
              <Link href="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
