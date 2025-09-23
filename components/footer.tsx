import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-4">{"Inter Leges"}</h3>
            <p className="text-sm leading-relaxed opacity-90 mb-4">
              Una piattaforma dedicata alla condivisione di conoscenza giuridica di qualità, aperta a giovani giuristi e
              professionisti del settore.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4" />
              <span>redazione@interleges.it</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Link Rapidi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articoli" className="hover:text-accent transition-colors">
                  Tutti gli Articoli
                </Link>
              </li>
              <li>
                <Link href="/categorie" className="hover:text-accent transition-colors">
                  Categorie
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="hover:text-accent transition-colors">
                  Contatti
                </Link>
              </li>
              <li>
                <Link href="/sostienici" className="hover:text-accent transition-colors">
                  Sostienici
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="font-semibold mb-4">Sostieni il Progetto</h4>
            <p className="text-sm leading-relaxed opacity-90 mb-4">
              Aiutaci a mantenere questa piattaforma gratuita e accessibile a tutti.
            </p>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/sostienici" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Dona Ora</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-75">© 2025 Inter Leges, una rivista giuridica online. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}
