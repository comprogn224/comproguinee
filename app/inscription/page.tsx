"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import Image from "next/image"

export default function InscriptionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { register, login, isLoading, isAuthenticated } = useAuth()
  
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    mot_de_passe: "",
    confirm_password: ""
  })

  // Rediriger si déjà authentifié
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isLoginMode) {
      // Mode inscription
      if (!formData.nom || !formData.email || !formData.mot_de_passe) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive"
        })
        return
      }

      if (formData.mot_de_passe !== formData.confirm_password) {
        toast({
          title: "Erreur de validation",
          description: "Les mots de passe ne correspondent pas.",
          variant: "destructive"
        })
        return
      }

      if (formData.mot_de_passe.length < 6) {
        toast({
          title: "Erreur de validation",
          description: "Le mot de passe doit contenir au moins 6 caractères.",
          variant: "destructive"
        })
        return
      }

      try {
        const result = await register({
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          mot_de_passe: formData.mot_de_passe
        })

        if (result.success) {
          toast({
            title: "Inscription réussie !",
            description: result.message || "Bienvenue sur Com'Pro Guinée !",
          })
          
          // Rediriger vers la page d'accueil
          router.push('/')
        } else {
          toast({
            title: "Erreur d'inscription",
            description: result.error || "Une erreur est survenue lors de l'inscription.",
            variant: "destructive"
          })
        }
      } catch (err) {
        console.error('Erreur lors de l\'inscription:', err)
        toast({
          title: "Erreur d'inscription",
          description: "Une erreur est survenue. Veuillez réessayer plus tard.",
          variant: "destructive"
        })
      }
    } else {
      // Mode connexion
      if (!formData.email || !formData.mot_de_passe) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez remplir l'email et le mot de passe.",
          variant: "destructive"
        })
        return
      }

      try {
        const result = await login(formData.email, formData.mot_de_passe)

        if (result.success) {
          toast({
            title: "Connexion réussie !",
            description: result.message || "Bienvenue !",
          })
          
          // Rediriger vers la page d'accueil
          router.push('/')
        } else {
          toast({
            title: "Erreur de connexion",
            description: result.error || "Email ou mot de passe incorrect.",
            variant: "destructive"
          })
        }
      } catch (err) {
        console.error('Erreur lors de la connexion:', err)
        toast({
          title: "Erreur de connexion",
          description: "Une erreur est survenue. Veuillez réessayer plus tard.",
          variant: "destructive"
        })
      }
    }
  }

  const resetForm = () => {
    setFormData({
      nom: "",
      email: "",
      telephone: "",
      mot_de_passe: "",
      confirm_password: ""
    })
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    resetForm()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 border-4 border-red-600 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Image 
                src="/comProGuinee.jpeg" 
                alt="Logo Com'Pro Guinée" 
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">Com'Pro Guinée</h1>
          <p className="text-gray-600">
            {isLoginMode ? "Connectez-vous à votre compte" : "Créez votre compte pour continuer"}
          </p>
        </div>

        {/* Formulaire */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              {isLoginMode ? "Connexion" : "Inscription"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginMode && (
                <div>
                  <Label htmlFor="nom">Nom complet *</Label>
                  <Input
                    id="nom"
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                    placeholder="Votre nom complet"
                    required={!isLoginMode}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="votre@email.com"
                  required
                />
              </div>

              {!isLoginMode && (
                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                    placeholder="+224 XXX XXX XXX"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="mot_de_passe">Mot de passe *</Label>
                <Input
                  id="mot_de_passe"
                  type="password"
                  value={formData.mot_de_passe}
                  onChange={(e) => setFormData(prev => ({ ...prev, mot_de_passe: e.target.value }))}
                  placeholder={isLoginMode ? "Votre mot de passe" : "Minimum 6 caractères"}
                  required
                />
              </div>

              {!isLoginMode && (
                <div>
                  <Label htmlFor="confirm_password">Confirmer le mot de passe *</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={formData.confirm_password}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirm_password: e.target.value }))}
                    placeholder="Confirmez votre mot de passe"
                    required={!isLoginMode}
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading 
                  ? (isLoginMode ? "Connexion..." : "Inscription...") 
                  : (isLoginMode ? "Se connecter" : "S'inscrire")
                }
              </Button>
            </form>

            {/* Basculer entre inscription et connexion */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLoginMode ? "Pas encore de compte ?" : "Déjà un compte ?"}
              </p>
              <Button
                type="button"
                variant="link"
                onClick={toggleMode}
                className="text-red-600 hover:text-red-700 p-0 h-auto font-semibold"
              >
                {isLoginMode ? "Créer un compte" : "Se connecter"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Note de sécurité */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Vos données sont sécurisées et ne seront jamais partagées avec des tiers.
        </p>
      </div>
    </div>
  )
}
