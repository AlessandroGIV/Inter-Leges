export const dynamic = "force-dynamic"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="h-12 w-12 text-primary" />
            </div>

            <h1 className="font-serif font-bold text-6xl text-primary mb-4">404</h1>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-foreground mb-6">Pagina Non Trovata</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              La pagina che stai cercando non esiste o è stata spostata. Torna alla homepage o esplora i nostri
              contenuti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Torna alla Homepage
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/articoli">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Esplora gli Articoli
                </Link>
              </Button>
            </div>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Link Utili</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/categorie">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Categorie
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/contatti">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Contatti
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/sostienici">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Sostienici
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
