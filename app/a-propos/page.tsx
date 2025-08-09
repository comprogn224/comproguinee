
"use client"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Heart } from 'lucide-react'
import Image from "next/image"

export default function AboutPage() {

  useEffect(() => {
    fetch("http://localhost/comproguinee-backend/user.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("Données À propos :", data) // 👈 AFFICHÉ EN CONSOLE
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de la page À propos :", err) // 👈 DEBUG
      })
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              À propos de Com'Pro Guinée
            </h1>
            <p className="text-xl text-red-100">
              Découvrez notre histoire, notre mission et les valeurs qui nous animent dans l'accompagnement de votre transformation digitale.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fondée en 2024, Com'Pro Guinée est née de la vision de démocratiser l'accès aux outils de communication digitale pour les entreprises guinéennes. Nos fondateurs, passionnés par le digital et convaincus du potentiel économique de la Guinée, ont créé cette agence pour accompagner la transformation numérique du pays.
                </p>
                <p>
                  Depuis nos débuts, nous avons accompagné plus de 150 entreprises dans leur développement digital, des startups innovantes aux PME établies, en passant par les entrepreneurs individuels qui souhaitent faire grandir leur activité.
                </p>
                <p>
                  Notre approche unique combine expertise technique internationale et connaissance approfondie du marché local guinéen, nous permettant de créer des solutions parfaitement adaptées à nos clients.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/ChatGPT Image 5 août 2025, 19_53_46.png"
                alt="Équipe Com'Pro Guinée"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
                <p className="text-gray-600">
                  Accompagner les entreprises guinéennes dans leur transformation digitale en leur offrant des solutions de communication innovantes, accessibles et adaptées au marché local.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Notre Vision</h3>
                <p className="text-gray-600">
                  Devenir la référence en communication digitale en Guinée et contribuer activement au développement de l'écosystème numérique du pays.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre travail au quotidien
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-gray-600">
                Nous mettons notre passion du digital au service de vos projets
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                Nous travaillons main dans la main avec nos clients
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Nous visons l'excellence dans chaque projet que nous réalisons
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Nous restons à la pointe des dernières tendances digitales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-lg text-gray-600">
              Des experts passionnés à votre service
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Aye Mady Diawara",
                role: "Directeur Général",
                image: "/placeholder.svg?height=300&width=300"
              },
              {
                name: "Aissatou Bah",
                role: "Directrice Créative",
                image: "/placeholder.svg?height=300&width=300"
              },
              {
                name: "Ibrahima Sow",
                role: "Responsable Technique",
                image: "/placeholder.svg?height=300&width=300"
              }
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-red-600 font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
