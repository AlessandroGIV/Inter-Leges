import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, ArrowRight, Scale, Users } from "lucide-react"
import { getCategoriesWithCounts, getAllArticles } from "@/lib/articles-data"

export const dynamic = "force-dynamic"

export default function CategoriePage() {
  const categories = getCategoriesWithCounts()
  const totalArticles = getAllArticles().length

  const categoryConfig = {
    "diritto-civile": { icon: Scale, color: "bg-blue-500/10 text-blue-600" },
    "diritto-penale": { icon: BookOpen, color: "bg-red-500/10 text-red-600" },
    "diritto-amministrativo": { icon: Users, color: "bg-green-500/10 text-green-600" },
    "diritto-costituzionale": { icon: Scale, color: "bg-purple-500/10 text-purple-600" },
    "diritto-del-lavoro": { icon: Users, color: "bg-orange-500/10 text-orange-600" },
    "diritto-commerciale": { icon: BookOpen, color: "bg-teal-500/10 text-teal-600" },
    altri: { icon: BookOpen, color: "bg-gray-500/10 text-gray-600" },
    annunci: { icon: BookOpen, color: "bg-accent/10 text-accent" },
  }

  const categoryDescriptions = {
    "diritto-civile": "Contratti, responsabilità civile, diritti reali e rapporti patrimoniali tra privati",
    "diritto-penale": "Reati, procedura penale, giustizia penale e tutela dei diritti dell'imputato",
    "diritto-amministrativo": "Pubblica amministrazione, procedimenti amministrativi e rapporti con i cittadini",
    "diritto-costituzionale": "Diritti fondamentali, organizzazione costituzionale e giustizia costituzionale",
    "diritto-del-lavoro": "Rapporti di lavoro, sindacati, previdenza sociale e tutela dei lavoratori",
    "diritto-commerciale": "Società, contratti commerciali, diritto dell'impresa e mercati finanziari",
    altri: "Articoli su tematiche giuridiche trasversali e argomenti specialistici",
    annunci: "Comunicazioni ufficiali, novità e aggiornamenti della rivista",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-primary mb-6">Categorie Giuridiche</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Esplora i nostri articoli organizzati per area del diritto. Ogni categoria contiene contenuti di qualità
              accademica curati da esperti del settore.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>{totalArticles} articoli totali</span>
              </div>
              <span>•</span>
              <span>{categories.length} categorie principali</span>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => {
                const config = categoryConfig[category.slug as keyof typeof categoryConfig]
                const IconComponent = config?.icon || BookOpen
                const description =
                  categoryDescriptions[category.slug as keyof typeof categoryDescriptions] ||
                  "Contenuti giuridici specializzati"

                return (
                  <Card key={category.slug} className="hover:shadow-lg transition-shadow group h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${config?.color || "bg-gray-500/10 text-gray-600"}`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                            <Link href={`/categorie/${category.slug}`}>{category.name}</Link>
                          </CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {category.count} articoli
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{description}</p>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="flex-1">
                        {category.count === 0 ? (
                          <p className="text-sm text-muted-foreground italic">
                            Non ci sono ancora articoli pubblicati in questa categoria.
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Esplora {category.count} articolo{category.count !== 1 ? "i" : ""} disponibile
                            {category.count !== 1 ? "i" : ""}.
                          </p>
                        )}
                      </div>

                      <div className="pt-4 mt-4 border-t">
                        <Link
                          href={`/categorie/${category.slug}`}
                          className="flex items-center justify-between text-primary hover:text-accent transition-colors font-medium"
                        >
                          <span>Esplora categoria</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl text-primary mb-4">La Nostra Collezione</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Una panoramica completa dei contenuti disponibili nella nostra rivista giuridica
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{totalArticles}</div>
                <div className="text-sm text-muted-foreground">Articoli Pubblicati</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{categories.length}</div>
                <div className="text-sm text-muted-foreground">Aree del Diritto</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">1+</div>
                <div className="text-sm text-muted-foreground">Autori Esperti</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Contenuti Gratuiti</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
