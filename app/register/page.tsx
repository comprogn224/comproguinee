"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const [form, setForm] = useState({ nom: "", email: "", password: "" })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Une erreur est survenue");
    } else {
      alert("Inscription réussie 🎉");
      // Tu peux rediriger ici si tu veux
    }
  } catch (err) {
    console.error(err);
    setError("Erreur réseau ou serveur");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom complet</Label>
              <Input
                id="nom"
                value={form.nom}
                onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                className="mt-1"
              />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">Créer un compte</Button>
          </form>
          <div className="text-center mt-4 text-sm">
            Déjà inscrit ? <a href="/login" className="text-red-600 hover:underline">Se connecter</a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
