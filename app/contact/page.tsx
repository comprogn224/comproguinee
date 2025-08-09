"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/comproguinee-backend/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({
          title: "Message envoyé !",
          description: "Nous vous répondrons dans les plus brefs délais.",
        });
        setFormData({
          nom: "",
          email: "",
          telephone: "",
          sujet: "",
          message: "",
        });
      } else {
        toast({
          title: "Erreur lors de l'envoi",
          description: data.error || "Une erreur est survenue.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur réseau",
        description: "Impossible de contacter le serveur.",
        variant: "destructive",
      });
    }
  }

  const handleWhatsAppClick = () => {
    const message = "Bonjour, je souhaite en savoir plus sur vos services de communication digitale."
    const whatsappUrl = `https://wa.me/224624599802?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-red-100">
              Une question ? Un projet ? N'hésitez pas à nous contacter, nous sommes là pour vous accompagner
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Parlons de votre projet
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets de communication digitale.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      Quartier Matoto centre, Commune de Matoto<br />
                      Conakry, République de Guinée
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      +224 624 59 98 02<br />
                      +224 660 15 46 82
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      comprogn@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Horaires</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi : 7h00 - 18h00<br />
                      Samedi : 8h00 - 15h00
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="pt-6">
                <Button 
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Nous contacter sur WhatsApp
                </Button>
              </div>
            </div>

            {/* Formulaire de contact */}
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="nom">Nom complet *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                      required
                    />
                  </div>
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
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sujet">Sujet *</Label>
                    <Input
                      id="sujet"
                      value={formData.sujet}
                      onChange={(e) => setFormData(prev => ({ ...prev, sujet: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez votre demande..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre localisation
            </h2>
            <p className="text-lg text-gray-600">
              Venez nous rendre visite dans nos bureaux à Conakry
            </p>
          </div>
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600">Carte interactive à intégrer</p>
              <p className="text-sm text-gray-500">Quartier Matoto centre, Conakry</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
  