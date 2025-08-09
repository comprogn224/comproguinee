"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export default function ServiceRequestPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    entreprise: "",
    email: "",
    telephone: "",
    services: [] as string[],
    budget: "",
    delai: "",
    description: "",
    objectifs: "",
    cible: "",
    concurrents: "",
    existant: ""
  })

  const services = [
    "Stratégie Digitale",
    "Création de Contenu",
    "Gestion Réseaux Sociaux",
    "Création de Sites Web",
    "Production Audiovisuelle",
    "Publicité Digitale",
    "Relations Presse Digitales",
    "Marketing Mobile"
  ]

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter(s => s !== service)
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulation d'envoi
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons dans les 24h pour discuter de votre projet.",
    })
    
    // Reset form
    setFormData({
      nom: "",
      prenom: "",
      entreprise: "",
      email: "",
      telephone: "",
      services: [],
      budget: "",
      delai: "",
      description: "",
      objectifs: "",
      cible: "",
      concurrents: "",
      existant: ""
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Demande de Service
            </h1>
            <p className="text-xl text-red-100">
              Parlez-nous de votre projet et recevez un devis personnalisé sous 24h
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        value={formData.nom}
                        onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        value={formData.prenom}
                        onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="entreprise">Entreprise / Organisation</Label>
                    <Input
                      id="entreprise"
                      value={formData.entreprise}
                      onChange={(e) => setFormData(prev => ({ ...prev, entreprise: e.target.value }))}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        value={formData.telephone}
                        onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services demandés */}
              <Card>
                <CardHeader>
                  <CardTitle>Services demandés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                        />
                        <Label htmlFor={service} className="text-sm">{service}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Budget et délai */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget et délai</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Budget approximatif *</Label>
                    <RadioGroup
                      value={formData.budget}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moins-500k" id="moins-500k" />
                        <Label htmlFor="moins-500k">Moins de 500 000 GNF</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="500k-1m" id="500k-1m" />
                        <Label htmlFor="500k-1m">500 000 - 1 000 000 GNF</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1m-2m" id="1m-2m" />
                        <Label htmlFor="1m-2m">1 000 000 - 2 000 000 GNF</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="plus-2m" id="plus-2m" />
                        <Label htmlFor="plus-2m">Plus de 2 000 000 GNF</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="delai">Délai souhaité</Label>
                    <Select value={formData.delai} onValueChange={(value) => setFormData(prev => ({ ...prev, delai: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un délai" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (moins d'1 semaine)</SelectItem>
                        <SelectItem value="1-2-semaines">1-2 semaines</SelectItem>
                        <SelectItem value="1-mois">1 mois</SelectItem>
                        <SelectItem value="2-3-mois">2-3 mois</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Détails du projet */}
              <Card>
                <CardHeader>
                  <CardTitle>Détails du projet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description du projet *</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre projet en détail..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="objectifs">Objectifs principaux</Label>
                    <Textarea
                      id="objectifs"
                      placeholder="Quels sont vos objectifs avec ce projet ?"
                      value={formData.objectifs}
                      onChange={(e) => setFormData(prev => ({ ...prev, objectifs: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cible">Public cible</Label>
                    <Textarea
                      id="cible"
                      placeholder="Décrivez votre public cible..."
                      value={formData.cible}
                      onChange={(e) => setFormData(prev => ({ ...prev, cible: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="concurrents">Concurrents / Références</Label>
                    <Textarea
                      id="concurrents"
                      placeholder="Mentionnez vos concurrents ou des références qui vous inspirent..."
                      value={formData.concurrents}
                      onChange={(e) => setFormData(prev => ({ ...prev, concurrents: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="existant">Éléments existants</Label>
                    <Textarea
                      id="existant"
                      placeholder="Avez-vous déjà un site web, des réseaux sociaux, du contenu existant ?"
                      value={formData.existant}
                      onChange={(e) => setFormData(prev => ({ ...prev, existant: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button type="submit" size="lg" className="bg-red-600 hover:bg-red-700 px-8">
                  Envoyer ma demande
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  Nous vous contacterons dans les 24h pour discuter de votre projet
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
