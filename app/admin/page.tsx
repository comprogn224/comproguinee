"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, Briefcase, Star, Plus, Edit, Trash2, Eye, BarChart3 } from 'lucide-react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })

  // Données simulées
  const stats = {
    totalClients: 150,
    messagesNonLus: 12,
    projetsActifs: 8,
    temoignages: 25
  }

  const messages = [
    {
      id: 1,
      nom: "Amadou Diallo",
      email: "amadou@example.com",
      sujet: "Demande de devis",
      message: "Bonjour, je souhaite un devis pour la création d'un site web...",
      date: "2024-01-15",
      lu: false
    },
    {
      id: 2,
      nom: "Fatoumata Bah",
      email: "fatoumata@example.com",
      sujet: "Question sur les services",
      message: "Pouvez-vous me donner plus d'informations sur vos services de social media ?",
      date: "2024-01-14",
      lu: true
    }
  ]

  const services = [
    {
      id: 1,
      nom: "Stratégie Digitale",
      description: "Développement de stratégies personnalisées",
      prix: "500 000 GNF",
      actif: true
    },
    {
      id: 2,
      nom: "Création de Contenu",
      description: "Production de contenus visuels et textuels",
      prix: "300 000 GNF",
      actif: true
    }
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation de connexion
    if (loginData.email === "admin@comproguinee.com" && loginData.password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Identifiants incorrects")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Administration Com'Pro Guinée</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@comproguinee.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="admin123"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
          <Button 
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
          >
            Déconnexion
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Clients</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalClients}</p>
                </div>
                <Users className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Messages non lus</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.messagesNonLus}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Projets actifs</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.projetsActifs}</p>
                </div>
                <Briefcase className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Témoignages</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.temoignages}</p>
                </div>
                <Star className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="temoignages">Témoignages</TabsTrigger>
            <TabsTrigger value="projets">Projets</TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Messages reçus
                  <Badge variant="destructive" className="text-white">{stats.messagesNonLus} non lus</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`p-4 border rounded-lg ${!message.lu ? 'bg-red-50 border-red-200' : 'bg-white'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{message.nom}</h4>
                          <p className="text-sm text-gray-600">{message.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!message.lu && <Badge variant="destructive" className="text-xs text-white">Nouveau</Badge>}
                          <span className="text-sm text-gray-500">{message.date}</span>
                        </div>
                      </div>
                      <h5 className="font-medium mb-2">{message.sujet}</h5>
                      <p className="text-gray-600 text-sm mb-3">{message.message}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Répondre
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Gestion des services
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter un service
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{service.nom}</h4>
                            <Badge variant={service.actif ? "default" : "secondary"}>
                              {service.actif ? "Actif" : "Inactif"}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{service.description}</p>
                          <p className="text-red-600 font-semibold">{service.prix}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Témoignages Tab */}
          <TabsContent value="temoignages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Gestion des témoignages
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter un témoignage
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Interface de gestion des témoignages clients...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projets Tab */}
          <TabsContent value="projets">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Gestion des projets
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter un projet
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Interface de gestion des projets et réalisations...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
