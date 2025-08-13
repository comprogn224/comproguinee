'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Target, Zap } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { SplashScreen } from '@/components/splash-screen'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SplashScreen />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Com'Pro Guinée
              </h1>
              <p className="text-xl lg:text-2xl text-red-100">
                Votre partenaire en communication digitale
              </p>
              <p className="text-lg text-red-50">
                Nous accompagnons les entrepreneurs, PME et startups de Guinée dans leur transformation digitale avec des solutions de communication innovantes et sur mesure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-200 border border-white hover:border-black">
                  <Link href="/demande-service" className="focus:outline-none">
                    Demander un devis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-red-600 hover:bg-gray-200 hover:text-red-700 hover:border-black">
                  <Link href="/nos-services">
                    Découvrir nos services
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/ChatGPT Image 5 août 2025, 19_53_46.png"
                alt="Logo Com'Pro Guinée"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services en bref */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos expertises
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des solutions complètes pour booster votre présence digitale
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stratégie Digitale</h3>
                <p className="text-gray-600">
                  Développement de stratégies personnalisées pour maximiser votre impact en ligne
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Création de Contenu</h3>
                <p className="text-gray-600">
                  Production de contenus visuels et textuels engageants pour vos audiences
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestion Réseaux Sociaux</h3>
                <p className="text-gray-600">
                  Animation et gestion professionnelle de vos comptes sur les réseaux sociaux
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <TestimonialsSection />

      {/* CTA Final */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Prêt à booster votre communication ?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Contactez-nous dès aujourd'hui pour un devis personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-200 border border-white hover:border-black">
              <Link href="/demande-service">
                Demander un devis gratuit
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-red-600 hover:bg-gray-200 hover:text-red-700 hover:border-black">
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
