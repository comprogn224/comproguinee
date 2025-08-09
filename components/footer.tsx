import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 border-2 border-red-600 bg-white rounded-lg flex items-center justify-center">
                <img src="/comProGuinee.jpeg" alt="Logo Com'Pro Guinée" />
              </div>
              <span className="text-xl font-bold">Com'Pro Guinée</span>
            </div>
            <p className="text-gray-400">
              Votre partenaire en communication digitale pour transformer votre présence en ligne.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <div className="space-y-2">
              <Link href="/a-propos" className="block text-gray-400 hover:text-white transition-colors">
                À propos
              </Link>
              <Link href="/nos-services" className="block text-gray-400 hover:text-white transition-colors">
                Nos services
              </Link>
              <Link href="/nos-realisations" className="block text-gray-400 hover:text-white transition-colors">
                Nos réalisations
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <div className="space-y-2">
              <p className="text-gray-400">Stratégie digitale</p>
              <p className="text-gray-400">Création de contenu</p>
              <p className="text-gray-400">Gestion réseaux sociaux</p>
              <p className="text-gray-400">Design graphique</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-600" />
                <span className="text-gray-400">Conakry, Guinée</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-600" />
                <span className="text-gray-400">+224 624 59 98 02</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-600" />
                <span className="text-gray-400">comprogn@gmail.com</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Com'Pro Guinée. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
