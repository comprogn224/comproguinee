import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Users } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function RealizationsPage() {
  const projects = [
    {
      id: 1,
      title: "Refonte digitale - Restaurant Le Baobab",
      category: "Restauration",
      services: ["Site Web", "Réseaux Sociaux", "Photographie"],
      description: "Création d'une identité digitale complète pour ce restaurant traditionnel guinéen, incluant un site web moderne et une stratégie social media.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Décembre 2023",
      client: "Restaurant Le Baobab",
      results: [
        "+150% de visibilité en ligne",
        "+80% de réservations",
        "5000+ followers sur Instagram"
      ]
    },
    {
      id: 2,
      title: "Campagne digitale - StartUp Tech Conakry",
      category: "Technologie",
      services: ["Stratégie Digitale", "Publicité", "Contenu"],
      description: "Lancement digital d'une startup tech guinéenne avec une stratégie complète de communication et de génération de leads.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Novembre 2023",
      client: "StartUp Tech Conakry",
      results: [
        "500+ leads qualifiés",
        "+200% de trafic web",
        "50+ partenaires acquis"
      ]
    },
    {
      id: 3,
      title: "E-commerce - Boutique Mode Guinée",
      category: "Mode",
      services: ["E-commerce", "Photographie", "Marketing"],
      description: "Création d'une boutique en ligne pour une marque de mode locale avec intégration des paiements mobiles.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Octobre 2023",
      client: "Boutique Mode Guinée",
      results: [
        "1000+ commandes/mois",
        "+300% de ventes",
        "Expansion nationale"
      ]
    },
    {
      id: 4,
      title: "Présence digitale - Clinique Santé Plus",
      category: "Santé",
      services: ["Site Web", "SEO", "Réseaux Sociaux"],
      description: "Développement de la présence en ligne d'une clinique privée avec focus sur la prise de rendez-vous en ligne.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Septembre 2023",
      client: "Clinique Santé Plus",
      results: [
        "70% RDV en ligne",
        "+120% de patients",
        "Amélioration de l'image"
      ]
    },
    {
      id: 5,
      title: "Campagne RSE - Fondation Espoir Guinée",
      category: "ONG",
      services: ["Communication", "Vidéo", "Événementiel"],
      description: "Campagne de sensibilisation digitale pour une ONG locale avec création de contenus vidéo impactants et organisation d'événements virtuels.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Août 2023",
      client: "Fondation Espoir Guinée",
      results: [
        "100K+ personnes touchées",
        "+250% de dons",
        "20+ partenaires mobilisés"
      ]
    },
    {
      id: 6,
      title: "Transformation digitale - Groupe Immobilier Alpha",
      category: "Immobilier",
      services: ["Site Web", "CRM", "Marketing Digital"],
      description: "Digitalisation complète d'une agence immobilière avec plateforme de gestion des biens et stratégie marketing digital.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Juillet 2023",
      client: "Groupe Immobilier Alpha",
      results: [
        "500+ biens en ligne",
        "+180% de contacts",
        "Automatisation des processus"
      ]
    }
  ]

  const categories = ["Tous", "Restauration", "Technologie", "Mode", "Santé", "ONG", "Immobilier"]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Nos Réalisations
            </h1>
            <p className="text-xl text-red-100">
              Découvrez les projets que nous avons menés avec succès pour nos clients en Guinée
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "Tous" ? "default" : "outline"}
                className={category === "Tous" ? "bg-red-600 hover:bg-red-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600">{project.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.date}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Résultats clés
                    </h4>
                    <ul className="space-y-1">
                      {project.results.map((result, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{project.client}</span>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Voir plus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos chiffres clés</h2>
            <p className="text-red-100">Les résultats parlent d'eux-mêmes</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-red-100">Projets réalisés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-red-100">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3M+</div>
              <div className="text-red-100">Personnes touchées</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4 ans</div>
              <div className="text-red-100">D'expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Votre projet sera le prochain ?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez nos clients satisfaits et donnez une nouvelle dimension à votre présence digitale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/demande-service">
                Démarrer mon projet
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Discuter avec notre équipe
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
